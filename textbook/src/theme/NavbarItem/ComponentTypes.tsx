import React from "react";
import ComponentTypes from "@theme-original/NavbarItem/ComponentTypes";
import AuthBar from "../../components/AuthBar";
import TranslateToggle from "../../components/TranslateToggle";

const AuthBarWrapper = () => <AuthBar />;
const TranslateToggleWrapper = () => <TranslateToggle />;

export default {
  ...ComponentTypes,
  "custom-authBar": AuthBarWrapper,
  "custom-translateToggle": TranslateToggleWrapper,
};
