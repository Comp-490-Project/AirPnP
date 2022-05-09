import React, { useEffect } from 'react'
import { StyleSheet,View, Text, Image, TouchableOpacity, ScrollView} from 'react-native'
import colors from '../theme/colors'
import BackButton from '../icons/back-btn.png';
import LightText from '../components/LightText';
import OptionCard from '../components/Cards/OptionCard';
import { HEIGHT, WIDTH } from '../../constants/Dimensions';
import mapStyle from '../../constants/mapStyle';
import MapView, { Marker} from 'react-native-maps';
import AppButton from '../components/AppButton';
import Rating from '../components/Rating';
import { LinearGradient } from 'expo-linear-gradient';
import { openCamera, openLibrary } from '../../helpers/mediaPermissions';
import { handleImageInUI, addRestroom } from '../../actions/restroomActions';
import { useDispatch, useSelector } from 'react-redux';
import { geohashForLocation } from 'geofire-common';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCamera,
    faPhotoFilm,
    faCheck,
  } from '@fortawesome/free-solid-svg-icons';
export default function SubmitScreen({navigation,route}) {

    const dispatch = useDispatch();

    const {location} = route.params;

    const {region, rating, image} = useSelector(
        (state)=> state.restroomReview
    );

    const {user} = useSelector((state)=> state.userAuth);

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
                latitude: region.latitude,
                longitude: region.longitude,
                meanRating: rating,
                user: user.uid,
                image,
            })
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Image style={styles.backButton} source={BackButton}/>  
                </TouchableOpacity>
                <Text style={styles.text}>Add Details</Text>
            </View>
            <View style={{borderRadius: 4, paddingBottom: 2, overflow: 'hidden'}}>
                <MapView
                    style={styles.mapView}
                    customMapStyle={mapStyle}
                    showsUserLocation={true}
                    region={{
                        latitude:location.latitude, //location.lat
                        longitude:location.longitude, //location.long
                        latitudeDelta: 0.0006,
                        longitudeDelta: 0.0006,
                    }}
                    showsMyLocationButton={false}
                >
                    <Marker
                        coordinate={{
                            latitude:region.latitude,
                            longitude: region.longitude,
                        }}
                    >
                    </Marker>
                </MapView>
            </View>
            <Text style={styles.label}>Rate This Restroom</Text>
            <View style={styles.section}>
                <Rating></Rating>
            </View>
            <Text style={styles.switchLabel}>Indicate Restroom Details</Text>
            <ScrollView style={{marginTop: 5}} showsHorizontalScrollIndicator={false} horizontal>
                <OptionCard
                    icon="dollar"
                    title="FREE"
                    bg={colors.textLeft}
                    
                />
                <OptionCard
                    icon="wheelchair"
                    title="HANDICAP"
                    bg={colors.textLeft}
                />
            </ScrollView>
            <Text style={styles.mediaLabel}>Upload Restroom Images</Text>
            <View style={{flexDirection: 'row', justifyContent:'center'}}>
                <TouchableOpacity
                    style={{width: '45%', marginRight: 15, top:"-18%"}}
                    onPress={handleCamera}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[colors.secondary, colors.primary]}
                        locations={[0, 1]}
                        style={styles.gradientSubmit}
                    >
                    <View style={styles.btnSubmit}>
                        <LightText fontSize={20}>Camera</LightText>
                        <FontAwesomeIcon
                            icon={faCamera}
                            size={20}
                            color={colors.white}
                            style={styles.iconLeft}
                        >
                        </FontAwesomeIcon>
                    </View>
                </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{width: '45%', top:"-18%"}}
                    onPress={handleLibrary}
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
                            icon={faPhotoFilm}
                            size={20}
                            color={colors.white}
                            style={styles.iconRight}
                        >
                        </FontAwesomeIcon>
                        <LightText fontSize={20}>Photos</LightText>
                    </View>
                </LinearGradient>   
                </TouchableOpacity>
            </View>
            {image && (
                <View style={styles.textSection}>
                    <Text style={{fontSize: 20, color: colors.textRight}}>Uploaded Image</Text>
                    <FontAwesomeIcon
                        icon={faCheck}
                        size={20}
                        color={colors.green}
                        style={styles.iconUpload}
                    >

                    </FontAwesomeIcon>
                </View>
            )}

            <TouchableOpacity style={{width:'70%', top:"-5%", alignSelf:"center"}} onPress={handleSubmit}>
                <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[colors.secondary, colors.primary]}
                        locations={[0, 1]}
                        style={styles.gradientSubmit}
                >
                    <View style={styles.button}>
                        <LightText fontSize={20}>Submit</LightText>
                    </View>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.darkBackground,

    },

    backButton:{
        marginLeft: 15,
        marginTop: 25,
    },
    text:{
        color: colors.white,
        fontSize:30,
        fontWeight:'bold',
        marginTop: 25,
        alignSelf: 'center',
        marginBottom: 25,
    },
    column:{
        flexDirection:'row'
    },
    mapView: {
        height: HEIGHT * 0.2,  
    },

    label:{
        color: colors.white,
        fontSize:20,
        alignSelf:'center',
        right: "25%"
    },

    header:{
        backgroundColor: '#1c1f28',
    },
    
    switchLabel:{
        color: colors.white,
        fontSize:20,
        alignSelf:'center',
        right: "18%",
        marginTop: "3%"
    },

    mediaLabel:{
        color: colors.white,
        fontSize:20,
        alignSelf:'center',
        right: "18%",
        marginBottom: "22%",
    },

    section:{
        backgroundColor: '#1c1f28',
        borderRadius: 15,
        justifyContent:'center',
        alignItems: 'center',
        height: HEIGHT*0.08,
        width: WIDTH*.9,
        alignItems: 'center',
        justifyContent: 'center',
        left: 22,
        marginTop: 10,
    },

    textSection:{
        backgroundColor: '#1c1f28',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        bottom: "13%",
        borderRadius: 15,
        width: WIDTH*0.9,
        flexDirection: 'row'
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

    button:{
        width: '98.5%',
        marginVertical: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundDark,
        borderRadius: 4,
    },

    iconRight:{
        marginRight: 10,
    },

    iconLeft:{
        marginLeft: 10,
    },
    
    iconUpload:{
        marginLeft: 10,
    }


})