import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

import { loginUser, getUser, deleteUser } from '../../services/UserService';
import Header from '../../components/Header'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import Input from '@mui/material/Input';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';


function AdminPage() {
    const {t} = useTranslation('common')
    const [isTruePerson, setIsTruePerson] = useState(false)
    const [foundUserName, setfoundUserName] = useState({name: '', rnummer: '',id:0 ,role: '', nationality:'', age:0});
    const date = new Date();
    const [bool , setBool] = useState(false)

  const router = useRouter();
    

    type Message = {
        id?: number;
        time?: Date;
        personId?: number;
        text?: string;
        chatId?: number;
      }

    const findUser = async () => {
        const storedRnumber = sessionStorage.getItem('loggedInUser');
        const MY_RNUMBER = storedRnumber ? JSON.parse(storedRnumber)?.rnummer : undefined;
        const rNumberField = document.getElementById("RNumberField") as HTMLInputElement;
        const resultUserField = document.getElementById("findUserResult") as HTMLInputElement;
        const resultUserFieldNull = document.getElementById("findUserResultNull") as HTMLInputElement;
        const SEARCHED_RNUMBER = 'r'+rNumberField.value;
        const response = await getUser(SEARCHED_RNUMBER)

        if(response.ok){
            console.log("resp1 ok")
            const personResponse = await response.json()
        if(MY_RNUMBER !== SEARCHED_RNUMBER){
          setBool(true)
          console.log(personResponse)
          console.log(personResponse.person)
          resultUserField.innerHTML = personResponse.email
          resultUserFieldNull.innerHTML = ''
          
          setfoundUserName({
                name: personResponse.person.username, 
                id:personResponse.person.id ,
                rnummer:SEARCHED_RNUMBER, 
                role:personResponse.role, 
                nationality: personResponse.person.nationality, 
                age:personResponse.person.age
            })
          }else{
          resultUserFieldNull.innerHTML = 'No user found with this number'
          resultUserField.innerHTML = ''
          setBool(false)
          setIsTruePerson(false)
          }

        }
        
      }
      const toHomePage = () => {
        router.push('../HomePage/Home');
      }
      const printInfo = () => {
        setIsTruePerson(true);
      }

      const deleteUserByRnummer = async(rnummer: string) => {
        const response = await deleteUser(rnummer);
        if(response.ok){
            const text = document.getElementById("responseMessage") as HTMLInputElement;
            text.innerHTML = 'User has been succesfully deleted'
        }
      }
      
    return (
        <div>
            <Header></Header>
       
                <Card sx={{ width: '70vw', margin: 'auto', mt: '10em', minHeight: '500px', textAlign: 'center', boxShadow: '4', justifyItems: 'center' }}>
                    <Typography>{t("AdminPage")}</Typography>
                    <Box sx={{width:'200px', ml:'2em'}}>
                    <Typography>{t("FindStudentOrLector")}</Typography>
                        <p id='findUserResultNull'></p>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid lightgrey', borderRadius: '20px', padding: '5px' }}>
                            <Typography>r:</Typography>
                            <Input
                                id='RNumberField'
                                sx={{ padding: '2px', ml: '10px' }}
                                type='number'
                                inputMode='numeric'
                                placeholder='number'
                                disableUnderline
                                onChange={findUser}
                            />
                            </Box>
                            <ListItem >
                                <ListItemButton onClick={() => printInfo()}>
                                <p id='findUserResult'></p>
                                </ListItemButton>
                            </ListItem>
                    
                    </Box>
                    <Box sx={{display:"flex", justifyContent:"center", gap:"10px", height:"50%"}}>
                    <Box sx={{width: "80%"}}>
                        
                                {isTruePerson &&
                                <Card sx={{height:"100%"}}>
                                <Box sx={{padding: '10px'}}>{t("EditInfo")}</Box>
                                <Card sx={{padding:'2em'}}>
                                <Box sx={{display: 'flex', gap:'3em'}}>
                                <Box sx={{display: 'flex', flexDirection:'column', textAlign:'left',}}>
                                <Typography variant="h6">{t("Name")}: {foundUserName.name}</Typography>
                                <Typography >{t("Rnumber")}: {foundUserName.rnummer}</Typography>
                                <Typography >{t("Role")}: {foundUserName.role}</Typography>
                                <Typography >{t("Nationality")}: {foundUserName.nationality}</Typography>
                                <Typography >{t("Age")}: {foundUserName.age}</Typography>
                                <Typography>ID: {foundUserName.id}</Typography>
                                </Box>
                                <ListItem sx={{display:'flex', flexDirection:'column' ,width:'30%'}}>
                                    <ListItemButton onClick={() => printInfo()}>
                                        {t("EditInfoButton")}
                                    </ListItemButton>
                                    <ListItemButton onClick={() => deleteUserByRnummer(foundUserName.rnummer)}>
                                        {t("DeleteButton")}
                                    </ListItemButton>
                                </ListItem>
                                <p id='responseMessage'></p>
                                </Box>
                                </Card>
                                </Card>
                                }

                            
                       
                    </Box>
                    </Box>
                    <Box sx={{textAlign: 'left', ml:'2em'}}>
                        <Button onClick={toHomePage}>{t("Back")}</Button>
                    </Box>
                    
                </Card>
                
        
        </div>
    )

}
export const getServerSideProps = async (context) => {
    const {locale} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    }
}


export default AdminPage;
