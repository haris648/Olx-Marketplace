import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Components/HomeScreenComponents/Header';
import Slider from '../Components/HomeScreenComponents/Slider';
import { getFirestore, collection, getDocs, orderBy } from "firebase/firestore";
import { app } from "../../FirebaseConfig";
import Categories from '../Components/HomeScreenComponents/Categories';
import LatestItemList from '../Components/HomeScreenComponents/LatestItemList';

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);

  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();
  }, []);

  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Slider"));
    querySnapshot.forEach((doc) => {
      setSliderList(sliderList => [...sliderList, doc.data()]);
    });
  };

  const getCategoryList = async () => {
    try {
      setCategoryList([]);
      const querySnapshot = await getDocs(collection(db, "Category"));
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({ name: doc.data().name, value: doc.id, icon: doc.data().icon });
      });
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching category list: ", error);
    }
  };

  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapshot = await getDocs(collection(db, "UserPost"), orderBy('createdAt', 'desc'));
    querySnapshot.forEach((doc) => {
      setLatestItemList(latestItemList => [...latestItemList, doc.data()]);
    });
  };

  return (
    <FlatList
      data={latestItemList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => null} // Empty since LatestItemList handles its own rendering
      ListHeaderComponent={() => (
        <View style={styles.container}>
          <Header />
          <Slider sliderList={sliderList} />
          <Categories categoryList={categoryList} />
          <LatestItemList latestItemList={latestItemList} heading={'Latest Items'} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 38, // Corresponds to py-8
    paddingHorizontal: 24, // Corresponds to px-6
    backgroundColor: '#ffffff', // bg-white
    flex: 1,
  },
});
