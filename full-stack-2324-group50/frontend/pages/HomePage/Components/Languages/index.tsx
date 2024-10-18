import React from 'react';
import { useRouter } from 'next/router';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';

const Language: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value;
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <Box display="flex" alignItems="center" height="50%">
      <FormControl style={{ height: '50%' }}>
        <Select
          id="language-select"
          value={locale}
          onChange={handleLanguageChange}
          style={{ color: 'white' }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Espanol</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Language;
