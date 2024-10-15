import { createContext, useState } from "react";
import { EmailContextType } from "../types/types";

export const EmailContext = createContext<EmailContextType | undefined>(
  undefined
);

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favouriteEmails, setFavouriteEmails] = useState<number[]>(
    JSON.parse(localStorage.getItem("favEmails") || "[]")
  );
  const [isFavEmail, setIsFavEmail] = useState<boolean>(false);
  const [readEmails, setReadEmails] = useState<number[]>(
    JSON.parse(localStorage.getItem("readEmails") || "[]")
  );
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);

  const checkIsFavEmail = (emailId: number) => {
    if (favouriteEmails.includes(emailId)) {
      setIsFavEmail(true);
    } else {
      setIsFavEmail(false);
    }
  };

  const value = {
    favouriteEmails,
    setFavouriteEmails,
    setIsFavEmail,
    isFavEmail,
    checkIsFavEmail,
    readEmails,
    setReadEmails,
    selectedEmailId,
    setSelectedEmailId,
  };

  return (
    <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
  );
};
