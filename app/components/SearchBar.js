
import React, { useState } from 'react';
import {View, Text,  StyleSheet, SafeAreaView, ScrollView, Dimensions} from 'react-native'; //Scroll
import { MaterialIcons } from '@expo/vector-icons'; 
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const width = Dimensions.get('window').width;

function SearchBar(){
    const [input, setInput] = useState("");
    const [destinationPlace, setDestinationPlace] = useState('null');
    return(
        <SafeAreaView onPress={()=>{}} style={styles.container}>
            <View style={styles.leftCol}>
                <MaterialIcons name="location-on" color="black" size={25} style={{alignSelf:'center'}}/>
            </View>
            <View style={styles.centerCol}>
                <GooglePlacesAutocomplete //Component that allows Search Bar to Present Autocompleted Address Results.
                    currentLocation={true}
                    placeholder="Search here"  
                    enablePoweredByContainer={false}
                    value={input}
                    onChangeText={(text)=>setInput(text)}
                    onPress={(data,details=null)=>{ 
                        setDestinationPlace({data,details});
                    }
                    }
                    styles={{style:styles.inputStyle}}
                    fetchDetails={true}
                    query={{
                        key: 'AIzaSyDOeEKbcngBARFdVV8a5K75fakxbrS3Kro',
                        language: 'en',
                    }}
                    GoolePlacesDetailsQuery={{
                        fields: ['formatted_address,geometry']
                    }}
                />
            </View>
            <View style={styles.rightCol}>
                <Text style={{fontSize:8}}>
                </Text>
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container:{
        position:'absolute',
        flexDirection: 'row',
        width:(width-40),
        top: 60,
        left: 20,
        backgroundColor: 'white',
        elevation: 7,
        flex: 10,
    },
    leftCol:{
        flex: 1,
        borderLeftWidth: 1,
        borderColor: '#ededed',
        height: '45%',
        alignItems: 'center',
        padding: 10,
    },  
    rightCol:{
        flex: 1,
        alignSelf: 'center',
    },
    centerCol:{
        flex: 10,
        top: 0,
        left: 0,
        height: '40%',
    },
})

export default SearchBar