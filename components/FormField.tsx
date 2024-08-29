import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
} : FormFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.container, otherStyles]}>
      <View style={styles.labelContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
        ]}
      >
        <TextInput
          style={[styles.textInput, isFocused && styles.textInputFocused]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={title === "PW"}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    height: 64,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    height: 64,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 2,
    borderColor: "transparent",
  },
  inputContainerFocused: {
    borderColor: "#FFFFFF",
  },
  textInput: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 8,
  },
  textInputFocused: {
    marginLeft: 8,
  },
});

export default FormField;
