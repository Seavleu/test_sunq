import React, { useEffect, useState } from "react";
import styles from "./styles";
import {View,Text,Image, ScrollView,Modal,TouchableOpacity} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { icons, images } from "@/constants";
import Button from "@/components/Button";
import TabNavigator from "@/components/TabNavigator"; 
import errorFixList from "@/constants/errorFixList";

const ErrorFixDetailScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [resData, setResData] = useState({
    device_error_seq: null,
    title: null,
    content: null,
    file_list: [],
    plant_seq: "12345",
    reg_user_seq: "67890",
  });

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
      const data = errorFixList.find(
        (item) => item.device_error_fix_seq === id
      );
      if (data) {
        console.log("Content:", data.content);
        setResData(data);
        if (data.file_list && data.file_list.length > 0) {
          setSelectedImage(data.file_list[0]);
        } else {
          setSelectedImage(null);
        }
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
    if (resData.file_list && resData.file_list.length > 0) {
      const newIndex =
        currentIndex === 0 ? resData.file_list.length - 1 : currentIndex - 1;
      setSelectedImage(resData.file_list[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const handleNextImage = () => {
    if (resData.file_list && resData.file_list.length > 0) {
      const newIndex =
        currentIndex === resData.file_list.length - 1 ? 0 : currentIndex + 1;
      setSelectedImage(resData.file_list[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

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

          {/* Image section should always render, even if no images exist */}
          <View style={styles.imageContainer}>
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.subContentText}>{resData.content}</Text>
              <View style={styles.dottedLineContainer}>
                <Image
                  source={images.dottedLine}
                  resizeMode="cover"
                  style={{ width: "100%" }}
                />
              </View>
            </View>
            <View style={styles.imageWrapper}>
              <TouchableOpacity
                onPress={handlePrevImage}
                style={styles.arrowButton}
                disabled={!selectedImage}
              >
                <Image source={icons.prev01} style={styles.arrowIcon} />
              </TouchableOpacity>

              <View style={{ flex: 1 }}>
                <View style={styles.imageSectionContainer}>
                  <View style={styles.contentLayout}>
                    <View style={styles.contentContainer}>
                      <View style={styles.imageSection}>
                        {selectedImage ? (
                          <Image
                            source={{ uri: selectedImage.url }}
                            style={styles.roundedImageLarge}
                          />
                        ) : (
                          <Text style={styles.noImageText}></Text>
                        )}
                        <View style={styles.captionContainer}>
                          <Text style={styles.imageCaption}>
                            {selectedImage?.name}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleNextImage}
                style={styles.arrowButton}
                disabled={!selectedImage}
              >
                <Image source={icons.next01} style={styles.arrowIcon} />
              </TouchableOpacity>
            </View>
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

      {/* Modal for viewing images */}
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
              <Image source={icons.prev01} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Image
              source={{ uri: selectedImage.url }}
              style={styles.modalImage}
            />
            <TouchableOpacity
              onPress={handleNextImage}
              style={styles.arrowButton}
            >
              <Image source={icons.next01} style={styles.arrowIcon} />
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

      <View style={styles.footerSpace} />
    </ScrollView>
  );
};
export default ErrorFixDetailScreen;
