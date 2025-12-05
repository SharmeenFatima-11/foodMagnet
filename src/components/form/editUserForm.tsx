"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import TextField from "../textFields/textField";
import SquareButton from "../button/squareButton";
import WhiteSquareButton from "../button/whiteSquareButton";
import { UpdateUsers } from "../../lib/api/userManagement/userApis";
import Swal from "sweetalert2";

interface UserFormProps {
  showModel: boolean;
  setModel: (value: boolean) => void;
  setIsAdded: React.Dispatch<React.SetStateAction<boolean>>;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateAdded: string;
  } | null;
}

const UserForm: React.FC<UserFormProps> = ({
  showModel,
  setModel,
  user,
  setIsAdded,
}) => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [added, setAdded] = useState(false);

  const [formError, setFormError] = useState("");

  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  if (!showModel) return null;

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    if (!value.trim()) setFirstNameError("First name is required");
    else if (value.length < 2)
      setFirstNameError("First name must be at least 2 characters");
    else setFirstNameError("");
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    if (!value.trim()) setLastNameError("Last name is required");
    else if (value.length < 2)
      setLastNameError("Last name must be at least 2 characters");
    else setLastNameError("");
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!value.trim()) setEmailError("Email is required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      setEmailError("Invalid email format");
    else setEmailError("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef?: React.RefObject<
      HTMLInputElement | HTMLButtonElement | null
    > | null
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef?.current) {
        nextRef.current.focus();
      }
    }
  };

  const resetForm = () => {
    setFirstName("");
    setFirstNameError("");
    setLastName("");
    setLastNameError("");
    setEmail("");
    setEmailError("");
    setFormError("");
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !email) {
      setFormError(
        "Please fill out all required fields correctly before submitting."
      );
      return;
    }

    setFormError("");
    if (!user || !user.id) {
      console.log("user in condition", user)
      Swal.fire({
        title: "Error!",
        text: "User Id cannot be null",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#8B4DC5", // purple confirm button
      });
      return;
    }

    const userData = {
      userId: user.id.toString(),
      firstName,
      lastName,
      email,
    };
    setAdded(true);

    UpdateUsers(userData)
      .then((data) => {
        Swal.fire({
          title: "Success!",
          text: "User updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // custom purple button
        });
        resetForm();
        setModel(false);
        setAdded(false);
        setIsAdded((prev) => !prev);
      })
      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to update user.";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // purple confirm button
        });
        setAdded(false);
      });
  };

  useEffect(() => {
    setFirstName(user?.firstName ? user?.firstName : "");
    setLastName(user?.lastName ? user?.lastName : "");
    setEmail(user?.email ? user?.email : "");
  }, [user]);

  return (
    <motion.div
      className="fixed top-0 right-0 w-[420px] h-full bg-white shadow-2xl z-50 flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Edit User Information
        </h2>
        <button onClick={() => setModel(false)}>
          <XMarkIcon className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
        </button>
      </div>

      {/* Form with Smooth Scrolling */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
        <p>
          Adding a user will apply an additional seat charge to your account.
        </p>

        <TextField
          text="First Name"
          field={firstName}
          setField={handleFirstNameChange}
          placeholder="John"
          type="text"
          error={firstNameError}
          inputRef={firstNameRef}
          onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
        />

        <TextField
          text="Last Name"
          field={lastName}
          setField={handleLastNameChange}
          placeholder="Doe"
          type="text"
          error={lastNameError}
          inputRef={lastNameRef}
          onKeyDown={(e) => handleKeyDown(e, emailRef)}
        />

        <TextField
          text="Email Address"
          field={email}
          setField={handleEmailChange}
          placeholder="john.doe@example.com"
          type="email"
          error={emailError}
          inputRef={emailRef}
          onKeyDown={(e) => handleKeyDown(e, submitRef)}
        />

        {formError && (
          <p className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded-md">
            {formError}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 flex justify-end gap-x-3  gap-x-3">
        <div className="flex justify-end gap-x-3 ">
          <div>
            <WhiteSquareButton
              text="Cancel"
              onClick={handleCancel}
              isTriggered={added}
            />
          </div>
          <div className="flex-1">
            <SquareButton
              text="Save Changes"
              onClick={handleSubmit}
              buttonRef={submitRef}
              isTriggered={added}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserForm;
