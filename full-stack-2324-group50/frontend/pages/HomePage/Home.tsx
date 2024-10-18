import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import { Backdrop, Container, Dialog, DialogContent, IconButton, Input } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Chatbox from './Components/Chatbox';
import UserChatbox from './Components/UserChatBox';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/router';
import Header from '../../components/Header'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {getUser } from '@/services/UserService';
import { getChats, createChat } from '@/services/ChatService';
import { linkPersonToChat, fetchAllChats, fetchPersonOfChat } from '@/services/PersonService';
import { getMessages, addMessage } from '@/services/MessageService';
import "../../styles/global.css";
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import HomePersonProfile from './Components/HomePersonProfile';
function Home() {

  const router = useRouter();
  const [messageInput, setMessageInput] = useState('');
  const date = new Date();
  const {t} = useTranslation('common')
  const [isTruePerson, setIsTruePerson] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false);
  type Person = {
    id?: number;
    username?: string;
    age?: number;
    nationality?: string;
    // friendslist? : PersonInput[];
    userId?: number;
    chats?: Chat[];
  }

  type Chat = {
      id?: number;
      // persons?: PersonInput[];
  }

  type Message = {
    id?: number;
    time?: Date;
    personId?: number;
    text?: string;
    chatId?: number;
  }

  const [activeChatIndex, setActiveChatIndex] = useState(0);

  useEffect(() => {
    const checkAdmin = () => {
      if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem) {
        const storedRole = sessionStorage.getItem('loggedInUser');
        const role = storedRole ? JSON.parse(storedRole)?.role : undefined;
        setIsAdmin(role === 'Admin');
      }
    };
  
    checkAdmin();
    fetchChats()
    fetchMessagesOfChat(activeChatIndex)
    fetchPerson()
    toBottom();
  }, []);
  

  const [chatLists, setChatLists] = useState<{ [key: number]: { chatId: number; text: string; time: string }[] }>({
    0: [{ id: 0, time: `${date.getHours()}:${date.getMinutes()}` ,text: 'Hey there, how can I be of assistance?' },],
  });
  
  const DRAWER_WIDTH = 300;

  const [LINKS, setLINKS] = useState([
    { text: 'Ucll Chat AI', icon: PersonIcon, chatID: 0},
  ]);

  const PLACEHOLDER_LINKS = [
    { text: t("Logout"), icon: LogoutIcon },
  ];


  
  
    
  const checkIfAdmin = () => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem) {
      const storedRole = sessionStorage.getItem('loggedInUser');
      const role = storedRole ? JSON.parse(storedRole)?.role : undefined;
      if (role === 'Admin') {
        return true;
      }
    }
    return false;
  }



  async function sendMessage(userMessage: string) {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem) {
    const storedID = sessionStorage.getItem('loggedInUser');
    const id = storedID ? JSON.parse(storedID)?.id : undefined;
    console.log(id)
    if(activeChatIndex === 0){
      const data = await getChats(userMessage);
      
      setChatLists((prevChatLists) => {
        const firstChatList = prevChatLists[0] || []; // Use 0 index for the initial chat
        const updatedList = [
          ...firstChatList,
          { id: 0, text: userMessage, time: `${date.getHours()}:${date.getMinutes()}` },
          { id: id, text: data['message'], time: `${date.getHours()}:${date.getMinutes()}` },
        ];

        return {
          ...prevChatLists,
          0: updatedList, 
        };
      });
      
      }else{
        console.log('chat:' + activeChatIndex)
        
        const chats = await fetchChats(); 
        const response = await fetchPersonOfChat(chats, id); 
        const persons: Person[] = await response.json();
        
        const personWithChat = persons.find((person) =>
          person.chats?.some((chat) => chat.id === activeChatIndex)
        );
        
        if (personWithChat) {
          console.log( userMessage,activeChatIndex, personWithChat.id)
          await addMessage({ text: userMessage, chatId: activeChatIndex, personId: personWithChat.id });
          
        }
      }
      }
    
    fetchMessagesOfChat(activeChatIndex)
    setTimeout(() => {
      toBottom();
    }, 100);
  }

  const toBottom = () => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      const lastMessage = chatContainer.lastElementChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
        chatContainer.scrollTop = chatContainer.scrollHeight; 
        window.scrollBy({ top: 200 });
      }
    }
  };
  const toLoginPage = () => {
    router.push('/'); 
  };

  const toAdminPage = () => {
    router.push('../adminPage/admin');
  }

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };



  const [foundUserName, setfoundUserName] = useState({name: '', rnummer: ''});

  const findUser = async () => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem) {
    const storedRnumber = sessionStorage.getItem('loggedInUser');
    const MY_RNUMBER = storedRnumber ? JSON.parse(storedRnumber)?.rnummer : undefined;
    const rNumberField = document.getElementById("RNumberField") as HTMLInputElement;
    const resultUserField = document.getElementById("findUserResult") as HTMLInputElement;
    const resultUserFieldNull = document.getElementById("findUserResultNull") as HTMLInputElement;
    const SEARCHED_RNUMBER = rNumberField.value;
    const chats = await fetchChats();
    const response = await getUser(SEARCHED_RNUMBER)
    if(response.ok){
    const personResponse = await response.json()
    const personChats : [] = []
    const myChats: [] = []
    console.log(personResponse.person)
    personResponse.person.chats.map((chat: {}) => personChats.push(chat.id))
    chats.map((chat: {}) => myChats.push(chat.id))
    const includesChat: Boolean = (myChats.map((id: number) => personChats.includes(id))).includes(true)
    console.log(includesChat)
    if(includesChat){
      setIsTruePerson(false)
    }else{
      setIsTruePerson(true)
    if(MY_RNUMBER !== SEARCHED_RNUMBER){
    
      console.log(personResponse)
      console.log(personResponse.person)
      resultUserField.innerHTML = personResponse.email
      resultUserFieldNull.innerHTML = ''
      setfoundUserName({name: personResponse.person.username, rnummer:SEARCHED_RNUMBER})

      }else{
      resultUserFieldNull.innerHTML = 'No user found with this number'
      resultUserField.innerHTML = ''
      }
    }
  }
  }
  
  fetchPerson()
  }


 
  const createUserChat = async (name : string, personRnummer : string) => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem) {
    const storedID = sessionStorage.getItem('loggedInUser');
    const response = await createChat();
    if (response.ok) {
      const chatIDResponse = await response.json();
      if (storedID) {
        const LOGGEDID = storedID ? JSON.parse(storedID)?.id : undefined;
        //console.log(chatIDResponse);
        linkPersonToChat(LOGGEDID, chatIDResponse.id);
        const response = await getUser(personRnummer)
        const user = await response.json()
        linkPersonToChat(user.person.id, chatIDResponse.id)
        setIsTruePerson(false)
        fetchPerson()
      } else {
        console.error('No valid loggedInUser data found.');
      }
      
    }
  }
  };
  

  const fetchChats = async () => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem) {
    const storedID = sessionStorage.getItem('loggedInUser');
    const LOGGEDID = storedID ? JSON.parse(storedID)?.id : undefined;
    console.log(LOGGEDID)
    const response = await fetchAllChats(LOGGEDID)
    console.log(response)
    const chats = await response.json()
    console.log(chats)
    return chats
    }
  }


 

  const fetchPerson = async () => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem) {
    try {
      
      const chats = await fetchChats();
      if(chats.length > 0){
      console.log(chats)
      
      const storedID = sessionStorage.getItem('loggedInUser');
      const LOGGEDID = storedID ? JSON.parse(storedID)?.id : undefined;
      const response = await fetchPersonOfChat(chats, LOGGEDID);
      const persons = await response.json();
      console.log(persons)
      const newLinks = chats.flatMap((chat: Chat) => {
        const matchingPersons = persons.filter((person: Person) =>
          person.chats?.some((pChat: Chat) => pChat.id === chat.id)
        );
  
        const linksForChat = matchingPersons.map((person: Person) => ({
          text: person.username,
          icon: PersonIcon,
          chatID: chat.id,
        }));
  
        return linksForChat;
      });
  
      const uniqueNewLinks = newLinks.filter(
        (link: { text: string; icon: string; chatID: number }) =>
          !LINKS.some((existingLink) => existingLink.chatID === link.chatID)
      );
  
      setLINKS([...LINKS, ...uniqueNewLinks]);
      console.log(LINKS)
    }
    
    } catch (error) {
      console.error('Error fetching person data:', error);

    }
  
  }
  }

  const getStorageID = () => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem) {
      const storedID = sessionStorage.getItem('loggedInUser');
      const id = storedID ? JSON.parse(storedID)?.id : undefined;
      return id;
    }
    return false;
  }


  const fetchMessagesOfChat = async (chatID: number) => {
    const res = await getMessages(chatID);
    const messages = await res.json();
    //console.log(messages)
    setChatLists((prevChatLists) => {
      const existingChatList = prevChatLists[chatID] || [];
      const newMessages = messages.map((message: Message) => ({
        id: message.person.id,
        time: message.time,
        text: message.text
      }));
      
      const uniqueNewMessages = newMessages.filter((newMessage : Message) => {
        return !existingChatList.some((existingMessage) => {
          return existingMessage.id === newMessage.id && existingMessage.text === newMessage.text;
        });
      });
  
      const updatedChatList = [...existingChatList, ...uniqueNewMessages];
  

      return {
        ...prevChatLists,
        [chatID]: updatedChatList
      };
    });
    
  }

  return (
    <div style={{
      display: 'flex',
      position: 'relative',
      minHeight: '100vh',
    }}>
      <Header></Header>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            top: ['48px', '56px', '64px'],
            height: 'auto',
            bottom: 0,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
        <ListItem>
        <ListItemButton
          sx={{ borderRadius: '10px', display: 'flex', gap: '10px' }}
          onClick={handleOpenDialog}
        >
          <PersonAddAlt1Icon />
          <Typography>{t("AddChat")}</Typography>
        </ListItemButton>
      </ListItem>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{ sx: { borderRadius: '10px' } }}
      >
        <DialogContent>
          <Box
            sx={{
              width: '20vw',
              height: '20vw',
              display: 'flex',
              flexDirection:'column',
              gap:'10px' ,
              textAlign: 'center',
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
          >
            <Typography variant="h6">Find a student or lector</Typography>
            <p id='findUserResultNull'></p>
            <Box sx={{borderRadius:'20px',border:'1px solid lightgrey ', textAlign:'left'}}>
            <Input id='RNumberField' sx={{padding:'7px', ml:'10px'}}
            placeholder='rnumber'
            disableUnderline
            onChange={findUser}
            defaultValue={'r'}
            ></Input>
            </Box>
            {isTruePerson &&
            <ListItem >
            <ListItemButton onClick={() => createUserChat(foundUserName.name, foundUserName.rnummer)}>
            <p id='findUserResult'></p>
            </ListItemButton>
            </ListItem>
            }   
          </Box>
        </DialogContent>
      </Dialog>
          {LINKS.map(({ text, icon: Icon, chatID}) => {
            const selectedList = chatLists[chatID];
            const lastMessage =
              selectedList && selectedList.length > 0 ? selectedList[selectedList.length - 1].text : '';
            const firstFiveWords = lastMessage.substring(0, 15);

            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {fetchMessagesOfChat(chatID);
                    setActiveChatIndex(chatID); // Update active chat link index
                  }}
                  sx={
                    activeChatIndex === chatID // Highlight the active chat link
                      ? {
                          borderRadius: '10px',
                          margin: '0 10px 0 10px',
                          height: '70px',
                          backgroundColor: '#edebeb',
                        }
                      : {
                          borderRadius: '10px',
                          margin: '0 10px 0 10px',
                          height: '70px',
                          ':hover': {
                            backgroundColor: '#edebeb',
                          },
                        }
                  }
                >
                  <ListItemIcon>
                   <PersonIcon></PersonIcon>
                  </ListItemIcon>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ListItemText primary={text} />
                    <Typography sx={{ color: 'grey' }}>
                      {firstFiveWords.length < lastMessage.length ? `${firstFiveWords}...` : firstFiveWords}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider sx={{ mt: 'auto' }} />
        <List>
        {isAdmin && (
            <ListItem sx={{ border: '1px solid lightgrey' }} disablePadding>
              <ListItemButton onClick={toAdminPage}>
                <ListItemIcon>{/* Your icon here */}</ListItemIcon>
                <ListItemText primary={t('DeleteButton')} />
              </ListItemButton>
            </ListItem>
          )}
          {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
            <ListItem sx={{borderBottom:"1px solid lightgrey"}} key={text} disablePadding>
              <ListItemButton onClick={toLoginPage}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
     <Container sx={{display:'flex'}}>

    


      <Box sx={{
        display: 'flex',
        left: DRAWER_WIDTH - 300,
        width: '75%',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
      }}>
         <div
        id='chat-container'
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          position: 'absolute',
          top: '100px',
          bottom: '100px',
          left: 0,
          right: 0,
          overflowY: 'auto',
        }}
      >
        {Object.keys(chatLists).map((chatID) => {
          if (parseInt(chatID) === activeChatIndex) {
            return (
              <div key={chatID}>
              {chatLists[parseInt(chatID)].map((message, index) => {
                const id = getStorageID();
                return (
                  <div
                    key={index}
                    className={message.id === id ? 'chat-item' : message.id !== id && message.id !== 0 ? 'user-chat-item' : ''}
                  >
                    {message.id === id  ? (
                      <Container sx={{ mt: '5px', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ ml: '10px', alignSelf: 'flex-start', color: 'gray', fontSize: '10px' }}>
                          {message.time}
                        </Box>
                        {message.id === id ? (
                          <Chatbox>{message.text}</Chatbox>
                        ) : (
                          <UserChatbox>{message.text}</UserChatbox>
                        )}
                      </Container>
                    ) : (
                      <Container sx={{ mt: '5px', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ mr: '5px', alignSelf: 'flex-end', color: 'gray', fontSize: '10px' }}>
                          {message.time}
                        </Box>
                        <UserChatbox>{message.text}</UserChatbox>
                      </Container>
                    )}
                  </div>
                );
              })}
            </div>
            );
          }
          return null;
        })}
      </div>
        <HomePersonProfile/>
        
        <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 300,
              width:'70%',
              right: 0,
              backgroundColor: 'transparent',
              display: 'flex',
              gap:'15px',
              justifyContent: 'center',
              alignItems: 'center',
              p: '20px',
            }}
          >
            <Box sx={{border:'solid 1px grey',borderRadius:5 ,width: '60%', backgroundColor:'white'}}>
          <Input
            onChange={(e) => {
              setMessageInput(e.target.value);
            }}
            value={messageInput}
            id="inputField"
            sx={{ padding:1, marginLeft:'10px', width:'100%'}}
            placeholder="aA"
            disableUnderline
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const userMessage = messageInput.trim();
                if (userMessage !== '') {
                  e.preventDefault();
                  try {
                    sendMessage(userMessage);
                  } catch (error) {
                    console.error('Error sending message:', error);
                  }
                  setMessageInput('');
                }
              }
            }}
          ></Input>
            </Box>

          <Button
            id="buttonField"
            onClick={async () => {
              const userMessage = messageInput;
              if (userMessage.trim() !== '') {
                try {
                  await sendMessage(userMessage);
                } catch (error) {
                  console.error('Error sending message:', error);
                }
                setMessageInput('');
        
              }
            }}
          >
            <SendIcon></SendIcon>
          </Button>
        </Box>
        
        </Box>
        </Container>
   
    </div>
    
  );
}

export const getServerSideProps = async (context) => {
  const {locale} = context;
  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  }
}

export default Home;
