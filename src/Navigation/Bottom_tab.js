import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Images } from '../Utils/common/Images';
import Menu from '../Screens/Menu';
import Cart from '../Screens/Cart';
import Search from '../Screens/Search';
import Home from '../Screens/Home';
import { Colors } from '../Utils/common/Colors';
const tab = createBottomTabNavigator()

const Tab_navigation = () => {


    return (

        <tab.Navigator
            initialRouteName='home'
            backBehavior='none'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: Colors.tab_background_color,
                    height: 60,
                    position: 'absolute'
                },
                tabBarIconStyle: {
                    // backgroundColor:'yellow',
                    width: 50,
                    height: 50
                    // bottom:0
                }

            }}
        >
            <tab.Screen

                options={{
                    tabBarButton: (props) => (
                        <TouchableWithoutFeedback {...props}>
                            <View style={props.style}>{props.children}</View>
                        </TouchableWithoutFeedback>
                    ),
                    tabBarIcon: ({ focused }) => (

                        <View style={{}}>
                            <Image
                                style={{
                                    width: 25,
                                    alignSelf: 'center',
                                    height: 25, tintColor: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color
                                }}
                                source={Images.Home} />

                        </View>

                    )
                }}

                name='home' component={Home} />
            <tab.Screen
                options={{
                    tabBarButton: (props) => (
                        <TouchableWithoutFeedback {...props}>
                            <View style={props.style}>{props.children}</View>
                        </TouchableWithoutFeedback>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <><Image
                            style={{ width: 25, height: 25, tintColor: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color }}
                            source={Images.Search} />
                        </>
                    )
                }}
                name='search' component={Search} />
            <tab.Screen
                options={{
                    tabBarButton: (props) => (
                        <TouchableWithoutFeedback {...props}>
                            <View style={props.style}>{props.children}</View>
                        </TouchableWithoutFeedback>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <><Image
                            style={{ width: 25, height: 25, tintColor: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color }}
                            source={Images.Cart} />
                        </>
                    )
                }}
                name='cart' component={Cart} />
            <tab.Screen
                options={{
                    tabBarButton: (props) => (
                        <TouchableWithoutFeedback {...props}>
                            <View style={props.style}>{props.children}</View>
                        </TouchableWithoutFeedback>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <><Image
                            style={{ width: 25, height: 25, tintColor: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color }}
                            source={Images.Menu} />
                        </>
                    )
                }}
                name='menu' component={Menu} />
            {/* <tab.Screen name='menu' component={Menu_screen}/> */}
        </tab.Navigator>
    )
}

const styles = StyleSheet.create({

});

export default Tab_navigation;