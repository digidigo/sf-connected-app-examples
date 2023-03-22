import React, { useState, useEffect } from "react";
import { useCookie } from "../contexts/useCookieContext";

const DisplayName = () => {
  const { cookies, clearCookieAndRefresh } = useCookie();

  return (
    <div>{cookies.displayName ? <p>{cookies.displayName}</p> : <p></p>}</div>
  );
};

export default DisplayName;
