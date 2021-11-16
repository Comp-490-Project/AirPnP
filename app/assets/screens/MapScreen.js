import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import useLocation from '../../hooks/useLocation';
import SearchBar from '../../components/SearchBar';
import { firebase } from '../../../Firebase/firebase';
import colors from '../../assets/config/colors';
import BottomSheet from 'reanimated-bottom-sheet';
import AppButton from '../../components/AppButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Linking } from 'react-native';

export default function MapScreen({navigation}) {
  const [markerLoaded, setMarkerLoaded] = useState(false);
  const [restrooms, setRestrooms] = useState([]);
  const reference = React.createRef();
  const [name,setName] = useState('');
  const [desc,setDesc] = useState('');
  const [lat,setLat] = useState(0);
  const[long,setLong] = useState(0);
  
  const openGps = (lati, lng) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:0,0?q=';
    var url = scheme + `${lati},${lng}`;
    Linking.openURL(url);
  };

  async function getRestrooms() {
    const query = firebase.firestore().collection('testing');
    query.get().then((querySnapshot) => {
      const docs = querySnapshot.docs;
      for (const doc of docs) {
        setRestrooms((restrooms) => [...restrooms, doc.data()]);
      }
      setMarkerLoaded(true);
    });
  }

  restroomAttributes = (marker) => {
    setLat(marker.latitude);
    setLong(marker.longitude);
    setName(marker.name);
    setDesc(marker.description);
    reference.current.snapTo(0);
  }
  
  renderInner = () => (
    <View style={styles.bottomSheetPanel} > 
      <View style= {{alignItems: 'center'}}>
        <Text style= {styles.panelRestroomName}>{name}</Text>
        <Text style= {styles.panelRestroomDescription}>{desc}</Text>
      </View>
      <View style = {{alignContent:'space-around'}}>
        <TouchableOpacity style = {{margin: 5}} onPress={()=>  openGps(lat, long) }>
          <AppButton title= {'Navigate'} styles={{width:"80%"}} /> 
        </TouchableOpacity > 
          <View Style={{height: 10, backgroundColor: colors.white}}/> 
        <TouchableOpacity style = {{margin: 5}} onPress={() => navigation.navigate("review")}>
          <AppButton title= {'Rate'} styles={{width:"80%"}}/>    
        </TouchableOpacity>
      </View>         
    </View>
  );
  renderHeader = () =>(
    <View style={styles.bottomSheetHeader}>
      <View style={styles.bottomSheetpanelHeader}>
        <View style={styles.bottomSheetpanelHandle}/>
      </View>
    </View>
  );
  useEffect(() => {
    if (!markerLoaded) {
      getRestrooms();
    }
  }, [markerLoaded]);

  const location = useLocation();

  return (
    <>
      {!location ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <View style={styles.container}>
          <MapView
            onPress={()=>reference.current.snapTo(1)}
            provider={PROVIDER_GOOGLE} //Google Maps
            style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={true}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0015,
              longitudeDelta: 0.0121,
            }}
            loadingEnabled={true}
          >
            {markerLoaded &&
              restrooms.map((marker, index) => (
                <Marker
                  key={index}                
                  image = {require('../../assets/Logo.png')}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,                    
                  }}                 
                >  
                  <Callout tooltip onPress={()=>restroomAttributes(marker)}>
                    <View>  
                      <View style = {styles.calloutWindow}>
                        <Text style= {styles.name}>
                          {marker.name}
                        </Text>
                        <Text>
                          {marker.description}
                        </Text>
                        </View>
                        <View style={styles.arrowBorder}/>
                        <View style={styles.arrow}/>                     
                    </View>
                  </Callout>
                </Marker>
              ))}
              
          </MapView>
          <SearchBar />
          <BottomSheet
            ref ={reference}
            snapPoints={["57%",0]}
            initialSnap= {1}
            enabledGestureInteraction={true}
            renderContent={renderInner}
            renderHeader= {renderHeader}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    position: 'absolute',
    top: 100,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
 calloutWindow:{
   flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    borderRadius: 7,
    borderColor: colors.medium,
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  name:{
    fontSize: 15,
    fontWeight:'bold',
    marginBottom: 5,
  },
  arrow:{
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: colors.white,
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder:{
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: colors.white,
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  bottomSheetHeader:{
    backgroundColor: colors.white,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetpanelHeader:{
    alignItems: 'center',
  },
  bottomSheetpanelHandle:{
    width: 40,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.lightgray,
    marginBottom: 10,
  },
  bottomSheetPanel:{
    backgroundColor: colors.white,
    padding: 10,

  },
  panelRestroomName:{
    fontSize: 18,
    fontWeight:'bold',
  
  },
  panelRestroomDescription:{
    fontSize: 12,
    fontWeight:'normal',
    margin:10,
  },
});
