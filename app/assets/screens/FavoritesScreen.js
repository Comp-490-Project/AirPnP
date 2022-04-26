import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../theme/colors';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import RestroomCard from '../components/RestroomCard';
/* todo 
4: write code to add addresses to the database and add favorited and visited counters in the database
5: add stats visited and favorited
6: pass a mode prop to select favs, visited, added.
*/

function FavoritesScreen({ navigation }) {
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
          <RestroomCard 
          navigation={ navigation}
          indexValue= {index}
          key= {index}
          name= {restroom.name}
          address= {restroom.description}
          latitude= {restroom.latitude}
          longitude= {restroom.longitude}
          geohash= {restroom.geohash}
          />
          
      )))}
    </ScrollView>
  </View>  
</>    
  );
}
const styles = StyleSheet.create({
  container:{
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
  topBorder: {
    height: 50,
    backgroundColor: colors.greyBackground,
  },
});

export default FavoritesScreen;

