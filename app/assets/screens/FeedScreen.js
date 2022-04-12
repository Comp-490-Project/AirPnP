import { View, StyleSheet, Animated, FlatList, Text, Image, Dimensions, StatusBar } from 'react-native'
import React, {useState, useCallback, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import {getUserFeed, clearUserFeed} from '../../actions/userActions'

const {width, height} = Dimensions.get('screen')
 
const imageWidth = width * 0.7;

const imageHeight = imageWidth * 1.54;


export default function FeedScreen({navigation, route}) {

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const {geohash} = route.params   
    const { userPosts, loading } = useSelector((state) => state.feed);

    const dispatch = useDispatch();

    useEffect(() => {
      if (!loading) {
        dispatch(getUserFeed(geohash));
      }
    }, [loading]);

    return (
      <View style={styles.container}>
        <StatusBar hidden/>
          <View style={StyleSheet.absoluteFillObject}>
            {userPosts.map((image, index)=>{
              const inputRange = [
                (index - 1) * width, 
                index * width,
                (index + 1) * width 
              ]
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0,1,0]
              })
              return <Animated.Image
                key={`image-${index}`}
                source={{uri: image.downloadURL}}
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    opacity
                  }
                ]}
                blurRadius = {20}
              
              />
            })}
          </View>
          <Animated.FlatList
            data={userPosts}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x:scrollX}}}],
              {useNativeDriver: true}
            )}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            renderItem = {({item})=>{
              return <View style={styles.photoContainer}>
                <Image source={{uri: item.downloadURL}} style={styles.photo}></Image>
              </View>
            }}  
          >

          </Animated.FlatList>
      </View>
    )
  }
const styles = StyleSheet.create({
    photo:{
        width: imageWidth,
        height: imageHeight,
        resizeMode: 'cover',
        borderRadius: 16,
    },

    photoContainer:{
      width, 
      justifyContent: 'center', 
      alignItems: 'center', 
      shadowColor: '#000', 
      shadowOpacity: 1,
      shadowOffset:{
        width: 0,
        height: 0
      },
      shadowRadius: 20
    },

    container:{
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
    }
})