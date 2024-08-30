import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import userStore from '../stores/userStore';
import { useRouter } from 'expo-router';
import LogoutButton from '@/components/LogoutButton';

const HomeScreen = observer(() => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      await userStore.loadToken();

      if (!userStore.token) {
        router.replace('/(auth)');
      }
    };

    checkAuth();
  }, [router]);

  if (!userStore.token) {
    return <Text>Loading...</Text>; 
  }

  return (
    <View>
      <Text>Welcome to the Home Screen</Text>
      <Text>
        <LogoutButton />
      </Text> 
    </View>
  );
});

export default HomeScreen;
