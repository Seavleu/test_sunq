import React from "react";
import { useRouter } from "expo-router";
import userStore from "../utils/storage";
import Button from "./Button";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    userStore.logout();
    router.replace("/(auth)");
  };

  return <Button title="로그아웃" handlePress={handleLogout} />;
};

export default LogoutButton;
