import React, { useState } from "react";
import styles from "./styles";
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
import { Button, TabNavigator } from "@/components";
import theme from "@/constants/theme";
import errorFixList from "@/constants/errorFixList";

const ErrorFixListScreen = () => {
  const [resData] = useState(errorFixList);
  const [displayedData, setDisplayedData] = useState(resData.slice(0, 3));
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
        <TabNavigator title="이력" routePath="ErrorFixListScreen" />
        <TabNavigator title="등록" routePath="ErrorFixRegistScreen" />
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
        <View style={styles.buttonWrapper}>
          <Button
            title="더보기"
            handlePress={loadMore}
            containerStyles={styles.transparentButton}
            textStyles={styles.buttonText}
          />
        </View>
      )}

      <View style={styles.footerSpace} />
    </ScrollView>
  );
};

export default ErrorFixListScreen;
