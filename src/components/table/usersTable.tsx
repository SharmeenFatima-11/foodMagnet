"use client";
import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useViewOnly } from "@/context/ViewOnlyContext";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateAdded: string;
}

interface AdminUserCardProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const AdminUserCard: React.FC<AdminUserCardProps> = ({
  users,
  onEdit,
  onDelete,
}) => {
  const { isViewOnly } = useViewOnly();
  return (
    <div className="w-full px-4 sm:px-10 mt-4">
      {/* Header (hidden on mobile) */}
      <div className="hidden sm:flex sm:justify-between sm:pr-18  border-b border-[#E5E5E5] pb-2 mb-2 text-gray-500 text-sm font-medium">
        <div className="col-span-2 font-semibold text-gray-800">Name</div>
        <div className="text-left font-semibold text-gray-800">Date Added</div>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-y-3">
        {users.map((user, index) => (
          <div
            key={index}
            className="w-full flex flex-col sm:grid sm:grid-cols-3 sm:items-center border border-[#E5E5E5] sm:border-0 rounded-xl sm:rounded-none p-4 sm:p-0 sm:py-3 bg-white shadow-sm sm:shadow-none"
          >
            {/* User Info */}
            <div className="flex flex-col sm:col-span-2 w-full">
              <span className="font-semibold text-gray-800 text-base break-words">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-gray-500 text-sm break-words">
                {user.email}
              </span>

              {/* Date & Actions (on mobile) */}
              <div className="flex sm:hidden justify-between items-center mt-3 w-full">
                <span className="text-black text-sm">{new Date(user.dateAdded).toLocaleDateString('en-GB')}</span>
                <div className="flex gap-x-3">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    aria-label="Edit user"
                  >
                    <PencilIcon className="w-4 h-4 text-black cursor-pointer" />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    aria-label="Delete user"
                  >
                    <TrashIcon className="w-4 h-4 text-black cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>

            {/* Date & Actions (on desktop) */}
            <div className="hidden sm:flex justify-end items-center gap-x-6">
              <span className="text-black text-sm">{new Date(user.dateAdded).toLocaleDateString('en-GB')}</span>
             {isViewOnly ? <div className="w-12"></div> : ( 
              <div className="flex justify-end">
                <button
                  onClick={() => onEdit(user)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition"
                  aria-label="Edit user"
                >
                  <PencilIcon className="w-4 h-4 text-black cursor-pointer" />
                </button>
                <button
                  onClick={() => onDelete(user)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition"
                  aria-label="Delete user"
                >
                 <TrashIcon className="w-4 h-4 text-black cursor-pointer" />
                </button>
              </div>
             )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUserCard;
