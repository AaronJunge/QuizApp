import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeTab from './HomeTab/index';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();


const AppNavigation = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#001146" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="HomeTab" component={HomeTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
