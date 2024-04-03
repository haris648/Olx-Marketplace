import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function Categories({ categoryList }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categoriesss</Text>
      
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem}>
            <Image
              source={{ uri: item.icon }}
              style={styles.icon}
            />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()} // It's a good practice to include a keyExtractor for lists
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12, // Adjust the margin as needed
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 12, // Adjust the margin as needed
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4, // Adjust the margin as needed
    height: 80, // Adjust the height as needed
    borderRadius: 8, // Rounded corners
    borderWidth: 1, // Border width
    borderColor: '#fca5a5', // Adjust the border color as needed
    backgroundColor: '#fee2e2', // Adjust the background color as needed
  },
  icon: {
    width: 35, // Adjust the width as needed
    height: 35, // Adjust the height as needed
  },
  categoryName: {
    fontSize: 12, // Adjust the font size as needed
    marginTop: 4, // Adjust the margin as needed
  },
});

