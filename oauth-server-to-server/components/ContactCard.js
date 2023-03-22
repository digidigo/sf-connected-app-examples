import { useState } from "react";
import { useLoading } from "../contexts/useLoadingContext";

const ContactCard = ({ id, firstName, lastName, onUpdateContact }) => {
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFirstName, setUpdatedFirstName] = useState(firstName);
  const [updatedLastName, setUpdatedLastName] = useState(lastName);

  const handleFirstNameChange = (event) => {
    setUpdatedFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setEditedLastName(event.target.value);
  };

  const handleSaveClick = async () => {
    // Call the update contact API

    const updatedContact = await onUpdateContact(id, {
      firstName: updatedFirstName,
      lastName: editedLastName,
    });

    // Update the first and last names and exit the editing mode
    if (updatedContact) {
      setUpdatedFirstName(updatedContact.firstName);
      setUpdatedLastName(updatedContact.lastName);
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    // Reset the edited first and last names and exit the editing mode
    setUpdatedFirstName(firstName);
    setEditedLastName(lastName);
    setIsEditing(false);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">
        {isEditing ? (
          <input
            type="text"
            value={updatedFirstName}
            onChange={handleFirstNameChange}
            className="border rounded-md px-2 py-1"
          />
        ) : (
          <span>{updatedFirstName}</span>
        )}{" "}
        {isEditing ? (
          <input
            type="text"
            value={editedLastName}
            onChange={handleLastNameChange}
            className="border rounded-md px-2 py-1"
          />
        ) : (
          <span>{updatedLastName}</span>
        )}
      </h2>
      {isEditing ? (
        <>
          <button
            onClick={handleSaveClick}
            className="border rounded-md px-2 py-1"
          >
            Save
          </button>
          <button
            onClick={handleCancelClick}
            className="border rounded-md px-2 py-1"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="border rounded-md px-2 py-1"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default ContactCard;
