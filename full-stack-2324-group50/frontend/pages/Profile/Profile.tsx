
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Header from '../../components/Header';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
function Profile() {
    const router = useRouter();
    const profile = {
        name: 'John Doe',
        title: 'Applied Computer Science',
        location: 'Belgium, BE',
        connections: 171,
        about: 'Some stuff about me and stuff',
    };

    const toHomePage =()=>{
        router.push('../HomePage/Home'); 
    }

return (
    <html lang="en">
  <Header></Header>
  <Grid container justifyContent="center" style={{ marginTop: '4.5em' }}>
      <Card sx={{ width: '90%' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ position: 'relative' }}>
              <img
                src="/img/bannerPicture.webp"
                alt="Banner Picture"
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <Avatar
                alt={profile.name}
                src="/"
                sx={{
                  width: 80,
                  height: 80,
                  position: 'absolute',
                  bottom: '40px',
                  left: '40px',
                  border: '2px solid white',
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4">{profile.name}</Typography>
              <Typography variant="subtitle1">{profile.title}</Typography>
              <Typography variant="body1">{profile.location}</Typography>
              <Typography variant="body2">Connections: {profile.connections}</Typography>
              <Typography variant="body1" sx={{ marginTop: '20px' }}>
                {profile.about}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
    <Button sx={{textAlign:'center'}} onClick={toHomePage}>Back</Button>
</html>

  );
}

export default Profile;
