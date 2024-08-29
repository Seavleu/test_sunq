import apiClient from "./config";

import {
  LoginRequest,
  AutoLogin,
  UpdatePasswordRequest,
  CheckPasswordRequest,
  CheckAlarmRequest,
  SaveAlarmUserRequest,
  DeleteAlarmUserRequest,
  GetDeviceAlarmListRequest,
  GetAlarmUserListRequest,
  GetInspectionListRequest,
  GetInspectionDetailRequest,
  UpdateInspectionRequest,
  SaveInspectionRequest,
  DeleteInspectionRequest,
  GetErrorFixDetailRequest,
  UpdateErrorFixRequest,
  SaveErrorFixRequest,
  DeleteErrorFixRequest,
  GetErrorFixListRequest,
  GetErrorFixTitleListRequest,
  GetInverterStatsRequest,
  GetErrorAlarmListRequest,
} from "../types/apiTypes";

export const LOGIN_API = {
  login: (data: LoginRequest) => apiClient.post("/api/login/auth", data),
  autoLogin: (data: AutoLogin) => apiClient.post("/api/login/authAuto", data),
};

export const DEVICE_API = {
  getInspectionList: (data: GetInspectionListRequest) => apiClient.get("/api/device/inspection/list", { params: data }),
  getInspectionDetail: (data: GetInspectionDetailRequest) => apiClient.get("/api/device/inspection", { params: data }),
  updateInspection: (data: UpdateInspectionRequest) => apiClient.put("/api/device/inspection", data),
  saveInspection: (data: SaveInspectionRequest) => apiClient.post("/api/device/inspection", data),
  deleteInspection: (data: DeleteInspectionRequest) => apiClient.delete("/api/device/inspection", { params: data }),
  getErrorFixDetail: (data: GetErrorFixDetailRequest) => apiClient.get("/api/device/error_fix/info", { params: data }),
  updateErrorFix: (data: UpdateErrorFixRequest) => apiClient.put("/api/device/error_fix", data),
  saveErrorFix: (data: SaveErrorFixRequest) => apiClient.post("/api/device/error_fix", data),
  deleteErrorFix: (data: DeleteErrorFixRequest) => apiClient.delete("/api/device/error_fix", { params: data }),
  getErrorFixList: (data: GetErrorFixListRequest) => apiClient.get("/api/device/error_fix/list", { params: data }),
  getErrorFixTitleList: (data: GetErrorFixTitleListRequest) => apiClient.get("/api/device/error_fix/title_list", { params: data }),
  getInverterStats: (data: GetInverterStatsRequest) => apiClient.get("/api/device/inveter/stats", { params: data }),
  getErrorAlarmList: (data: GetErrorAlarmListRequest) => apiClient.get("/api/device/error/list", { params: data }),
};
