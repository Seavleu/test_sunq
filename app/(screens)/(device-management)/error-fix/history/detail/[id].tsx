import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { icons, images } from "@/constants";
import Button from "@/components/Button";
import TabNavigator from "@/components/TabNavigator";
import theme from "@/constants/theme";
import errorFixList from "@/constants/errorFixList";

const ErrorFixDetailScreen = () => {
  const [resData, setResData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  type RootStackParamList = {
    ErrorFixDetail: { id: number };
  };

  type ErrorFixDetailScreenRouteProp = RouteProp<
    RootStackParamList,
    "ErrorFixDetail"
  >;

  const route = useRoute<ErrorFixDetailScreenRouteProp>();
  const { id } = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    console.log("Navigated with ID:", id);
    const fetchData = async () => {
      // Fetch data from the JSON file based on the passed id
      const data = errorFixList.find(
        (item) => item.device_error_fix_seq === id
      );
      if (data) {
        setResData(data);
      } else {
        console.error("Data not found for ID:", id);
      }
    };
    fetchData();
  }, [id]);

  const openModal = (index) => {
    setSelectedImage(resData.file_list[index]);
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const handleEdit = () => {
    navigation.navigate("ErrorFixRegistScreen", { editData: resData });
  };

  const handlePrevImage = () => {
    if (resData) {
      const newIndex =
        currentIndex === 0 ? resData.file_list.length - 1 : currentIndex - 1;
      setSelectedImage(resData.file_list[newIndex].url);
      setCurrentIndex(newIndex);
    }
  };

  const handleNextImage = () => {
    if (resData) {
      const newIndex =
        currentIndex === resData.file_list.length - 1 ? 0 : currentIndex + 1;
      setSelectedImage(resData.file_list[newIndex].url);
      setCurrentIndex(newIndex);
    }
  };
  const renderImageItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => openModal(index)} style={styles.imageItem}>
      <Image source={{ uri: item }} style={styles.roundedImage} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabContainer}>
        <TabNavigator title="이력" routePath="/error-fix/history/list" />
        <TabNavigator title="등록" routePath="/error-fix/regist" />
      </View>
      <Text style={styles.headerText}>장비알람 설정</Text>
      <Text style={styles.subHeaderText}>
        현재까지 문제가 발생하여 조치한 내용들을 확인할 수 있습니다.
      </Text>
      {resData && (
        <>
          <View style={styles.card}>
            <View style={{ paddingVertical: 8, gap: 16 }}>
              <Text style={styles.deviceTypeText}>{resData.device_type}</Text>
              <Image
                source={images.dottedLine}
                resizeMode="cover"
                style={{ width: "100%" }}
              />
              <View style={{ gap: 8 }}>
                <Text style={styles.titleText}>{resData.title}</Text>
                <Text style={styles.contentText}>{resData.content}</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailText}>현장기사</Text>
                  <Image
                    source={images.dottedLine}
                    resizeMode="cover"
                    style={styles.dottedLine}
                  />
                  <Text style={styles.detailText}>{resData.reg_date}</Text>
                  <Image
                    source={images.dottedLine}
                    resizeMode="cover"
                    style={styles.dottedLine}
                  />
                  <Text style={styles.detailText}>
                    조회수: {resData.view_cnt}
                  </Text>

                  {resData.file_list && resData.file_list.length > 0 && (
                    <Image
                      source={icons.img}
                      resizeMode="contain"
                      style={{ width: 16, height: 16 }}
                    />
                  )}

                </View>
                <View style={styles.buttonRow}>
                  <Button
                    title="수정"
                    handlePress={handleEdit}
                    containerStyles={styles.correctBtn}
                    textStyles={styles.correctBtnText}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <View>
              {/* Showing the detail of the content data here */}
              <Image
                source={images.dottedLine}
                resizeMode="cover"
                style={{ width: "100%" }}
              />
            </View>

            {/* Horizontal ScrollView for Images */}
            {resData.file_list && resData.file_list.length > 0 && (
              <FlatList
                data={resData.file_list}
                renderItem={renderImageItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.imageList}
              />
            )}
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              title="목록보기"
              handlePress={() => navigation.goBack()}
              containerStyles={styles.backButton}
              textStyles={styles.buttonText}
            />
          </View>
        </>
      )}

      {/* Modal for Viewing Images */}
      {selectedImage && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={handlePrevImage}
              style={styles.arrowButton}
            >
              <Image source={icons.leftArrow} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
            <TouchableOpacity
              onPress={handleNextImage}
              style={styles.arrowButton}
            >
              <Image source={icons.rightArrow} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Button
              title="닫기"
              handlePress={() => setModalVisible(false)}
              containerStyles={styles.closeButton}
              textStyles={styles.buttonText}
            />
          </View>
        </Modal>
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
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  dottedLine: {
    width: 1,
    height: 14,
  },
  correctBtn: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  correctBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonWrapper: {
    alignItems: "center",
    marginVertical: 16,
  },
  backButton: {
    borderColor: "#FFF",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 16,
    width: 130,
    height: 44,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    flexDirection: "row",
  },
  modalImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#E83830",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
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
  imageContainer: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 8,
    padding: 20,
    height: 200,
    marginBottom: 20,
  },
  arrowButton: {
    padding: 10,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFF",
  },
  imageList: {
    marginTop: 16,
  },
  roundedImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  imageItem: {
    alignItems: "center",
    marginRight: 15,
  },
  imageText: {
    color: "#FFF",
    marginTop: 5,
    fontSize: 12,
  },
});
export default ErrorFixDetailScreen;
