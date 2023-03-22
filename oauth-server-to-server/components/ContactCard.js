import { useState } from "react";

const ContactCard = ({ id, firstName, lastName, onUpdateContact }) => {
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [isEditing, setIsEditing] = useState(false);

  const handleLastNameChange = (event) => {
    setEditedLastName(event.target.value);
  };

  const handleSaveClick = async () => {
    // Call the update contact API
    const updatedContact = await onUpdateContact(id, {
      lastName: editedLastName,
    });

    // Update the last name and exit the editing mode
    if (updatedContact) {
      lastName = updatedContact.lastName;
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    // Reset the edited last name and exit the editing mode
    setEditedLastName(lastName);
    setIsEditing(false);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">
        {firstName}{" "}
        {isEditing ? (
          <input
            type="text"
            value={editedLastName}
            onChange={handleLastNameChange}
            className="border rounded-md px-2 py-1"
          />
        ) : (
          <span>{lastName}</span>
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
