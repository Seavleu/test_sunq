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
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { images, icons } from "@/constants";
import {Button, TabNavigator} from "@/components"; 
import theme from "@/constants/theme";
import errorFixList from "@/constants/errorFixList";

const ErrorFixListScreen = () => {
  const [resData] = useState(errorFixList);
  const [displayedData, setDisplayedData] = useState(resData.slice(0, 2)); // Limit to 2 items initially
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
      setDisplayedData(filtered.slice(0, 3)); 
      setSearchActive(true);
    } else {
      alert("검색어를 최소 2자 이상 입력해 주세요.");
    }
  };

  const handleResetSearch = () => {
    setSearchText("");
    setDisplayedData(resData.slice(0, 3));
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
    const newData = resData.slice(0, displayedData.length + 3);
    setDisplayedData(newData);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
    <View style={{ paddingVertical: 8, gap: 16 }}>
      <Text style={styles.deviceTypeText}>{item.device_type}</Text>
      <Image
        source={images.dottedLine}
        resizeMode="cover"
        style={{ width: "100%" }}
      />
      <View style={{ gap: 8 }}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.contentText}>{item.content}</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>현장기사</Text>
          <Image
            source={images.dottedLine}
            resizeMode="cover"
            style={styles.dottedLine}
          />
          <Text style={styles.detailText}>{item.reg_date}</Text>
          <Image
            source={images.dottedLine}
            resizeMode="cover"
            style={styles.dottedLine}
          />
          <Text style={styles.detailText}>조회수: {item.view_cnt}</Text>
          <Image
            source={images.dottedLine}
            resizeMode="cover"
            style={styles.dottedLine}
          />

          {item.file_list && item.file_list.length > 0 && (
            <Image
              source={icons.img}
              resizeMode="contain"
              style={{ width: 16, height: 16 }}
            />
          )}
        </View>

        <View style={{ marginTop: 16 }}>
          <Button
            title="확인"
            handlePress={() =>
              navigation.navigate("ErrorFixDetailScreen", {
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
        <TabNavigator title="이력" routePath="/error-fix/history/list" isActive={true} />
        <TabNavigator title="등록" routePath="/error-fix/regist" isActive={false} />
      </View>
      <Text style={styles.headerText}>장비알람 설정</Text>
      <Text style={styles.subHeaderText}>현재까지 문제가 발생하여 조치한 내용들을 확인할 수 있습니다.</Text>
      <View style={styles.searchBox}>
        <View style={styles.inpBox}>
          <TouchableOpacity style={styles.selectInput} onPress={handleDropdownToggle}>
            <Text style={styles.selectText}>{selectedOption}</Text>
            <Image source={icons.down02} style={[styles.arrowIcon, dropdownOpen && styles.arrowIconOpen]} />
          </TouchableOpacity>
          {dropdownOpen && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={[styles.dropdownItem, selectedOption === "제목" && styles.selectedItem]}
                onPress={() => handleOptionSelect("제목")}
              >
                <Text style={[styles.dropdownItemText, selectedOption === "제목" && styles.selectedItemText]}>제목</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dropdownItem, selectedOption === "내용" && styles.selectedItem]}
                onPress={() => handleOptionSelect("내용")}
              >
                <Text style={[styles.dropdownItemText, selectedOption === "내용" && styles.selectedItemText]}>내용</Text>
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
            <TouchableOpacity style={styles.resetButton} onPress={handleResetSearch}>
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
        ListEmptyComponent={<Text style={styles.emptyText}>No results found</Text>}
      />
      {displayedData.length < resData.length && (
        <View style={styles.buttonWrapper}>
          <Button title="더보기" handlePress={loadMore} containerStyles={styles.transparentButton} textStyles={styles.buttonText} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.background,
    flex: 1,
    zIndex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    zIndex: 2,
  },
  headerText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    zIndex: 2,
  },
  subHeaderText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  searchBox: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
    padding: 20,
    zIndex: 2,
  },
  inpBox: {
    flexDirection: "row",
    marginBottom: 10,
    zIndex: 3,
  },
  deviceTypeText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contentText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  detailRow: {
    flexDirection: "row",
    gap: 18,
  },
  detailText: {
    fontSize: 12,
    color: theme.colors.gray,
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
    zIndex: 3,
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
    zIndex: 4,
    elevation: 5,
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
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  resetButton: {
    backgroundColor: "#474747",
    padding: 16,
    borderRadius: 8,
    flex: 1,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dottedLine: {
    width: 0.5,
    height: 14,  
  },

  buttonWrapper: {
    alignItems: "center",
    marginVertical: 16,
  },
  transparentButton: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "transparent",
    width: 130,
    height: 44,
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
