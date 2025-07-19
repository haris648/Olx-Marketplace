import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react'
import PostItem from './PostItem'

export default function LatestItemList({ latestItemList }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Items</Text>

      <FlatList 
        data={latestItemList}
        numColumns={2}
        renderItem={({ item }) => (
          <PostItem item={item} />
        )}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()} // Ensure each item has a unique key
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12, // Adjust the top margin as needed
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8, // Adjust the bottom margin as needed
  },
  // Add more styles as needed
});