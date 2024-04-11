import { View, Text } from 'react-native'
import { React, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { Firestore, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../FirebaseConfig';
import LatestItemList from '../Components/HomeScreenComponents/LatestItemList';


export default function ItemList() {


    const {params}=useRoute();
    const db=getFirestore(app);
    const [itemList, setItemList]=useState([]);
    useEffect(() => {
     
        params&&getItemListByCategory();
    }, [params])

    const getItemListByCategory=async()=> {
        setItemList([]);
        const q= query(collection(db, 'UserPost'),where('category','==',params.category));
        const snapshot=await getDocs(q);
        snapshot.forEach(doc=>{
            console.log(doc.data());
            setItemList(itemList=>[...itemList,doc.data()]);
        })
    }
    
  return (
    <View className="p-4">
      {itemList?.length>0?<LatestItemList latestItemList={itemList} heading={""} />
      :<Text className="mt-24 justify-center text-center text-[18px]">No Post Found</Text>}
    </View>
  )
}