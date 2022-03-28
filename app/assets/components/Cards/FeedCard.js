import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import {CARD} from '../../../constants/Dimensions'
function FeedCard({ userName, caption, source, isFirst, ...rest }) {
    return (
        <Animated.View style={styles.container} {...rest}>
            <Image source={source} style={styles.image} />

            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.caption}>{caption}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 45,
    },

    image: {
        width: CARD.WIDTH,
        height: CARD.HEIGHT,
        borderRadius: CARD.BORDER_RADIUS,
    },

    gradient: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 160,
        borderRadius: CARD.BORDER_RADIUS,
    },

    userName: {
        position: 'absolute',
        top: 22,
        left: 22,
        fontSize: 36,
    },

    caption: {
        position: 'absolute',
        bottom: 22,
        textAlign: 'center',
        fontSize: 15
    },
})

export default FeedCard;
