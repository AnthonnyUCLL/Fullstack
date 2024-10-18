import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React, { useEffect } from 'react';
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
import HeaderWithoutProfile from '../components/HeaderWithoutProfile';
import { loginUser, getUser, getAllUsers } from '../services/UserService';
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import "../styles/global.css"
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import { TableBody, TableCell, TableRow } from '@mui/material';
function Index() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const {t} = useTranslation('common')
    const [isPending2, setIsPending2] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const response = await getAllUsers();
        console.log(response)
        if (response.ok) {
            const usersData = await response.json();
            console.log(usersData)
            setUsers(usersData);
            
            setIsPending2(false);
        }
        };

        fetchData();
    }, []);
    const checkUser = async () => {
        const rnummer = (document.getElementById("userField") as HTMLInputElement).value;
        const password = (document.getElementById("passField") as HTMLInputElement).value;
        const user = {rnummer: rnummer, password}
        try {
            const response = await loginUser(user);
            if (response.status == 200) {

                const user = await response.json();
                const res = await getUser(user.rnummer)
                const personResponse = await res.json()
                sessionStorage.setItem(
                    'loggedInUser',
                    JSON.stringify({
                        token: user.token,
                        rnummer: user.rnummer,
                        email: user.email,
                        id: personResponse.id,
                        role: user.role
                    })
                )
                console.log(user.role)
                console.log(personResponse)
                console.log(personResponse.id)
                setIsPending(true);
                setTimeout(() => {
                  router.push('./HomePage/Home'); 
                }, 2000);
              } else {
                window.alert('Invalid username/password');
              }
        } catch (error) {
            console.error("Error checking user:", error);
        }
    }

    const loginAsProf = async (rnummer: string) => {
        const wachtwoorden = [ "greetjej123", "elkes123", "johanp123"]

        const foundUser = users.find((user) => user.rnummer === rnummer);
        if (foundUser) {
          const userIndex = users.indexOf(foundUser);
          const password = wachtwoorden[userIndex];
        const user = {rnummer: rnummer, password}
        try {
            const response = await loginUser(user);
            if (response.status == 200) {

                const user = await response.json();
                const res = await getUser(user.rnummer)
                const personResponse = await res.json()
                sessionStorage.setItem(
                    'loggedInUser',
                    JSON.stringify({
                        token: user.token,
                        rnummer: user.rnummer,
                        email: user.email,
                        id: personResponse.id,
                        role: user.role
                    })
                )
                console.log(user.role)
                console.log(personResponse)
                console.log(personResponse.id)
                setIsPending(true);
                setTimeout(() => {
                  router.push('./HomePage/Home'); 
                }, 2000);
              } else {
                window.alert('Invalid username/password');
              }
        } catch (error) {
            console.error("Error checking user:", error);
        }
    }
    }


    const toSignIn = () => {
        router.push('./SignInPage/SignInPage'); 
    }

    return (
        <div>
            <Backdrop
                sx={{ display: "flex", flexDirection: "column", gap: "100px", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isPending}
            >
                <CircularProgress size='6rem' />
            </Backdrop>
            <HeaderWithoutProfile></HeaderWithoutProfile>
            <Box sx={{}}>
                <Card sx={{ width: '400px', margin: 'auto', mt: '12em', height: '250px', textAlign: 'center', boxShadow: '4', justifyItems: 'center' }}>
                    <Typography sx={{ bgcolor: '#e00049', color: 'white' }}>{t('Login')}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', mt: '2em', gap: '5px' }}>
                        <TextField id="userField" label={t("Rnumber")} variant="outlined" sx={{ width: '250px' }} />
                        <TextField id="passField" label={t("Password")} variant="outlined" type='password' sx={{ width: '250px' }} />

                        <Button color='primary' onClick={checkUser} variant="contained" type={"submit"}>
                        {t('Login')}
                        </Button>
                    </Box>
                    <Box sx={{ textAlign: "right", mr: "2em" }}>
                        <Button color='primary' onClick={toSignIn}>
                            {t('Sign')}
                        </Button>
                    </Box>
                </Card>

                {isPending2 ? (
                    <Box sx={{mt:'2em', display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress size="6rem" />
                    </Box>
                ) : (
                    <Box sx={{ mt: '2em', display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Box sx={{ width: '70%' }}>
                      <Table style={{ borderSpacing: '20px' }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>{t("Username")}</TableCell>
                            <TableCell>{t("Rnumber")}</TableCell>
                            <TableCell>{t("Role")}</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell style={{ padding: '10px' }}>{user.person.username}</TableCell>
                              <TableCell style={{ padding: '10px' }}>{user.rnummer}</TableCell>
                              <TableCell style={{ padding: '10px' }}>{user.role}</TableCell>
                              <TableCell style={{ padding: '10px' }}>
                                <Button onClick={() => loginAsProf(user.rnummer)} variant="contained">
                                  {t("Login")}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Box>
                  
                )}
                        </Box>
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


export default Index;
