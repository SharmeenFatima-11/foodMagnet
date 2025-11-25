"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import TextField from "../textFields/textField";
import PhoneTextField from "../textFields/phoneNumber";
import TextBox from "../textFields/textBox";
import DropDownWithOneOption from "../dropdown/dropDownWithOneSelection";
import RadioButtonGroup from "../radioButton/radioButton";
import SquareButton from "../button/squareButton";
import WhiteSquareButton from "../button/whiteSquareButton";
import Swal from "sweetalert2";
import {
  GetCuisines,
  GetStates,
  GetCities,
  AddVendor,
} from "../../lib/api/vendor/addVendor";

interface AddVendorFormProps {
  showModel: boolean;
  setModel: (value: boolean) => void;
}

const AddVendorForm: React.FC<AddVendorFormProps> = ({
  showModel,
  setModel,
}) => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [buissnessName, setBuissnessName] = useState("");
  const [buissnessNameError, setBuissnessNameError] = useState("");
  const [buissnessDescription, setBuissnessDescription] = useState("");
  const [buissnessDescriptionError, setBuissnessDescriptionError] =
    useState("");
  const [cuisine, setCuisine] = useState<string[]>([]);
  const [cuisineError, setCuisineError] = useState("");

  const [cuisineOptions, setCuisineOptions] = useState([]);
  const [movementType, setMovementType] = useState<string[]>([]);
  const [movementTypeError, setMovementTypeError] = useState("");

  const [movementTypeOptions, setMovementTypeOptions] = useState([
    "event",
    "travel",
    "stationary",
  ]);
  const [buissnessAddress, setBuissnessAddress] = useState("");
  const [buissnessAddressError, setBuissnessAddressError] = useState("");

  const [city, setCity] = useState<string[]>([]);
  const [cityError, setCityError] = useState("");

  const [cityOptions, setCityOptions] = useState([]);

  const [state, setState] = useState<string[]>([]);
  const [stateError, setStateError] = useState("");

  const [stateOptions, setStateOptions] = useState([]);
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState("");
  const [distanceTravel, setDistanceTravel] = useState<string[]>([]);
  const [distanceTravelError, setDistanceTravelError] = useState("");

  const [distanceTravelOptions, setDistanceTravelOptions] = useState([
    "5 miles",
    "10 miles",
    "20 miles",
    "30 miles",
    "40 miles",
    "50 miles",
  ]);
  const [subscriptionType, setSubscriptionType] = useState("");
  const [subscriptionError, setSubscriptionError] = useState("");
  const subscriptionOptions = [
    { label: "Free Subscription", value: "free", subtext: "" },
    {
      label: "Standard Subscription",
      value: "standard",
      subtext: "$79.00 per month",
    },
  ];
  const [formError, setFormError] = useState("");

  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const buissnessNameRef = useRef<HTMLInputElement | null>(null);
  const buissnessDescriptionRef = useRef<HTMLInputElement | null>(null);
  const cuisineRef = useRef<HTMLInputElement | null>(null);
  const movementTypeRef = useRef<HTMLInputElement | null>(null);
  const businessAddressRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLInputElement | null>(null);
  const stateRef = useRef<HTMLInputElement | null>(null);
  const zipRef = useRef<HTMLInputElement | null>(null);
  const distanceTravelRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    if (!value.trim()) setPhoneError("Phone number is required");
    else if (!/^\+?\d{10,15}$/.test(value))
      setPhoneError("Enter a valid phone number with country code");
    else setPhoneError("");
  };

  const handleBuissnessNameChange = (value: string) => {
    setBuissnessName(value);
    if (!value.trim()) setBuissnessNameError("Business name is required");
    else if (value.length < 3)
      setBuissnessNameError("Business name must be at least 3 characters");
    else setBuissnessNameError("");
  };

  const handleBuissnessDescriptionChange = (value: string) => {
    setBuissnessDescription(value);
    if (!value.trim())
      setBuissnessDescriptionError("Business description is required");
    else if (value.length < 5)
      setBuissnessDescriptionError("Description must be at least 5 characters");
    else setBuissnessDescriptionError("");
  };

  const handleCuisineChange = (value: string[]) => {
    setCuisine(value);
    if (value.length === 0)
      setCuisineError("Please select at least one cuisine");
    else setCuisineError("");
  };

  const handleMovenetTypeChange = (value: string[]) => {
    setMovementType(value);
    if (value.length === 0)
      setMovementTypeError("Please select at least one movement type");
    else setMovementTypeError("");
  };

  const handleBuissnessAddressChange = (value: string) => {
    setBuissnessAddress(value);
    if (!value.trim()) setBuissnessAddressError("Business address is required");
    else if (value.length < 3)
      setBuissnessAddressError("Address must be at least 3 characters");
    else setBuissnessAddressError("");
  };

  const handleCityChange = (value: string[]) => {
    setCity(value);
    if (value.length === 0) setCityError("City is required");
    else setCityError("");
  };

  const handleStateChange = (value: string[]) => {
    setState(value);
    if (value.length === 0) setStateError("State is required");
    else setStateError("");
  };

  const handleZipChange = (value: string) => {
    setZip(value);
    if (!value.trim()) setZipError("ZIP code is required");
    else if (!/^\d{4,10}$/.test(value))
      setZipError("Enter a valid ZIP or postal code");
    else setZipError("");
  };

  const handletravelDistanceChange = (value: string[]) => {
    setDistanceTravel(value);
    if (value.length === 0)
      setDistanceTravelError("Please select your travel distance");
    else setDistanceTravelError("");
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
    setPhoneNumber("");
    setPhoneError("");
    setBuissnessName("");
    setBuissnessNameError("");
    setBuissnessDescription("");
    setBuissnessDescriptionError("");
    setCuisine([]);
    setCuisineError("");
    setMovementType([]);
    setMovementTypeError("");
    setBuissnessAddress("");
    setBuissnessAddressError("");
    setCity([]);
    setCityError("");
    setState([]);
    setStateError("");
    setZip("");
    setZipError("");
    setDistanceTravel([]);
    setDistanceTravelError("");
    setSubscriptionType("");
    setSubscriptionError("");
    setFormError("");
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleSubmit = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !buissnessName ||
      !buissnessDescription ||
      cuisine.length === 0 ||
      movementType.length === 0 ||
      !buissnessAddress ||
      city.length === 0 ||
      state.length === 0 ||
      !zip ||
      distanceTravel.length === 0 ||
      !subscriptionType
    ) {
      setFormError(
        "Please fill out all required fields correctly before submitting."
      );
      return;
    }

    setFormError("");

    const vendorData = {
      firstName,
      lastName,
      email,
      phoneNumber: `+${phoneNumber}`,
      businessName: buissnessName,
      businessDescription: buissnessDescription,
      foodCategoryId: cuisine[0],
      movementType: movementType[0] == 'stationary'? 'public': movementType[0],
      businessAddress: buissnessAddress,
      city: city[0],
      state: state[0],
      zipcode: zip.toString(),
      travelDistance: distanceTravel[0],
      isPremium: subscriptionType == "free" ? false : true,
    };

    setFormSubmitted(true);
    AddVendor(vendorData)
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Vendor Added successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // custom purple button
        });

        setFormSubmitted(false);
        resetForm();
        setModel(false);
      })

      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to add vendor.";
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // purple confirm button
        });
        setFormSubmitted(false);
      });
  };

  useEffect(() => {
    GetCuisines()
      .then((res) => {
        console.log("Data fetched successfully:", res);
        setCuisineOptions(res.foodCategoryData ? res.foodCategoryData : []);
      })
      .catch((error) => {
        console.error("Error fetching cuisines:", error.message);
      });
  }, []);

  useEffect(() => {
    GetStates()
      .then((res) => {
        console.log("Data fetched successfully:", res);
        setStateOptions(res.stateData ? res.stateData : []);
      })
      .catch((error) => {
        console.error("Error fetching states:", error.message);
      });
  }, []);

  useEffect(() => {
    GetCities()
      .then((res) => {
        console.log("Data fetched successfully:", res);
        setCityOptions(res.cityData ? res.cityData : []);
      })
      .catch((error) => {
        console.error("Error fetching states:", error.message);
      });
  }, []);

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
          Add New Food Truck
        </h2>
        <button onClick={() => setModel(false)}>
          <XMarkIcon className="w-5 h-5 text-gray-600 hover:text-gray-800" />
        </button>
      </div>

      {/* Form with Smooth Scrolling */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
        <p>Complete all of the following fields to add a new food truck.</p>

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
          text="Email"
          field={email}
          setField={handleEmailChange}
          placeholder="john.doe@example.com"
          type="email"
          error={emailError}
          inputRef={emailRef}
          onKeyDown={(e) => handleKeyDown(e, phoneRef)}
        />

        <PhoneTextField
          text="Business Phone Number"
          field={phoneNumber}
          setField={handlePhoneChange}
          placeholder="0000-0000-0000"
          type="phone"
          error={phoneError}
          inputRef={phoneRef}
          onKeyDown={(e) => handleKeyDown(e, buissnessNameRef)}
        />

        <TextField
          text="Business Name"
          field={buissnessName}
          setField={handleBuissnessNameChange}
          placeholder=""
          type="text"
          error={buissnessNameError}
          inputRef={buissnessNameRef}
          onKeyDown={(e) => handleKeyDown(e, buissnessDescriptionRef)}
        />

        <TextBox
          text="Business Description"
          field={buissnessDescription}
          setField={handleBuissnessDescriptionChange}
          placeholder=""
          type="text"
          error={buissnessDescriptionError}
          inputRef={buissnessDescriptionRef}
          onKeyDown={(e) => handleKeyDown(e, cuisineRef)}
        />

        <DropDownWithOneOption
          text="Cuisine"
          field={cuisine}
          options={cuisineOptions}
          setField={handleCuisineChange}
          placeholder="Select cuisines"
          error={cuisineError}
          inputRef={cuisineRef}
          onKeyDown={(e) => handleKeyDown(e, movementTypeRef)}
        />

        <DropDownWithOneOption
          text="Movement Type"
          field={movementType}
          options={movementTypeOptions}
          setField={handleMovenetTypeChange}
          placeholder="Select movement types"
          error={movementTypeError}
          inputRef={movementTypeRef}
          onKeyDown={(e) => handleKeyDown(e, businessAddressRef)}
        />

        <TextField
          text="Business Address"
          field={buissnessAddress}
          setField={handleBuissnessAddressChange}
          placeholder=""
          type="text"
          error={buissnessAddressError}
          inputRef={businessAddressRef}
          onKeyDown={(e) => handleKeyDown(e, cityRef)}
        />

        <DropDownWithOneOption
          text="City"
          field={city}
          options={cityOptions}
          setField={handleCityChange}
          placeholder="Select city"
          error={cityError}
          inputRef={cityRef}
          onKeyDown={(e) => handleKeyDown(e, stateRef)}
        />

        <div className="flex gap-x-3">
          <DropDownWithOneOption
            text="State"
            field={state}
            options={stateOptions}
            setField={handleStateChange}
            placeholder="Select state"
            error={stateError}
            inputRef={stateRef}
            onKeyDown={(e) => handleKeyDown(e, zipRef)}
          />

          <TextField
            text="Zip"
            field={zip}
            setField={handleZipChange}
            placeholder="228000"
            type="text"
            error={zipError}
            inputRef={zipRef}
            onKeyDown={(e) => handleKeyDown(e, distanceTravelRef)}
          />
        </div>

        <DropDownWithOneOption
          text="Event Travel Distance"
          field={distanceTravel}
          options={distanceTravelOptions}
          setField={handletravelDistanceChange}
          placeholder=""
          error={distanceTravelError}
          inputRef={distanceTravelRef}
          onKeyDown={(e) => handleKeyDown(e, submitRef)}
        />

        <RadioButtonGroup
          label="Subscription Plan"
          options={subscriptionOptions}
          selectedValue={subscriptionType}
          setSelectedValue={(value) => {
            setSubscriptionType(value);
            setSubscriptionError(value ? "" : "Subscription type is required");
          }}
          error={subscriptionError}
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
            <WhiteSquareButton text="Cancel" isTriggered={formSubmitted} onClick={handleCancel} />
          </div>
          <div className="flex-1">
            <SquareButton
              text="Send Form"
              onClick={handleSubmit}
              isTriggered={formSubmitted}
              buttonRef={submitRef}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddVendorForm;
