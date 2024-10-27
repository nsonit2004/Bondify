import React, { useEffect, useState } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import './HomePage.css'; // Path to the CSS file
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Updated import

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //
    //     if (token != null) {
    //         const isTokenValid = (token) => {
    //             const decodedToken = jwtDecode(token); // Updated function call
    //             return decodedToken.exp > Date.now() / 1000; // Check if token is expired
    //         };
    //
    //         const validToken = isTokenValid(token);
    //         setIsLoggedIn(validToken);
    //
    //         // If the token is invalid, navigate to login
    //         if (!validToken) {
    //             navigate('/login');
    //         }
    //     } else {
    //         // No token found, redirect to login
    //         navigate('/login');
    //     }
    // }, [navigate]); // Include navigate as a dependency
    //
    // if (!isLoggedIn) {
    //     return // Render nothing while checking the token
    // }

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
        const userData = jwtDecode(token);
        // Here you can also check the expiration of the token
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (userData.exp < currentTime) {
          // Token is expired
          localStorage.removeItem('token'); // Remove expired token
          navigate("/"); // Redirect to login page
        } else {
          // Token is valid, navigate based on role
          if (userData.role === 'admin' && userData.user_status === 'active') {
            navigate("/adminhome");
          } else if (userData.role === 'user' && userData.user_status === 'active'){
            navigate("/user/home");
          }
        }
      } else {
        navigate("/"); // Redirect to login if no token
      }
    }, [navigate]);
    return (
        <div className="homepage-container">
            <Header />
            <main className="main-content">
                <Body />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
