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
import UpdateScreen from './src/screens/UpdateScreen';
import OfflineMode from './src/services/OfflineMode';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <OfflineMode>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Ver" component={VerScreen} />
          <Stack.Screen name="Crear" component={CrearScreen} />
          <Stack.Screen name="Editar" component={UpdateScreen} />
        </Stack.Navigator>
      </OfflineMode>
    </NavigationContainer>
  );
}

export default App;
