import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  PanResponder,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { icons, images } from "@/constants";
import theme from "@/constants/theme";

import { SafeAreaView } from "react-native-safe-area-context";

const ErrorFixRegistScreen = () => {
  const [height, setHeight] = useState(120);
  const [selectTitle, setSelectTitle] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [reqData, setReqData] = useState({
    device_error_seq: null,
    title: "",
    content: "",
    file_seq_list: [],
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);

  const staticDeviceErrList = [
    { device_error_seq: 1, title: "2024-01-30 - 인버터4 AC 출력 과전류" },
    { device_error_seq: 2, title: "2024-01-30 - 인버터3 DC-LINK 센싱 불량" },
    { device_error_seq: 3, title: "2024-01-29 - 인버터4 SPD 이상" },
    { device_error_seq: 4, title: "2024-01-27 - 인버터1 SMPS 이상" },
    { device_error_seq: 5, title: "2024-01-27 - 인버터2 시스템 과열" },
    { device_error_seq: 6, title: "2024-01-26 - 인버터1 누설 전류 검출" },
  ];

  const handleTitleSelect = (item) => {
    setSelectTitle(item.title);
    setReqData({
      ...reqData,
      device_error_seq: item.device_error_seq,
      title: item.title,
    });
    setDropdownVisible(false);
  };

  const handleInputChange = (key, value) => {
    setReqData({ ...reqData, [key]: value });
  };

  const handleSubmit = () => {
    if (!reqData.title || !reqData.content) {
      Alert.alert("유효성 검사 오류", "제목과 콘텐츠는 필수 입력 사항입니다.");
      return;
    }
    Alert.alert("성공", "Registration complete with static data.");
    console.log("제출된 데이터:", reqData);
  };

  // Handle File Section
  const handleFileSelection = async () => {
    Alert.alert(
      "파일 유형 선택",
      "첨부할 파일 유형을 선택합니다:",
      [
        {
          text: "이미지",
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: false,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              setSelectedFile(result.assets[0]);
            }
          },
        },
        {
          text: "문서",
          onPress: async () => {
            let result = await DocumentPicker.getDocumentAsync({
              type: "*/*",
            });

            if (result.type !== "cancel") {
              setSelectedFile(result);
            }
          },
        },
        {
          text: "취소",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleAddFile = () => {
    setFiles([...files, selectedFile]);
    setSelectedFile(null);
  };

  const handleCancelFile = () => {
    setSelectedFile(null);
  };

  const handleDeleteFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Input Focus
  const titleInputRef = useRef(null);
  const contentInputRef = useRef(null);

  const handleFocus = (inputRef) => {
    inputRef.current.setNativeProps({
      style: styles.inputFocused,
    });
  };
  const handleBlur = (inputRef) => {
    inputRef.current.setNativeProps({
      style: styles.input,
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const newHeight = Math.max(40, height + gestureState.dy);
        setHeight(newHeight);
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>문제조치 등록</Text>
        <Text style={styles.subtitle}>
          문제가 발생하여 조치한 내용을 현장 사진과 함께 등록해 주세요.
        </Text>

        <View style={styles.formGroup}>
          <TouchableOpacity
            style={[styles.input, dropdownVisible && styles.inputFocused]}
            onPress={() => setDropdownVisible(true)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.inputText}>
                {selectTitle || "장치상태 선택"}
              </Text>
              <Image
                source={icons.down02}
                resizeMode="contain"
                style={[
                  styles.arrowIcon,
                  dropdownVisible && styles.arrowIconOpen,
                ]}
              />
            </View>
          </TouchableOpacity>

          <Modal
            visible={dropdownVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setDropdownVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <FlatList
                data={staticDeviceErrList}
                keyExtractor={(item) => item.device_error_seq.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleTitleSelect(item)}
                  >
                    <Text style={styles.dropdownItemText}>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Modal>

          <TextInput
            ref={titleInputRef}
            style={styles.input}
            placeholder="문제조치 내용의 제목을 입력해 주세요."
            value={reqData.title}
            onChangeText={(text) => handleInputChange("title", text)}
            placeholderTextColor="#7B7B8B"
            onFocus={() => handleFocus(titleInputRef)}
            onBlur={() => handleBlur(titleInputRef)}
          />
          <TextInput
            ref={contentInputRef}
            style={[styles.input, styles.textArea]}
            placeholder="문제조치 내용 입력"
            value={reqData.content}
            onChangeText={(text) => handleInputChange("content", text)}
            multiline={true}
            placeholderTextColor="#7B7B8B"
            onFocus={() => handleFocus(contentInputRef)}
            onBlur={() => handleBlur(contentInputRef)}
          />
          {/* <View style={styles.container}>
            <TextInput
              style={[styles.input, { height }]}
              placeholder="정기점검 내용 입력"
              value={reqData.content}
              onChangeText={(text) => handleInputChange("content", text)}
              multiline={true}
              placeholderTextColor="#7B7B8B"
            />

            // Resizable Corner
            <View
              style={styles.resizeHandle}
              {...panResponder.panHandlers}  
            />
          </View> */}
        </View>

        {/* Image Attachment Section */}
        <View style={styles.attachmentContainer}>
          <Text style={styles.attachmentTitle}>현장사진 첨부</Text>
          <Text style={styles.attachmentSubtitle}>
            현장사진은 최대 10장까지 등록 가능합니다.
          </Text>
          <Image
            source={images.dottedLine}
            style={styles.dottedLine}
            resizeMode="contain"
          />

          {files.map((file, index) => (
            <View key={index} style={styles.fileRow}>
              <Text style={styles.selectedFileText}>
                {file.name || file.uri.split("/").pop()}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteFile(index)}
              >
                <Text style={styles.deleteButtonText}>삭제</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TextInput
            style={styles.fileInput}
            placeholder="파일을 등록해주세요."
            placeholderTextColor="#7B7B8B"
            value={
              selectedFile?.name || selectedFile?.uri?.split("/").pop() || ""
            }
            editable={false}
          />

          <View style={styles.addCancelButtons}>
            <TouchableOpacity
              style={styles.selectFileButton}
              onPress={handleFileSelection}
            >
              <Text style={styles.selectFileButtonText}>파일 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddFile}
              disabled={!selectedFile}
            >
              <Text style={styles.addButtonText}>추가</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleCancelFile}
            >
              <Text style={styles.addButtonText}>삭제</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {reqData.device_error_seq ? "문제조치 수정" : "문제조치 등록"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => Alert.alert("Cancelled", "Registration cancelled.")}
          >
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const commonButtonStyle = {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  height: 50,
};

const commonTextStyle = {
  color: "#fff",
  fontWeight: "500",
  fontSize: 16,
  textAlign: "center",
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#000C65",
  },
  container: {
    padding: 16,
    backgroundColor: theme.colors.background,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "transparent",
  },
  resizeHandle: {
    width: 10,
    height: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    right: 10,
    bottom: 10,
    transform: [{ rotate: "45deg" }],
  },
  inputFocused: {
    borderColor: "#fff",
  },
  inputText: {
    color: "#fff",
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: "#fff",
    transform: [{ rotate: "0deg" }],
  },
  arrowIconOpen: {
    transform: [{ rotate: "180deg" }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "92%",
    margin: 17,
    top: 340,
    position: "absolute",
  },
  dropdownItem: {
    padding: 14,
  },
  dropdownItemText: {
    color: "#333",
  },
  textArea: {
    height: 200,
    textAlignVertical: "top",
  },

  // Submit and Cancel buttons
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  submitButton: {
    backgroundColor: "#E83830",
    marginRight: 8,
    ...commonButtonStyle,
  },
  cancelButton: {
    backgroundColor: "#111",
    ...commonButtonStyle,
  },
  buttonText: {
    ...commonTextStyle,
    fontSize: 20,
    fontWeight: "700",
  },

  attachmentContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 20,
    borderRadius: 8,
    marginBottom: 24,
  },
  attachmentTitle: {
    fontSize: 18,
    color: "#fff",
  },
  attachmentSubtitle: {
    fontSize: 14,
    color: "#7B7B8B",
    marginBottom: 12,
  },
  dottedLine: {
    width: "100%",
    height: 2,
  },
  fileInput: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    marginTop: 20,
    color: "#fff",
    width: "100%",
  },

  addCancelButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  // Add, Delete, Select File buttons
  addButton: {
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "transparent",
    ...commonButtonStyle,
  },
  addButtonText: {
    ...commonTextStyle,
  },

  deleteButton: {
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "transparent",
    width: "100%",
    borderRadius: 8,
    padding: 14,
  },
  deleteButtonText: {
    ...commonTextStyle,
  },

  selectFileButton: {
    backgroundColor: "#fff",
    ...commonButtonStyle,
  },
  selectFileButtonText: {
    color: "#000",
    fontWeight: "bold",
  },

  fileRow: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 12,
    width: "100%",
    gap: 10,
  },

  selectedFileText: {
    color: "#fff",
    backgroundColor: "#3F3F3F",
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 8,
    width: "100%",
    textAlign: "center",
  },
});

export default ErrorFixRegistScreen;
