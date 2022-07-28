import React from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Splash from '@screens/Splash';

import SDK from '@screens/SDK';
import Vonage from '@screens/Video/Vonage';

import * as RootNavigation from './RootNavigation';

export default function Router() {
  const Stack = createStackNavigator();

  // Theme
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={RootNavigation.navigationRef} theme={MyTheme}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false, gestureEnabled: false }}
        >
          {/* Splash screen, primeira tela renderizada no app */}
          <Stack.Screen name="Splash" component={Splash} />
          {/* <Stack.Screen name="SplashCall" component={SplashCall} /> */}

          <Stack.Screen name="SDK" options={{ title: 'SDK' }} component={SDK} />

          <Stack.Screen name="Vonage" component={Vonage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
