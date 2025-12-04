"use client";
import React, { useState } from "react";
import Table from "../../../components/table/usersTable";

interface AdminUserCardProps {
  users: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateAdded: string;
  }[];
  isAdmin: boolean;
  setModel: (value: boolean) => void;
  setdeleteModel: (value: boolean) => void;
}

const AdminUserCard: React.FC<AdminUserCardProps> = ({
  users,
  isAdmin,
  setModel,
  setdeleteModel,
}) => {
  const handleEdit = (user: any) => {
    setModel(user);
    console.log("edit user", user);
    // open edit popup logic here
  };

  const handleDelete = (user: any) => {
    setdeleteModel(user);
    // delete confirmation logic here
  };
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-start gap-4 mx-4 sm:mx-10 mt-4 py-4 mb-2 ${
        isAdmin == true ? "border-b border-[#E5E5E5]" : ""
      } `}
    >
      {isAdmin == true ? (
        <div className="flex flex-col text-left w-full sm:w-auto">
          <span className="font-bold text-lg sm:text-xl">Admin users</span>
          <span className="text-sm sm:text-base whitespace-nowrap">
            Admin users can add and remove users and <br></br> manage
            organization-level settings.
          </span>
        </div>
      ) : (
        <div className="flex flex-col text-left w-full sm:w-auto">
          <span className="font-bold text-lg sm:text-xl">View Only</span>
          <span className="text-sm sm:text-base whitespace-nowrap">
            View only users can view all content but may <br></br> not make any
            changes.
          </span>
        </div>
      )}

      <Table users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AdminUserCard;
