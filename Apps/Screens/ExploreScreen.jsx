import { ScrollView, Text } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getFirestore, collection, getDocs, orderBy } from "firebase/firestore"
import { app } from './../../FirebaseConfig';
import LatestItemList from '../Components/HomeScreenComponents/LatestItemList';

export default function ExploreScreen() {

  const db=getFirestore(app)
  const [productList, setproductList]=useState([]);
  useEffect(() => {
    getAllProducts();
  }, [])
  
  

  const getAllProducts = async () => {
    setproductList([]);
    const querySnapshot = await getDocs(collection(db, "UserPost"), orderBy('createdAt', 'desc'));
    querySnapshot.forEach((doc) => {
      setproductList(productList => [...productList, doc.data()]);
    });
  };
  return (
    <ScrollView className="px-5 pt-0 pb-9">
      {/* <Text className="font-bold text-[24px]">Explore More</Text> */}
      <LatestItemList latestItemList={productList}/>
    </ScrollView>
  )
}