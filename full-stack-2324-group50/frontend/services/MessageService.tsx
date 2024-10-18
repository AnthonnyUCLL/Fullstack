async function addMessage(message : Object) {
    const storedToken: string | null = sessionStorage.getItem('loggedInUser');
    try {
      const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
      console.log(token)
      await fetch(process.env.NEXT_PUBLIC_API_URL+ "/messages/AddMessage", {
        method: "POST",
        headers: {
          "accept": 'application/json',
          "Content-Type" : "application/json",
          "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify(message)
      } );
    } catch (error) {
      console.error('Error adding person:', error);
      throw new Error('Failed to add person');
    }
  }

  async function getMessages(chatID : number) {
    const storedToken: string | null = sessionStorage.getItem('loggedInUser');
    try {
      const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+`/messages/messageByChatId/${chatID}`, {
        method: "GET",
        headers: {
          "Content-Type" : "application/json",
          Authorization:`Bearer ${token}`
        },
      } );
      return response
    } catch (error) {
      console.error('Error getting user:', error);
      throw new Error('Failed to retrieve user');
    }
  }


export {addMessage, getMessages}
