import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native'
import colors from '../../theme/colors';
import Icon from '@expo/vector-icons/FontAwesome'
import { HEIGHT, WIDTH } from '../../../constants/Dimensions';
import { shadow } from 'react-native-paper';
import { shadowColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function OptionCard({icon, bg, onPress, title}){
    const [isEnabled, setisEnabled] = useState(false);
    const toggleSwitch = () => setisEnabled(previousState=>!previousState)

    return(
        <View style={{...styles.container, backgroundColor: colors.white, }}>
            <View styles={styles.icon}>
                <Icon
                    name={icon}
                    size={60}
                    color={bg}
                />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Switch
                trackColor={{false:colors.backgroundDark, true: colors.green}}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2}] }}
            >
                
            </Switch>
        </View>
    )
}
    

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: HEIGHT * 0.16,
        width: WIDTH * 0.45,
        borderRadius:30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        marginTop:10,
        color: colors.black,
        fontWeight:"bold",
        fontSize: 15,
    },
})