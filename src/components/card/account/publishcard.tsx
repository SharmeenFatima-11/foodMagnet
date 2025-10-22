import React, { useState, useRef } from "react";
import DropDown from "../../dropdown/dropDownWithOneSelection";
import SquareButton from "../../button/squareButton";
import WhiteSquareButton from "../../button/whiteSquareButton";

interface VendorSidebarCardProps {
  isPublished: boolean;
}

const VendorSidebarCard: React.FC<VendorSidebarCardProps> = ({
  isPublished,
}) => {
  const [publishAccount, setPublishAccount] = useState<string[]>([]);
  const [publishAccountError, setPublishAccountError] = useState("");
  const [publishOptions, setPublishOptions] = useState([
    "Picture Quality",
    "Option 2",
  ]);
  const [formError, setFormError] = useState("");

  const handlePublishChange = (value: string[]) => {
    setPublishAccount(value);
    if (value.length === 0)
      setPublishAccountError("Please select at least one cuisine");
    else setPublishAccountError("");
  };

  const publishAccountRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);

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
    setPublishAccount([]);
    setPublishAccountError("");
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleSubmit = () => {
    if (publishAccount.length === 0) {
      setFormError(
        "Please fill out all required fields correctly before submitting."
      );
      return;
    }

    setFormError("");

    const vendorData = {
      publishAccount,
    };

    console.log("Vendor Data:", vendorData);
    resetForm();
  };

  const handleRevoke = () => {
    console.log("Revoked");
  };

  return (
    <div className="flex flex-col gap-y-2 py-4 h-1/4 bg-white rounded-md p-6 border border-gray-300 rounded-xl shadow-lg my-6">
      {isPublished && isPublished == true ? (
        <div className="flex items-center justify-between">
          <div className="flex flex-col w-1/2 gap-y-2">
            <span className="font-bold text-[#343A40]">Published Account</span>
            <span>
              This profile is live and visible to customers. Vendors can now
              access premium features and appear in search.
            </span>
          </div>
          <div className="">
            <SquareButton text="Revoke" onClick={handleRevoke} />
          </div>
        </div>
      ) : (
        <div
          className={`flex h-full ${
            publishAccount.length == 0 ? "items-end" : "items-center"
          }`}
        >
          <div className="w-1/3">
            <DropDown
              text="Publish Account"
              field={publishAccount}
              options={publishOptions}
              setField={handlePublishChange}
              placeholder="Select option"
              error={publishAccountError}
              inputRef={publishAccountRef}
              onKeyDown={(e) => handleKeyDown(e, publishAccountRef)}
            />
          </div>
          <div className="flex-1 flex justify-end gap-x-3 h-full  gap-x-3">
            <div
              className={`flex justify-end h-full  ${
                publishAccount.length == 0 ? "items-end" : "items-center"
              } gap-x-3 `}
            >
              <div>
                <WhiteSquareButton text="Cancel" onClick={handleCancel} />
              </div>
              <div className="flex-1">
                <SquareButton
                  text="Publish Account"
                  onClick={handleSubmit}
                  buttonRef={submitRef}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorSidebarCard;
