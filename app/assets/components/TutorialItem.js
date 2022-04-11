import { StyleSheet, View, Text, Image} from 'react-native'
import { WINDOW } from '../../constants/Dimensions'
import React from 'react'
import GradientText from './GradientText'
import colors from '../theme/colors'
import { useFonts } from 'expo-font'

export default TutorialItem = ({item}) => {

  let [fonts_loaded ] = useFonts({
    'Inter': require('../fonts/Inter.ttf'),
  });

  if(!fonts_loaded){
    return  <Text>Error</Text>
  }

  return ( 
    <View style={styles.container}>
      <Image source={item.image} style={styles.image}></Image>
      <View style={{flex: 0.3}}>
        <GradientText text={item.title} style={styles.title}></GradientText>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: WINDOW.WIDTH,
  },

  image:{
    flex: 0.7,
    justifyContent: 'center',
    width: WINDOW.WIDTH,
    resizeMode: 'contain',
  },

  title:{
    fontWeight: '600',
    fontSize: 50,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Inter'
  },

  description:{
    fontWeight: '300',
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: 64,
    fontSize: 20,
    fontFamily: 'Inter'
  }

})
