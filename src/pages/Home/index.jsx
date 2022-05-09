import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/auth';

const Home = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const account = useSelector((state) => state.auth.account);
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3">Home page</Typography>
      </Box>
      
      <Grid
        container
        direction="row"
        sx={{ minHeight: '100vh', mt: '10px'}}
      >
        <Grid item xs={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" onClick={() => {
              navigate('/listMember/0');
            }}> View List Admin</Button>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" onClick={() => {
              navigate('/listMember/1');
            }}> View List User</Button>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" onClick={() => {
              dispatch(logout({refreshToken: account.tokens.refresh.token}));
            }}> Log out</Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
