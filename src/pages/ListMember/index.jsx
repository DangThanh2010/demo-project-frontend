import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, TB, TD, TH, TR } from '../../components/Table';
import { API } from '../../configs';
import { axiosGet } from '../../utils/axios';
import { setAxiosDefaultAuthToken, ToastTopHelper } from '../../utils/utils';

const ListMember = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [permit, setPermit] = useState(true);
  const [listMember, setListMember] = useState([]);

  const navigate = useNavigate();
  const account = useSelector((state) => state.auth.account);
  const params = useParams();
  const role = parseInt(params.role);


  const fetchMember = async () => {
    setAxiosDefaultAuthToken(account.tokens.access.token);
    const { success, data } = await axiosGet(
      role === 0 ? API.USER.LIST_ADMIN : API.USER.LIST_USER
    );
    if (success) {
      if(data.success){
        setListMember(data.result);
      } else {
        setPermit(false);
      }
    } else {
      ToastTopHelper.error('Have error when loading.');
    }
  };

  useEffect(() => {
    fetchMember().then(() =>{
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <div style={styles.wrapContent}>
      {isLoading ? (
        <></>
      ) : (
        <>
        {permit ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TH>
              <TR>
                <TD>Email</TD>
                <TD align="right">Role</TD>
              </TR>
            </TH>
            <TB>
              {listMember.map((user, index) => (
                <TR
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TD component="th" scope="row">
                    {user.email}
                  </TD>
                  <TD component="th" scope="row" align="right">
                    {user.role === 0 ? "admin" : "user"}
                  </TD>
                </TR>
              ))}
            </TB>
          </Table>
        ) : 
        (
          <>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{  mt: '10px'}}
            >
              <Typography variant="h4" >You aren't permited for this feature</Typography>
            </Box>
          </>
        )}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{  mt: '10px'}}
          >
            <Button variant="contained" onClick={() => {navigate('/');}}>Go to Home</Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default ListMember;

const styles = {
  wrapContent: {
    paddingTop: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
};
