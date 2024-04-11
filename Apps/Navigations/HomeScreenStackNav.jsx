import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeSceen';
import ItemList from '../Screens/ItemList';


const Stack = createStackNavigator();
export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='home' component={HomeScreen} 
      options={{headerShown: false}}
      />
      <Stack.Screen name='item-list' component={ItemList} 
      options={({ route }) => ({ title: route.params.category, 
      headerStyle:{
        backgroundColor: "#c53030",
      },
      headerTintColor: "#fff" })}
      
      />
    </Stack.Navigator>
  )
}


