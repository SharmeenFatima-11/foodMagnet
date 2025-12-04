"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import TextField from "../textFields/textField";
import DropDown from "../dropdown/dropDownWithOneSelection";
import SquareButton from "../button/squareButton";
import WhiteSquareButton from "../button/whiteSquareButton";
import { ResetPassword } from "../../lib/api/authApi";
import Swal from "sweetalert2";
import { AddUsers } from "../../lib/api/userManagement/userApis";

interface UserFormProps {
  showModel: boolean;
  setModel: (value: boolean) => void;
  setIsAdded: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserForm: React.FC<UserFormProps> = ({
  showModel,
  setModel,
  setIsAdded,
}) => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [permission, setPermission] = useState<string[]>([]);
  const [permissionError, setPermissionError] = useState("");
  const [added, setAdded] = useState(false);

  const [permissionOptions, setPermissionOptions] = useState([
    "admin",
    "viewOnly",
  ]);

  const [formError, setFormError] = useState("");

  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const permissionRef = useRef<HTMLInputElement | null>(null);
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

  const handlePermissionChange = (value: string[]) => {
    setPermission(value);
    if (value.length === 0)
      setPermissionError("Please select at least one permission");
    else setPermissionError("");
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
    setPermission([]);
    setPermissionError("");
    setFormError("");
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !email || permission.length === 0) {
      setFormError(
        "Please fill out all required fields correctly before submitting."
      );
      return;
    }

    setFormError("");
    setAdded(true);

    const userData = {
      firstName,
      lastName,
      email,
      permission: permission[0],
    };
    AddUsers(userData)
      .then((data) => {
        ResetPassword({ email })
        Swal.fire({
          title: "Success!",
          text: "User added successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // custom purple button
        });
        resetForm();
        setModel(false);
        setAdded(false);
        setIsAdded(prev => !prev);
      })
      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to add user.";

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
        <h2 className="text-lg font-semibold text-gray-800">Add New User</h2>
        <button onClick={() => setModel(false)}>
          <XMarkIcon className="w-5 h-5 text-gray-600 hover:text-gray-800" />
        </button>
      </div>

      {/* Form with Smooth Scrolling */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
        <p>Complete all of the following fields to add a new team member.</p>

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
          onKeyDown={(e) => handleKeyDown(e, permissionRef)}
        />

        <DropDown
          text="Permission"
          field={permission}
          options={permissionOptions}
          setField={handlePermissionChange}
          placeholder="Select permissions"
          error={permissionError}
          inputRef={permissionRef}
          onKeyDown={(e) => handleKeyDown(e, emailRef)}
        />

        <TextField
          text="Email"
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
          <div className="flex-1 w-30">
            <SquareButton
              text="Add"
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
