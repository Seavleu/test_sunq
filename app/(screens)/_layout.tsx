import { createStackNavigator } from "@react-navigation/stack";
import ErrorFixDetailScreen from "./(device-management)/error-fix/history/detail/[id]";
import ErrorFixListScreen from "./(device-management)/error-fix/history/list";
import ErrorFixRegistScreen from "./(device-management)/error-fix/regist"; 

const Stack = createStackNavigator();

export default function ScreensStack() {
  return (
    <Stack.Navigator
      initialRouteName="ErrorFixListScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen 
        name="ErrorFixListScreen" 
        component={ErrorFixListScreen}
        options={{ title: "Error Fix List" }} 
      />
      <Stack.Screen
        name="ErrorFixDetailScreen"
        component={ErrorFixDetailScreen}
        options={({ route }) => ({ title: `Detail - ${route.params.id}` })}
      />
      <Stack.Screen
        name="ErrorFixRegistScreen"
        component={ErrorFixRegistScreen}
        options={{ title: "Register Error Fix" }}
      />
    </Stack.Navigator>
  );
}
 