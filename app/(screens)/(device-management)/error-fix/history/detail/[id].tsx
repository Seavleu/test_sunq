import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image, 
  StyleSheet,
  ScrollView,
  Modal, 
} from "react-native";
import { RouteProp ,useRoute, useNavigation } from "@react-navigation/native";
import { DEVICE_API } from "@/service/api/apis";
import { icons, images } from "@/constants";
import Button from "@/components/Button";

type RootStackParamList = {
  ErrorFixDetailScreen: { id: number };
};

type ErrorFixDetailScreenRouteProp = RouteProp<RootStackParamList, 'ErrorFixDetailScreen'>;

const route = useRoute<ErrorFixDetailScreenRouteProp>();
const { id } = route.params;

const ErrorFixDetailScreen = () => {
  const [resData, setResData] = useState(null);
  const [title, setTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);  
  const [selectedImage, setSelectedImage] = useState(null);  


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
      {resData && (
        <>
          <View style={styles.infoBox}>
            <Text
              style={{
                color: "#7B7B8B",
                fontSize: 20,
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {resData.device_type}
            </Text>
            <Image
              source={images.dottedLine}
              resizeMode="contain"
              style={{ width: "100%" }}
            />
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>
              <Text style={{ fontSize: 16 }}>{resData.content}</Text>
              <View
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <Text style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.5)" }}>
                  현장기사
                </Text>
                <View style={styles.dottedLine}></View>
                <Text style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.5)" }}>
                  {resData.reg_date}
                </Text>
                <View style={styles.dottedLine}></View>
                <Text style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.5)" }}>
                  조회수: {resData.view_cnt}
                </Text>
                <View style={styles.dottedLine}></View>
                <Image
                  source={icons.img}
                  resizeMode="contain"
                  style={{ width: 16, height: 16 }}
                />
              </View>

              <View style={{ flexDirection: "row", gap: 16, marginTop: 16 }}>
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

          <View className="border-white/50 border-[1px] rounded-md w-full h-[390px] mb-4">
            <Image
              source={images.dottedLine}
              resizeMode="contain"
              className="w-full"
            />
            {/* register image */}
          </View>
          <Button
            title="목록보기"
            handlePress={() => navigation.goBack()}
            containerStyles={styles.backButton}
            textStyles={styles.buttonText}
          />
        </>
      )}

      {/* Modal for Viewing Images */}
      {selectedImage && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
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
    backgroundColor: "#1B1C3A",
    flex: 1,
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
  backButton: {
    borderColor: "#FFF",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 16,
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
