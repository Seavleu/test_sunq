import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

type TabNavigatorProps = {
  title: string;
  routePath: string;
};

const TabNavigator = ({ title, routePath }: TabNavigatorProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // Determine if the current pathname matches the routePath
  const isActive = pathname === routePath;

  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTab]}
      onPress={() => router.push(routePath)}
    >
      <Text style={isActive ? styles.tabButtonTextActive : styles.tabButtonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#E83830',  
    borderColor: '#E83830', 
  },
  tabButtonText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
  tabButtonTextActive: {
    color: '#fff', 
    fontWeight: 'bold',
  },
});

export default TabNavigator;
