import {  StyleSheet } from 'react-native';
import theme from '@/constants/theme';
 

const commonTextStyles = {
  fontSize: 16,
  color: theme.colors.text,
  fontWeight: 'bold',
};

const buttonStyles = {
  padding: 16,
  borderRadius: 8,
  alignItems: 'center',
};

const inputStyles = {
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  padding: 10,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "transparent",
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    paddingBottom: theme.spacing.xLarge, 
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: theme.spacing.large,
    zIndex: 2,
  },
  headerText: {
    ...theme.typography.header,
    zIndex: 2,
    marginBottom: theme.spacing.small,
  },
  subHeaderText: {
    ...theme.typography.subtitle,
    marginBottom: theme.spacing.large,
  },
  searchBox: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing.small,
    padding: theme.spacing.large,
    zIndex: 2,
  },
  inpBox: {
    flexDirection: "row",
    marginBottom: theme.spacing.small,
    zIndex: 3,
  },
  deviceTypeText: {
    ...commonTextStyles,
    fontSize: 20,
    textAlign: "center",
    color: theme.colors.gray,
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
    gap: theme.spacing.medium,
  },
  detailText: {
    fontSize: 12,
    color: theme.colors.gray,
  },
  selectInput: {
    ...inputStyles,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 3,
  },
  selectText: {
    color: theme.colors.white,
    fontSize: 16,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: theme.colors.white,
  },
  arrowIconOpen: {
    transform: [{ rotate: "180deg" }],
  },
  dropdown: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.small,
    zIndex: 4,
    elevation: 5,
  },
  dropdownItem: {
    padding: theme.spacing.small,
    backgroundColor: "rgba(1, 1, 1, 0.05)",
  },
  dropdownItemText: {
    color: "#111",
  },
  selectedItem: {
    backgroundColor: theme.colors.white,
  },
  selectedItemText: {
    color: "#111",
    fontWeight: "bold",
  },
  textInput: {
    ...inputStyles,
    flex: 2,
    color: theme.colors.white,
    marginLeft: theme.spacing.small,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchButton: {
    ...buttonStyles,
    backgroundColor: "#111111",
    flex: 1,
    marginRight: theme.spacing.small,
  },
  resetButton: {
    ...buttonStyles,
    backgroundColor: "#474747",
    flex: 1,
  },
  card: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    marginBottom: theme.spacing.medium,
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
    marginVertical: theme.spacing.medium,
  },
  transparentButton: {
    borderWidth: 1,
    borderColor: theme.colors.white,
    padding: 12,
    borderRadius: theme.spacing.small,
    backgroundColor: "transparent",
    width: 130,
    height: 44,
  },
  buttonText: {
    color: theme.colors.white,
    textAlign: "center",
  },
  blackButton: {
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
  blackButtonText: {
    color: "rgba(0, 0, 0, 0.5)",
  },
  footerSpace: {
    height: theme.spacing.xLarge,  
  },
});

export default styles;
