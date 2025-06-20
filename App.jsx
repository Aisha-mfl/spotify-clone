import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BootSplash from "react-native-bootsplash";
import AppNavigation from './src/navigation/AppNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getAccessToken } from './utils/spotifyAuth';
import { MainNavigation } from './src/navigation/AuthStack';
import { store } from './store/store';
import { Provider } from 'react-redux';





const App = () => {
  
  useEffect(() => {
    const init = async () => {
      getAccessToken();
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);
 
  return (
    <>
      <StatusBar  barStyle="light-content"  />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store} >
          <NavigationContainer>
           
              <MainNavigation />
            
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>

    </>
  )
}

export default App;

