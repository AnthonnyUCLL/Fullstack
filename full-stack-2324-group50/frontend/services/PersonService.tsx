

async function linkPersonToChat(personID : number, chatID : number) {
    const storedToken: string | null = sessionStorage.getItem('loggedInUser');
      try {
        const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
        return await fetch(process.env.NEXT_PUBLIC_API_URL+ `/persons/LinkPersonToChat/${personID}/${chatID}`, {
        method: "PUT",
        headers: {
          "accept": 'application/json',
          "Content-Type" : "application/json",
          "Authorization":`Bearer ${token}`,
        },
      } );
    } catch (error) {
      console.error('Error adding person:', error);
      throw new Error('Failed to add person');
    }
  }
  

  async function fetchAllChats(personID: number) {
    const storedToken: string | null = sessionStorage.getItem('loggedInUser');
      try {
        const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
        return await fetch(process.env.NEXT_PUBLIC_API_URL+ `/persons/getChatsOfPerson/${personID}`, {
        method: "GET",
        headers: {
          "accept": 'application/json',
          "Content-Type" : "application/json",
          "Authorization":`Bearer ${token}`,
        },
      } );
    } catch (error) {
      console.error('Error adding person:', error);
      throw new Error('Failed to add person');
    }
  }


  async function fetchPersonOfChat(chat: [], personID: number) {
    const storedToken: string | null = sessionStorage.getItem('loggedInUser');
      try {
        const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
        return await fetch(process.env.NEXT_PUBLIC_API_URL+ `/persons/getPersonByChats/${personID}`, {
        method: "POST",
        headers: {
          "accept": 'application/json',
          "Content-Type" : "application/json",
          "Authorization":`Bearer ${token}`,
        },
        body: JSON.stringify(chat)
      } );
    } catch (error) {
      console.error('Error getting chats:', error);
      throw new Error('Failed to get chats');
    }
  }

export {linkPersonToChat, fetchAllChats, fetchPersonOfChat}
