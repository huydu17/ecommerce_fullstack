import React from "react";
import { Outlet } from "react-router-dom";
import UserChatComponent from "./UserChat";

function RoutesWithUserChat() {
  return (
    <>
      <UserChatComponent />
      <Outlet />
    </>
  );
}

export default RoutesWithUserChat;
