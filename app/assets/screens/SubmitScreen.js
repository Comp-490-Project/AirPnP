import React, { useEffect } from 'react'
import { StyleSheet,View, Text, Image, ImageBackground, TouchableOpacity, ScrollView} from 'react-native'
import colors from '../theme/colors'
import BackButton from '../icons/back-btn.png';
import OptionCard from '../components/Cards/OptionCard';
import { HEIGHT, WIDTH } from '../../constants/Dimensions';
import mapStyle from '../../constants/mapStyle';
import MapView, { Marker} from 'react-native-maps';
import AppButton from '../components/AppButton';
import Rating from '../components/Rating';
import { openCamera, openLibrary } from '../../helpers/mediaPermissions';
import { handleImageInUI, addRestroom } from '../../actions/restroomActions';
import { useDispatch, useSelector } from 'react-redux';
import { geohashForLocation } from 'geofire-common';



export default function SubmitScreen({navigation}) {

    const dispatch = useDispatch();

    const {region, rating, image} = useSelector(
        (state)=> state.restroomReview
    );

    const handleCamera = async () => {
        const image = await openCamera();
        dispatch(handleImageInUI(image));
      };
    
    const handleLibrary = async () => {
        const image = await openLibrary();
        dispatch(handleImageInUI(image));
    };

    const handleSubmit = () =>{
        dispatch(
            addRestroom({
                geohash: geohashForLocation([region.latitude, region.longitude]),
                longitude: region.latitude,
                longitude: region.longitude,
                meanRating: rating,
                user: user.uid,
                image,
            })
        )
    }
    

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <Image style={styles.backButton} source={BackButton}/>  
            </TouchableOpacity>
            <Text style={styles.text}>Add Details</Text>
            <View style={{borderRadius: 50, overflow: 'hidden'}}>
                <MapView
                    style={styles.mapView}
                    customMapStyle={mapStyle}
                    showsUserLocation={true}
                    region={{
                        latitude:34.23833238, //location.lat
                        longitude:-118.523664572, //location.long
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }}
                    showsMyLocationButton={false}
                >
                    <Marker
                        coordinate={{
                            latitude:34.23833238,
                            longitude: -118.523664572,
                        }}
                    >
                    </Marker>
                </MapView>
            </View>
            <Text style={styles.label}>Rating</Text>
            <View style={styles.ratingContainer}>
                <Rating></Rating>
            </View>
            <ScrollView style={{marginTop: 20}} showsHorizontalScrollIndicator={false} horizontal>
                <OptionCard
                    icon="dollar"
                    title="FREE"
                    bg={colors.black}
                    number="123 129"
                    
                />
                <OptionCard
                    icon="wheelchair"
                    title="HANDICAP ACCESS"
                    bg={colors.black}
                    number="123 129"
                />
            </ScrollView>
    
            <View style={{marginBottom: "30%",}}>
                <AppButton
                    title="CAMERA"
                    onPress={handleCamera}
                />
                <AppButton
                    title="PHOTOS"
                    onPress={handleLibrary}
                />
                <AppButton
                    title="SUBMIT RESTROOM"
                    onPress={handleSubmit}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.darkBackground,
        height: HEIGHT,
        width: WIDTH,
    },

    ratingContainer:{
        flex: 1,
        justifyContent: 'center',
        marginTop: 30,
    },

    backButton:{
        marginTop: 20,
        marginLeft: 15,
    },
    text:{
        color: colors.white,
        fontSize:20,
        alignSelf:'center',
        marginTop:25,
        fontWeight:'bold'
    },
    column:{
        flexDirection:'row'
    },
    mapView: {
        marginVertical: 5,
        marginTop: "5%",
        height: HEIGHT * 0.2,  
    },

    label:{
        color: colors.white,
        fontSize:20,
        alignSelf:'center',
    }
})