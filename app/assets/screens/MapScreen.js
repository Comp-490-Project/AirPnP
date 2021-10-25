import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import useLocation from '../../hooks/useLocation';
import SearchBar from '../../components/SearchBar';
import { firebase } from '../../../Firebase/firebase';
import colors from '../../assets/config/colors';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated'
import AppButton from '../../components/AppButton';

export default function MapScreen({navigation}) {
  const [markerLoaded, setMarkerLoaded] = useState(false);
  const [restrooms, setRestrooms] = useState([]);
  const reference = React.createRef();
  
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
  
  renderInner = () => (
    <View style={styles.bottomSheetPanel}> 
      <View style= {{alignItems: 'center'}}>
        <Text style= {styles.panelRestroomName}>Restroom Name</Text>
        <Text style= {styles.panelRestroomDescription}>Description of the restroom</Text>
      </View>
      <View style = {{alignContent:'space-around'}}>
          <AppButton title= {'Navigate'} styles={{width:"80%"}}/>   
          <View Style={{height: 10, backgroundColor: colors.white}}/> 
          <AppButton title= {'Rate'} styles={{width:"80%"}}/>     
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
  bs = React.createRef();
  fall = new Animated.Value(1);
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
          >
            {markerLoaded &&
              restrooms.map((marker, i) => (
                <Marker
                  key={i}
                  
                  
                  image = {require('../../assets/Logo.png')}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,                    
                  }}                 
                >  
                  <Callout tooltip onPress={()=>reference.current.snapTo(0)}>
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
            snapPoints={[400,0]}
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