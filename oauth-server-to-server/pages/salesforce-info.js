import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import Header from "../components/Header";
import ContactCard from "../components/ContactCard";

const SalesforceInfo = () => {
  const [contacts, setContacts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = Cookie.get("userId");

    if (!userId) {
      return;
    }

    async function fetchData() {
      try {
        const response = await fetch(`/api/salesforce-data?userId=${userId}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch Salesforce data: ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("data:", data);
        setContacts(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  const handleContactUpdate = async (id, updates) => {
    try {
      const response = await fetch(`/api/update-contact?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error(`Failed to update contact: ${response.statusText}`);
      }
      const updatedContact = await response.json();
      console.log("updatedContact:", updatedContact);
      // Update the contacts state with the updated contact
      setContacts((prevContacts) =>
        prevContacts.map((contact) => {
          if (contact.Id === updatedContact.Id) {
            return updatedContact;
          } else {
            return contact;
          }
        })
      );
      return updatedContact;
    } catch (error) {
      console.error(error);
      setError(error.message);
      return null;
    }
  };

  return (
    <div>
      <Header />
      {error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts ? (
            contacts.map((contact) => (
              <ContactCard
                key={contact.Id}
                id={contact.Id}
                firstName={contact.FirstName}
                lastName={contact.LastName}
                onUpdateContact={handleContactUpdate}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SalesforceInfo;
