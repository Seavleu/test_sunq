// Auth Types
export interface LoginRequest {
    user_id: string;
    user_pw: string;
    sun_q_a_t: string;
}

export interface LoginResponse {
    result: string;  
    message: string;
    data: {
        token: string;
        user_seq: number;
        plant_seq?: number;
        plant_name?: string;
    };
}

export interface AutoLogin {
    user_id: string;
    user_pw: string;
    sun_q_a_t: string;
    token?: string
}

// Setup API Types
export interface UpdatePasswordRequest {
    user_pw_org: string;
    user_pw: string;
}

export interface CheckPasswordRequest {
    user_seq: string;
    user_pw: string;
}

export interface CheckAlarmRequest {
    device_error_code_seq: string;
    is_use: string;
    plant_seq: string;
}

export interface SaveAlarmUserRequest {
    user_name: string;
    mobile_phone: string;
    email: string;
    plant_seq: string;
    plant_user_seq: string;
    plant_alarm_seq: string;
}

export interface DeleteAlarmUserRequest {
    user_name: string;
    mobile_phone: string;
    email: string;
    plant_seq: string;
    plant_user_seq: string;
    plant_alarm_seq: string;
}

export interface GetDeviceAlarmListRequest {
    plant_seq: string;
}

export interface GetAlarmUserListRequest {
    plant_seq: string;
}

// Device API Types
export interface GetInspectionListRequest {
    plant_seq: string;
    query_search: string;
    query_value: string;
    page: string;
}

export interface GetInspectionDetailRequest {
    inspection_seq: string;
}

export interface UpdateInspectionRequest {
    ins_type: string;
    title: string;
    content: string;
    plant_seq: string;
    reg_user_seq: string;
    file_seq_list: string;
    inspection_seq: string;
}

export interface SaveInspectionRequest {
    ins_type: string;
    title: string;
    content: string;
    plant_seq: string;
    reg_user_seq: string;
    file_seq_list: string;
    inspection_seq: string;
}

export interface DeleteInspectionRequest {
    inspection_seq: string;
}

export interface GetErrorFixDetailRequest {
    device_error_fix_seq: string;
}

export interface UpdateErrorFixRequest {
    device_error_seq: string;
    title: string;
    content: string;
    plant_seq: string;
    reg_user_seq: string;
    file_seq_list: string;
    device_error_fix_seq: string;
}

export interface SaveErrorFixRequest {
    device_error_seq: string;
    title: string;
    content: string;
    plant_seq: string;
    reg_user_seq: string;
    file_seq_list: string;
    device_error_fix_seq: string;
}

export interface DeleteErrorFixRequest {
    device_error_fix_seq: string;
}

export interface GetErrorFixListRequest {
    plant_seq: string;
    query_search: string;
    query_value: string;
    page: string;
}

export interface GetErrorFixTitleListRequest {
    plant_seq: string;
}

export interface GetInverterStatsRequest {
    plant_seq: string;
}

export interface GetErrorAlarmListRequest {
    plant_seq: string;
    start_date: string;
    end_date: string;
    page: string;
}
