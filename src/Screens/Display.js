import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Touchable, Alert, Image, ScrollView, StatusBar, FlatList, Button, Dimensions } from 'react-native';
import { RouteProp, useRoute } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import Modal from "react-native-modal";
import { Images } from '../Utils/common/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_url, getApi, postApi } from '../Utils/common/API_config';
import { Colors } from '../Utils/common/Colors';




const { height, width } = Dimensions.get("window")

const Display = ({ navigation }) => {
    const qt = [500, 1, 1.5, 2, 2.5, 3, 3.5, 4]
    const [modal, setmodel] = useState(false)
    const [Data, setData] = useState([])
    const [selectedData, setselectedData] = useState([])
    const [Quantity, setQuantity] = useState(1)

    const route = useRoute()

    const { product_id } = route.params

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
            const selecteddata = result.data.find((item) => (item._id == product_id))

            setselectedData(selecteddata)

        } catch (error) {
            console.log(error)
        }
    }
    // const selected = Data.find((item) => (item._id == product_id))



    const add_to_cart = async (item) => {
        const token = await AsyncStorage.getItem('token')
        console.log(selectedData);

        const formdata = new FormData();
        formdata.append("product_name", selectedData.product_name);
        formdata.append("price", selectedData.price);
        formdata.append("quantity", Quantity);

        try {
            const result = await postApi(API_url.Add_to_cart, formdata, token)
            console.log(result.data);
            setmodel(false)

        } catch (error) {
            console.log(error)
        }
    }


    // console.log(selected);


    return (

        <><ScrollView>
            <View style={{ alignItems: 'center' }}>
                <Image
                    style={styles.productImage}
                    source={{ uri: selectedData?.product_img }}
                />
            </View>
            <View style={styles.pricebox}>
                <Text style={{ color: 'black', fontSize: 30 }}>{selectedData?.product_name} </Text>
                <Text style={styles.productprice}>{selectedData?.price}/kg</Text>
            </View>
            <TouchableOpacity
                onPress={() => { setmodel(true) }}

            >
                <Text style={styles.button}>Add to Basket</Text>
            </TouchableOpacity>
            <View style={styles.detailbox}>
                <Text style={{ color: 'black', fontSize: 25, marginBottom: 10 }}>Health Benefits :-</Text>
                <Text style={{ color: 'black', fontSize: 15 }}>{selectedData?.description}</Text>
            </View>
            {/* <Button title='press' onPress={() => setmodel(true)} /> */}

        </ScrollView>
            <View>
                <Modal
                    isVisible={modal}
                    onBackButtonPress={() => setmodel(false)}
                    onSwipeComplete={() => setmodel(false)}
                    swipeDirection="down"
                    style={{ width: width, marginHorizontal: 0, marginBottom: 0 }}

                >
                    <View style={{

                        position: 'absolute',
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        bottom: 0,
                        height: height / 3,
                        width: width,
                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={{ height: 30, width: 60 }}
                                source={require('../Assets/icons/line.png')} />
                        </View>
                        <View>

                        </View>
                        <FlatList
                            data={qt}
                            renderItem={({ item }) => {
                                return (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setQuantity(item)
                                                add_to_cart(item)
                                            }}

                                            style={{
                                                backgroundColor: Colors.tab_background_color,
                                                margin: 10,
                                                marginHorizontal: 30,
                                                marginTop: 5,
                                                borderRadius: 20,
                                                elevation: 5
                                            }}
                                        >
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-evenly',
                                                margin: 10
                                            }}>
                                                <Text style={styles.sheettext}>{item}kg</Text>

                                            </View>

                                        </TouchableOpacity></>

                                )
                            }}
                        />

                    </View>
                </Modal>
            </View>
        </>


    )
}
const styles = StyleSheet.create({
    productImage: {
        flex: 1,
        height: 330,
        width: 360,
        objectFit: 'scale-down',
        marginVertical: 20,
        borderRadius: 50,

    },
    productprice: {
        color: 'white',
        backgroundColor: '#587765',
        fontSize: 30,
        padding: 20,
        borderRadius: 50

    },
    pricebox: {
        flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20
    },
    button: {
        color: 'black',
        fontSize: 25,
        borderRadius: 30,
        backgroundColor: '#fee175',
        marginHorizontal: 30,
        textAlign: 'center',
        padding: 7

    },
    detailbox: {
        marginHorizontal: 30,
        marginTop: 50

    },
    sheettext: {
        color: 'black',
        padding: 10,
        fontSize: 25
        // backgroundColor: 'red'


    }

})
export default Display;