import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';


export default function Header() {
    const { user } = useUser();
    return (
      <View>
        {/* Header info section */}
        <View style={styles.headerInfo}>
          <Image 
            source={{ uri: user?.imageUrl }} 
            style={styles.userImage} 
          />
          <View>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.userName}>{user?.fullName}</Text>
          </View>
        </View>
  
        {/* Searchbar section */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={24} color="black" />
          <TextInput 
            placeholder='Search' 
            style={styles.searchInput}
            onChangeText={(value) => console.log(value)}
          />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    headerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8, // Note: React Native StyleSheet does not support "gap". You might need to adjust padding or margin individually.
    },
    userImage: {
      width: 48, // corresponds to w-12 in Tailwind
      height: 48, // corresponds to h-12 in Tailwind
      borderRadius: 24, // to create a circle shape
    },
    welcomeText: {
      fontSize: 16,
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    searchBar: {
      padding: 9,
      paddingHorizontal: 20, // adjusted for React Native
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      backgroundColor: '#fee2e2', // bg-red-50
      borderColor: '#fca5a5', // border-red-300
      borderRadius: 999, // sufficiently large value to create a fully rounded border
      marginTop: 20,
    },
    searchInput: {
      marginLeft: 8, // adjusted for React Native, corresponds to ml-2 in Tailwind
      flex: 1, // ensures TextInput fills the available space
    },
  });