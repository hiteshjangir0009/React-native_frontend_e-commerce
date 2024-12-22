import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, Image, SafeAreaView, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_url, getApi, postApi } from '../Utils/common/API_config';
import { useFocusEffect } from '@react-navigation/native';  // Import useFocusEffect

const Cart = ({ navigation }) => {
    const [Data, setData] = useState([]);
    const [name, setName] = useState('');

    // Fetch cart data when the screen is focused
    useFocusEffect(
        useCallback(() => {
            Api_data();
        }, [])
    );

    // Fetch cart data from API
    const Api_data = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log(token);

        try {
            const result = await getApi(API_url.Get_cart, token);
            console.log(result.data);
            setData(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Remove product from cart
    const remove_data = async (item) => {
        console.log("item ==>>", item.product_name);

        const token = await AsyncStorage.getItem('token');
        console.log(token);

        const formdata = new FormData();
        formdata.append("product_name", item.product_name);

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        fetch("http://13.202.202.231:8000/api/v1/product/removeCart", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                Api_data();  // Refresh cart data after removal
            })
            .catch((error) => console.error(error));
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text style={styles.headertext}>Cart</Text>
                </View>

                {/* Product display */}
                <View style={{ marginBottom: 120 }}>
                    <FlatList
                        scrollEnabled={false}
                        data={Data}
                        renderItem={({ item, index }) => (
                            <View style={styles.productbox}>
                                <Image
                                    style={{
                                        height: 105,
                                        width: 105,
                                        objectFit: 'scale-down',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                    }}
                                    source={{ uri: item.product_img }}
                                />
                                <Text style={styles.textstyle}>{item.product_name}</Text>
                                <Text style={styles.textstyle}>Rs {item.price}</Text>

                                <View>
                                    <TouchableOpacity style={styles.addbutton}>
                                        <Text style={{ color: 'black', textAlign: 'center' }}>
                                            {item.quantity}kg
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setName(item.product_name);
                                            remove_data(item);
                                        }}
                                        style={styles.removebutton}>
                                        <Text style={{ color: 'white' }}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />

                    <View style={styles.billbox}>
                        <Text style={styles.billheader}>Bill</Text>
                        <Text style={styles.bill}>
                            Total amount = Rs {Data.reduce((accumulator, currentValue) => {
                                const price = parseFloat(currentValue.price) || 0; // Ensure price is a valid number
                                const quantity = parseFloat(currentValue.quantity) || 0; // Ensure quantity is a valid number
                                return accumulator + price * quantity;
                            }, 0)}
                        </Text>
                        <Text style={styles.bill}>Delivery</Text>
                        <Text style={styles.bill}>
                            Subtotal = Rs {Data.reduce((accumulator, currentValue) => {
                                const price = parseFloat(currentValue.price) || 0; // Ensure price is a valid number
                                const quantity = parseFloat(currentValue.quantity) || 0; // Ensure quantity is a valid number
                                return accumulator + price * quantity;
                            }, 0)}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                        <Button title="Checkout" onPress={() => navigation.navigate("checkout")} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headertext: {
        color: 'black',
        fontSize: 40,
        fontWeight: '700',
        margin: 20,
    },
    productbox: {
        margin: 10,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
        elevation: 7,
    },
    textstyle: {
        color: 'black',
        textAlignVertical: 'center',
    },
    addbutton: {
        backgroundColor: '#D2E1D2',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    removebutton: {
        backgroundColor: '#587765',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    billbox: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
    },
    billheader: {
        color: 'black',
        fontSize: 30,
        paddingVertical: 20,
    },
    bill: {
        color: 'black',
        fontSize: 15,
        margin: 5,
        marginHorizontal: 30,
    },
});

export default Cart;
