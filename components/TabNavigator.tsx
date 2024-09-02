import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const TabNavigator = ({ title, routePath }) => {
  const navigation = useNavigation();
  const route = useRoute();

  // Determine if the current route matches the routePath or is a child of it
  const isActive =
    route.name === routePath ||
    (routePath === 'ErrorFixListScreen' && route.name.startsWith('ErrorFixDetailScreen'));

  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTab]}
      onPress={() => navigation.navigate(routePath)}
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,   
  },
});

export default TabNavigator;
