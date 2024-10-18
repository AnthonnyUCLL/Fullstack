import {User} from "../types";

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