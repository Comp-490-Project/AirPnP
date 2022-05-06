import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Rating from '../components/Rating';
import AppButton from '../components/AppButton';
import colors from '../theme/colors';
import ReviewBottomSheet from '../components/bottomSheets/ReviewBottomSheet';
import { useSelector, useDispatch } from 'react-redux';
import { submitReview } from '../../actions/restroomActions';
import BackButton from '../icons/back-btn.png';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCamera,
  faFile,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { openCamera, openLibrary } from '../../helpers/mediaPermissions';
import { handleImageInUI } from '../../actions/restroomActions';
import { LinearGradient } from 'expo-linear-gradient';
import LightText from '../components/LightText';

function ReviewScreen({ navigation, route }) {
  const reference = useRef(null);
  const dispatch = useDispatch();

  const { geohash } = route.params;

  const [comment, setComment] = useState('');
  const { rating, image } = useSelector((state) => state.restroomReview);
  
  const handleCamera = async () => {
    const image = await openCamera();
    dispatch(handleImageInUI(image));
  };

  const handleLibrary = async () => {
    const image = await openLibrary();
    dispatch(handleImageInUI(image));
  };

  const submitHandler = () => {
    const reviewData = {
      geohash,
      comment,
      rating,
      image,
    };
    if(comment == ""){
      alert("Review text may not be blank");
    }else if(rating == 0){
      alert("please provide a rating");
    }else{
    dispatch(submitReview(reviewData));
    alert("Review Submitted")
    navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.pop()}>
          <Image style={styles.backButton} source={BackButton} />
      </TouchableOpacity>
      <View style={{color: colors.white}}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Review</Text>
          <View style={styles.TextInput}>
            <TextInput
              label="Review"
              onChangeText={(text) => setComment(text)}
              placeholder="How Was It?"
              placeholderTextColor={"white"}
              mode="outlined"
              multiline
              color= "white"
            />
          </View>
          <View style= {styles.ratingView}>
            <Text style={{color: colors.white, marginLeft: 20}} >Rating</Text>
            <View style={styles.ratingcontainer}>
              <Rating />
            </View>
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity style= {{marginTop:10, marginLeft:15}}
                      onPress={handleCamera}
                    >
              <FontAwesomeIcon
                icon={faCamera}
                size={30}
                color= {colors.backgroundLight}   
                      />
            </TouchableOpacity>
            <TouchableOpacity style= {{marginTop:10, marginLeft:15}}
                      onPress={handleLibrary}
                    >
              <FontAwesomeIcon
                icon={faFile}
                size={30}
                color= {colors.backgroundLight}   
                      />
            </TouchableOpacity>
            <TouchableOpacity
            style={{ width: '48%', marginLeft: 20 }}
            onPress={submitHandler}
            >
              <LinearGradient
              start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 0 }}
                colors={[colors.secondary, colors.primary]}
                locations={[0, 1]}
               style={styles.gradientSubmit}
              >
                <View style={styles.btnSubmit}>
                 <FontAwesomeIcon
                    icon={faArrowRight}
                   size={20}
                   color={colors.backgroundLight}
                   style={styles.faArrowRight}
                 />
                  <LightText fontSize={16}>Submit Review</LightText>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            {image !== '' && (
              <Image source={{ uri: image }} style={styles.image} />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.greyBackground,
    color: colors.white,
  },

  titlecontainer: {
    backgroundColor: colors.greyBackground,
    color: colors.white,
    width: '100%',
    paddingHorizontal: 20,
  },
  ratingcontainer: {
    marginLeft: 15
  },
  title: {
    fontSize: 35,
    marginTop: 30,
    alignSelf: 'center',
    color: colors.white,
  },
  ratingView: {
    marginTop:15,
    marginBottom:15,
    color: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextInput: {
    marginTop: 20,
    marginBottom: 10,
    borderColor: "#8BC6EC",
    borderRadius: 4,
    borderWidth: 1,
    height: 200,
    backgroundColor: colors.greyBackground,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    
  },
  imageContainer: {
    width: '100%',
    marginBottom: 10,
    marginRight: 10,
  },
  image: {
    marginTop:10,
    width: '100%',
    height: 250
  },
  backButton: {
    marginTop: 45,
    marginLeft: 15,
    marginBottom: 15,
  },
  buttonView: {
    flexDirection: 'row',
  },
  gradientSubmit: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
    overflow: 'hidden',
  },
  btnSubmit: {
    width: '98.5%',
    paddingVertical: 7,
    paddingHorizontal: 25,
    marginVertical: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
    borderRadius: 4,
  },
  faArrowRight: {
    marginRight: 8,
  },
});

export default ReviewScreen;
