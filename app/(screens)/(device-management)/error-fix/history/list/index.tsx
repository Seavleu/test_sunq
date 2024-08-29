import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { images, icons } from "@/constants";
import Button from "@/components/Button";
import TabNavigator from "@/components/TabNavigator";
import theme from "@/constants/theme";

const ErrorFixListScreen = () => {
  const staticData = [
    {
      device_error_fix_seq: 1,
      device_type: "INVERTER",
      title: "Internal Communication Issue",
      content: "Resolved the internal communication issue in Inverter 1.",
      reg_date: "2023-08-30 14:00",
      view_cnt: 138,
    },
    {
      device_error_fix_seq: 2,
      device_type: "BATTERY",
      title: "Battery Overheating",
      content: "Handled the overheating problem in Battery 3.",
      reg_date: "2023-07-25 10:30",
      view_cnt: 87,
    },
    {
      device_error_fix_seq: 3,
      device_type: "SOLAR PANEL",
      title: "Solar Panel Damage",
      content: "Fixed the damaged solar panel in Sector 5.",
      reg_date: "2023-09-10 09:15",
      view_cnt: 45,
    },
  ];

  const [resData] = useState(staticData);
  const [displayedData, setDisplayedData] = useState(staticData.slice(0, 2)); // Limit to 2 items initially
  const [searchText, setSearchText] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("제목");
  const navigation = useNavigation();

  const handleSearch = () => {
    if (searchText.length > 1) {
      const filtered = resData.filter(
        (item) =>
          item.title.includes(searchText) || item.content.includes(searchText)
      );
      setDisplayedData(filtered.slice(0, 2)); // Limit to 2 items initially
      setSearchActive(true);
    } else {
      alert("검색어를 최소 2자 이상 입력해 주세요.");
    }
  };

  const handleResetSearch = () => {
    setSearchText("");
    setDisplayedData(resData.slice(0, 2)); // Reset to initial limit
    setSearchActive(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const loadMore = () => {
    const newData = resData.slice(0, displayedData.length + 2);
    setDisplayedData(newData);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ paddingVertical: 8, gap: 16 }}>
        <Text
          style={{
            color: "#7B7B8B",
            fontSize: 20,
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {item.device_type}
        </Text>
        <Image
          source={images.dottedLine}
          resizeMode="contain"
          style={{ width: "100%" }}
        />
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
          <Text style={{ fontSize: 16 }}>{item.content}</Text>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Text style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.5)" }}>
              현장기사
            </Text>
            <View style={styles.dottedLine}></View>
            <Text style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.5)" }}>
              {item.reg_date}
            </Text>
            <View style={styles.dottedLine}></View>
            <Text style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.5)" }}>
              조회수: {item.view_cnt}
            </Text>
            <View style={styles.dottedLine}></View>
            <Image
              source={icons.img}
              resizeMode="contain"
              style={{ width: 16, height: 16 }}
            />
          </View>

          <View style={{ marginTop: 16 }}>
            <Button
              title="확인"
              handlePress={() =>
                navigation.navigate("DetailScreen", {
                  id: item.device_error_fix_seq,
                })
              }
              containerStyles={styles.blackButton}
              textStyles={styles.blackButtonText}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabContainer}>
        <TabNavigator title="이력" routePath="/error-fix/history/list" />
        <TabNavigator title="등록" routePath="/error-fix/history/detail/" />
      </View>
      <Text style={styles.headerText}>장비알람 설정</Text>
      <Text style={styles.subHeaderText}>
        현재까지 문제가 발생하여 조치한 내용들을 확인할 수 있습니다.
      </Text>
      <View style={styles.searchBox}>
        <View style={styles.inpBox}>
          <TouchableOpacity
            style={styles.selectInput}
            onPress={handleDropdownToggle}
          >
            <Text style={styles.selectText}>{selectedOption}</Text>
            <Image
              source={icons.down02}
              style={[styles.arrowIcon, dropdownOpen && styles.arrowIconOpen]}
            />
          </TouchableOpacity>
          {dropdownOpen && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  selectedOption === "제목" && styles.selectedItem,
                ]}
                onPress={() => handleOptionSelect("제목")}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    selectedOption === "제목" && styles.selectedItemText,
                  ]}
                >
                  제목
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  selectedOption === "내용" && styles.selectedItem,
                ]}
                onPress={() => handleOptionSelect("내용")}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    selectedOption === "내용" && styles.selectedItemText,
                  ]}
                >
                  내용
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <TextInput
            style={styles.textInput}
            placeholder="검색어를 입력해 주세요."
            placeholderTextColor="#7B7B8B"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={styles.btnBox}>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>검색</Text>
          </TouchableOpacity>
          {searchActive && (
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetSearch}
            >
              <Text style={styles.buttonText}>검색 초기화</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={displayedData}
        style={{ marginTop: 16 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.device_error_fix_seq.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No results found</Text>
        }
      />
      {displayedData.length < resData.length && (
        <Button
          title="더보기"
          handlePress={loadMore}
          containerStyles={styles.transparentButton}
          textStyles={styles.buttonText}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  headerText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeaderText: {
    color: "#7B7B8B",
    fontSize: 16,
    marginBottom: 20,
  },
  searchBox: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
    padding: 12,
  },
  inpBox: {
    flexDirection: "row",
    marginBottom: 10,
  },
  selectInput: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10, // Ensure this is in front when dropdown is open
  },
  selectText: {
    color: "#FFF",
    fontSize: 16,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: "#FFF",
  },
  arrowIconOpen: {
    transform: [{ rotate: "180deg" }],
  },
  dropdown: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    borderRadius: 8,
    zIndex: 20, // Increase zIndex to ensure it’s above other elements
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: "rgba(1, 1, 1, 0.05)",
  },
  dropdownItemText: {
    color: "#111",
  },
  selectedItem: {
    backgroundColor: "#FFF",
  },
  selectedItemText: {
    color: "#111",
    fontWeight: "bold",
  },
  textInput: {
    flex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
    color: "#FFF",
    marginLeft: 10,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchButton: {
    backgroundColor: "#111111",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  resetButton: {
    backgroundColor: "#474747",
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dottedLine: {
    width: 1,
    height: 14, // Adjust the height to match the text
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dotted",
    transform: [{ rotate: "90deg" }], // Rotate to make it horizontal
  },
  transparentButton: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "transparent",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  blackButton: {
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
  blackButtonText: {
    color: "rgba(0, 0, 0, 0.5)",
  },
});

export default ErrorFixListScreen;
