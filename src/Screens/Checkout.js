import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../Utils/common/Colors';
import { API_url, postApi } from '../Utils/common/API_config';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Checkout = ({ navigation }) => {
    const [Address, setAddress] = React.useState("");
    const [Pincode, setPincode] = React.useState("");
    const [City, setCity] = React.useState("");
    const [State, setState] = React.useState("");

    const handleCheckout = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log(token);

        if (Address!=='' && City!=='' && State!=='' && Pincode!=='') {

            const formdata = new FormData();
            formdata.append("address", Address);
            formdata.append("pincode", Pincode);
            formdata.append("city", City);
            formdata.append("state", State);

            postApi(API_url.Add_address, formdata, token)
                .then((result) => {
                    console.log(result.data.email);
                    Linking.openURL(`mailto:${result.data.email}?subject=${encodeURIComponent('regarding payments')}&body=${encodeURIComponent('payment link')}`)
                })
                .catch((err) => console.log(err))

        } else {
            Alert.alert("Error", "Please fill out all fields.");
        }
    };

    return (
        <SafeAreaView style={styles.safeareaview}>

            {/* header */}
            <View style={styles.header_container}>
                <Text style={styles.header_text}>
                    Checkout
                </Text>
            </View>

            {/* container */}
            <View style={styles.container}>

                {/* name */}
                <View style={styles.text_input_style}>
                    <Text style={styles.text}> Address</Text>
                    <TextInput
                        style={styles.input_text}
                        placeholder='A-30 abc xyz'
                        placeholderTextColor={Colors.Text_grey_color}
                        value={Address}
                        onChangeText={(val) => setAddress(val)}
                    />
                </View>


                {/* email */}
                <View style={styles.text_input_style}>
                    <Text style={styles.text}> Pincode</Text>
                    <TextInput
                        style={styles.input_text}
                        placeholder='000011'
                        placeholderTextColor={Colors.Text_grey_color}
                        value={Pincode}
                        onChangeText={(val) => setPincode(val)}
                    />
                </View>


                {/* password */}
                <View style={styles.text_input_style}>
                    <Text style={styles.text}> State</Text>
                    <TextInput
                        style={styles.input_text}
                        placeholder='Rajasthan'
                        placeholderTextColor={Colors.Text_grey_color}
                        value={State}
                        onChangeText={(val) => setState(val)}
                    />
                </View>

                {/* password */}
                <View style={styles.text_input_style}>
                    <Text style={styles.text}> City</Text>
                    <TextInput
                        style={styles.input_text}
                        placeholder='Ajmer'
                        placeholderTextColor={Colors.Text_grey_color}
                        value={City}
                        onChangeText={(val) => setCity(val)}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => handleCheckout()}
                    style={styles.button}
                >
                    <Text style={styles.button_text}>
                        Buy now
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    safeareaview: {
        marginHorizontal: 10
    },
    header_container: {
        marginVertical: 50
    },
    header_text: {
        color: Colors.Text_base_color,
        fontSize: 30,
        fontWeight: '600'
    },
    container: {},

    text: {
        color: Colors.Text_base_color,
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 5
    },
    input_text: {
        color: Colors.Text_base_color,
        backgroundColor: Colors.Primary_color,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 18,
        // elevation:5
    },
    text_input_style: {
        marginVertical: 20
    },

    button: {
        backgroundColor: Colors.Tab_button_Active_color,
        padding: 10,
        borderRadius: 20,
        marginVertical: 40
    },
    button_text: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: Colors.Primary_color
    },

});

export default Checkout