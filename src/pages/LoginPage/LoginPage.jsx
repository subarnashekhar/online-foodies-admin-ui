import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SERVER_BASE_URL } from '../../services/axiosConfig';
import { Button, Spinner } from 'react-bootstrap';

const LoginPage = () => {

  const [cognitoUrl, setCognitoUrl] = useState('');
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
    const response = await axios.get(SERVER_BASE_URL + '/auth/url');
    console.log("%%%%%%%%" + response.data.url);
    if (response.data) {
      setCognitoUrl(response.data.url);
    }
    };

    fetchData();

  }, []);


  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 100px)',
      padding: '20px'
    }}>
      <div style={{
        padding: '40px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        textAlign: 'center',
        minWidth: '300px'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Welcome to Admin Dashboard</h2>
        <Button 
          onClick={() => { window.location.href = cognitoUrl; }}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          Sign in with Google or AWS account
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;