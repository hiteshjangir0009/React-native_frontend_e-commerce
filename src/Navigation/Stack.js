import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash_screen from '../Screens/Auth/Splash.js';
import Login from '../Screens/Auth/Login.js';
import Otp from '../Screens/Auth/Register.js';
import Home from '../Screens/Home.js';
import Tab_navigation from './Bottom_tab.js';
import Display from '../Screens/Display.js';
import SelectionScreen from '../Screens/Auth/Selector.screen.js';
import Register from '../Screens/Auth/Register.js';
import Checkout from '../Screens/Checkout.js';


const stack = createNativeStackNavigator()


const Stack_navigation = () => {



  return (
    <><stack.Navigator
      initialRouteName='splash'
    >
      <stack.Screen options={{ headerShown: false, }} name='splash' component={Splash_screen} />
      <stack.Screen options={{ headerShown: false, }} name='select' component={SelectionScreen} />
      <stack.Screen options={{ headerShown: false, }} name='login' component={Login} />
      <stack.Screen options={{ headerShown: false, }} name='register' component={Register} />
      
      <stack.Screen options={{ headerShown: false, }} name='home' component={Tab_navigation} />
      <stack.Screen options={{ headerShown: false, }} name='display' component={Display} />
      <stack.Screen options={{ headerShown: false, }} name='checkout' component={Checkout} />

    </stack.Navigator>
      
    </>

  )
}



// }


const Main_stack = () => {
  return (
    <NavigationContainer>
      <Stack_navigation />
    </NavigationContainer>
  )
}

export default Main_stack;