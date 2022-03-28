import React,{ useState, useEffect, useRef,useCallback } from 'react';
import { StyleSheet, View, Text, Image, FlatList, PanResponder, Animated } from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import {getUserFeed} from '../../actions/userActions'
import AnimationLoad from '../components/AnimationLoad'
import {ACTION_OFFSET} from '../../constants/Dimensions'
import FeedCard from '../components/Cards/FeedCard'

function FeedScreen({navigation,route}) { //Screen to display user posts.

  const {geohash} = route.params;

    const { userPosts, loading } = useSelector((state) => state.feed);

    const [posts, setPosts] = useState([])


    const dispatch = useDispatch();

    const swipe = useRef(new Animated.ValueXY()).current;

    const panResponder = PanResponder.create({
      
      onMoveShouldSetPanResponder:() => true,
      onPanResponderMove:(_, {dx,dy}) =>{
        swipe.setValue({x:dx, y:dy});
      },
      onPanResponderRelease:(_,{dx,dy}) =>{

        const direction = Math.sign(dx);
        const userAction = Math.abs(dx) > ACTION_OFFSET;

        if(userAction){
          Animated.timing(swipe,{
            duration: 200,
            toValue:{
              x: direction * 500,
              y: dy,
            },
            useNativeDriver:true
          }).start(removeCard);
        }else{
          Animated.spring(swipe,{
            toValue:{
              x: 0,
              y: 0,
            },
            useNativeDriver: true,
            friction: 5,
          }).start();
        }
      }
    })
    
   
    const removeCard = useCallback(()=>{ 
      setPosts((prevState) => prevState.slice(1));
      swipe.setValue({x:0, y:0});
      console.log(posts)
    },[swipe]);
   


    useEffect(() => {
        if(!loading){
            dispatch(getUserFeed(geohash));
        }
        setPosts(userPosts)
    }, []);
    

    return(
        <>
        {loading && posts.length == 0 ? (
            <AnimationLoad></AnimationLoad>
        ):(
            <View style={styles.container}>
              {posts.map(({caption,downloadURL,user},index)=>{
                const isFirst  = index === 0;
                const dragHandlers = isFirst ? panResponder.panHandlers:{}; 
                return(
                  <FeedCard 
                  key={downloadURL} 
                  source={downloadURL} 
                  caption={caption} 
                  userName={user} 
                  isFirst={isFirst}
                  swipe={swipe}
                  {...dragHandlers}
                  />
                ) 
              }).reverse()}
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