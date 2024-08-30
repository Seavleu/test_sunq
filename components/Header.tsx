import React, { useState } from "react";
import { Link, useRouter } from "expo-router"; // Use router for navigation
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Animated,
  StyleSheet,
} from "react-native";

import { icons, images } from "@/constants";
import theme from "../constants/theme";
import GradientLine from "./GradientLine";

const Header = () => {
  const router = useRouter(); // Initialize the router
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("파주 태양광 발전소");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState(null);

  const slideAnim = useState(new Animated.Value(-1000))[0];
  const rotationAnim = useState(new Animated.Value(0))[0];

  const locations = [{ id: "1", name: "파주 태양광 발전소" }];

  const menuItems = [
    { id: "1", name: "전력계통도", subItems: [] },
    {
      id: "2",
      name: "전력발전",
      subItems: [
        { id: "2-1", name: "생산전력량", route: "/home", icon: icons.menu1 },
        { id: "2-2", name: "무효전력량", route: "/create", icon: icons.menu1_1 },
        { id: "2-3", name: "기상관측", route: "/profile", icon: icons.menu1_2 },
        { id: "2-4", name: "발전량예측", route: "/bookmark", icon: icons.menu1_3 },
      ],
    },
    {
      id: "3",
      name: "전력저장",
      subItems: [
        { id: "3-1", name: "전력입력", route: "PowerInput", icon: icons.menu2 },
        { id: "3-2", name: "전력출력", route: "PowerOutput", icon: icons.menu2_1 },
        { id: "3-3", name: "전력충전", route: "PowerCharge", icon: icons.menu2_2 },
        { id: "3-4", name: "전력방전", route: "PowerDischarge", icon: icons.menu2_3 },
      ],
    },
    {
      id: "4",
      name: "전력송전",
      subItems: [
        { id: "4-1", name: "SMP판매", route: "SMP_Sale", icon: icons.menu3 },
        { id: "4-2", name: "REC판매", route: "REC_Sale", icon: icons.menu3_1 },
        { id: "4-3", name: "SMP/REC 동향", route: "SMP_REC_Trend", icon: icons.menu3_2 },
      ],
    },
    { id: "5", name: "전력관리", subItems: [] },
    {
      id: "6",
      name: "장치관리",
      subItems: [
        { id: "6-1", name: "장치 현황", route: "/device-management/status", icon: icons.menu4 },
        { id: "6-2", name: "문제알람 이력", route: "/device-management/error-history", icon: icons.menu4_1 },
        { id: "6-3", name: "문제조치", route: "/(screens)/(device-management)/error-fix/history/", icon: icons.menu4_2 },
        { id: "6-4", name: "정기점검", route: "/(screens)/(device-management)/error-fix/inspection", icon: icons.menu4_3 },
      ],
    },    
    { id: "7", name: "이상징후", subItems: [] },
    { id: "8", name: "보고서", subItems: [] },
    {
      id: "9",
      name: "설정",
      subItems: [
        { id: "8-1", name: "장비알람설정", route: "EquipmentAlarmSettings", icon: icons.menu5 },
        { id: "8-2", name: "알림수신자설정", route: "NotificationReceiverSettings", icon: icons.menu5_1 },
        { id: "8-3", name: "담당자설정", route: "PersonInChargeSettings", icon: icons.menu5_2 },
        { id: "8-4", name: "로그아웃", route: "Logout", icon: icons.menu5_3 },
      ],
    },
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    if (!menuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -1000,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectLocation = (location) => {
    setSelectedLocation(location.name);
    setDropdownVisible(false);
  };

  const toggleExpand = (itemId) => {
    setExpandedItemId((prevId) => (prevId === itemId ? null : itemId));
  };

  const rotateArrow = (isExpanded) => {
    Animated.timing(rotationAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {!menuVisible && (
        <View style={styles.headerContainer}>
          <Image source={images.logo} style={styles.logo} resizeMode="contain" />

          {/* Dropdown */}
          <TouchableOpacity onPress={toggleDropdown} style={styles.locationContainer}>
            <Text style={styles.locationText}>{selectedLocation}</Text>
            <Image source={icons.down01} style={styles.dropdownIcon} resizeMode="contain" />
          </TouchableOpacity>

          {/* Menu Icon */}
          <TouchableOpacity onPress={toggleMenu}>
            <Image source={icons.menu} style={styles.menuIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      )}

      {/* Dropdown List */}
      {dropdownVisible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={locations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectLocation(item)} style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Full-screen Menu Modal */}
      <Modal
        transparent={true}
        visible={menuVisible}
        onRequestClose={toggleMenu}
        animationType="none"
      >
        <Animated.View style={[styles.menuModal, { transform: [{ translateY: slideAnim }] }]}>
          <SafeAreaView>
            {/* Header with close button */}
            <View style={styles.menuHeader}>
              <Image source={images.logo} style={styles.logo} resizeMode="contain" />
              <TouchableOpacity onPress={toggleMenu}>
                <Image source={icons.close} style={styles.closeIcon} resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <GradientLine />

            {/* Menu Items */}
            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isExpanded = expandedItemId === item.id;
                const arrowRotation = rotationAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "180deg"],
                });

                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        toggleExpand(item.id);
                        rotateArrow(!isExpanded);
                      }}
                      style={styles.menuItem}
                    >
                      <Text style={[styles.menuItemText, isExpanded && styles.expandedText]}>
                        {item.name}
                      </Text>
                      {!["1", "5", "7", "8"].includes(item.id) && (
                        <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
                          <Image source={icons.down02} style={styles.arrowIcon} resizeMode="contain" />
                        </Animated.View>
                      )}
                    </TouchableOpacity>

                    {isExpanded &&
                      item.subItems.length > 0 &&
                      item.subItems.map((subItem) => (
                        <TouchableOpacity
                          key={subItem.id}
                          onPress={() => {
                            toggleMenu(); // Close the menu
                            router.push(subItem.route); // Navigate to the selected route
                          }}
                          style={styles.subMenuItem}
                        >
                          <Image source={subItem.icon} style={styles.subMenuIcon} resizeMode="contain" />
                          <Text style={styles.subMenuItemText}>{subItem.name}</Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                );
              }}
            />
          </SafeAreaView>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'rgba(0, 12, 101, 0.9)',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.medium,
  },
  logo: {
    width: 80,
    height: 42,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.xLarge, // Adjusted for alignment
  },
  locationText: {
    color: theme.colors.text,
    fontSize: theme.typography.base.fontSize,
  },
  dropdownIcon: {
    width: 12,
    height: 12,
    marginLeft: theme.spacing.small,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  dropdownList: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background,
    zIndex: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
  },
  dropdownItemText: {
    color: theme.colors.text,
    fontSize: theme.typography.base.fontSize,
  },
  menuModal: {
    flex: 1,
    backgroundColor: 'rgba(22, 46, 114, 0.90)',
    width: '100%',
    padding: theme.spacing.medium,
    zIndex: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.medium,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: theme.typography.base.fontSize,
    color: theme.colors.text,
  },
  expandedText: {
    color: '#F33028',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing.large,
    paddingRight: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
  },
  subMenuIcon: {
    width: 24,
    height: 24,
  },
  subMenuItemText: {
    color: theme.colors.text,
    fontSize: theme.typography.base.fontSize,
    marginLeft: theme.spacing.medium,
  },
});

export default Header;
