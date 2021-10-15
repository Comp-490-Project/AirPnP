import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const WIDTH = Dimensions.get('window').width;
export const SearchBar = function(props){
    const[input, setInput]= React.useState("")
  
    return (
        <TouchableOpacity onPress={() => {} } style={styles.container}>
            <View style={styles.leftCol}>
            <MaterialIcons name="location-on" color="black" size={25} style={{alignSelf: 'center'}}/>
            </View>

            <View  style={styles.centerCol}>
                 
            <TextInput
                    style={styles.inputStyle} 
                    value={input}
                    onChangeText={(text) => setInput(text)}
                     placeholder="Search here"
                  //value={term}
                  //onChangeText={newTerm => onTermChange(newTerm)}
                  />
                
        
            </View>

            <View style={styles.rightCol}>
            <Text style={{fontSize: 8}}> 
                
                </Text>
                
            </View >

        </TouchableOpacity>
    )
        
}

const styles = StyleSheet.create({
    container: {
        zIndex: 5,
        position: 'absolute',
        flexDirection: 'row',
        width: (WIDTH-40), //width of window so its dynamic
        height: 40,
        top: 50,
        left: 20,
        borderRadius: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: 'black',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        //padding: 10,
    },
    rightCol: {
        flex: 1,
        alignItems: 'center',

    },
    leftCol: {
        flex: 1,
        borderLeftWidth: 1,
        borderColor: '#ededed',
    },
})

export default SearchBar;


