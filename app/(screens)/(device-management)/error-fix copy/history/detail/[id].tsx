import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ErrorFixDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params as { id: string }; // Add explicit typing here

  return (
    <View style={{ padding: 20 }}>
      <Text>Details for Error ID: {id}</Text>
      {/* Render more details about the error fix here */}
    </View>
  );
};

export default ErrorFixDetailScreen;
