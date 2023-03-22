// components/ContactCard.js

const ContactCard = ({ firstName, lastName }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">
        {firstName} {lastName}
      </h2>
    </div>
  );
};

export default ContactCard;
