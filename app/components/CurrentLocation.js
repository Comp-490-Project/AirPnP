import {View,StyleSheet,Dimensions} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import React from 'react';

const {HEIGHT,WIDTH} = Dimensions.get('window');

export default function CurrentLocationButton ({props}){  
    /*This denotes that if the bottom prop is passed, we pass it in, if not then simply 
    set it to 65. 
    */
    const bottom = props.bottom ? props.bottom: 65; //bottom is undefined. Prop isn't being passed when this component is utilized in the MapScreen
    return( //Return. 
        <View style={styles.container, {top: HEIGHT-bottom}}>
            <MaterialIcons 
                name="location" 
                color="#000000" 
                size={25} 
                onPress={()=>{}}
            />
        </View>
    )
}


const styles= StyleSheet.create({
    container:{
        zIndex: 9,
        position: 'absolute',
        width: 45,
        height: 45, 
        backgroundColor: '#fff',
        left: WIDTH-70,
        borderRadius: 50,
        shadowColor: "#000000",
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})