import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; 
import ErrorFixDetailScreen from './detail/[id]';
import ErrorFixListScreen from './list';

const Stack = createStackNavigator();

export default function ErrorFixNavigator() {
  return (
    <Stack.Navigator initialRouteName="ErrorFixListScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ErrorFixListScreen"
        component={ErrorFixListScreen}
        options={{ title: 'Error Fix List' }}
      />
      <Stack.Screen
        name="ErrorFixDetailScreen"
        component={ErrorFixDetailScreen}
        options={({ route }) => ({ title: `Detail - ${route.params.id}` })}
      />
    </Stack.Navigator>
  );
}
