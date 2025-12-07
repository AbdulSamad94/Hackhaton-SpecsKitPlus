import React from 'react';
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import AuthBar from '../../components/AuthBar';

// Wrap AuthBar to match NavbarItem component structure
const AuthBarWrapper = () => <AuthBar />;

export default {
  ...ComponentTypes,
  'custom-authBar': AuthBarWrapper,
};
