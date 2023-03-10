/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Image from 'next/image';
import GoogleButton from 'react-google-button';
import { signIn } from '../../utils/auth';
import logo from '../../public/bangazon logo.png';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Image src={logo} className="bangazonSignInLogo" />
      <GoogleButton className="googleSignInButton" onClick={signIn}>
        Sign In
      </GoogleButton>
    </div>
  );
}

export default Signin;
