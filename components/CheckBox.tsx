import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CustomCheckBox = ({ value, onValueChange } : CustomCheckBoxProps) => {
  return (
    <TouchableWithoutFeedback onPress={onValueChange}>
      <View style={styles.checkBoxContainer}>
        <View style={[styles.checkBox, value && styles.checked]}>
          {value && (
            <MaterialIcons name="check" size={22} color="#000000" style={styles.icon} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkBox: {
    width: 22,  
    height: 22,  
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#fff',
  },
  icon: {
    fontWeight: 'bold',  
  },
});

export default CustomCheckBox;
