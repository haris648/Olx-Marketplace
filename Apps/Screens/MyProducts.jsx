import { Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore'; // ✅ Added getDocs
import { useUser } from '@clerk/clerk-expo';
import { app } from './../../FirebaseConfig';
import LatestItemList from '../Components/HomeScreenComponents/LatestItemList';
import { useNavigation } from '@react-navigation/native';

export default function MyProducts() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [productList, setProductList] = useState([]);
  const navigation=useNavigation();

  useEffect(() => {
    if (user) getUserPost();
  }, [user]);

  useEffect(() => {
    navigation.addListener('focus',(e)=>{
        getUserPost();
    })
  }, [navigation]);
  /**
   * Fetches user posts from Firestore
   */
  const getUserPost = async () => {
    try {
      const q = query(
        collection(db, 'UserPost'),
        where('userEmail', '==', user?.primaryEmailAddress?.emailAddress)
      );
      
      const snapshot = await getDocs(q);
      const fetchedProducts = [];

      snapshot.forEach(doc => {
        fetchedProducts.push(doc.data());
      });

      setProductList(fetchedProducts); // ✅ Correct way to update state
    } catch (error) {
      console.error("Error fetching user posts: ", error);
    }
  };

  return (
    <ScrollView className="bg-white px-3">
      {productList.length === 0 ? (
        <Text>No products found.</Text>
      ) : (
        <LatestItemList latestItemList={productList} />
      )}
    </ScrollView>
  );
}
