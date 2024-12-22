import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../Utils/common/Colors';
import { API_url, postApi } from '../../Utils/common/API_config';


const Register = ({ navigation }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = () => {
    if (name && email && password) {

      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);

      postApi(API_url.Register, formdata)
        .then((result) => {
          console.log("result ==>>", result);
          if (result.message == 'user already present') {
            navigation.navigate('login')
          } else {
            navigation.navigate('login')
          }
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
          Register
        </Text>
      </View>

      {/* container */}
      <View style={styles.container}>

        {/* name */}
        <View style={styles.text_input_style}>
          <Text style={styles.text}> Name</Text>
          <TextInput
            style={styles.input_text}
            placeholder='Sanskar'
            placeholderTextColor={Colors.Text_grey_color}
            value={name}
            onChangeText={(val) => setName(val)}
          />
        </View>


        {/* email */}
        <View style={styles.text_input_style}>
          <Text style={styles.text}> Email</Text>
          <TextInput
            style={styles.input_text}
            placeholder='xyz@email.com'
            placeholderTextColor={Colors.Text_grey_color}
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
        </View>


        {/* password */}
        <View style={styles.text_input_style}>
          <Text style={styles.text}> Password</Text>
          <TextInput
            style={styles.input_text}
            placeholder='password'
            placeholderTextColor={Colors.Text_grey_color}
            value={password}
            onChangeText={(val) => setPassword(val)}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleRegister()}
          style={styles.button}
        >
          <Text style={styles.button_text}>
            Register
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

export default Register