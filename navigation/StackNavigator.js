import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import EditScreen from '../screens/EditScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Edit: EditScreen,
});

export default HomeStack;
