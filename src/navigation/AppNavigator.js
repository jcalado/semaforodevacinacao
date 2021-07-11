import React, {useState} from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Appbar, Menu, Provider, Divider} from 'react-native-paper';
import {StyleSheet, Text as Button, View, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

import CentersScreen from '../screens/CentersScreen';
import CenterDetailsScreen from '../screens/CenterDetailsScreen';
import MapScreen from '../screens/MapScreen';

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) || 'Igrejas';

  switch (routeName) {
    case 'Centros':
      return 'Centros de Vacinação';
    case 'Mapa':
      return 'Mapa';
  }
}

function CustomNavigationBar({title, navigation, previous}) {
  return (
    <Appbar.Header style={styles.appBar}>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title={previous ? title : <Button>Semáforo da Vacinação</Button>}
      />
    </Appbar.Header>
  );
}

const MainTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#2f557f"
        inactiveColor="#7e93ab"
        barStyle={{
          backgroundColor: '#D8DEE9',
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name == 'Centros') {
              iconName = 'medkit';
            } else if (route.name == 'Mapa') {
              iconName = 'map';
            } else if (route.name == 'Notícias') {
              iconName = 'newspaper';
            }
            return <Ionicons name={iconName} size={26} color={color} />;
          },
        })}>
        <Tab.Screen name="Centros" component={MainStackNavigator} />
        <Tab.Screen name="Mapa" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Centros"
      screenOptions={{
        gestureEnabled: true,
        header: ({scene, previous, navigation}) => {
          const {options} = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;
          return (
            <CustomNavigationBar
              title={title}
              previous={previous}
              navigation={navigation}
            />
          );
        },
      }}
      headerMode="float">
      <Stack.Screen name="Centros de Vacinação" component={CentersScreen} />
      <Stack.Screen name="Detalhes" component={CenterDetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: '#0d47a1',
  },
});
