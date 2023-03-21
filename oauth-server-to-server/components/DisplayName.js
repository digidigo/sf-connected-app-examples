import React from "react";
import Cookie from "js-cookie";

const DisplayName = () => {
  const displayName = Cookie.get("displayName");

  return (
    <div>
      {displayName ? (
        <p>Welcome, {displayName}!</p>
      ) : (
        <p>Please log in to see your display name.</p>
      )}
    </div>
  );
};

export default DisplayName;
