import React, { useState, useRef } from "react";
import DropDown from "../../dropdown/dropdown";
import SquareButton from "../../button/squareButton";
import WhiteSquareButton from "../../button/whiteSquareButton";
import Swal from "sweetalert2";
import {
  PublishAccount,
  RevokeAccount,
  DenyRequest,
} from "../../../lib/api/vendor/accountApis";

interface VendorSidebarCardProps {
  isPublished: boolean;
  id: number;
  onPublishSuccess: () => void;
}

const VendorSidebarCard: React.FC<VendorSidebarCardProps> = ({
  isPublished,
  id,
  onPublishSuccess,
}) => {
  const [publishAccount, setPublishAccount] = useState<string[]>([]);
  const [publishAccountError, setPublishAccountError] = useState("");
  const [isPublishedCalled, setIsPublishedCalled] = useState(false);
  const [publishOptions, setPublishOptions] = useState([
    "Picture Quality",
    "Menu Item Description",
    "Typos & Grammar",
  ]);

  const handlePublishChange = (value: string[]) => {
    setPublishAccount(value);
    setPublishAccountError("");
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
    if (!publishAccount || publishAccount.length <= 0) {
      setPublishAccountError("Select atleast one reason for rejection");
    } else {
      let denialReasonPicture = publishAccount.includes("Picture Quality");
      let denialReasonMenuDescription = publishAccount.includes(
        "Menu Item Description"
      );
      let denialReasonMenuTypo = publishAccount.includes("Typos & Grammar");
      const denyBody = {
        id,
        denialReasonPicture,
        denialReasonMenuDescription,
        denialReasonMenuTypo,
      };

      setIsPublishedCalled(true);
      DenyRequest(denyBody)
        .then((data) => {
          Swal.fire({
            title: "Success!",
            text: "Food truck profile has been rejected successfully.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#8B4DC5", // custom purple button
          });
          setIsPublishedCalled(false);
        })
        .catch((error) => {
          const errorMessage =
            error.message || error.error || "Failed to deny request";

          Swal.fire({
            title: "Error!",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#8B4DC5", // purple confirm button
          });
          setIsPublishedCalled(false);
        });
      resetForm();
    }

    // resetForm();
  };

  const handleSubmit = () => {
    setIsPublishedCalled(true);
    PublishAccount(id)
      .then((data) => {
        Swal.fire({
          title: "Success!",
          text: "Food truck has been published successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // custom purple button
        }).then(() => {
          onPublishSuccess(); // 👈 update parent when confirmed
        });
        setIsPublishedCalled(false);
      })
      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to publish account";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // purple confirm button
        });
        setIsPublishedCalled(false);
      });
    resetForm();
  };

  const handleRevoke = () => {
    setIsPublishedCalled(true);
    RevokeAccount(id)
      .then((data) => {
        Swal.fire({
          title: "Success!",
          text: "Food truck has been revoked successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // custom purple button
        }).then(() => {
          onPublishSuccess(); // 👈 update parent when confirmed
        });
        setIsPublishedCalled(false);
      })
      .catch((error) => {
        const errorMessage =
          error.message || error.error || "Failed to revoke account";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#8B4DC5", // purple confirm button
        });
        setIsPublishedCalled(false);
      });
  };

  return (
    <div className="flex flex-col gap-y-2 py-4 h-1/4 bg-white rounded-md p-6 border border-gray-300 rounded-xl shadow-lg my-6">
      {isPublished && isPublished == true ? (
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
          <div className="flex flex-col w-full sm:w-1/2 gap-y-2">
            <span className="font-bold text-[#343A40]">Published Account</span>
            <span className="lg:text-lg text-sm break-words">
              This profile is live and visible to customers. Vendors can now
              access premium features and appear in search.
            </span>
          </div>
          <div className="w-full sm:w-auto flex justify-start sm:justify-end">
            <SquareButton
              text="Revoke"
              onClick={handleRevoke}
              isTriggered={isPublishedCalled}
            />
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
                <WhiteSquareButton
                  text="Deny"
                  onClick={handleCancel}
                  isTriggered={isPublishedCalled}
                />
              </div>
              <div className="flex-1">
                <SquareButton
                  text="Publish Account"
                  onClick={handleSubmit}
                  isTriggered={isPublishedCalled}
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
