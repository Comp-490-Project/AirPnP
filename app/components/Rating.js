import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

var userRating = null // TEMP SOLUTION

export default function useRating (){
    const [defaultRating, setdefaultRating] = useState(2);
    const [maxRating, setmaxRating] = useState([1,2,3,4,5])
    userRating = defaultRating //TEMP SOLUTION
    const starImgFilled='https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    const starImgCorner=  'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'

    const CustomRatingBar = () =>{
        return(
            <View style = {styles.customRatingBarStyle}>
                {
                    maxRating.map((item,key)=>{
                        return(
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={()=> setdefaultRating(item)}
                            >
                                <Image
                                    style={styles.starImgStyle}
                                    source={
                                        item <= defaultRating
                                        ? {uri: starImgFilled}
                                        : {uri: starImgCorner}
                                    }
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
    return(
        <SafeAreaView style={styles.container}>
            <CustomRatingBar>
            </CustomRatingBar>
        </SafeAreaView> 
    )
};

const styles= StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    },
    textStyle:{
        textAlign: 'center',
        fontSize: 23
    },
    customRatingBarStyle:{
        justifyContent: 'center',
        flexDirection:  'row',
        marginTop: -30
    },
    starImgStyle:{
        width: 40,
        height: 40,
        resizeMode: 'cover'
    }
});

export {userRating};