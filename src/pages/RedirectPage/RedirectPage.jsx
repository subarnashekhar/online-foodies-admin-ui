import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SERVER_BASE_URL } from '../../services/axiosConfig';
import { Spinner } from 'react-bootstrap';

const RedirectPage = () => {

  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const fetchData = async () => {

      console.log('Authorization code:', code);
      
      const response = await axios.get(SERVER_BASE_URL + '/auth/callback?code=' + code);

      console.log("###########" + JSON.stringify(response.data));

      if (response.data) {
        setToken(response.data.token);
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token);
        
        // Decode JWT token to extract user information
        try {
          const payload = response.data.token.split('.')[1];
          const decodedPayload = JSON.parse(atob(payload));
          const userEmail = decodedPayload.email || decodedPayload.sub || 'User';
          
          localStorage.setItem('user', JSON.stringify({ name: userEmail }));
          
          // Dispatch custom event to notify components about auth change
          window.dispatchEvent(new Event('authChange'));
        } catch (error) {
          console.error('Error decoding JWT token:', error);
          localStorage.setItem('user', JSON.stringify({ name: 'User' }));
          window.dispatchEvent(new Event('authChange'));
        }
        
        navigate('/');
      } else {
        toast.error("Error while logging in.");
      }


    }

    fetchData();

  }, []);


  return (
    <div>
      {token &&         <div>
          <h2>Login successful!</h2>
          <p>Your token: {token}</p>
        </div>}
    </div>
  );
}

export default RedirectPage;