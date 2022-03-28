import React,{ useEffect, useRef,useCallback } from 'react';
import { StyleSheet, View, Text, Image, FlatList, PanResponder, Animated } from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import {getUserFeed} from '../../actions/userActions'
import AnimationLoad from '../components/AnimationLoad'
import FeedCard from '../components/Cards/FeedCard';

function FeedScreen({navigation,route}) { //Screen to display user posts.
    const { userPosts, loading } = useSelector((state) => state.feed);
    const dispatch = useDispatch();

    const {geohash} = route.params;

    const swipe = useRef(new Animated.ValueXY()).current;
    const tiltSign = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if(!loading){
            dispatch(getUserFeed(geohash));
        }
    }, []);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy, y0 }) => {
          swipe.setValue({ x: dx, y: dy });
          tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
        },
        onPanResponderRelease: (_, { dx, dy }) => {
          const direction = Math.sign(dx);
          const isActionActive = Math.abs(dx) > ACTION_OFFSET;
    
          if (isActionActive) {
            Animated.timing(swipe, {
              duration: 200,
              toValue: {
                x: direction * CARD.OUT_OF_SCREEN,
                y: dy,
              },
              useNativeDriver: true,
            }).start(removeTopCard);
          } else {
            Animated.spring(swipe, {
              toValue: {
                x: 0,
                y: 0,
              },
              useNativeDriver: true,
              friction: 5,
            }).start();
          }
        },
      });
    
      const removeTopCard = useCallback(() => {
        setPets((prevState) => prevState.slice(1));
        swipe.setValue({ x: 0, y: 0 });
      }, [swipe]);
    

    return(
        <>
        {loading ? (
            <AnimationLoad></AnimationLoad>
        ):(
            <View style={styles.container}>
                {userPosts
                    .map(({user, downloadURL, caption},index)=>{
                        const isFirst = index === 0;
                        const dragHandlers = isFirst ? panResponder.panHandlers : {};
                        return(
                            <FeedCard
                                key={user}
                                caption={caption}
                                downloadURL={downloadURL}
                                isFirst={isFirst}
                                swipe={swipe}
                                tiltSign={tiltSign}
                                {...dragHandlers}
                            >
                            </FeedCard>
                        )
                    })
                }
            </View>
        )}
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        alignItems:'center'
    }
})

export default FeedScreen