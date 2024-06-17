import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import makeNameReadable from "@/helper/GetUsername";
import getUserID from "@/helper/GetUserId";

interface DisplayNameProps {
  activeUser: string;
  setActiveUser: (name: string) => void;
}

const DisplayName = ({ activeUser, setActiveUser }: DisplayNameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(activeUser);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(getUserID(e.target.value));
  };

  const handleBlur = () => {
    setIsEditing(false);
    setActiveUser(editedName);
  };

  return (
    <h1 className="flex items-center gap-2 text-lg font-semibold">
      <span>Welcome, </span>
      {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={handleNameChange}
          onBlur={handleBlur}
          className="border rounded px-2 bg-slate-800 text-sm h-8 w-1/2"
          autoFocus
        />
      ) : (
        <span>{makeNameReadable(activeUser)}</span>
      )}
      <button onClick={handleEditClick}>
        <FaEdit className="text-slate-500" />
      </button>
    </h1>
  );
};

export default DisplayName;
