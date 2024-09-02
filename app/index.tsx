import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import userStore from '../stores/userStore';
import { Link, useRouter } from 'expo-router';
import LogoutButton from '@/components/LogoutButton';
import theme from '@/constants/theme';

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
    <View style={styles.container} >
    <Text style={styles.text}>Welcome to the Home Screen</Text>
    <Text> 
      <Link href={"/(device-management)/error-fix/history/list"} style={styles.text}>{'\n'}👉🏻Detail List page {'\n'}</Link>
      <Link href={"/(device-management)/error-fix/regist"} style={styles.text}>{'\n'}👉🏻Register Problem{'\n'}</Link>
    </Text> 
    <LogoutButton />
  </View>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  text:{
    color: theme.colors.text
  }
})