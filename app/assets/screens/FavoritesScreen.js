import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppButton from '../components/AppButton';
import colors from '../theme/colors';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteHandler } from '../../actions/userActions';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarFilled from '../icons/rating/star-filled.png';
import { useFontLoader } from '../../hooks/useFontLoader';
import AnimationLoad from '../components/AnimationLoad';
import LightText from '../components/LightText';
import AttributeButton from '../components/AttributeButton';
import DirectionsIcon from '../components/DirectionsIcon';
import FeedIcon from '../components/FeedIcon';
import ToiletIcon from '../icons/toilet-icon.png';
import ToiletIcon2 from '../icons/toilet2.png';
import DistancePersonIcon from '../icons/distance-person-icon.svg';
import { WIDTH } from '../../constants/Dimensions';
import HeartIcon from '../components/HeartIcon';

/* todo 
2: make card into a component
4: write code to add addresses to the database and add favorited and visited counters in the database
5: add stats visited and favorited
6: pass a mode prop to select favs, visited, added.
*/

function FavoritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const { userFavorites } = useSelector((state) => state.userFavorites);
  return (
<>   
  <View style={styles.topBorder} />
  <TouchableOpacity style= {styles.backbutton}>
    <Image  style = {{marginLeft: 15}} source= {require('../icons/back-btn.png')}/>  
  </TouchableOpacity>
  <View style= {styles.container}>  
    <Text style={styles.title}>Favorites</Text>
    <ScrollView> 
      {userFavorites.length == 0 ? (
        <Text style={{ flex: 1, justifyContent: 'center' , color: colors.white}}>
          Data Not Available!
        </Text>
      ) : (
        userFavorites.map((restroom, index) => (
        
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={index % 2 == 0 ? ([colors.firstfavColorLeft, colors.firstfavColorRight]):([colors.secondFavColorLeft, colors.secondFavColorRight])}         
            locations={[0, 0.7]}
            style={styles.cardBackground}
            key={index}
          >                
            <View style={styles.cardContainer}>
              <View style={styles.headingContainer}>
                <LightText fontSize={26} fontWeight={'700'}>
                  {restroom.name}
                </LightText>
              </View>
              {/* @TODO: Convert coordinates into address */}
              <View style={styles.addressContainer}>
                <LightText fontWeight="500" lineHeight={20}>
                      {restroom.description}
                </LightText>
              </View>
              {/* @TODO: Check if restaurant description contains word restaurant */}
              <View style= {styles.stats}>
                <Image  source= {require('../icons/favstaticon.png')}/>
                <LightText fontWeight="500" lineHeight={20}>
                      {" 5 other have favorited this restroom!"}
                </LightText>
              </View>
              <View style= {styles.stats2}>
                <Image  source= {require('../icons/visitedcheckmark.png')}/>
                <LightText fontWeight="500" lineHeight={20}>
                      {" 5 others have visited this restroom!"}
                </LightText>
              </View>
              <View style={styles.footerContainer}>
                <View style={styles.btnContainer}>
                  <DirectionsIcon latitude={restroom.latitude} longitude={restroom.longitude} />
                  <FeedIcon navigation={navigation} geohash={restroom.geohash} />
                  <HeartIcon geohash={restroom.geohash} />
                </View>
              </View>
              {index % 2 == 0 ? (
              <Image source={ToiletIcon2} style={styles.toiletBackground2} />
              ):(
              <Image source={ToiletIcon} style={styles.toiletBackground} />
                )}
              <View style={styles.shadedfooter}/>
            </View>
          </LinearGradient>       
      )))}
    </ScrollView>
  </View>  
</>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.greyBackground,
  },
  title: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 26,
    fontFamily: 'Roboto',
    paddingBottom: 50,
  },
  backbutton: {
    backgroundColor: colors.greyBackground,
  },
  nameText: {
    fontWeight: 'bold',
  },
  buffer: {
    height: 50,
  },
  topBorder: {
    height: 50,
    backgroundColor: colors.greyBackground,
  },
  cardBackground: {
    width: WIDTH * 0.9,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
    marginBottom: 20,
  },
  cardContainer: {
    padding: 20,
    justifyContent: 'center',
    position: 'relative',
    overflow: "hidden",
  },
  headingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressContainer: {
    marginVertical: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  toiletBackground: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    height: '125%',
    width: '40%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  toiletBackground2: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    height: '125%',
    width: '40%',
    borderBottomLeftRadius:20,
    borderTopLeftRadius: 20,
  },
  shadedfooter: {
    backgroundColor: "black",
    opacity: 0.2 ,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
  },
  stats:{
    flexDirection: 'row',
    marginBottom: 10,
  },
  stats2:{
    flexDirection: 'row',
    marginBottom: 20,
  },
  
});

export default FavoritesScreen;

