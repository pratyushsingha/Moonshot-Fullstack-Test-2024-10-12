import { useCallback, useEffect } from "react";

import { Email, EmailViewerProps } from "../types/types";
import { useFormatDate } from "../hooks/useFormatDate";
import { useEmailContext } from "../hooks/useEmailContext";

const EmailViewer: React.FC<EmailViewerProps> = ({
  emailDetails,
  setEmails,
}) => {
  const { id: emailId, body, avatar, date, subject } = emailDetails;
  const { setFavouriteEmails, checkIsFavEmail, isFavEmail, setIsFavEmail } =
    useEmailContext();

  const addEmailToFavourites = useCallback(
    (emailId: number) => {
      setFavouriteEmails((prevEmailIds) => {
        const updatedFavEmails = [...prevEmailIds, emailId];
        localStorage.setItem("favEmails", JSON.stringify(updatedFavEmails));
        return updatedFavEmails;
      });
      setEmails((prevEmails: Email[]) => {
        prevEmails.map((email) => {
          console.log(prevEmails);
          if (email.id === emailId) {
            email.isFavourite = true;
          }
        });
        return prevEmails;
      });
      setIsFavEmail(true);
    },
    [setEmails, setFavouriteEmails, emailId]
  );

  const removeEmailsFromFavorites = useCallback(
    (emailId: number) => {
      if (isFavEmail) {
        setFavouriteEmails((prevEmailIds) => {
          const updatedFavEmails = prevEmailIds.filter((id) => id !== emailId);
          localStorage.setItem("favEmails", JSON.stringify(updatedFavEmails));
          return updatedFavEmails;
        });

        setEmails((prevEmails: Email[]) => {
          return prevEmails.map((email) => {
            if (email.id === emailId) {
              email.isFavourite = false;
            }
            return email;
          });
        });

        setIsFavEmail(false);
      }
    },
    [setEmails, setFavouriteEmails, emailId, isFavEmail]
  );

  useEffect(() => {
    checkIsFavEmail(emailId);
  }, [emailId, setIsFavEmail]);

  return (
    <section className="border bg-white border-[#CFD2DC] rounded m-3 p-10">
      <div className="flex">
        <p className="w-1/12 text-center">
          <div className="w-12 h-12 rounded-full bg-[#E54065] text-white flex justify-center items-center font-bold text-xl">
            {avatar}
          </div>
        </p>
        <section className="w-11/12 space-y-10">
          <div className="flex justify-between">
            <div className="self-center">
              <p>
                <span className="font-bold">{subject}</span>
              </p>
              <p>
                <span>{useFormatDate(date)}</span>
              </p>
            </div>
            <button
              onClick={() => {
                isFavEmail
                  ? removeEmailsFromFavorites(emailId)
                  : addEmailToFavourites(emailId);
              }}
              className="bg-[#E54065] rounded-full text-xs font-bold  px-5 text-white"
            >
              {isFavEmail ? "Remove from favourite" : "Mark as favourite"}
            </button>
          </div>
          <div dangerouslySetInnerHTML={{ __html: body }}></div>
        </section>
      </div>
    </section>
  );
};

export default EmailViewer;
