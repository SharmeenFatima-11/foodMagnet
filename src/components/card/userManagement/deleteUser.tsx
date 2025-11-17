"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import SquareButton from "../../button/squareButton";
import CancelButton from "../../button/whiteSquareButton";
import { DeleteUsers } from "../../../lib/api/userManagement/userApis";
import Swal from "sweetalert2";

interface DeleteUserCardProps {
  setModel: (value: boolean) => void;
  setIsAdded: React.Dispatch<React.SetStateAction<boolean>>;
  user?: {
    id: string;
    name: string;
    email: string;
    date: string;
  } | null;
}

const DeleteUserCard: React.FC<DeleteUserCardProps> = ({
  setModel,
  user,
  setIsAdded,
}) => {
  const [added, setAdded] = useState(false);

  if (!user) return null;

  const handleDelete = () => {
    console.log("in delete");

    if (!user || !user.id) {
      console.log("user in condition", user);
      Swal.fire({
        title: "Error!",
        text: "User Id cannot be null",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#8B4DC5", // purple confirm button
      });
      return;
    }
    setAdded(true);

    DeleteUsers(user.id.toString())
      .then((data) => {
        Swal.fire({
          title: "Success!",
          text: "User deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // custom purple button
        });
        setModel(false);
        setAdded(false);
        setIsAdded((prev) => !prev);
      })
      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to delete user.";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // purple confirm button
        });
        setAdded(false);
      });

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
          <CancelButton
            text="Cancel"
            onClick={() => setModel(false)}
            isTriggered={added}
          />
          <SquareButton
            text="Yes, Remove"
            onClick={handleDelete}
            isTriggered={added}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DeleteUserCard;
