import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faHeart,
  faPlus,
  faCheckCircle,
  faArrowRightFromBracket,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import SafeView from '../components/SafeView';
import colors from '../theme/colors';
import { HEIGHT, WIDTH } from '../../constants/Dimensions';
import { firebase } from '../../firebase';
import { logout } from '../../actions/userActions';
import LightText from '../components/LightText';

function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userAuth);
  const { userVisited } = useSelector((state) => state.userVisited);

  const [addedRestrooms, setAddedRestrooms] = useState([]);

  // Get user added restrooms (development: testing, production: Los-Angeles)
  const getUserAddedRestrooms = async () => {
    const addedRestroomsRef = firebase.firestore().collection('testing');
    const addedRestroomsQuery = addedRestroomsRef.where('user', '==', user.uid);
    const addedRestroomsSnapshot = await addedRestroomsQuery.get();

    // Clear array
    setAddedRestrooms([]);

    addedRestroomsSnapshot.forEach((snap) =>
      setAddedRestrooms((addedRestrooms) => [...addedRestrooms, snap.data()])
    );
  };

  useEffect(() => {
    if (user) {
      getUserAddedRestrooms();
    }
  }, [user]);

  if (!user) {
    return (
      <SafeView>
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={styles.btnLogin}>
              <LightText fontSize={24}>Login</LightText>
            </View>
          </TouchableOpacity>
        </View>
      </SafeView>
    );
  }

  return (
    <SafeView>
      <View style={styles.contentContainer}>
        <View style={styles.userContainer}>
          <View style={styles.avatar}>
            <FontAwesomeIcon
              icon={faUser}
              size={50}
              color="grey"
              style={styles.faUser}
            />
          </View>
          <LightText fontSize={18}>@{user.displayName}</LightText>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <LightText fontWeight="bold" fontSize={18}>
              {userVisited.length}
            </LightText>
            <LightText textAlign="center" lineHeight={20}>
              Restrooms{'\n'}Visited
            </LightText>
          </View>
          <View style={styles.stat}>
            <LightText fontWeight="bold" fontSize={18}>
              {addedRestrooms.length}
            </LightText>
            <LightText textAlign="center" lineHeight={20}>
              Restrooms{'\n'}Added
            </LightText>
          </View>
          <View style={styles.stat}>
            <LightText fontWeight="bold" fontSize={18}>
              193
            </LightText>
            <LightText textAlign="center" lineHeight={20}>
              Reviews{'\n'}Submitted
            </LightText>
          </View>
        </View>

        <View style={styles.horizontalRule} />

        <View style={styles.listContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Favorites', { key: 'favorites' })
            }
          >
            <View style={styles.optionContainer}>
              <View style={styles.option}>
                <View style={styles.iconBackground}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    size={30}
                    color={colors.primary}
                    style={styles.faUser}
                  />
                </View>
                <LightText color={colors.primary}>Favorites</LightText>
              </View>
              <FontAwesomeIcon
                icon={faAngleRight}
                size={30}
                color={colors.primary}
                style={styles.faUser}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Favorites', { key: 'added' })}
          >
            <View style={styles.optionContainer}>
              <View style={styles.option}>
                <View style={styles.iconBackground}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    size={30}
                    color={colors.primary}
                    style={styles.faUser}
                  />
                </View>
                <LightText color={colors.primary}>Added Restrooms</LightText>
              </View>
              <FontAwesomeIcon
                icon={faAngleRight}
                size={30}
                color={colors.primary}
                style={styles.faUser}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Favorites', { key: 'visited' })}
          >
            <View style={styles.optionContainer}>
              <View style={styles.option}>
                <View style={styles.iconBackground}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    size={30}
                    color={colors.primary}
                    style={styles.faUser}
                  />
                </View>
                <LightText color={colors.primary}>Visited Restrooms</LightText>
              </View>
              <FontAwesomeIcon
                icon={faAngleRight}
                size={30}
                color={colors.primary}
                style={styles.faUser}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              firebase.auth().signOut();
              dispatch(logout());
              navigation.navigate('Home');
            }}
          >
            <View style={styles.optionContainer}>
              <View style={styles.option}>
                <View style={styles.iconBackground}>
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    size={30}
                    color={colors.primary}
                    style={styles.faUser}
                  />
                </View>
                <LightText color={colors.primary}>Logout</LightText>
              </View>
              <FontAwesomeIcon
                icon={faAngleRight}
                size={30}
                color={colors.primary}
                style={styles.faUser}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    height: HEIGHT - 50,
    maxWidth: WIDTH,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLogin: {
    backgroundColor: '#303645',
    paddingVertical: 15,
    paddingHorizontal: 75,
    borderRadius: 5,
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#CDCDCD',
    borderRadius: 50,
    padding: 15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    width: WIDTH,
    paddingHorizontal: 20,
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  stat: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalRule: {
    height: 6,
    width: '100%',
    borderBottomColor: colors.textDark,
    borderBottomWidth: 1,
  },
  listContainer: {
    width: WIDTH,
    padding: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground: {
    backgroundColor: '#292D3A',
    borderRadius: 5,
    padding: 10,
    marginRight: 15,
  },
});

export default ProfileScreen;
