import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../Utils/common/Colors'
import { Images } from '../Utils/common/Images'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_url, getApi, postApi } from '../Utils/common/API_config'

const Home = ({ navigation }) => {
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
    <SafeAreaView style={styles.safeareaview}>

      <ScrollView>

        {/* header */}
        <View style={styles.header_container}>
          <Text style={styles.header_text}>
            Farm connect
          </Text>
        </View>

        {/* display */}
        <View style={styles.display_container}>
          <Image
            style={styles.display_image}
            source={Images.Display} />
        </View>

        {/* container */}
        <View>
          <Text style={styles.Product_header}>
            Products
          </Text>

          <View style={styles.container}>
            <FlatList
              scrollEnabled={false}
              data={Data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('display',{product_id:item._id})}
                  style={styles.product_button}
                >
                  <Image
                    style={styles.product_img}
                    source={{ uri: item.product_img }}
                    onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                  />
                  <View style={{ margin: 10 }}>

                    <Text
                      style={{
                        color: Colors.Text_base_color,
                        fontWeight: '500',
                        fontSize: 20
                      }}>
                      Rs {item.price}/kg
                    </Text>
                    <Text
                      style={{
                        color: Colors.Text_base_color,
                        fontWeight: '500',
                        fontSize: 20
                      }}>
                      {item.product_name}
                    </Text>
                    <Text
                      style={{
                        color: Colors.Text_base_color,
                        // fontWeight: '500',
                        fontSize: 15
                      }}>
                      {item.description}
                    </Text>
                  </View>

                </TouchableOpacity>
              )}
              ListFooterComponent={<View style={{ height: 100 }} />}
            />

          </View>
        </View>
      </ScrollView>


    </SafeAreaView>

  )
}

export default Home

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  header_text: {

    color: Colors.Text_base_color,
    fontSize: 30,
    fontWeight: '700'
  },
  header_container: {
    marginHorizontal: 10,
    marginVertical: 10
  },


  display_container: {
    marginVertical: 20,
    marginHorizontal: 10,

  },
  display_image: {
    borderRadius: 30,
    height: Dimensions.get('window').height / 5,
    objectFit: 'fill',
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.border_color
  },

  container: {
    borderRadius: 10
  },
  Product_header: {
    marginHorizontal: 10,
    color: Colors.Text_base_color,
    fontSize: 25,
    fontWeight: '500'
  },
  product_img: {
    height: Dimensions.get('window').height / 5,
    width: '100%',
    borderRadius: 10
  },
  product_button: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: Colors.Primary_color,
    elevation: 5,
    borderRadius: 10
  }
})