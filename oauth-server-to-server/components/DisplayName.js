import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";

const DisplayName = () => {
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    const name = Cookie.get("displayName");
    setDisplayName(name);
  }, []);

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
