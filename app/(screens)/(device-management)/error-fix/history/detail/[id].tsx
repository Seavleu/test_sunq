import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Modal } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { DEVICE_API } from "@/service/api/apis";
import { icons, images } from "@/constants";
import {Button, TabNavigator} from "@/components";
import theme from "@/constants/theme";

const ErrorFixDetailScreen = () => {
  const [resData, setResData] = useState(null);
  const [title, setTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await DEVICE_API.getErrorFixDetail({
        device_error_fix_seq: id,
      });
      setResData(response.data);
      setTitle(response.data.title);
      setFileList(response.data.file_list || []);
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

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
          <View style={styles.infoBox}>
            <Text style={styles.deviceType}>{resData.device_type}</Text>
            <Image
              source={images.dottedLine}
              resizeMode="contain"
              style={{ width: "100%" }}
            />
            <View style={{ gap: 8 }}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.content}>{resData.content}</Text>
              <View style={styles.detailsRow}>
                <Text style={styles.detailText}>현장기사</Text>
                <View style={styles.dottedLine}></View>
                <Text style={styles.detailText}>{resData.reg_date}</Text>
                <View style={styles.dottedLine}></View>
                <Text style={styles.detailText}>
                  조회수: {resData.view_cnt}
                </Text>
                <View style={styles.dottedLine}></View>
                <Image
                  source={icons.img}
                  resizeMode="contain"
                  style={styles.icon}
                />
              </View>

              <View style={styles.buttonRow}>
                <Button
                  title="수정"
                  handlePress={() => {
                    /* handle update */
                  }}
                  containerStyles={styles.correctBtn}
                  textStyles={styles.correctBtnText}
                />
                <Button
                  title="삭제"
                  handlePress={() => {
                    /* handle delete */
                  }}
                  containerStyles={styles.deleteButton}
                  textStyles={styles.deleteButtonText}
                />
              </View>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={images.dottedLine}
              resizeMode="contain"
              style={styles.fullWidthImage}
            />
            {/* Render additional images here if needed */}
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
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.modalImage}
            />
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
  infoBox: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  dottedLine: {
    width: 1,
    height: 14,
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dotted",
    transform: [{ rotate: "90deg" }],
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
  deleteButton: {
    backgroundColor: "#E83830",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  deleteButtonText: {
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
  submitButton: {
    backgroundColor: "#1A73E8",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
  },
  viewImagesButton: {
    backgroundColor: "#1A73E8",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
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
});
export default ErrorFixDetailScreen;
