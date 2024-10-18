
import {User} from "../types";



const loginUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL+"/users/login", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(user)
  } )
}


async function addUser(user : Object) {
    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL+ "/users/signup", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(user)
      } );
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Failed to add user');
    }
  }
  
  async function getUser(rNummer : string) {
    const storedToken: string | null = sessionStorage.getItem('loggedInUser');
    try {
      const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
      rNummer = rNummer.toString();
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+`/users/${rNummer}`, {
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
  
  async function addPerson(person : Object) {
    const storedToken: string | null = sessionStorage.getItem('signedUser');
    try {
      const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
      console.log(token)
      await fetch(process.env.NEXT_PUBLIC_API_URL+ "/persons/addPerson", {
        method: "POST",
        headers: {
          "accept": 'application/json',
          "Content-Type" : "application/json",
          "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify(person)
      } );
    } catch (error) {
      console.error('Error adding person:', error);
      throw new Error('Failed to add person');
    }
  }

  async function deleteUser(rnummer : string) {
    const storedToken: string | null = sessionStorage.getItem('loggedInUser');
    try {
      const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
      console.log(token)
      return await fetch(process.env.NEXT_PUBLIC_API_URL+ `/users/deleteUserAndLinkedPersonAndChatsAndMessagesByRnummer/${rnummer}`, {
        method: "DELETE",
        headers: {
          "accept": 'application/json',
          "Content-Type" : "application/json",
          "Authorization":`Bearer ${token}`
        },
       
      } );
    } catch (error) {
      console.error('Error adding person:', error);
      throw new Error('Failed to add person');
    }
  }

  async function getAllUsers() {
    const storedToken: string | null = sessionStorage.getItem('loggedInUser');
    try {
      const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+`/users`, {
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


 
  
export {addUser, getUser, addPerson, loginUser, deleteUser, getAllUsers}

