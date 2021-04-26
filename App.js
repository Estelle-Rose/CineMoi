import * as React from 'react';

import FilmDetail from './Components/FilmDetail'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import Search from './Components/Search'
import Store from './Store/config'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
      
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Film" component={FilmDetail} />
      </Stack.Navigator>
      
    </NavigationContainer>
    </Provider>
  );
}

