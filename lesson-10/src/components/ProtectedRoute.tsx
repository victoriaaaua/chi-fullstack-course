import { Navigate } from "react-router-dom";
import React from "react";
import { UserState } from "../store/slices/userSlice";

interface ProtectedRouteProps {
  children: JSX.Element,
  isAllowed: UserState
}

function ProtectedRoute({ children, isAllowed }: ProtectedRouteProps) {

  if (isAllowed !== UserState.loggedIn) {
    return (<Navigate to="/login" replace />);
  }

  return children;
}

export default ProtectedRoute;
