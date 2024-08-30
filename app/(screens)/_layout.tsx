import { Stack } from "expo-router";

export default function ScreensStack() {
  return (
    <Stack
      initialRouteName="ErrorFixList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ErrorFixList" options={{ title: "Error Fix List" }} />
      <Stack.Screen
        name="ErrorFixDetail"
        options={({ route }) => ({ title: `Detail - ${route.params.id}` })}
      />

      <Stack.Screen
        name="ErrorFixRegist"
        options={{ title: "Register Error Fix", headerShown: false }}
      />
    </Stack>
  );
}
