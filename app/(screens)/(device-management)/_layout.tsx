import { Stack } from 'expo-router';

const DeviceManagementLayout = () => {
  return (
    <Stack initialRouteName="(device-management)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(device-management)" options={{ title: 'Device Status', headerShown: false }} />
    </Stack>
  );
};

export default DeviceManagementLayout;
