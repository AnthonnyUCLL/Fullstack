import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Container } from "@mui/material";
import { Alert } from "@mui/material";
import { AlertTitle } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useRouter } from 'next/router';
import HeaderWithoutProfile from '../..//components/HeaderWithoutProfile';
import { addPerson, addUser, getUser } from '../../services/UserService';
import { log } from 'console';
import { loginUser } from '../../services/UserService';
interface Country {
  code: string;
  label: string;
}

function SignInPage() {
  const router = useRouter();
  const [foutMelding, setFoutMelding] = useState("")
  const [isPending, setIsPending] = useState(true);
  const [chosenCountry, setChosenCountry] = useState<string | null>(null);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@ucll\.be$/;
  const rNumberRegex = /^r[0-9]{7}$/;
  const checkValues = async () => {
    const rNumberField = document.getElementById("RNumberField") as HTMLInputElement;
    const emailField = document.getElementById("emailField") as HTMLInputElement;
    const passField = document.getElementById("passField") as HTMLInputElement;
    const confirmPassField = document.getElementById("confirmPassField") as HTMLInputElement;

    if (
      rNumberField.value === null ||
      rNumberField.value === '' ||
      !rNumberRegex.test(rNumberField.value) 
    ) {
      return false;
    }
    if (
      emailField.value === null ||
      emailField.value === '' ||
      !emailRegex.test(emailField.value)
    ) {
      return false;
    }
    if (
      passField.value === null ||
      passField.value === '' ||
      passField.value.length < 3
    ) {
      return false;
    }
    if (
      confirmPassField.value !== passField.value ||
      confirmPassField.value === null ||
      confirmPassField.value === '' ||
      confirmPassField.value.length < 3
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!checkValues()) {
      setIsPending(false);
    } else {
      const rNumberField = document.getElementById("RNumberField") as HTMLInputElement;
      const emailField = document.getElementById("emailField") as HTMLInputElement;
      const ageField = document.getElementById("ageField") as HTMLInputElement;
      const passField = document.getElementById("passField") as HTMLInputElement;

      const rNummer = rNumberField.value;
      const rx = /^[a-zA-Z0-9._%+-]+/;
      const testUsername = emailField.value;
      const matches = testUsername.match(rx);
      const username_test = matches ? matches[0] : '';
      const username = username_test.replace(/\./g, ' ')
      const age = ageField ? parseInt(ageField.value) : 0;
      const email = emailField.value;
      const password = passField.value;

      const user = {
        rnummer: rNummer,
        email: email,
        password: password,
      };
      console.log(user)
      await addUser(user)
      const res = await loginUser(user);
      
      const loggedUser = await res.json();
      console.log(loggedUser)
      sessionStorage.setItem(
        'signedUser',
        JSON.stringify({
            token: loggedUser.token,
            rnummer: loggedUser.rnummer,
            email: loggedUser.email
        })
    )
      const response = await getUser(rNummer)
      const personResponse = await response.json()

      const person = {
        username: username,
        age: age,
        nationality: chosenCountry,
        userId: personResponse.id
      };

      await addPerson(person)
      toLoginPage();
    }
  };

  const toLoginPage = () => {
    router.push('/'); 
  };

  const countries: Country[] = [
    { code: 'AD', label: 'Andorra' },
    { code: 'AE', label: 'United Arab Emirates' },
    { code: 'AF', label: 'Afghanistan' },
        { code: 'AG', label: 'Antigua and Barbuda' },
        { code: 'AI', label: 'Anguilla' },
        { code: 'AL', label: 'Albania' },
        { code: 'AM', label: 'Armenia' },
        { code: 'AO', label: 'Angola' },
        { code: 'AQ', label: 'Antarctica' },
        { code: 'AR', label: 'Argentina' },
        { code: 'AS', label: 'American Samoa' },
        { code: 'AT', label: 'Austria' },
        { code: 'AU', label: 'Australia'},
        { code: 'AW', label: 'Aruba' },
        { code: 'AX', label: 'Alland Islands' },
        { code: 'AZ', label: 'Azerbaijan' },
        { code: 'BA', label: 'Bosnia and Herzegovina' },
        { code: 'BB', label: 'Barbados' },
        { code: 'BD', label: 'Bangladesh' },
        { code: 'BE', label: 'Belgium' },
        { code: 'BF', label: 'Burkina Faso' },
        { code: 'BG', label: 'Bulgaria' },
        { code: 'BH', label: 'Bahrain' },
        { code: 'BI', label: 'Burundi' },
        { code: 'BJ', label: 'Benin' },
        { code: 'BL', label: 'Saint Barthelemy' },
        { code: 'BM', label: 'Bermuda' },
        { code: 'BN', label: 'Brunei Darussalam' },
        { code: 'BO', label: 'Bolivia' },
        { code: 'BR', label: 'Brazil' },
        { code: 'BS', label: 'Bahamas' },
        { code: 'BT', label: 'Bhutan' },
        { code: 'BV', label: 'Bouvet Island' },
        { code: 'BW', label: 'Botswana' },
        { code: 'BY', label: 'Belarus' },
        { code: 'BZ', label: 'Belize' },
        { code: 'CA', label: 'Canada'},
        { code: 'CC', label: 'Cocos (Keeling) Islands' },
        { code: 'CD', label: 'Congo, Democratic Republic of the' },
        { code: 'CF', label: 'Central African Republic' },
        { code: 'CG', label: 'Congo, Republic of the' },
        { code: 'CH', label: 'Switzerland' },
        { code: 'CI', label: "Cote d'Ivoire" },
        { code: 'CK', label: 'Cook Islands' },
        { code: 'CL', label: 'Chile' },
        { code: 'CM', label: 'Cameroon' },
        { code: 'CN', label: 'China' },
        { code: 'CO', label: 'Colombia' },
        { code: 'CR', label: 'Costa Rica' },
        { code: 'CU', label: 'Cuba' },
        { code: 'CV', label: 'Cape Verde' },
        { code: 'CW', label: 'Curacao' },
        { code: 'CX', label: 'Christmas Island' },
        { code: 'CY', label: 'Cyprus' },
        { code: 'CZ', label: 'Czech Republic' },
        { code: 'DE', label: 'Germany'},
        { code: 'DJ', label: 'Djibouti' },
        { code: 'DK', label: 'Denmark' },
        { code: 'DM', label: 'Dominica' },
        { code: 'DO', label: 'Dominican Republic' },
        { code: 'DZ', label: 'Algeria' },
        { code: 'EC', label: 'Ecuador' },
        { code: 'EE', label: 'Estonia' },
        { code: 'EG', label: 'Egypt' },
        { code: 'EH', label: 'Western Sahara' },
        { code: 'ER', label: 'Eritrea' },
        { code: 'ES', label: 'Spain' },
        { code: 'ET', label: 'Ethiopia' },
        { code: 'FI', label: 'Finland' },
        { code: 'FJ', label: 'Fiji' },
        { code: 'FK', label: 'Falkland Islands (Malvinas)' },
        { code: 'FM', label: 'Micronesia, Federated States of' },
        { code: 'FO', label: 'Faroe Islands' },
        { code: 'FR', label: 'France'},
        { code: 'GA', label: 'Gabon' },
        { code: 'GB', label: 'United Kingdom' },
        { code: 'GD', label: 'Grenada' },
        { code: 'GE', label: 'Georgia' },
        { code: 'GF', label: 'French Guiana' },
        { code: 'GG', label: 'Guernsey' },
        { code: 'GH', label: 'Ghana' },
        { code: 'GI', label: 'Gibraltar' },
        { code: 'GL', label: 'Greenland' },
        { code: 'GM', label: 'Gambia' },
        { code: 'GN', label: 'Guinea' },
        { code: 'GP', label: 'Guadeloupe' },
        { code: 'GQ', label: 'Equatorial Guinea' },
        { code: 'GR', label: 'Greece' },
        { code: 'GS', label: 'South Georgia and the South Sandwich Islands' },
        { code: 'GT', label: 'Guatemala' },
        { code: 'GU', label: 'Guam' },
        { code: 'GW', label: 'Guinea-Bissau' },
        { code: 'GY', label: 'Guyana' },
        { code: 'HK', label: 'Hong Kong' },
        { code: 'HM', label: 'Heard Island and McDonald Islands' },
        { code: 'HN', label: 'Honduras' },
        { code: 'HR', label: 'Croatia' },
        { code: 'HT', label: 'Haiti' },
        { code: 'HU', label: 'Hungary' },
        { code: 'ID', label: 'Indonesia' },
        { code: 'IE', label: 'Ireland' },
        { code: 'IL', label: 'Israel' },
        { code: 'IM', label: 'Isle of Man' },
        { code: 'IN', label: 'India' },
        { code: 'IO', label: 'British Indian Ocean Territory' },
        { code: 'IQ', label: 'Iraq' },
        { code: 'IR', label: 'Iran, Islamic Republic of' },
        { code: 'IS', label: 'Iceland' },
        { code: 'IT', label: 'Italy' },
        { code: 'JE', label: 'Jersey' },
        { code: 'JM', label: 'Jamaica' },
        { code: 'JO', label: 'Jordan' },
        { code: 'JP', label: 'Japan'},
        { code: 'KE', label: 'Kenya' },
        { code: 'KG', label: 'Kyrgyzstan' },
        { code: 'KH', label: 'Cambodia' },
  ];

  return (
    <html lang="en">
      <HeaderWithoutProfile></HeaderWithoutProfile>
      <Box sx={{}}>
        <Card sx={{ width: '40vw', margin: 'auto', mt: '13em', boxShadow: '4', paddingBottom: '2em' }}>
          <Typography sx={{ bgcolor: '#e00049', color: 'white', textAlign:'center' }}>Login</Typography>
          <Box sx={{ textAlign: "left", ml: "2em" }}>
            <Button onClick={toLoginPage}>
              go back
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', mt: '2em', gap: '5px' }}>
            <TextField id="RNumberField" label="r-nummer" variant="outlined" sx={{ width: '90%' }} />
            <TextField id="emailField" label="UCLL-Email" variant="outlined" sx={{ width: '90%' }} />
            <Box sx={{ display: 'flex', width: '90%' }}>
              <Autocomplete
                id="country-select-demo"
                sx={{ width: 300 }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  setChosenCountry(newValue ? newValue.label : null);
                }}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.label} ({option.code})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password',
                    }}
                  />
                )}
              />
              <TextField id="ageField" label="age" variant="outlined" />
            </Box>
            <TextField id="passField" label="password" variant="outlined" type='password' sx={{ width: '90%'}} />
            <TextField id="confirmPassField" label="confirm password" variant="outlined" type='password' sx={{ width: '90%'}} />

            <Button aria-label="simulate" variant='contained' size='large' onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Card>
      </Box>

      <Container sx={{maxWidth:"100%"}}>
        {!isPending && <Alert severity="error" sx={{ ml: "20%", mr: "20%", justifyContent: "center" }}>
          <AlertTitle>Fout</AlertTitle>
          {foutMelding}
        </Alert>}
      </Container>
    </html>
  );
}

export default SignInPage;
