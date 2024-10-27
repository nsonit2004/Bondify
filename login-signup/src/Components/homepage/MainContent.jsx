import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import './MainContent.css';
import { getAllCards } from '../../apiService';
import 'bootstrap/dist/css/bootstrap.min.css';


function MainContent() {
  const [cards, setCards] = useState([
    {
      id: 1,
      premium: "yes",
      name: "Hae-In 1",
      hobby: [
        "Music-instrument","Hiking","Shopping","Coding","Fix-Bug"
       ],
      dateOfBirth: "14/02/2004",
      age: "14",
      address: "Shibuya, Tokyo, Japan",
      gender: "Male",
      image: "https://res.cloudinary.com/dltctl6w2/image/upload/v1730042415/93d25d2b-2ce5-44af-8fa2-1a5a93239af0.png",
      details: "Hi, my name is Jung-Hae-In, I'm a famous actor in Japan. I could speak VietNamese. Xin chao kác pạn, tôi têng là Dung Hê IN, gất dui đực làmg queng. Toi ra't thi'ch an pho'",
      mainImages: [
        "https://cdn.tatlerasia.com/tatlerasia/i/2021/12/27160400-jung-hae-in-snowdrop_cover_1240x829.jpeg",
        "https://favim.com/pd/p/orig/2019/03/19/jiyong-gd-kwon-jiyong-Favim.com-7015942.jpg"
      ]
  }
  ]);

  const [isMobileLayout, setIsMobileLayout] = useState(window.innerWidth <= 993);
  const [error, setError] = useState(null);
  const [swipeCount, setSwipeCount] = useState(0); // Đếm số lượt vuốt
  const [showUpgradePopup, setShowUpgradePopup] = useState(false); // Quản lý hiển thị pop-up
  const [selectedReason, setSelectedReason] = useState(''); // Lý do báo cáo
  const [description, setDescription] = useState(''); // Mô tả bổ sung
  const [showReportModal, setShowReportModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [allCardsSwiped, setAllCardsSwiped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Thêm trạng thái cho ảnh hiện tại
  const [expanded, setExpanded] = useState(false);
  const moreInfoSectionRef = useRef(null); // Tạo ref để tham chiếu đến phần thẻ mới
  const [{ x, rot, scale }, api] = useSpring(() => ({
    x: 0,
    rot: 0,
    scale: 1,
  }));

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const fetchedCards = await getAllCards();
        setCards(fetchedCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
        setError(error);
      }
    };

    fetchCards();
  }, []);

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };


  useEffect(() => {
    const fetchCards = async () => {
      try {
        const fetchedCards = await getAllCards();
        const formattedCards = fetchedCards.map(card => ({
          id: card.id,
          premium: card.is_premium ? "yes" : "no",
          name: card.first_name || "Unknown",
          hobby: card.hobby ? card.hobby.split(',') : [],
          dateOfBirth: card.date_of_birth,
          age: calculateAge(card.date_of_birth),
          address: `${card.district}, ${card.province}`,
          gender: card.gender,
          image: card.ava, // Avatar ảnh chính
          details: card.bio,
          mainImages: [
            card.img1, card.img2, card.img3, card.img4, card.img5 // Các ảnh bổ sung
          ]// Loại bỏ các giá trị null
        }));
        setCards(formattedCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
        setError(error);
      }
    };
  
    fetchCards();
  }, []);
  
  


  const reportReasons = [
    'Spamming',
    'Inappropriate Language',
    'Harassment',
    'Impersonation',
    'Fraudulent Activity',
    'Violation of Terms of Service',
    'Hate Speech',
    'Trolling',
    'Unauthorized Promotions',
    'Malicious Behavior'
  ];


  const handleReportSubmit = () => {
    console.log(`Reason: ${selectedReason}, Description: ${description}`);
    setShowReportModal(false); // Đóng modal
    setSelectedReason(''); // Reset dữ liệu
    setDescription(''); // Reset dữ liệu
  };

  const bind = useDrag(({ down, movement: [mx], velocity }) => {
    const trigger = velocity > 0.2;

    // Nếu đang không kéo (down=false) và đạt ngưỡng trigger
    if (!down && trigger) {
      // Kiểm tra nếu còn thẻ để swipe
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);

        // Cập nhật animation cho thẻ hiện tại khi swipe
        api.start({
          x: mx < 0 ? -window.innerWidth : window.innerWidth,
          rot: 0,
          scale: 1,
          config: { tension: 300, friction: 30 },
        });

        // Đặt lại trạng thái của thẻ sau 300ms
        setTimeout(() => {
          api.start({
            x: 0,
            rot: 0,
            scale: 1,
            config: { tension: 300, friction: 30 },
          });
        }, 300);
      }

      // Khi swipe đến thẻ cuối cùng thì hiển thị pop-up
      if (currentCardIndex + 1 >= cards.length) {
        setShowPopup(true);
        setAllCardsSwiped(true); // Dừng việc hiển thị thẻ
      }
    } else {
      // Khi đang kéo thẻ (down=true), cập nhật vị trí và hiệu ứng xoay của thẻ
      api.start({
        x: down ? mx : 0,
        rot: down ? mx / 100 : 0,
        scale: down ? 1.1 : 1,
        config: { tension: down ? 300 : 500, friction: down ? 30 : 50 },
      });
    }
  });

  // if (currentCardIndex >= cards.length) {
  //   return <div className="no-more-cards">No more cards!</div>;
  // }

  const { name, image, details, mainImages } = cards[currentCardIndex];

  // Hàm để chuyển đổi ảnh
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mainImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + mainImages.length) % mainImages.length);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (!expanded) {
      setTimeout(() => {
        // Cuộn đến phần thêm mới sau khi đã mở rộng
        moreInfoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 300); // Delay để đảm bảo div được render trước khi scroll
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileLayout(window.innerWidth <= 993);
    };

    window.addEventListener('resize', handleResize);

    // Dọn dẹp listener khi component bị huỷ
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Xử lý khi nhấn vào profile section trong giao diện mobile
  const handleProfileClick = () => {
    if (isMobileLayout) {
      toggleExpand(); // Tự động hiển thị thông tin thêm trong giao diện mobile
    }
  };

  const swipeCard = (direction) => {
    if (swipeCount >= 10) {
      // Nếu đã vuốt 10 lần, hiển thị pop-up
      setShowUpgradePopup(true);
      return; // Ngừng hàm
    }

    // Tiến hành vuốt
    api.start({
      x: direction * window.innerWidth,
      rot: 0,
      scale: 1,
      config: { tension: 300, friction: 30, duration: 220 },
    });

    // Cập nhật số lượt vuốt
    setSwipeCount((prevCount) => prevCount + 1);

    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex >= cards.length) {
          setShowPopup(true);
          setAllCardsSwiped(true);
          return prevIndex; // Giữ nguyên chỉ số hiện tại
        }
        return newIndex; // Cập nhật chỉ số
      });

      api.start({
        x: 0,
        rot: 0,
        scale: 1,
        config: { tension: 300, friction: 30, duration: 220 },
      });
    }, 250);
  };



  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const storedSwipeCount = localStorage.getItem('swipeCount');
    const storedDate = localStorage.getItem('swipeDate');

    const today = new Date().toISOString().slice(0, 10); // Lấy ngày hiện tại

    if (storedDate !== today) {
      // Nếu không phải hôm nay, reset số lượt
      localStorage.setItem('swipeCount', 0);
      setSwipeCount(0);
      localStorage.setItem('swipeDate', today);
    } else {
      setSwipeCount(parseInt(storedSwipeCount) || 0);
    }
  }, []);



  const getUpcomingImages = () => {
    const remainingCards = cards.slice(currentCardIndex + 1); // Lấy tất cả các thẻ tiếp theo
    const upcomingCards = remainingCards.slice(0, 5); // Giới hạn lại chỉ lấy 5 thẻ

    const emptySlots = 5 - upcomingCards.length; // Tính số khung trống

    return [
      ...upcomingCards.map(card => card.image), // Các ảnh tiếp theo
      ...Array(emptySlots).fill(null), // Thêm các khung trống ở bên phải
    ];
  };

  const hobby = cards[currentCardIndex].hobby;

  console.log('Type of hobby:', typeof hobby);
  console.log('Is hobby an array?', Array.isArray(hobby));

  if (Array.isArray(hobby)) {
    console.log('Hobby is an array:', hobby.join(', '));
  } else if (typeof hobby === 'string') {
    console.log('Hobby is a string:', hobby);
  } else {
    console.log('Hobby is not defined or is of an unexpected type.');
  }




  return (
    <div className="main-content">
      
      <div className="upcoming-partners hidden-element">
        {getUpcomingImages().map((image, index) => (
          image ? (
            <img key={index} src={image} alt={`Upcoming Partner ${index + 1}`} className="partner-image" />
          ) : (
            <div key={index} className="partner-image empty"></div> // Khung trống
          )
        ))}
      </div>
      <div className="logo brand-name2">BONDIFY</div>
  
      {showUpgradePopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Thông báo</h3>
            <p>Bạn đã sử dụng hết lượt miễn phí ngày hôm nay. Hãy nâng cấp lên premium để tiếp tục sử dụng.</p>
            <button onClick={() => setShowUpgradePopup(false)}>Đóng</button>
          </div>
        </div>
      )}
      
  
      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Report User</h3>
            <label htmlFor="report-reason">Reason:</label>
            <select
              id="report-reason"
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
            >
              <option value="">Select a reason</option>
              {reportReasons.map((reason, index) => (
                <option key={index} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
  
            <label htmlFor="description">Description (optional):</label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide additional details if needed"
            />
  
            <div className="modal-actions2">
              <button className="cancel-button" onClick={() => setShowReportModal(false)}>
                Cancel
              </button>
              <button className="submit-button" onClick={handleReportSubmit}>
                Report
              </button>
            </div>
          </div>
        </div>
      )}
  
      {showPopup ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Thông báo</h3>
            <p>Bạn đã xem hết các partner tiềm năng trong khu vực!</p>
            <div className="modal-actions">
              <button className="cancel-button" onClick={closePopup}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      ) : allCardsSwiped ? (
        <div className="empty-content">
          <div className="background-image">{/* Chèn background image */}</div>
          <div className="upcoming-partner">
            <p>Không còn partner nào</p>
          </div>
        </div>
      ) : (
        <>
          <animated.div
            className="profile-section"
            onClick={handleProfileClick} 
            {...bind()}
            style={{
              transform: interpolate([x, rot, scale], (x, r, s) => `translate3d(${x}px, 0, 0) rotate(${r}deg) scale(${s})`),
              position: 'relative',
              willChange: 'transform',
            }}
          >
            <div className="profile-picture-and-detail">
              <div className='user-avatar'>
                <img className="profile-picture img-fluid" src={cards[currentCardIndex].image} alt="profile-picture" />
                {cards[currentCardIndex].premium === "yes" && (
                  <img
                    src="https://img.icons8.com/color/48/verified-badge.png"
                    alt="verified-icon"
                    className="verified-icon"
                  />
                )}
              </div>
              <div className="profile-info">
                <div className='profile-col'>
                  <div className='profile-col2'>
                    <p className='profile-col3'><strong>Name:</strong> {cards[currentCardIndex].name}</p>
                    <p className='visible profile-col3'><strong>Gender:</strong> {cards[currentCardIndex].gender}</p>
                  </div>
                  <div className=''>
                    <p className='profile-col3'><strong>Age:</strong> {cards[currentCardIndex].age}</p>
                    <p className='visible profile-col3'><strong>Date Of Birth:</strong> {cards[currentCardIndex].dateOfBirth}</p>
                  </div>
                </div>
                <p className='address profile-col4'><strong>Address:</strong> {cards[currentCardIndex].address}</p>
              </div>
            </div>
  
            <hr className="divider" />
  
            <div className="image-section">
              <img className="main-image img-fluid" src={cards[currentCardIndex].mainImages[currentImageIndex]} alt="main" />
              <button className="prev-button" onClick={prevImage}>{"<"}</button>
              <button className="next-button" onClick={nextImage}>{">"}</button>
            </div>
  
            <div className={`display-section ${expanded ? 'expanded' : ''}`}>
              {expanded && (
                <div ref={moreInfoSectionRef} className="profile-info">
                  <div className="profile-details ending">
                    <p><strong>Bio:</strong> {cards[currentCardIndex].details}</p>
                    <p><strong>Hobbies:</strong> {Array.isArray(cards[currentCardIndex].hobby) && cards[currentCardIndex].hobby.length > 0 ? cards[currentCardIndex].hobby.join(', ') : 'None'}</p>
                    <p><strong>Gender:</strong> {cards[currentCardIndex].gender}</p>
                    <p><strong>Date Of Birth:</strong> {cards[currentCardIndex].dateOfBirth}</p>
                  </div>
                </div>
              )}
            </div>
          </animated.div>
  
          <div className="action-buttons">
            <div className="button-group">
              <button className="action-button dislike-button" onClick={() => swipeCard(-1)}></button>
              <button className="action-button like-button" onClick={() => swipeCard(1)}></button>
              <button className="action-button report-button" onClick={() => setShowReportModal(true)}></button>
              <button className="action-button gift-button"></button>
              <button className="action-button moreinfor-button" onClick={toggleExpand}></button>
            </div>
          </div>
        </>
      )}
    </div>
  );
  


}

export default MainContent;
