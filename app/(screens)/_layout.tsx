import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';

import ErrorFixScreen from './(device-management)/error-fix';
import ErrorFixDetailScreen from './(device-management)/error-fix/history/detail/[id]';
import ErrorFixListScreen from './(device-management)/error-fix/history/list';
import ErrorFixRegistScreen from './(device-management)/error-fix/regist';

const Stack = createNativeStackNavigator();

export default function ScreensStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ErrorFixList">
        <Stack.Screen
          name="ErrorFixList"
          component={ErrorFixListScreen}
          options={{ 
            title: 'Error Fix List',
            headerRight: () => (
              <TouchableOpacity onPress={() => alert('Icon clicked')}>
                <Text>🔍</Text> 
              </TouchableOpacity>
            )
          }}
        />
        <Stack.Screen 
          name="ErrorFixDetail" 
          component={ErrorFixDetailScreen} 
          options={({ route }) => ({
            title: `Detail - ${route.params.id}`, 
          })}
        />
        <Stack.Screen
          name="ErrorFixRegist"
          component={ErrorFixRegistScreen}
          options={{ title: 'Register Error Fix' }}
        />  
        
        <Stack.Screen
          name="ErrorFix"
          component={ErrorFixScreen}
          options={{ title: 'Error Fix Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


// import { Tabs } from 'expo-router';
// import React from 'react';

// import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

