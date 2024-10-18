import {User} from "../types";

async function getChats(userMessage : string){
    try {
        const response = await fetch('http://127.0.0.1:5000/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });
  
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error sending message:', error);
      }
}

async function createChat() {
  const storedToken: string | null = sessionStorage.getItem('loggedInUser');
    try {
      const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
      return await fetch(process.env.NEXT_PUBLIC_API_URL+ "/chats/createChat", {
      method: "POST",
      headers: {
        "accept": 'application/json',
        "Content-Type" : "application/json",
        "Authorization":`Bearer ${token}`,
      },
      body: JSON.stringify({})
    } );
  } catch (error) {
    console.error('Error adding person:', error);
    throw new Error('Failed to add person');
  }
}






export {getChats, createChat}