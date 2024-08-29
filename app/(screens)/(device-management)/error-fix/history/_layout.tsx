import { Stack } from 'expo-router';

const historyLayout = () => {
  return (
    <Stack initialRouteName="list" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="list" options={{ title: 'List Page', headerShown: false }} />
      <Stack.Screen name="detail" options={{ title: 'Detail', headerShown: false }} />
    </Stack>
  );
};

export default historyLayout;