import React, { useEffect, useRef, useState } from 'react'
import images from '../../../assets/images';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getSecureApiData, securePostData } from '../../../services/api';
import { toast } from 'react-toastify';
import base_url from '../../../baseUrl';
import axios from 'axios';
import { io } from "socket.io-client";
import { timeAgo } from '../../../utils/staticData';
import EmojiPicker from 'emoji-picker-react';
const socket = io(base_url);

function Conversations() {
  const [searchParams] = useSearchParams()
  const [text, setText] = useState('')
  const [search, setSearch] = useState('')
  const [chat, setChat] = useState([])
  const userId = localStorage.getItem('userId')
  const [profileData, setProfileData] = useState({})
  const [userData, setUserData] = useState({})
  const [myChat, setMyChat] = useState([])
  const [filterChat, setFilterChat] = useState([])
  const wiz = searchParams.get('wiz')
  const [isData, setIsData] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState({})
  const [chatImg, setChatImg] = useState(null);
  const navigate = useNavigate()
  const [mobChat, setMobChat] = useState(false)
  const [isLoading,setIsLoading]=useState(false)
  async function getUserProfile() {
    try {
      const result = await getSecureApiData(`api/users/profile-data/${wiz}`)
      if (result.status) {
        setProfileData(result.data)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  async function getChatData() {
    const data = { to: wiz, from: userId }
    try {
      const result = await securePostData(`api/users/chat`, data)
      if (result.status) {
        // await getMyChat()
        setChat(result.allMsg)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  async function getUserData() {
    try {
      const result = await getSecureApiData(`api/users/${wiz}`)
      if (result.success) {
        setUserData(result.user)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  async function getMyChat() {
    try {
      const result = await getSecureApiData(`api/users/my-chat/${userId}`)
      if (result.status) {
        setMyChat(result.users)
        setFilterChat(result.users)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  useEffect(() => {
    getUserProfile()
    getUserData()
    getChatData()
    getMyChat()
  }, [wiz])
  useEffect(() => {
    socket.on("onlineStatus", (data) => {
      setOnlineUsers((prevUsers) => {
        const updatedUsers = { ...prevUsers };
        if (data.status === "online") {
          updatedUsers[data.userId] = true;
        } else {
          delete updatedUsers[data.userId];
        }
        return updatedUsers;
      });
    });

    socket.emit("userOnline", userId);

    return () => {
      // socket.emit("disconnect");
      socket.off("onlineStatus");
    };
  }, []);
  useEffect(() => {
    if (userId) socket.emit("joinChat", userId);

    socket.on("receiveMessage", async (data) => {
      // setChat((prev) => Array.isArray(prev) ? [...prev, data] : [data]);
      await getChatData()

    });
    return () => socket.off("receiveMessage");
  }, [userId]);
  const sendMsg = async () => {


    setIsLoading(true)
    const data = { to: wiz, from: userId, text }
    const formData = new FormData();
    formData.append('to', wiz);
    formData.append('from', userId);
    formData.append('text', text);
    if (chatImg) {
      formData.append('chatImg', chatImg);
    }
    const result = await securePostData('api/users/send-msg', formData)
    if (result.status) {
      setChatImg(null)
      getChatData()
      // getMyChat()
    }
    socket.emit("sendMessage", {
      to: wiz,
      from: userId,
      text,
    });
    // setChat((prev) => [...prev, { to: wiz, text }]);
    setText("");
    setIsLoading(false)
  };
  useEffect(() => {
    if (search !== '') {
      const filteredData = myChat.filter(item =>
        item?.user?.firstName.toLowerCase().includes(search.toLowerCase()) ||
        item?.user?.lastName.toLowerCase().includes(search.toLowerCase())
      );
      setFilterChat(filteredData);
    } else {
      setFilterChat(myChat);
    }
  }, [search, myChat]);

  useEffect(() => {
    if (!wiz && myChat.length > 0) {
      navigate(`/provider/chat?wiz=${myChat[0]?.user?._id}`)
    }
  }, [myChat])

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chat]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setText((prevText) => prevText + emoji.emoji); // Append the selected emoji to the input text
    setShowEmojiPicker(false); // Close the emoji picker after selecting
  };

  // Toggle emoji picker visibility
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };


  return (
    <>
      {(myChat?.length > 0 || wiz) ? 
      <div className="main-section posting-histry-sec flex-grow-1 chat-bx-section">
        <div className="row dash-profile-overflow pt-4 mx-lg-2 mx-sm-0">
          <div className={`${mobChat ? "d-none" : "d-lg-block d-md-none"}`}>

          <h2 className='fz-32 fw-600 mb-3'>My Chats</h2>
          <p>
            To ensure you're fully covered by our Customer Satisfaction Guarantee, be
            sure to connect with the service provider directly.
          </p>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="main-profile-sec dash-profile-sec">
              <div className="chat-crd-bx-sec">
                <div className={`row chat-layout ${mobChat ? "chat-open" : "chat-closed"}`}>
                  <div className="col-lg-4 col-md-6 col-sm-12 cht-left-side-bx">
                    <div className="businss-crd-box">
                      <div className="cht-card-heading-sec">
                        <div className="d-flex align-items-center gap-3">
                          <h4 className="mb-0">Messages</h4>
                          <h5 className="mb-0">{myChat?.length}</h5>
                        </div>
                      </div>
                      <div className="custom-frm-bx cht-search-br mt-2 me-2">
                        <input
                          type="text"
                          id=""
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="form-control"
                          placeholder="Search"
                        />
                        <a href="#">
                          <i className="fa-solid fa-magnifying-glass cht-search-icon" />
                        </a>
                      </div>
                      <div className="dash-board-overflow-conversations-bx">
                        {filterChat.length > 0 ?
                          filterChat.map((item, key) => (
                            <div className="dash-board-usr-my-conver" key={key}>
                              <Link to={`/provider/chat?name=${item?.user?.firstName}&wiz=${item?.user?._id}`} onClick={()=>setMobChat(true)} className="dash-online-sec">
                                <div className={`dash-online-usr-image ${onlineUsers[item?.user?._id] ? 'online' : ''}`}>
                                  <img
                                    src={item?.profile?.profileImage ? `${base_url}/${item?.profile?.profileImage}` : images?.nationDashBoard}
                                    alt=""
                                  />
                                </div>
                                <div className="dash-user-details">
                                  <h5 className="">
                                    {item?.user?.firstName} {item?.user?.lastName}
                                  </h5>
                                  {item?.profile?.title && <h6>{item?.profile?.title}</h6>}
                                </div>

                                <span className="ms-auto">{timeAgo(item?.createdAt)}</span>
                              </Link>
                              <p>{item?.lastMessage}</p>
                            </div>
                          ))
                        : <p>No result found</p>}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-6 col-sm-12 cht-right-side-bx ">
                    <div className="d-lg-none d-md-block">
                      <button onClick={()=>setMobChat(false)}>
                        <i className="fa-solid fa-angle-left" />
                        Back
                      </button>
                    </div>
                    <div className="cht-customer-type-box">
                      <div>
                        <div className="cht-right-side-sec">
                          <div className="cht-box-tp-sec">
                            <div className="cht-usr-profile-box">
                              <img
                                src={profileData?.profileImage ? `${base_url}/${profileData.profileImage}` : images?.chatUser}
                                className="cht-usr-pic"
                                alt=""
                              />
                              <img
                                src={images?.verifyUers}
                                className="verify-usr"
                                alt=""
                              />
                            </div>
                            <div className="cht-cont-bx">
                              <h4 className="mb-0 text-capitalize">{userData?.firstName} {userData.lastName}</h4>
                              <p className="mb-0 mt-1">
                                {/* <span className="ms-auto"> */}
                                {onlineUsers[wiz] ? (
                                  <span style={{ color: "green" }}>Online</span>
                                ) : (
                                  <span style={{ color: "gray" }}>Offline</span>
                                )}
                                {/* </span> */}
                              </p>
                            </div>
                          </div>
                          {userData?.role == 'provider' && <div className="cht-view-pro-btn">
                            <Link
                              to={`/wizbizla/provider?name=${userData?.firstName}&wiz=${userData._id}`}
                              className="thm-btn"
                            >
                              View profile
                            </Link>
                          </div>}
                        </div>
                      </div>
                      <div className="cht-type-bx position-relative">
                        <div
                          ref={containerRef}
                          style={{ maxHeight: '450px', minHeight: '660px', overflowY: 'auto' }}
                        >
                          {chat?.length > 0 &&
                            chat
                              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Ensure messages are sorted by date
                              .map((item, key, arr) => {
                                const messageDate = new Date(item.createdAt);
                                const formattedDate = messageDate.toLocaleString("en-US", {
                                  weekday: "long",
                                  hour: "numeric",
                                  minute: "numeric",
                                });
                                const dayString = messageDate.toDateString();
                                const showDate =
                                  key === 0 || dayString !== new Date(arr[key - 1].createdAt).toDateString();
                                return (
                                  <React.Fragment key={key}>
                                    {showDate && (
                                      <div className="chat-date-separator text-center my-2">
                                        {dayString}
                                      </div>
                                    )}

                                    {item?.to === userId ? (
                                      <div className="d-flex justify-content-between chat-typ-message-box">
                                        <div className="d-flex gap-3">
                                          <div className={`d-flex flex-column usr-cht-pic position-relative  ${onlineUsers[wiz] ? 'online' : ''} `}>
                                            <img src={profileData?.profileImage ? `${base_url}/${profileData.profileImage}` : images?.chatUser} className="cht-usr-pic" alt="profile" />
                                          </div>
                                          <div>
                                            <div className="d-flex justify-content-between align-items-center gap-5">
                                              <h4 className="mb-0 text-capitalize">
                                                {userData?.firstName} {userData?.lastName}
                                              </h4>
                                              <p className="mb-0 mt-1">
                                                <span>{formattedDate}</span>
                                              </p>
                                            </div>
                                            <div className="cht-typ-pra">
                                              {item?.chatImg ? <img src={`${base_url}/${item?.chatImg}`} width={200} height={150} />
                                                : <p>{item?.text}</p>}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="cht-cont-bx"></div>
                                      </div>
                                    ) : (
                                      <div className="d-flex justify-content-end w-100">
                                        <div className="d-flex gap-3">
                                          <div>
                                            <div className="d-flex justify-content-between align-items-center gap-5">
                                              <h4 className="mb-0">You</h4>
                                              <p className="mb-0 mt-1">
                                                <span>{formattedDate}</span>
                                              </p>
                                            </div>
                                            <div className="cht-typ-pra">
                                              {item?.chatImg ? <img src={`${base_url}/${item?.chatImg}`} width={200} height={150} />
                                                : <p className="cht-usr-you">{item?.text}</p>}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="cht-cont-bx"></div>
                                      </div>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                        </div>
                        {/* <div className="d-flex justify-content-between chat-typ-message-box">
                          <div className="d-flex gap-3">
                            <div className="d-flex flex-column usr-cht-pic position-relative">
                              <img
                                src={images?.chatUser}
                                className="cht-usr-pic"
                                alt=""
                              />
                            </div>
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <h4 className="mb-0">Katherine Moss</h4>
                              </div>
                              <div className="cht-typ-pra">
                                <div className="typing-dots">
                                  <div className="dot" />
                                  <div className="dot" />
                                  <div className="dot" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="cht-cont-bx"></div>
                        </div> */}
                        <div className="chat-input-box">
                          {chatImg && (
                            <div className="selected-image-preview mb-2">
                              <img src={URL.createObjectURL(chatImg)} alt="Selected" style={{ maxWidth: '80px', maxHeight: '80px' }} />
                              <button type="button" className=" nw-remv-btn" aria-label="Close" onClick={() => setChatImg(null)}>
                                <i className='fa-solid fa-circle-xmark'></i>
                              </button>
                            </div>
                          )}
                          <div className='custom-frm-bx mb-2'>
                            <input type="text" placeholder="Send a message" value={text} onChange={(e) => setText(e.target.value)} className='form-control nw-typing-bx' />

                            <div className="chat-actions nw-conversation-chrt">
                            <button type="button"
                              onClick={toggleEmojiPicker}
                             
                            >
                              <i className="far fa-smile" />
                            </button>
                            {showEmojiPicker && (
                              <div style={{ position: 'absolute', bottom: '60px', right: '0' }}>
                                <EmojiPicker
                                  onEmojiClick={handleEmojiSelect}
                                  width={350}
                                  height={450}
                                  emojiStyle="apple" // Choose style (apple, google, etc.)
                                  searchPlaceHolder="Search Emoji"
                                  skinTonesDisabled={true}
                                />
                              </div>
                            )}
                            <input
                              type="file"
                              id="chatImg"
                              name="chatImg"
                              accept="image/*"
                              onChange={(e) => setChatImg(e.target.files[0])}
                              className="d-none"
                            />

                            <label htmlFor="chatImg" style={{ cursor: "pointer" }}>
                              <i className="fas fa-ellipsis-h" />
                            </label>

                            <button disabled={text == '' && chatImg == null} className="send-btn" onClick={() => sendMsg()}>Send</button>
                          </div>
                          </div>
                          {/* <div className="chat-actions position-relative">
                            <button type="button"
                              onClick={toggleEmojiPicker}
                            >
                              <i className="far fa-smile" />
                            </button>
                            {showEmojiPicker && (
                              <div style={{ position: 'absolute', bottom: '60px', right: '0' }}>
                                <EmojiPicker
                                  onEmojiClick={handleEmojiSelect}
                                  width={350}
                                  height={450}
                                  emojiStyle="apple" // Choose style (apple, google, etc.)
                                  searchPlaceHolder="Search Emoji"
                                  skinTonesDisabled={true}
                                />
                              </div>
                            )}
                            <input
                              type="file"
                              id="chatImg"
                              name="chatImg"
                              accept="image/*"
                              onChange={(e) => setChatImg(e.target.files[0])}
                              className="d-none"
                            />

                            <label htmlFor="chatImg" style={{ cursor: "pointer" }}>
                              <i className="fas fa-ellipsis-h" />
                            </label>

                            <button disabled={text == '' && chatImg == null} className="send-btn" onClick={() => sendMsg()}>Send</button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        :
        <div className="main-section posting-histry-sec flex-grow-1">
          <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
            <div className="d-lg-none d-md-block">
              <a href="#">
                <i className="fa-solid fa-angle-left" />
                Back
              </a>
            </div>
            <h2>My Chats</h2>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="main-profile-sec dash-profile-sec posting-histry-main-box">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="pos-his-firt-div chat-fist-heading">
                      <div>
                        <a href="#">
                          <i className="fa-solid fa-xmark" />
                        </a>
                      </div>
                      <div>
                        <h5 className="mb-1">
                          Sorry! You currently haven’t posted anything. Report a scam or
                          add your business profile.
                        </h5>
                        <p className="mb-0">
                          You haven't started any dashboard conversations yet, you don't
                          have any chat messages yet.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Conversations
