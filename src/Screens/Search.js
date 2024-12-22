import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Touchable,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_url, getApi } from '../Utils/common/API_config';




const Search = () => {
  const [input, setinput] = useState("")
  const [Data, setData] = useState([])
  
    useEffect(() => {
      Api_data()
    }, [])


  const Api_data = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log(token);

    try {
      const result = await getApi(API_url.Get_product, token)
      console.log(result.data);
      setData(result.data)

    } catch (error) {
      console.log(error)
      navigation.navigate('login')
    }


  }

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.headertext}>Search</Text>
      </View>
      <View>
        <TextInput
          style={styles.inputtext}
          placeholder='Search'
          placeholderTextColor={"gray"}
          value={input}
          onChangeText={(text) => setinput(text)}

        />
      </View>
      <View style={{marginBottom:"80%"}}>

        <FlatList
          keyExtractor={item=>item._id}
          data={Data}
          renderItem={({item}) => {

            if (input === "") {
              return (
                <View style={styles.productitem}>
                  <Image
                  style={{height:90,width:90, objectFit:'scale-down'}} 
                  source={item.image}/>
                  <Text style={{color:'black',textAlignVertical:'center', fontSize:15}}>{item.name}</Text>
                  <Text style={{color:'black',textAlignVertical:'center'}}>{item.price}</Text>
                  <TouchableOpacity
                  style={styles.addbutton}
                  >
                    <Text style={{color:'black',}}>Add</Text>
                  </TouchableOpacity>
                </View>
              )

            } 
            if(item.product_name.toLowerCase().includes(input.toLowerCase())) {
              return (
                <View style={styles.productitem}>
                  <Image
                  style={{height:90,width:90, objectFit:'scale-down'}} 
                  source={item.image}/>
                  <Text style={{color:'black',textAlignVertical:'center', fontSize:15}}>{item.name}</Text>
                  <Text style={{color:'black',textAlignVertical:'center'}}>{item.price}</Text>
                  <TouchableOpacity
                  style={styles.addbutton}
                  >
                    <Text style={{color:'black',}}>Add</Text>
                  </TouchableOpacity>
                </View>
              )
            }else{
              return null
            }


          }}

        />
      </View>

    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  headertext: {
    fontSize: 30,
    color: 'black',
    margin: 15
  },
  inputtext: {
    color: 'black',
    fontSize: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 30,
    marginHorizontal: 15,
    borderWidth: .5,
    borderColor: 'black'

  },
  productitem:{
    margin:20,
    
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'white',
    padding:10,
    borderRadius:30

  },
  addbutton:{
    justifyContent:'center',
    backgroundColor:'#D2E1D2',
    paddingHorizontal:30,
    borderRadius:25
  }
})

export default Search;