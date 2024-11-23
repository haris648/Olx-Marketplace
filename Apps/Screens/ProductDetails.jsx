import { View, Text, Image, TouchableOpacity, Linking, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Categories from './../Components/HomeScreenComponents/Categories';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProductDetails({navigation}) {
  
  const {params}=useRoute();
  const [product, setProduct]=useState([]);
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

      <TouchableOpacity
      onPress={()=>sendEmailMessage()}
      className="w-full bg-red-700 p-3">
        <Text className="text-white text-center">Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}