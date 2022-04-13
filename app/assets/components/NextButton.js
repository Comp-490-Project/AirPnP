import React from 'react'
import { useEffect, useRef } from 'react';
import {View, StyleSheet, TouchableOpacity, Animated} from 'react-native'
import Svg, {G,Circle} from 'react-native-svg';

import {AntDesign} from '@expo/vector-icons'

export default function NextButton({percentage}) {

    const size = 128;
    const strokeWidth = 2;
    const center = size/2;
    const radius = size/2 - strokeWidth/2;
    const circumfrence = 2 * Math.PI * radius

    const progress = useRef(new Animated.Value(0)).current

    const progressRef = useRef(null)

    const animate = (toValue) =>{
        return Animated.timing(progress,{
            toValue,
            duration: 250,
            useNativeDriver: false
        }).start()
    }

    useEffect(()=>{
        animate(percentage);
    },[percentage])

    useEffect(()=>{
        progress.addListener((value)=>{
            const strokeDashoffset = circumfrence - (circumfrence * value.value)/100; 
            if(progressRef?.current){
                progressRef.current.setNativeProps({
                    strokeDashoffset 
                })
            }
        },[percentage]);
    });
    
  return (
      <View style={styles.container}>
          <Svg width ={size} height={size}>
            <G rotation='-90' origin={center}>
            <Circle stroke = '#272B37' cx ={center} cy={center} r={radius} strokeWidth={strokeWidth}/>
            <Circle
                stroke= '#FFFFFF'
                cx={center}
                cy={center}
                r={radius}
                strokeWidth = {strokeWidth}
                strokeDasharray = {circumfrence}
            />
            </G>
          </Svg>
          <TouchableOpacity style={styles.button} activeOpacity={0.6}>
            <AntDesign name="arrowright" size={44} color="#8BC6EC" />
          </TouchableOpacity>
      </View>
  )
}


const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button:{
        position: 'absolute',
        backgroundColor: 'black',
        borderRadius: 100,
        padding: 20,
    }



})