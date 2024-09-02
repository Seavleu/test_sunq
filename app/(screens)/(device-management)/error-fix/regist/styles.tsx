import { StyleSheet } from "react-native";
import theme from "@/constants/theme";

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
  color: theme.colors.white,
  fontWeight: "500",
  fontSize: 16,
  textAlign: "center",
};

const commonInputStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: 8,
  color: theme.colors.white,
  borderWidth: 1,
  borderColor: "transparent",
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: theme.spacing.large,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.white,
    marginBottom: theme.spacing.medium,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.white,
    marginBottom: theme.spacing.xLarge,
  },
  formGroup: {
    marginBottom: theme.spacing.xLarge,
  },
  input: {
    ...commonInputStyle,
    padding: 20,
    marginBottom: theme.spacing.medium,
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
    borderColor: theme.colors.white,
  },
  inputText: {
    color: theme.colors.white,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: theme.colors.white,
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
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: 20,
    position: "absolute",
    zIndex: 1000,
  },
  dropdownItem: {
    padding: theme.spacing.medium,
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
    padding: theme.spacing.medium,
  },
  submitButton: {
    backgroundColor: "#E83830",
    marginRight: theme.spacing.small,
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
    marginBottom: theme.spacing.xLarge,
  },
  attachmentTitle: {
    fontSize: 18,
    color: theme.colors.white,
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
    ...commonInputStyle,
    padding: 20,
    marginBottom: theme.spacing.small,
    marginTop: theme.spacing.large,
    width: "100%",
  },

  addCancelButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  // Add, Delete, Select File buttons
  addButton: {
    borderColor: theme.colors.white,
    borderWidth: 1,
    backgroundColor: "transparent",
    ...commonButtonStyle,
  },
  addButtonText: {
    ...commonTextStyle,
  },

  deleteButton: {
    borderColor: theme.colors.white,
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
    backgroundColor: theme.colors.white,
    ...commonButtonStyle,
  },
  selectFileButtonText: {
    color: theme.colors.black,
    fontWeight: "bold",
  },

  fileRow: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing.medium,
    width: "100%",
    gap: 10,
  },
  selectedFileText: {
    color: theme.colors.white,
    backgroundColor: "#3F3F3F",
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 8,
    width: "100%",
    textAlign: "center",
  },
  footerSpace: {
    height: theme.spacing.xLarge,
  },
});

export default styles;
