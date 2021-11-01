import React, { useState } from 'react';
import {View, Text,  StyleSheet, SafeAreaView, ScrollView, Dimensions} from 'react-native'; //Scroll
import { MaterialIcons } from '@expo/vector-icons'; 
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const WIDTH = Dimensions.get('window').width;
export const SearchBar = function(props){
    const[input, setInput]= React.useState("")
   
    const [destinationPlace, setDestinationPlace] = useState('null'); 
  
    return (
    
        
        <SafeAreaView onPress={() => {} } style={styles.container}>
            
            <View style={styles.leftCol}>
            <MaterialIcons name="location-on" color="black" size={25} style={{alignSelf: 'center'}}/>
            </View>
            
            
            <View  style={styles.centerCol}>
               
            <GooglePlacesAutocomplete   
             value={input}
            onChangeText={(text) => setInput(text)}
                 placeholder="Search here"           
                onPress={(data, details = null) => {
                setDestinationPlace={data, details};                    
                  }}
                  styles={{
                      
                    style:styles.inputStyle                   
                   }}
                  
                  fetchDetails = {true}
                  query={{
                    key: 'AIzaSyDOeEKbcngBARFdVV8a5K75fakxbrS3Kro',
                    language: 'en',
                  }}
                  GooglePlacesDetailsQuery={{
                      fields: ['formatted_address','geometry'],
                  }}
                  />
           
            </View>
                
            <View style={styles.rightCol}>
                <Text style={{fontSize: 8}}>

                </Text>

            </View>
        </SafeAreaView>
        
    )
        
}

const styles = StyleSheet.create({
    container : { //centerCol container
        //zIndex: 5,
        position: 'absolute',
        flexDirection: 'row',
        width: (WIDTH-40), //width of window so its dynamic
        top: 60,
        left: 20,
        //borderRadius: 2,
        backgroundColor: 'white',
        elevation: 7, 
        flex: 10,
    },
   
    rightCol: {
        flex: 1,
        alignSelf: 'center',
        

    },


   
    leftCol: {
        flex: 1,
     borderLeftWidth: 1,
       borderColor: '#ededed',
       height: '45%',
       alignItems: 'center',
       padding: 10,
       
    },
    
    centerCol: {
        flex: 10,
        top: 0,
        left: 0,
        height: '40%',
      
        
    },
      
})

export default SearchBar;