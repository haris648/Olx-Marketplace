import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductDetails from './../Screens/ProductDetails';
import ExploreScreen from '../Screens/ExploreScreen';

const Stack=createStackNavigator();
export default function ExploreScreenStackNav() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
        <Stack.Screen name="product-detail" component={ProductDetails} />
    </Stack.Navigator>
  )
}