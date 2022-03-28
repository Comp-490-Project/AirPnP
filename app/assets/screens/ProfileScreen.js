import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { firebase } from '../../firebase';
import { logout } from '../../actions/userActions';

function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userAuth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addedRestrooms, setAddedRestrooms] = useState([]);
  const [visitedRestrooms, setVisitedRestrooms] = useState([]);

  // Get user email and name
  const getUserProfile = async () => {
    const docRef = firebase.firestore().collection('users').doc(user.uid);
    const query = await docRef.get();
    const userData = query.data();

    const email = userData.email;
    setEmail(email);

    const fullName = `${userData.firstName} ${userData.lastName}`;
    setName(fullName);
  };

  // Get user added restrooms (development: testing, production: Los-Angeles)
  const getUserAddedRestrooms = async () => {
    const addedRestroomsRef = firebase.firestore().collection('testing');
    const addedRestroomsQuery = addedRestroomsRef.where('user', '==', user.uid);
    const addedRestroomsSnapshot = await addedRestroomsQuery.get();

    // Clear array
    setAddedRestrooms([]);

    addedRestroomsSnapshot.forEach((snap) =>
      setAddedRestrooms((addedRestrooms) => [...addedRestrooms, snap.data()])
    );
  };

  // Get restrooms that user has visited
  const getUserVisitedRestrooms = async () => {
    const docRef = firebase.firestore().collection('users').doc(user.uid);
    const query = await docRef.get();
    const { visited } = query.data();

    const collectionRef = firebase.firestore().collection('Los-Angeles');

    // Clear array
    setVisitedRestrooms([]);

    visited.forEach(async (restroom) => {
      const docRef = await collectionRef.doc(restroom).get();
      const restroomData = docRef.data();

      setVisitedRestrooms((visitedRestrooms) => [
        ...visitedRestrooms,
        restroomData,
      ]);
    });
  };

  // @todo
  // Reviews must be object of objects
  // const [reviews, setReviews] = useState([]);
  // const getUserReviews = async () => {
  //   const restroomsRef = firebase.firestore().collection('Los-Angeles');
  //   const reviewsQuery = restroomsRef.where('reviews', 'array-contains', {
  //     Comment: '',
  //     Rating: 2,
  //     userID: 'sq4kvQ2OLbWFtvgHg5hEMCu2cxG2',
  //   });

  //   // Execute query
  //   const snapshot = await reviewsQuery.get();
  //   snapshot.forEach((snap) => console.log(snap.data()));
  // };

  useEffect(() => {
    if (user) {
      getUserProfile();
      getUserAddedRestrooms();
      getUserVisitedRestrooms();
    }
  }, []);

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Log In You Wanker</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}
        >
          <Avatar.Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            }}
            size={100}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Title
              style={
                (styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                })
              }
            >
              {name}
            </Title>
            <Caption style={styles.caption}>{email}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            { borderRightColor: '#dddddd', borderRightWidth: 1 },
          ]}
        >
          <Title style={styles.infoBoxText}>{visitedRestrooms.length}</Title>
          <Caption>Visits</Caption>
        </View>
        <View
          style={[
            styles.infoBox,
            { borderRightColor: '#dddddd', borderRightWidth: 1 },
          ]}
        >
          <Title style={styles.infoBoxText}>{addedRestrooms.length}</Title>
          <Caption>Restrooms Added</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title style={styles.infoBoxText}>5</Title>
          <Caption>Other</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <FontAwesome name="user" size={20} color="#4aa564" />
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <FontAwesome name="heart" size={20} color="#4aa564" />
            <Text
              style={styles.menuItemText}
              onPress={() => navigation.navigate('Favorites')}
            >
              Your Favorites
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <FontAwesome name="unlock" size={20} color="#4aa564" />
            <Text style={styles.menuItemText}>Change Password</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <FontAwesome name="gear" size={20} color="#4aa564" />
            <Text
              style={styles.menuItemText}
              onPress={() => navigation.navigate('Settings')}
            >
              Settings
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <FontAwesome name="sign-out" size={20} color="#4aa564" />
            <Text
              style={styles.menuItemText}
              onPress={() => {
                firebase.auth().signOut();
                dispatch(logout());
                navigation.navigate('Home');
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBoxText: {
    color: '#4aa564',
  },
  menuWrapper: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    marginBottom: 20,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 26,
  },
});

export default ProfileScreen;
