import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/login/Login';
import Register from './Components/register/RegistrationForm';
import Verify from './Components/register/VerificationForm';
import ResetPassword from './Components/resetpassword/ResetPassword';
import HomePage from './Components/homepage1/HomePage';
import SwipeMatch from './Components/swipe/SwipeMatch';
import { checkLoggedIn } from './apiService'; // Nhập hàm kiểm tra đăng nhập
import { LanguageProvider } from './LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import Profile from './Components/hobby/Profile';
//ADMIN TOOL
import AdminPage from './Components/admintool/AdminPage';
import VerifyProfile from './Components/admintool/VerifyProfile';
import ViewReport from './Components/admintool/ViewReport';
import BannedUsers from './Components/admintool/BannedUsersList';
import Premium from './Components/admintool/Premium';
import VirtualGift from "./Components/admintool/VirtualGift";
//USER HOME
import Normal from './Components/homepage/Normal';
import SettingPage from './Components/homepage/SettingPage';
import SettingPagePremium from './Components/premiumuser/SettingPagePremium';
import PremiumUser from './Components/premiumuser/PremiumUser';
import NotificationPage from './Components/homepage/NotificationPage';
//BUY PREMIUM
import InfoPage from './Components/buypremium/info/infopage';
import PaymentPage from './Components/buypremium/pay/PaymentBody';
//CUSTOMIZE
import NormalProfile from './Components/customize/NormalProfile'
import PremiumProfile from './Components/customize/PremiumProfile'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Kiểm tra nếu người dùng đã đăng nhập
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <LanguageProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/loginPage" element={<Login/>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/resetpassword" element={<ResetPassword />} />
                    <Route path="/swipe" element={<SwipeMatch />}/>
                    <Route path="/verify-profile"element={<VerifyProfile />} />
                    <Route path="/view-report"element={<ViewReport />}  />
                    <Route path="/banned-users"element={<BannedUsers />} />
                    <Route path="/adminhome" element={<AdminPage />}  />
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/premium-users" element={<Premium />}/>
                    <Route path="/manage-gift" element={<VirtualGift />}/>
                    <Route path="/user/home" element={<Normal/>}/>
                    <Route path="/user/premiumhome" element={<PremiumUser/>}/>
                    <Route path="/settings" element={<SettingPage/>}/>
                    <Route path="/settingspremium" element={<SettingPagePremium/>}/>
                    
                    <Route path="/notifications" element={<NotificationPage />} />
                    <Route path="/premium" element={<InfoPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/normalprofile" element={<NormalProfile />} />
                    <Route path="/premiumprofile" element={<PremiumProfile />} />
                </Routes>
            </Router>
        </LanguageProvider>
    );
}

export default App;
