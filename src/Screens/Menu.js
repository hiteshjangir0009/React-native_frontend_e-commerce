import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Menu = ({navigation}) => {
  return (
    <View style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }}>
      <Button title='Logout' onPress={()=>{
        AsyncStorage.removeItem('token')
        navigation.navigate('splash')
      }}/>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({})