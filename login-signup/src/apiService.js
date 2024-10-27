// src/apiService.js
import axios from 'axios';

// Địa chỉ URL của backend
const API_URL = 'http://localhost:8080/api/auth'; // Thay đổi nếu cần
const API_Verify = 'http://localhost:8080/api/verification';
const API_Users = 'http://localhost:8080/api/users';


// Hàm đăng ký người dùng
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data; // Xử lý lỗi nếu có
    }
};

// Hàm xác minh người dùng
export const verifyUser = async (email, code) => {
    try {
        const response = await axios.post(`${API_URL}/verify`, null, {
            params: { email, code },
        });
        return response.data;
    } catch (error) {
        throw error.response.data; // Xử lý lỗi nếu có
    }
};

// Hàm đăng nhập người dùng
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response); // Log the full error response
        throw error.response.data; // Xử lý lỗi nếu có
    }
};

// Hàm đăng xuất người dùng
export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
        return response.data; // Trả về thông điệp thành công
    } catch (error) {
        throw error.response.data; // Xử lý lỗi nếu có
    }
};

export const checkLoggedIn = async () => {
    try {
        const response = await axios.post(`${API_URL}/checklogin`, { withCredentials: true });
        return response.data; // Trả về kết quả kiểm tra
    } catch (error) {
        throw error.response.data; // Xử lý lỗi nếu có
    }
};

// Hàm gửi yêu cầu reset password
export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/forgotpassword`, { email });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Hàm reset password
export const resetPassword = async ({ email, code, newPassword }) => {
    try {
        const response = await axios.post(`${API_URL}/resetpassword`, { email, code, newPassword });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const swipeUser = async (swipeRequest) => {
    try {
        const response = await axios.post(`${API_URL}/swipe`, swipeRequest);
        return response.data;
    } catch (error) {
        throw error.response.data; // Xử lý lỗi nếu có
    }
};

// Hàm lưu sở thích người dùng
export const saveHobbies = async (email, hobbies) => {
    try {
        const response = await axios.post(`${API_URL}/hobbies`, { email, hobbies }, {
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Something went wrong' };
    }
};


export const getUserId = async (email) =>{
    try{
        const response = await axios.post(`${API_URL}/getID`,null, {
            params: {
                email: email
            }
        });
        return response.data
    }catch(error){
        throw error.response? error.response.data : {error: "Something went wrong"}
    }
}

// Hàm lưu thông tin người dùng (profile)
export const saveUserProfile = async (profileData) => {
    try {
        const response = await axios.post(`${API_URL}/saveUserProfile`, profileData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Something went wrong' };
    }
};


export const banUser = async ({userId, bannedReasonId, reportId}) => {
    try {
        const requestBody = {
            userId: userId,
            bannedReasonId: bannedReasonId,
            reportId: reportId
        };

        // Send the POST request with the request body
        const response = await axios.post(`${API_URL}/ban`, requestBody);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: "Something went wrong" };
    }
};

export const unbanUser = async (bannedId) => {
    const response = await axios.post(`${API_URL}/unban`, null, {
        params: { bannedId },
    });
    return response.data;
};

// Hàm lấy danh sách yêu cầu xác minh
export const getVerifyRequests = async () => {
    try {
        const response = await axios.get(`${API_Verify}/requests`); // Endpoint để lấy yêu cầu
        return response.data; // Trả về danh sách yêu cầu
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Something went wrong' };
    }
};

// Hàm phê duyệt yêu cầu xác minh
export const verifyProfile = async (requestId) => {
    try {
        const response = await axios.post(`${API_Verify}/verify/${requestId}`); // Gọi API phê duyệt
        return response.data; // Trả về thông tin xác minh
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Something went wrong' };
    }
};

// Hàm xóa yêu cầu xác minh
export const deleteVerifyRequest = async (requestId) => {
    try {
        await axios.delete(`${API_Verify}/reject/${requestId}`); // Gọi API để xóa yêu cầu
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Something went wrong' };
    }
};
  

export const getBannedUsers = async () => {
    const response = await axios.post(`${API_URL}/getBannedList`);
    return response.data; // Trả về dữ liệu
};


export const getReportedUsers = async () => {
    try {
        const response = await axios.post(`${API_URL}/getReportedList`); // Đổi từ GET sang POST nếu cần
        return response.data;
    } catch (error) {
        console.error('Error fetching reported users:', error);
        throw error;
    }
};

export const getBannedReasons = async () => {
    try {
        const response = await axios.post(`${API_URL}/getBannedReasons`); // Đổi từ GET sang POST nếu cần
        return response.data;
    } catch (error) {
        console.error('Error fetching reported users:', error);
        throw error;
    }
};

export const getPremiumUsers = async () => {
    try {
        const response = await axios.get(`${API_Users}/premium`);
        return response.data; // Trả về danh sách người dùng Premium
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Something went wrong' };
    }
};

// Hàm chuyển đổi trạng thái Premium của người dùng
export const togglePremiumStatus = async (userId) => {
    try {
        const response = await axios.put(`${API_Users}/${userId}/premium`);
        return response.data; // Trả về thông tin người dùng đã cập nhật
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Something went wrong' };
    }
};

// Lấy danh sách tất cả người dùng
export const getAllUsers = async () => {
    try {
        const response = await axios.get(API_Users);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Something went wrong' };
    }
};

// Lấy danh sách tất cả người dùng
export const getAllCards = async () => {
    try {
        const response = await axios.get(`${API_Users}/allCards`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Something went wrong' };
    }
};





