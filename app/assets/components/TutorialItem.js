import { StyleSheet, View, Text, Image} from 'react-native'
import { WINDOW } from '../../constants/Dimensions'
import React from 'react'

export default TutorialItem = ({item}) => {
  return ( 
    <View style={styles.container}>
      <Image source={item.image} style={styles.image}></Image>
      <View style={{flex: 0.3}}>
        <Text style={styles.title}>{item.title}</Text>
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
    fontSize: 28,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
  },

  description:{
    fontWeight: '300',
    color: '#6265ab',
    textAlign: 'center',
    paddingHorizontal: 64,
  }

})
