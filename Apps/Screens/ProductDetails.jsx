import { View, Text, Image, TouchableOpacity, Linking, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Categories from './../Components/HomeScreenComponents/Categories';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';
import { collection, getFirestore, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { app } from './../../FirebaseConfig';

export default function ProductDetails({navigation}) {
  
  const {params}=useRoute();
  const [product, setProduct]=useState([]);
  const {user}=useUser();
  const db = getFirestore(app);
  const nav=useNavigation();
  
  useEffect(() => {
    params&&setProduct(params.product);
    shareButton();
  }, [params, navigation])
  
  const shareButton=()=>{
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => shareProduct()}>
        <Ionicons name="share-social-sharp" size={24} color="white" style={{marginRight: 15}} />
        </TouchableOpacity>
      ),
    });
  }

  const shareProduct=async()=>{
    const content={
      message:product?.title+"\n"+product?.desc,
    }
    
    Share.share(content).then(resp=>{
      console.log(resp);
    },(error)=>{
      console.log(error);
    })
  }

  const sendEmailMessage=()=>{
    const subject='Regarding'+product.title;
    const body='Hi '+product.userName+"\n"+"I am interested in this product";
    Linking.openURL('mailto:'+product.userEmail+"?subject="+subject+"&body="+body);
  }

  const deleteUserPost=()=>{
    Alert.alert('Do you want to Delete?',"Are you sure you want to Delete this Post?",[
      {
        text:'Yes',
        onPress:()=>deleteFromFirestore()
      },
      {
        text:'Cancel',
        onPress:()=>console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ])
  }
  const deleteFromFirestore=async()=> {
    console.log('Deleted');
    const q=query(collection(db,'UserPost'),where('title','==',product.title))
    const snapshot=await getDocs(q);
    snapshot.forEach(doc=>{
      deleteDoc(doc.ref).then(resp=>{
        console.log('Delete the Doc...');
        nav.goBack();
      })
    })
  }

  return (
    <ScrollView className="bg-white">
      <Image source={{uri:product.image}}
      className="h-[300] w-full" />

      <View className="p-3 mb-5">
        <Text className="text-[24px] font-bold">{product?.title}</Text>
        <View className="items-baseline">
        <Text className="text-white p-1 px-2 mt-2 rounded-full bg-red-700 ">{product?.category}</Text>
        </View>
        
        <Text className="mt-2 text-[18px] font-bold">Description:</Text>
        <Text className=" text-gray-500">{product?.desc}</Text>

        
      </View>
      <View className="pl-3 pb-3 flex flex-row items-center gap-3 bg-red-100">
        <Image source={{uri:product.userImage}} 
        className="w-12 h-12 rounded-full"/>

        <View>
          <Text className="font-bold text-[18px]">{product.userName}</Text>
          <Text className="text-gray-500">{product.userEmail}</Text>
        </View>
      </View>

      {user?.primaryEmailAddress.emailAddress==product.userEmail?
      <TouchableOpacity
      onPress={()=>deleteUserPost()}
      className="w-full bg-red-700 p-3">
        <Text className="text-white text-center">Delete Post</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity
      onPress={()=>sendEmailMessage()}
      className="w-full bg-red-700 p-3">
        <Text className="text-white text-center">Send Message</Text>
      </TouchableOpacity>
      }
   
    </ScrollView>
  )
}