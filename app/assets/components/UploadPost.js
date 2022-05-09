import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from '../../firebase';
import { useSelector } from 'react-redux';
import SafeView from './SafeView';
import AppButton from './AppButton';
import AnimationLoad from './AnimationLoad';
import { HEIGHT, WIDTH } from '../../constants/Dimensions';
import colors from '../theme/colors';

export default function UploadPost({ navigation, route }) {
  const { image, geohash } = route.params;
  const { user } = useSelector((state) => state.userAuth);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const childPath = `posts/${user.uid}/${Math.random().toString(36)}`;

  const uploadImage = async () => {
    const uri = image;
    const response = await fetch(uri); //Fetch Image Data
    const blob = await response.blob(); //Create blob to upload
    const task = firebase //Actually upload to firebase
      .storage()
      .ref()
      .child(childPath) //Saves it in a posts folder on firebase, saves as random string (base 36 string)
      .put(blob);

    const uploadProgress = (snapshot) => {
      //TODO FRONTEND: Display Progress Bar/Animation When Uploading.
      setLoading(true);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        //Public url that can be shared.
        savePostData(snapshot);
        setLoading(false);
      });
    };

    const taskError = (snapshot) => {
      //If an error occurs.
    };

    task.on('state_changed', uploadProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    const docRef = firebase.firestore().collection('posts').doc(geohash);

    docRef.get().then((doc) => {
      if (doc.exists) {
        docRef
          .update({
            userPosts: firebase.firestore.FieldValue.arrayUnion({
              user: user.uid,
              username: user.displayName,
              downloadURL,
              caption,
              creation: firebase.firestore.Timestamp.now(), //Firestore places a timestamp for creation date. Serverside action.
            }),
          })
          .then(function () {
            navigation.navigate('Feed', { geohash });
          });
      } else {
        docRef
          .set({
            userPosts: firebase.firestore.FieldValue.arrayUnion({
              user: user.uid,
              username: user.displayName,
              downloadURL,
              caption,
              creation: firebase.firestore.Timestamp.now(), //Firestore places a timestamp for creation date. Serverside action.
            }),
          })
          .then(function () {
            navigation.navigate('Feed', { geohash });
          });
      }
    });
  };

  if (loading) {
    return <AnimationLoad />;
  }

  return (
    <SafeView>
      <View style={styles.screenContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <TextInput
          placeholder="Label your masterpiece"
          placeholderTextColor={colors.backgroundLight}
          style={styles.textInput}
          onChangeText={(text) => setCaption(text)}
        />
        <TouchableOpacity
          onPress={() => {
            if (caption.length < 6) {
              alert('Please enter a caption with at least 6 characters');
            } else {
              uploadImage();
            }
          }}
        >
          <View style={styles.btnContainer}>
            <AppButton title="Save" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: HEIGHT,
    width: WIDTH,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '50%',
    width: '100%',
    borderRadius: 5,
  },
  textInput: {
    marginVertical: 12,
    fontSize: 18,
    color: colors.backgroundLight,
  },
  btnContainer: {
    width: WIDTH * 0.95,
  },
});
