
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";



const Splash_screen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            checkLogin();
        }, 2500)
    }, [])


    const checkLogin = async () => {

        const token = await AsyncStorage.getItem('token')

        if (token) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'home' }],
                }),
            );
        }else{
            navigation.navigate('select')
        }
        

    }



    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >

            <Text
                style={{
                    color: 'black',
                    fontSize: 30
                }}
            >
                Farm connect
            </Text>
        </View>
    )
}
export default Splash_screen