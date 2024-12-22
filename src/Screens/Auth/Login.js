import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Touchable, Alert, Image, ScrollView } from 'react-native';
import CheckBox from 'react-native-check-box';
import { API_url, postApi } from '../../Utils/common/API_config';
import AsyncStorage from '@react-native-async-storage/async-storage';





const Login = ({ navigation }) => {
    const [ischeck, setcheck] = useState(false)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const submit = () => {

        if (email == '' || password == '') {
            Alert.alert('empty field', "all fields are required")

        }
        else {
            console.log('bye');

            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("password", password);

            postApi(API_url.Login, formdata)
                .then((result) => {

                    if (result.success) {
                        console.log('Data ==>>', result.success);
                        const access_token = result.data.Access_token
                        AsyncStorage.setItem('token', access_token)
                        navigation.navigate('splash')
                    }


                })
                .catch((err) => console.log(err))
        }

    }

    return (
        <ScrollView automaticallyAdjustKeyboardInsets={true}

        >
            <><View style={{ alignItems: 'center', marginTop: 40 }}>
                <Text style={{
                    color: '#000',
                    fontSize: 30
                }}>
                    Farm connect
                </Text>


            </View>
                <View>
                    <Text style={styles.headertext1}>
                        Login
                    </Text>

                    <View>
                        <Text style={styles.text1}>Enter your Email</Text>
                        <TextInput
                            style={styles.inputtext}
                            placeholderTextColor={'gray'}
                            placeholder='hitesh jangir'
                            autoCorrect={false}
                            value={email}
                            onChangeText={(actualdata) => setemail(actualdata)}
                        />
                        <Text style={styles.text1}>Enter Password</Text>
                        <TextInput
                            placeholderTextColor={'gray'}
                            style={styles.inputtext}
                          
                            placeholder='password'
                            autoCapitalize="none"
                            secureTextEntry={true}
                            autoCorrect={false}
                            value={password}
                            onChangeText={(val) => setpassword(val)}
                        />

                    </View>

                    <View style={{ paddingHorizontal: 50 }}>
                        <CheckBox
                            disabled={false}
                            isChecked={ischeck}
                            onClick={() => setcheck(!ischeck)}
                            rightText="Agree to the terms and condition"
                            rightTextStyle={{ color: '#216b39', }}
                        />

                    </View>

                    <TouchableOpacity
                        style={styles.img}
                        onPress={() => { submit() }}
                    >
                        <Image
                            style={{ height: 95, width: 95 }}
                            source={require('../../Assets/icons/loginicon.png')}
                        ></Image>
                    </TouchableOpacity>

                </View></>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    headertext1: {
        fontSize: 50,
        color: '#000000',
        marginHorizontal: 50,
        marginTop: 30,
        marginBottom: 10
    },
    text1: {
        fontSize: 25,
        color: '#000000',
        marginHorizontal: 50,
        shadowColor: 'black',
        shadowOpacity: 50,
    },
    inputtext: {

        borderRadius: 10,
        marginHorizontal: 50,
        marginBottom: 50,
        marginTop: 20,
        padding: 10,
        color: 'black',
        backgroundColor: '#D2E1D2'
    },
    img: {
        marginTop: 50,
        marginHorizontal: 50,
        flex: 1,
        alignItems: 'flex-end'
    }
})
export default Login;