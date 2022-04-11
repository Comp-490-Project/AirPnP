import React from 'react';
import { View, Text, Image, Linking, StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import colors from '../theme/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { favoriteHandler } from '../../actions/userActions';
import StarFilled from '../icons/rating/star-filled.png';
import StarUnfilled from '../icons/rating/star-unfilled.png';
import { useFontLoader } from '../../hooks/useFontLoader';
import GradientText from '../components/GradientText';
import AnimationLoad from './AnimationLoad';

function MapBottomCard({ navigation }) {
  const dispatch = useDispatch();

  const maxRating = [1, 2, 3, 4, 5];

  const { user } = useSelector((state) => state.userAuth);
  const {
    description,
    geohash,
    latitude,
    longitude,
    meanRating,
    name,
    images,
    isFavorited,
  } = useSelector((state) => state.restroomMarker);

  const fontsLoaded = useFontLoader();

  if (!fontsLoaded) {
    return <AnimationLoad />;
  }

  return (
    // @TODO: Remove outer view
    <View style={styles.screenContainer}>
      <GradientText
        text="hello"
        style={{
          fontWeight: '600',
          fontSize: 50,
          marginBottom: 10,
          textAlign: 'center',
          fontFamily: 'Inter',
        }}
      />
      <View style={styles.cardContainer}>
        <View>
          <Text>Subway</Text>
          <View>
            <Image source={StarFilled} />
            <Text>
              4.5 <Text>(2)</Text>
            </Text>
          </View>
        </View>
        <View>
          <Text>18111 Nordhoff St Maildrop 8271, Northridge, CA 91330</Text>
        </View>
        <View>
          <Text>Free</Text>
          <Text>Restaurant</Text>
        </View>
        <View>
          <Text>300 feet away</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // @TODO: Remove
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: 'violet',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapBottomCard;
