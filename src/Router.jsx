
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import PrivateOutlet from './components/PrivateOutlet';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ListMember from './pages/ListMember';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import { API } from './configs';
import { axiosPost } from './utils/axios';

import { logout, updateTokens } from './redux/actions/auth';


const AppRouter = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const tokens = useSelector((state) => state.auth.account.tokens);

  useEffect(() => {
    const refreshToken = async () => {
      const { success, data } = await axiosPost(API.AUTH.REFRESH_TOKENS, {
        refreshToken: tokens.refresh.token,
      });
      if (success) {
        if(data.success){
          dispatch(updateTokens(data.tokens));
        } else {
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      }
    };

    if (isLoggedIn && !!tokens?.refresh?.token) {
      refreshToken();
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/forgotPassword" exact element={<ForgotPassword />} />
          <Route path="/resetPassword" exact element={<ResetPassword />} />
          <Route element={<PrivateOutlet />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/listMember/:role" exact element={<ListMember />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default AppRouter;
