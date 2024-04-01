import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Slider({ sliderList }) {
  return (
    <View style={styles.sliderContainer}>
      <FlatList
        data={sliderList}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: item?.image }}
              style={styles.sliderImage}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false} // Optional: to hide the horizontal scroll indicator
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    marginTop: 20, // Adjust the top margin as needed
  },
  imageContainer: {
    marginRight: 3, // Space between images
  },
  sliderImage: {
    height: 150, // Fixed height for images
    width: 280, // Fixed width for images
    borderRadius: 8, // Rounded corners for images
  },
});
