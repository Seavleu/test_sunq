import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomCheckBoxProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  label?: string;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ value, onValueChange, label }) => {
  return (
    <TouchableOpacity onPress={() => onValueChange(!value)} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, value && styles.checkedCheckbox]}>
        {value && <Ionicons name="checkmark" size={18} color="black" />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#454f8b',
    borderRadius: 8,
  },
  checkedCheckbox: {
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CustomCheckBox;
