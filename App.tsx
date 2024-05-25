/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/infrastructure/ui/screens/HomeScreen';
import CrearScreen from './src/infrastructure/ui/screens/CrearScreen';
import VerScreen from './src/infrastructure/ui/screens/VerScreen';
import UpdateScreen from './src/infrastructure/ui/screens/UpdateScreen';
import OfflineMode from './src/infrastructure/services/OfflineMode';
import {GlobalStateProvider} from './src/infrastructure/contexts/GlobalState';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <GlobalStateProvider>
        <OfflineMode>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Ver" component={VerScreen} />
            <Stack.Screen name="Crear" component={CrearScreen} />
            <Stack.Screen name="Editar" component={UpdateScreen} />
          </Stack.Navigator>
        </OfflineMode>
      </GlobalStateProvider>
    </NavigationContainer>
  );
}

export default App;
