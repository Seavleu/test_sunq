import { StyleSheet } from 'react-native';
import theme from '@/constants/theme';

const commonTextStyles = {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  };
  
  const buttonStyles = {
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  };
  
  const commonImageStyles = {
    width: '100%',
    resizeMode: 'cover',
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: theme.spacing.medium,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    tabContainer: {
      flexDirection: 'row',
      marginBottom: theme.spacing.large,
    },
    headerText: {
      ...theme.typography.header,
      marginBottom: theme.spacing.small,
    },
    subHeaderText: {
      ...theme.typography.subtitle,
      marginBottom: theme.spacing.large,
    },
    card: {
      backgroundColor: theme.colors.white,
      borderRadius: theme.spacing.small,
      padding: theme.spacing.large,
      marginBottom: theme.spacing.large,
    },
    dottedLine: {
      ...commonImageStyles,
      width: 1,
      height: 14,
    },
    correctBtn: {
      ...buttonStyles,
      backgroundColor: '#111',
      flex: 1,
    },
    correctBtnText: {
      ...commonTextStyles,
      color: theme.colors.white,
      fontSize: 16,
    },
    buttonWrapper: {
      alignItems: 'center',
      marginVertical: theme.spacing.xLarge, 

    },
    backButton: {
      ...buttonStyles,
      borderColor: theme.colors.white,
      borderWidth: 1,
      backgroundColor: 'transparent',
      marginBottom: theme.spacing.medium,
      width: 130,
      height: 44,
    },
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: theme.spacing.medium,
      flexDirection: 'row',
    },
    // modalImage: {
    //   width: 300,
    //   height: 300,
    //   marginBottom: theme.spacing.medium,
    // },
    closeButton: {
      ...buttonStyles,
      backgroundColor: theme.colors.error,
    },
    deviceTypeText: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.gray
    },
    titleText: {
      fontSize: 16,
      fontWeight: "bold", 
    },
    contentText: {
      ...commonTextStyles,
      color: theme.colors.black,
      marginBottom: theme.spacing.medium,
    },
    subContentText: {
      ...commonTextStyles,
      color: theme.colors.white,
      marginBottom: theme.spacing.medium,
    },
    detailRow: {
      flexDirection: 'row',
      gap: theme.spacing.medium,
    },
    detailText: {
      fontSize: 12,
      color: theme.colors.gray,
    },
    imageContainer: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.gray,
      borderRadius: theme.spacing.small,
      padding: theme.spacing.large,
      height: 400,
      marginBottom: theme.spacing.large,
    },
    arrowButton: {
      padding: theme.spacing.small,
    },
    arrowIcon: {
      width: 8,
      height: 16,
      opacity: 0.5,
    },
    imageList: {
      marginTop: theme.spacing.medium,
    },
    roundedImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: theme.spacing.small,
    },
    imageItem: {
      alignItems: 'center',
      marginRight: theme.spacing.small,
    },
    imageText: {
      color: theme.colors.white,
      marginTop: theme.spacing.small,
      fontSize: 12,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.spacing.medium,
    },
    contentContainer: {
      marginTop: -50,
      marginBottom: theme.spacing.small,
      width: '90%',
      alignItems: 'start',
    },
    imageSection: {
      marginTop: theme.spacing.medium,
    },
    imageIcon: {
      width: 9,
      height: 12,
      tintColor: theme.colors.gray,
    },
    buttonText: {
      ...commonTextStyles,
      textAlign: 'center',
    },
    contentLayout: {
      width: '100%',
    },
    imageWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginTop: -200,
    },
    imageSectionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dottedLineContainer: {
      marginTop: 200,
      alignItems: 'center',
      marginVertical: 150,
    },
    roundedImageLarge: {
      width: 150,
      height: 150,
      borderRadius: theme.spacing.small,
    },
    captionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing.small,
    },
    imageCaption: {
      ...commonTextStyles,
      marginRight: theme.spacing.small,
    },
    noImageText: {
      ...commonTextStyles,
      textAlign: 'center',
    },
    footerSpace: {
      height: theme.spacing.xLarge,  
    },

    thumbnailContainer: {
      flexDirection: "row", 
      marginVertical: 10,   
      flexWrap: "wrap",  
    },
    thumbnailImage: {
      width: 60,
      height: 60,
      borderRadius: 60,
      marginRight: 40,     
      marginBottom: 10,    
    },
   
    // Modal Styles
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: 340,
      borderRadius: 14,
      backgroundColor: "#FFF",
      padding: 20,
      boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.10)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    iconClose: {
      width: 20,
      height: 20,
      tintColor: "#000",
    },
    modalImage: {
      width: 300,
      height: 190,
      marginVertical: 10,
      backgroundColor: "black", // Fallback color in case image is not available
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 10,
    },
    icon: {
      width: 30,
      height: 30,
      tintColor: "#000",
    },
  });
  
  export default styles;