import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, FlatList, ScrollView, Image, TouchableOpacity, Modal, Alert, TouchableWithoutFeedback } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import TabNavigator from "@/components/TabNavigator";
import { images, icons } from "@/constants";
import errorFixList from "@/constants/errorFixList";
import styles from "./styles";

// Static device error list from errorFixList
const staticDeviceErrList = errorFixList.map((item) => ({
  device_error_seq: item.device_error_fix_seq,
  title: item.title,
}));

const ErrorFixRegistScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [selectTitle, setSelectTitle] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [deviceErrList] = useState(staticDeviceErrList);
  
  const [reqData, setReqData] = useState({
    device_error_seq: null,
    title: null,
    content: null,
    file_seq_list: [],
    plant_seq: "12345",
    reg_user_seq: "67890",
  });

  const dropdownButtonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (route.params && route.params.editData) {
      const editData = route.params.editData;
      setReqData({
        device_error_seq: editData.device_error_seq,
        title: editData.title,
        content: editData.content,
        file_seq_list: editData.file_list || [],
        plant_seq: "12345",
        reg_user_seq: "67890",
      });
      setSelectTitle(editData.title);
      setFiles(editData.file_list || []);
    }
  }, [route.params]);

  const handleTitleSelect = (item) => {
    setSelectTitle(item.title);
    setReqData((prevState) => ({
      ...prevState,
      device_error_seq: item.device_error_seq,
      title: item.title,
    }));
    setDropdownVisible(false);
  };

  const handleInputChange = (key, value) => {
    setReqData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSubmit = () => {
    if (!reqData.title || !reqData.content) {
      Alert.alert("Validation Error", "Title and content are required.");
      return;
    }
    Alert.alert("Success", "Registration completed with static data.");
    console.log("Submitted Data:", reqData);
  };

  const handleFileSelection = async () => {
    Alert.alert(
      "Select File Type",
      "Choose the type of file you want to attach:",
      [
        {
          text: "Image",
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
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleAddFile = () => {
    if (selectedFile) {
      setFiles((prevState) => [...prevState, selectedFile]);
      setSelectedFile(null);
    }
  };

  const handleDeleteFile = (index) => {
    setFiles((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleInputFocus = (inputRef) => {
    inputRef.current.setNativeProps({ style: styles.inputFocused });
  };

  const handleInputBlur = (inputRef) => {
    inputRef.current.setNativeProps({ style: styles.input });
  };

  const openDropdown = () => {
    dropdownButtonRef.current.measure((fx, fy, width, height, px, py) => {
      setDropdownPosition({ top: py + height, left: px, width: width });
      setDropdownVisible(true);
    });
  };

  const renderDropdown = () => (
    <Modal
      visible={dropdownVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setDropdownVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={[styles.modalContent, { top: dropdownPosition.top, left: dropdownPosition.left, width: dropdownPosition.width }]}>
        <FlatList
          data={deviceErrList}
          keyExtractor={(item) => item.device_error_seq.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleTitleSelect(item)}>
              <Text style={styles.dropdownItemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabContainer}>
        <TabNavigator title="이력" routePath="ErrorFixListScreen" />
        <TabNavigator title="등록" routePath="ErrorFixRegistScreen" />
      </View>
      <Text style={styles.title}>문제조치 등록</Text>
      <Text style={styles.subtitle}>문제가 발생하여 조치한 내용을 현장 사진과 함께 등록해 주세요.</Text>
      <View style={styles.formGroup}>
        <TouchableOpacity ref={dropdownButtonRef} style={[styles.input, dropdownVisible && styles.inputFocused]} onPress={openDropdown}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={styles.inputText}>{selectTitle || "장치상태 선택"}</Text>
            <Image source={icons.down02} resizeMode="contain" style={[styles.arrowIcon, dropdownVisible && styles.arrowIconOpen]} />
          </View>
        </TouchableOpacity>

        {renderDropdown()}

        <TextInput
          style={styles.input}
          placeholder="문제조치 내용의 제목을 입력해 주세요."
          value={reqData.title}
          onChangeText={(text) => handleInputChange("title", text)}
          placeholderTextColor="#7B7B8B"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="문제조치 내용 입력"
          value={reqData.content}
          onChangeText={(text) => handleInputChange("content", text)}
          multiline={true}
          placeholderTextColor="#7B7B8B"
        />
      </View>

      <View style={styles.attachmentContainer}>
        <Text style={styles.attachmentTitle}>현장사진 첨부</Text>
        <Text style={styles.attachmentSubtitle}>현장사진은 최대 10장까지 등록 가능합니다.</Text>
        <Image source={images.dottedLine} style={styles.dottedLine} resizeMode="contain" />

        {files.map((file, index) => (
          <View key={index} style={styles.fileRow}>
            <Text style={styles.selectedFileText}>{file.name || file.uri.split("/").pop()}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteFile(index)}>
              <Text style={styles.deleteButtonText}>삭제</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TextInput
          style={styles.fileInput}
          placeholder="파일을 등록해주세요."
          placeholderTextColor="#7B7B8B"
          value={selectedFile?.name || selectedFile?.uri?.split("/").pop() || ""}
          editable={false}
        />

        <View style={styles.addCancelButtons}>
          <TouchableOpacity style={styles.selectFileButton} onPress={handleFileSelection}>
            <Text style={styles.selectFileButtonText}>파일 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddFile} disabled={!selectedFile}>
            <Text style={styles.addButtonText}>추가</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{reqData.device_error_seq ? "문제조치 수정" : "문제조치 등록"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => Alert.alert("취소됨", "등록이 취소되었습니다.")}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerSpace} />
    </ScrollView>
  );
};

export default ErrorFixRegistScreen;
