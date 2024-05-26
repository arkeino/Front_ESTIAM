import React from 'react';
import { Box, Stack, Typography, Avatar, Card, Button, Grid, InputLabel, FormControl, Select, MenuItem } from '@mui/material'; 
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';


const StyledCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  width: '50%',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
}));

const Welcome = (): JSX.Element => {
  const navigate = useNavigate(); // Call useNavigate outside any functions

  const handleContactUs = () => {
    // Open the default message app
    window.location.href = 'mailto:your-email@example.com';
  };

  const handleGetStarted = () => {
    navigate('/login'); // Use the previously declared navigate function
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <StyledCard>
        <CardContent>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Welcome to TechCorp!
          </Typography>
          <Typography variant="body1">
            Here is what we do:
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            TechCorp empowers individuals and teams to achieve their goals through:
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2">Cutting-edge Technologies</Typography>
            <Typography variant="body2" color="text.secondary">
              Stay ahead of the curve with access to the latest tools and advancements.
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            <Button variant="contained" size="large" color="primary" onClick={handleGetStarted}>
              Get Started
            </Button>
            <Button variant="outlined" size="large" color="primary" onClick={handleContactUs}>
              Contact Us
            </Button>
          </Stack>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default Welcome;
