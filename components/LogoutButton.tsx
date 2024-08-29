import React from 'react';
import { Button } from 'react-native';
import { useRouter } from 'expo-router';
import userStore from '../stores/userStore';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    userStore.logout();
    router.replace('/(auth)');
  };

  return <Button title="Logout" onPress={handleLogout} />;
};

export default LogoutButton;
