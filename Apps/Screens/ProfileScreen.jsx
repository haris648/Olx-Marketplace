import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import diary from './../../assets/Images/book.png';
import search from './../../assets/Images/search.png';
import logout from './../../assets/Images/power.png';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();
  const navigation=useNavigation();
  const { isLoaded, signOut } = useAuth();
  const menuList = [
    { id: 1, name: 'My Products', icon: diary, path:'my-product' },
    { id: 2, name: 'Search', icon: search, path:'explore' },
    { id: 3, name: 'Logout', icon: logout },
  ];

  const onMenuPress=(item)=>{
    if(item.name=='Logout')
    {
      signOut();
      return;
    }
    item?.path?navigation.navigate(item.path):null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="p-5">
        <View className="items-center mt-14">
          <Image
            source={{ uri: user?.imageUrl }}
            className="w-[100px] h-[100px] rounded-full"
          />
          <Text className="font-bold text-[25px] mt-2">{user?.fullName}</Text>
          <Text className="text-gray-500 text-[18px]">
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        <FlatList
          data={menuList}
          numColumns={3}
          key={`columns-${3}`}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={()=>onMenuPress(item)}
            style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
              {item.icon && (
                <Image source={item.icon} style={{ width: 30, height: 30 }} />
              )}
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
}
