import { Stack } from 'expo-router';

const DeviceManagementLayout = () => {
  return (
    <Stack initialRouteName="error-list" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="error-list" options={{ title: 'Device Status', headerShown: false }} />
    </Stack>
  );
};

export default DeviceManagementLayout;
