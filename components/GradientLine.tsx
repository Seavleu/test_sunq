import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientLine = () => {
  return (
    <View style={{ width: '100%', height: 2, backgroundColor: '#0A1E43' }}>
      <LinearGradient
        colors={['#FF0000', '#FFFFFF']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          height: 2,
          width: '100%',
        }}
      />
    </View>
  );
};

export default GradientLine;
