import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../Screens/ProfileScreen';
import MyProducts from '../Screens/MyProducts';
import ProductDetails from './../Screens/ProductDetails';


const Stack=createStackNavigator();
export default function ProfileScreenStackNav() {
  
    return (
    <Stack.Navigator>
        <Stack.Screen name="profile-tab" 
        options={{
            headerShown: false
        }}
        component={ProfileScreen} />
        <Stack.Screen name='my-product' component={MyProducts} 
        options={{
            headerStyle:{
              backgroundColor: "#c53030",
            },
            headerTintColor: "#fff",
            headerTitle:"My Products"
          }}/>
          <Stack.Screen name='product-detail' component={ProductDetails} 
        options={{
            headerStyle:{
              backgroundColor: "#c53030",
            },
            headerTintColor: "#fff",
            headerTitle:"Detail"
          }}/>
    </Stack.Navigator>
  )
}