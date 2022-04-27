import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import SafeView from '../components/SafeView';
import RestroomCard from '../components/RestroomCard';
import BackButton from '../icons/back-btn.png';
import colors from '../theme/colors';

/* todo 
4: write code to add addresses to the database and add favorited and visited counters in the database
5: add stats visited and favorited
6: pass a mode prop to select favs, visited, added.
*/

function FavoritesScreen({ navigation }) {
  const { userFavorites } = useSelector((state) => state.userFavorites);

  return (
    <SafeView>
      <>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image style={styles.backButton} source={BackButton} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.title}>Favorites</Text>
          <ScrollView>
            {userFavorites.length == 0 ? (
              <Text
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  color: colors.white,
                }}
              >
                Data Not Available!
              </Text>
            ) : (
              userFavorites.map((restroom, index) => (
                <RestroomCard
                  navigation={navigation}
                  indexValue={index}
                  key={index}
                  name={restroom.name}
                  address={restroom.description}
                  latitude={restroom.latitude}
                  longitude={restroom.longitude}
                  geohash={restroom.geohash}
                />
              ))
            )}
          </ScrollView>
        </View>
      </>
    </SafeView>
  );
}
const styles = StyleSheet.create({
  backButton: {
    marginTop: 15,
    marginLeft: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
  },
  title: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 26,
    fontFamily: 'Roboto',
    paddingBottom: 50,
  },
});

export default FavoritesScreen;
