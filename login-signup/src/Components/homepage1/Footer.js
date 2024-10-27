import React, { useContext } from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { LanguageContext } from '../../LanguageContext';

const Footer = () => {
  const { language, fontFamily } = useContext(LanguageContext);

  return (
    <footer className="footer" style={{ fontFamily }}>
      <div className="about-us" id='about-bondify'>
        <h3>{language === 'en' ? 'About Bondify' : 'Về Bondify'}</h3>
        <p>
          {language === 'en'
            ? 'Bondify is a community of like-minded people looking for real connections, not just a dating site. Our platform is made to encourage real conversations and assist you in finding the one. There has never been an easier time finding love thanks to sophisticated matching algorithms and an intuitive design. To begin your journey toward enduring happiness, sign up with Bondify now.'
            : 'Bondify là một cộng đồng của những người cùng chí hướng tìm kiếm những mối quan hệ thực sự, không chỉ là một trang web hẹn hò. Nền tảng của chúng tôi khuyến khích những cuộc trò chuyện thật và giúp bạn tìm kiếm người đặc biệt của mình. Với thuật toán ghép đôi tiên tiến và giao diện thân thiện, bạn dễ dàng tìm thấy tình yêu hơn bao giờ hết. Hãy đăng ký Bondify ngay để bắt đầu hành trình hạnh phúc lâu dài.'}
        </p>
      </div>

      <div className="footer-content">
        <div className="contact-info">
          <h3>{language === 'en' ? 'Contact Us' : 'Liên Hệ'}</h3>
          <p>Email: contact@bondify.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className="social-media">
          <h3>{language === 'en' ? 'Follow Us' : 'Mạng Xã Hội'}</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="icon facebook" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="icon twitter" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon instagram" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Bondify. {language === 'en' ? 'All rights reserved.' : 'Tất cả quyền được bảo lưu.'}</p>
      </div>
    </footer>
  );
};

export default Footer;
