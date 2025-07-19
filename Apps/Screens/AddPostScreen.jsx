import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import { app } from "../../FirebaseConfig";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import { useUser } from "@clerk/clerk-expo";

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] =useState(false);
  const {user}=useUser();
  // Create a root reference
  const storage = getStorage();
  //
  /**
   * Used to get Category list
   *
   */
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Category"));
      const categories = []; // Temp array to hold categories
      querySnapshot.forEach((doc) => {
        // Assuming each doc follows the structure { name: 'Category Name', value: 'categoryValue' }
        categories.push({ name: doc.data().name, value: doc.id }); // Adjust as needed based on your document structure
      });
      setCategoryList(categories); // Update state with fetched categories
    } catch (error) {
      console.error("Error fetching category list: ", error);
    }
  };

  
  /**
   * use to pick image from gallery
   */
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod= async(value)=>{
    /**
     * convert uri to blob file
     */
    setLoading(true)
    const resp=await fetch(image);
    const blob=await resp.blob();
    const storageRef = ref(storage, 'communityPost/'+Date.now()+".jpg");

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  }).then((resp)=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        value.image=downloadUrl;
        value.userName= user.fullName;
        value.userEmail= user.primaryEmailAddress.emailAddress;
        value.userImage= user.imageUrl;
        
        const docRef= await addDoc(collection(db,"UserPost"),value)
        if(docRef.id)
        {
          setLoading(false);
          Alert.alert('Success!!!', 'Post added successfully');
        }
      })
  });
  }

  return (
    <KeyboardAvoidingView>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text className="text-[25px] font-bold mt-2">Add New Post</Text>
      <Text className="text-[16px] text-slate-500 mb-5">
        Create new post and start selling.
      </Text>

      <Formik
        initialValues={{
          title: "",
          desc: "",
          category: "",
          address: "",
          price: "",
          userName: "",
          userEmail: "",
          userImage: "",
          createdAt: Date.now()
        }}
        onSubmit={(value) => onSubmitMethod(value)}
        validate={(values) =>{
          const errors={}
          if (!values.title) {
            console.log("Title is not present");
            ToastAndroid.show('Title must be there', ToastAndroid.SHORT)
            errors.name="Title must be there"
          }
          return errors
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <TouchableOpacity onPress={pickImage} style={{width:100, height:100}}>
              {image?
              <Image source={{uri:image}} style={{width:100, height:100, borderRadius:15, borderWidth:1, borderColor:'#000'}}/>
              :
              <Image source={(require('./../../assets/Images/placeholder.png'))} style={{width:100, height:100, borderRadius:15, borderWidth:1, borderColor:'#000'}}/>
              }
              
              
            </TouchableOpacity>
            
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={values?.title}
              onChangeText={handleChange("title")}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={values?.desc}
              numberOfLines={5}
              onChangeText={handleChange("desc")}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={values?.price}
              keyboardType="number-pad"
              onChangeText={handleChange("price")}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={values?.address}
              onChangeText={handleChange("address")}
            />
            <View style={{borderWidth:1, borderRadius:10, marginTop:10, marginBottom:10}}>
            <Picker
              selectedValue={values?.category}
              onValueChange={handleChange("category")}
            >
              {categoryList &&
                categoryList.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.name}
                    value={item.name}
                  />
                ))}
            </Picker>
            </View>
            
            <TouchableOpacity
              onPress={handleSubmit}
              style={{backgroundColor:loading? '#ccc' : '#c41919',}}
              disabled={loading}
              className="p-4 bg-red-700 rounded-full"
            >
              {loading?
              <ActivityIndicator color='#fff' />
              :  
              <Text className="text-white text-center">Submit</Text>

            }
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // Your container styles, if any
  },
  scrollContainer: {
    padding: 40, // Equivalent to p-10 in TailwindCSS
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 8, // Adjust as per your layout
    marginBottom: 20, // Adjust as per your layout
    textAlign: 'center', // For center align
  },
  subtitle: {
    fontSize: 16,
    color: '#718096', // Equivalent to text-slate-500
    marginBottom: 20, // Adjust as per your layout
    textAlign: 'center', // For center align
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 17,
    marginVertical: 5,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  submitButton: {
    padding: 16,
    backgroundColor: '#c41919', // Adjust the color as needed
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Adjust as per your layout
  },
});



