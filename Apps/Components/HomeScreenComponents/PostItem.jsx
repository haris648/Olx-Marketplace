import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function PostItem({ item }) {
  
  const navigation= useNavigation();
  
  return (
    <TouchableOpacity style={styles.itemContainer}
    onPress={()=>navigation.push('product-detail',
      {product:item}
    )}>
      <Image 
        source={{ uri: item.image }}
        style={styles.itemImage}
      />
      <View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 2,
    padding: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0', // Equivalent to border-slate-200
    borderRadius: 8,
  },
  itemImage: {
    width: '100%',
    height: 120, // Adjust as needed
    borderRadius: 8,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ef4444', // Equivalent to text-red-700
  },
  itemCategory: {
    marginTop: 2,
    fontSize: 10,
    backgroundColor: '#ef4444', // Equivalent to bg-red-700
    color: '#ffffff',
    textAlign: 'center',
    borderRadius: 9999, // Makes it fully rounded
    paddingVertical: 2,
    paddingHorizontal: 1,
    width: 70,
  },
});
