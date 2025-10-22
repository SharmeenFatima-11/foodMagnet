"use client";
import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import SquareButton from "../../button/squareButton";
import CancelButton from "../../button/whiteSquareButton";

interface DeleteUserCardProps {
  showModel: boolean;
  setModel: (value: boolean) => void;
  user?: {
    name: string;
    email: string;
    date: string;
  } | null;
  onDelete?: (userEmail: string) => void;
}

const DeleteUserCard: React.FC<DeleteUserCardProps> = ({
  showModel,
  setModel,
  user,
  onDelete,
}) => {
  if (!user) return null;

  const handleDelete = () => {
    console.log("in delete")
    if (onDelete) onDelete(user.email);
    setModel(false);
  };

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[380px] relative z-50">
        {/* Close Button */}
        <button
          onClick={() => setModel(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <p className="text-lg font-semibold mb-6 px-8 text-center py-4">
          Are you sure you want to remove this user?
        </p>

        <div className="flex justify-center gap-3">
          <CancelButton text="Cancel" onClick={() => setModel(false)} />
          <SquareButton text="Yes, Remove" onClick={handleDelete} />
        </div>
      </div>
    </motion.div>
  );
};

export default DeleteUserCard;
