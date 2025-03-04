import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductListScreen from '../screens/ProductListScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import FavoriteList from '../screens/FavoriteScreen';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Products" component={ProductListScreen} />
        <Stack.Screen name="Cart" component={ShoppingCartScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Favorites" component={FavoriteList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
