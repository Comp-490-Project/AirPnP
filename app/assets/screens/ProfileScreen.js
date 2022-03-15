import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { firebase } from '../../firebase';

function ProfileScreen() {
  const { user } = useSelector((state) => state.userAuth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addedRestrooms, setAddedRestrooms] = useState([]);
  const [visitedRestrooms, setVisitedRestrooms] = useState([]);

  // Get user email and name
  const getUserProfile = async () => {
    const docRef = firebase.firestore().collection('users').doc(user.uid);
    const query = await docRef.get();
    const userData = query.data();

    const email = userData.email;
    setEmail(email);

    const fullName = `${userData.firstName} ${userData.lastName}`;
    setName(fullName);
  };

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

  // Get restrooms that user has visited
  const getUserVisitedRestrooms = async () => {
    const docRef = firebase.firestore().collection('users').doc(user.uid);
    const query = await docRef.get();
    const { visited } = query.data();

    const collectionRef = firebase.firestore().collection('Los-Angeles');

    // Clear array
    setVisitedRestrooms([]);

    visited.forEach(async (restroom) => {
      const docRef = await collectionRef.doc(restroom).get();
      const restroomData = docRef.data();

      setVisitedRestrooms((visitedRestrooms) => [
        ...visitedRestrooms,
        restroomData,
      ]);
    });
  };

  // @todo
  // Reviews must be object of objects
  // const [reviews, setReviews] = useState([]);
  // const getUserReviews = async () => {
  //   const restroomsRef = firebase.firestore().collection('Los-Angeles');
  //   const reviewsQuery = restroomsRef.where('reviews', 'array-contains', {
  //     Comment: '',
  //     Rating: 2,
  //     userID: 'sq4kvQ2OLbWFtvgHg5hEMCu2cxG2',
  //   });

  //   // Execute query
  //   const snapshot = await reviewsQuery.get();
  //   snapshot.forEach((snap) => console.log(snap.data()));
  // };

  useEffect(() => {
    if (user) {
      getUserProfile();
      getUserAddedRestrooms();
      getUserVisitedRestrooms();
    }
  }, []);

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Log In You Wanker</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontWeight: 'bold' }}>Name:</Text>
      <Text>{name}</Text>
      <Text style={{ fontWeight: 'bold' }}>Email:</Text>
      <Text>{email}</Text>
      <Text style={{ fontWeight: 'bold' }}>Restrooms You've Added: </Text>
      {addedRestrooms.map((restroom, index) => (
        <Text key={index}>{restroom.name}</Text>
      ))}
      <Text style={{ fontWeight: 'bold' }}>Restrooms You've Visited:</Text>
      {visitedRestrooms.map((restroom, index) => (
        <Text key={index}>{restroom.name}</Text>
      ))}
    </View>
  );
}

export default ProfileScreen;
