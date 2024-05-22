/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CrearScreen from './src/screens/CrearScreen';
import VerScreen from './src/screens/VerScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Ver" component={VerScreen} />
        <Stack.Screen name="Crear" component={CrearScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
