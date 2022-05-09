import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import SafeView from '../components/SafeView';
import RestroomCard from '../components/RestroomCard';
import BackButton from '../icons/back-btn.png';
import colors from '../theme/colors';

function FavoritesScreen({ navigation, route }) {
  const { userFavorites } = useSelector((state) => state.userFavorites);
  const { userVisited } = useSelector((state) => state.userVisited);
  const { userAddedRestrooms } = useSelector(
    (state) => state.userAddedRestrooms
  );

  var title;
  var screenMode;
  var arrayInUse;
  switch (route.params.key) {
    case 'favorites':
      title = 'Favorites';
      screenMode = 1;
      arrayInUse = userFavorites;
      break;
    case 'visited':
      title = 'Visited Restrooms';
      screenMode = 2;
      arrayInUse = userVisited;
      break;
    case 'added':
      title = 'Added Restrooms';
      screenMode = 3;
      arrayInUse = userAddedRestrooms;
      break;
  }

  return (
    <SafeView>
      <>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image style={styles.backButton} source={BackButton} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView>
            {arrayInUse.length == 0 ? (
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
              arrayInUse.map((restroom, index) => (
                <RestroomCard
                  navigation={navigation}
                  indexValue={index}
                  key={index}
                  name={restroom.name}
                  address={restroom.address}
                  latitude={restroom.latitude}
                  longitude={restroom.longitude}
                  geohash={restroom.geohash}
                  favorited={restroom.favoriteCounter}
                  visited={restroom.visitedCounter}
                  cardMode={screenMode}
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
    marginBottom: 15,
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
