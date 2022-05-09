import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import colors from '../../theme/colors';
import Icon from '@expo/vector-icons/FontAwesome';
import { HEIGHT, WIDTH } from '../../../constants/Dimensions';

export default function OptionCard({ icon, bg, title }) {
  const [isEnabled, setisEnabled] = useState(false);
  const toggleSwitch = () => setisEnabled((previousState) => !previousState);

  return (
    <View
      style={{
        ...styles.container,
        flexDirection: 'row',
        backgroundColor: '#1c1f28',
      }}
    >
      <View style={styles.icon}>
        <Icon name={icon} size={30} color={bg} style={{}} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Switch
        trackColor={{ false: colors.backgroundDark, true: colors.green }}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{
          transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
          paddingLeft: '10%',
        }}
      ></Switch>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT * 0.12,
    width: WIDTH * 0.45,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  icon: {
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
