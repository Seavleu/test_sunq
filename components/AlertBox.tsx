import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { View, Image } from "react-native-animatable";
import { icons } from "../constants"; 

const AlertBox = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: AlertBoxProps) => {
  return (
    <View style={styles.alertBoxContainer}>
      <View style={styles.iconContainer}>
        <Image source={icons.call} resizeMode="contain" style={styles.icon} />
      </View>
      <Text style={styles.title}>1544-0000</Text>
      <Text style={styles.message}>
        아이디와 비밀번호가 일치하지 않습니다. 관리자에게 문의하세요.
      </Text>

      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[styles.button, containerStyles, isLoading && styles.loading]}
        disabled={isLoading}
      >
        <Text style={[styles.buttonText, textStyles]}>{title || "확인"}</Text>

        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            color="#fff"
            size="small"
            style={styles.activityIndicator}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  alertBoxContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    width: "66.67%", // 8/12 of the parent width
    height: 256, // Equivalent to h-64
    maxWidth: 400, // Equivalent to max-w-md
    alignSelf: "center",
  },
  iconContainer: {
    backgroundColor: "#EEEEEE",
    padding: 16,
    borderRadius: 50, // Rounded full
  },
  icon: {
    width: 40, // Equivalent to w-10
    height: 40, // Equivalent to h-10
  },
  title: {
    fontSize: 24, // Equivalent to text-3xl
    fontWeight: "600", // Equivalent to font-psemibold
    marginTop: 12,
  },
  message: {
    color: "#6B7280", // Equivalent to text-gray-600
    textAlign: "center",
    marginVertical: 8,
    fontWeight: "600", // Equivalent to font-semibold
  },
  button: {
    backgroundColor: "#FF6347", // Replace with your secondary color
    marginTop: 8,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600", // Equivalent to font-semibold
  },
  activityIndicator: {
    marginLeft: 8,
  },
  loading: {
    opacity: 0.5,
  },
});

export default AlertBox;
