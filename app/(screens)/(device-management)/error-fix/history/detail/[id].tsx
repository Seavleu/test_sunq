import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Modal, TouchableOpacity } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { icons, images } from "@/constants";

import {Button, TabNavigator} from "@/components"; 
import errorFixList from "@/constants/errorFixList";
import styles from "./styles";

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

  const route = useRoute<RouteProp<{ ErrorFixDetail: { id: number } }, "ErrorFixDetail">>();
  const { id } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Navigated with ID:", id);
    const fetchData = async () => {
      const data = errorFixList.find((item) => item.device_error_fix_seq === id);
      if (data) {
        setResData(data);
        setSelectedImage(data.file_list?.[0] || null);
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

  const handleCloseModal = () => {
    setModalVisible(false)
  }
  

  const handlePrevImage = () => {
    if (resData.file_list.length > 0) {
      const newIndex = currentIndex === 0 ? resData.file_list.length - 1 : currentIndex - 1;
      setSelectedImage(resData.file_list[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const handleNextImage = () => {
    if (resData.file_list.length > 0) {
      const newIndex = currentIndex === resData.file_list.length - 1 ? 0 : currentIndex + 1;
      setSelectedImage(resData.file_list[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const handleEdit = () => {
    navigation.navigate("ErrorFixRegistScreen", { editData: resData });
  };

  const renderDetailHeader = () => (
    <View style={styles.tabContainer}>
      <TabNavigator title="이력" routePath="ErrorFixListScreen" />
      <TabNavigator title="등록" routePath="ErrorFixRegistScreen" />
    </View>
  );

  const renderDetailInfo = () => (
    <View style={styles.card}>
      <View style={{ paddingVertical: 8, gap: 16 }}>
        <Text style={styles.deviceTypeText}>{resData.device_type}</Text>
        <Image source={images.dottedLine} resizeMode="cover" style={{ width: "100%" }} />
        <View style={{ gap: 8 }}>
          <Text style={styles.titleText}>{resData.title}</Text>
          <Text style={styles.contentText}>{resData.content}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>현장기사</Text>
            <Image source={images.dottedLine} resizeMode="cover" style={styles.dottedLine} />
            <Text style={styles.detailText}>{resData.reg_date}</Text>
            <Image source={images.dottedLine} resizeMode="cover" style={styles.dottedLine} />
            <Text style={styles.detailText}>조회수: {resData.view_cnt}</Text>
            {resData.file_list.length > 0 && (
              <Image source={icons.img} resizeMode="contain" style={{ width: 16, height: 16 }} />
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
  );

  const renderImageThumbnails = () => {
    const imagesToShow = resData.file_list.slice(0, 3); 
    const hasMoreImages = resData.file_list.length > 3;

    return (
      <View style={styles.thumbnailContainer}>
        {imagesToShow.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => openModal(index)}>
            <Image source={{ uri: image.url }} style={styles.thumbnailImage} defaultSource={icons.alarm} />
          </TouchableOpacity>
        ))}
        {hasMoreImages && (
          <View style={styles.moreImagesOverlay}>
            <Text style={styles.moreImagesText}>+{resData.file_list.length - 3} more</Text>
          </View>
        )}
      </View>
    );
  };

  const renderImageGallery = () => (
    <View style={styles.imageContainer}>
      <View style={{ marginBottom: 16 }}>
        <Text style={styles.subContentText}>{resData.content}</Text>
        <View style={styles.dottedLineContainer}>
          <Image source={images.dottedLine} resizeMode="cover" style={{ width: "100%" }} />
        </View>
      </View>

      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={handlePrevImage} style={styles.arrowButton} disabled={!selectedImage}>
          <Image source={icons.prev01} style={styles.arrowIcon} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <View style={styles.imageSectionContainer}>
            <View style={styles.contentLayout}>
              <View style={styles.contentContainer}>
                <View style={styles.imageSection}>
                  {selectedImage ? (
                    <Image source={{ uri: selectedImage.url }} style={styles.roundedImageLarge} />
                  ) : (
                    <Text style={styles.noImageText}></Text>
                  )}
                  <View style={styles.captionContainer}>
                    <Text style={styles.imageCaption}>{selectedImage?.name}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleNextImage} style={styles.arrowButton} disabled={!selectedImage}>
          <Image source={icons.next01} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      {/* Render image thumbnails below */}
      {renderImageThumbnails()}
    </View>
  );

  const renderModal = () => (
    selectedImage && (
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedImage.name}</Text>
            <TouchableOpacity onPress={handleCloseModal}>
              <Image source={icons.close} style={styles.iconClose} />
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: selectedImage.url }}
            style={styles.modalImage}
            resizeMode="contain"
          />

          <View style={styles.modalActions}>
            <TouchableOpacity onPress={() => console.log("Expand image")}>
              <Image source={icons.expand} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Zoom in")}>
              <Image source={icons.zoomin} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Zoom out")}>
              <Image source={icons.zoomout} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Download image")}>
              <Image source={icons.download} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    )
  );

  return (
    <ScrollView style={styles.container}>
      {renderDetailHeader()}
      <Text style={styles.headerText}>장비알람 설정</Text>
      <Text style={styles.subHeaderText}>현재까지 문제가 발생하여 조치한 내용들을 확인할 수 있습니다.</Text>
      {resData && (
        <>
          {renderDetailInfo()}
          {renderImageGallery()}
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
      {renderModal()}
      <View style={styles.footerSpace} />
    </ScrollView>
  );
};

export default ErrorFixDetailScreen;
