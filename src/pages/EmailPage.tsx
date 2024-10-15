import { useCallback, useEffect, useState } from "react";

import "../App.css";
import { FilterOptions } from "../utils/Index";
import { Email, EmailDetails } from "../types/types";
import EmailCard from "../components/EmailCard";
import EmailViewer from "../components/EmailViewer";
import { useEmailContext } from "../hooks/useEmailContext";
import Loader from "../components/loader/Loader";

function EmailPage() {
  const [isEmailLoading, setIsEmailLoading] = useState<Boolean>(false);
  const [isEmailBodyLoading, setIsEmailBodyLoading] = useState<Boolean>(false);
  const [allEmails, setEmails] = useState<Email[]>([]);
  const [emailDetails, setEmailDetails] = useState<EmailDetails | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const { favouriteEmails, setReadEmails, readEmails, setSelectedEmailId } =
    useEmailContext();

  const loadEmails = useCallback(async () => {
    setIsEmailLoading(true);
    try {
      setError("");
      const data = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}?page=${currentPage}`
      );
      const response = await data.json();

      const updatedEmails = response.list.map((email: Email) => ({
        ...email,
        isFavourite: favouriteEmails.includes(email.id),
        isRead: readEmails.includes(email.id),
      }));

      setEmails(updatedEmails);
    } catch (error: any) {
      console.error("Error fetching allEmails", error.message);
      setEmails([]);
      setError(error.message);
    } finally {
      setIsEmailLoading(false);
    }
  }, [favouriteEmails, currentPage, readEmails]);

  const loadEmailBody = useCallback(
    async (emailId: number) => {
      setIsEmailBodyLoading(true);
      setEmailDetails(null);
      try {
        const data = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}?id=${emailId}`
        );
        const response = await data.json();

        const email = allEmails.find((email) => email.id === emailId);
        setEmailDetails({
          id: response.id,
          subject: email?.subject,
          date: email?.date,
          avatar: email?.from.name?.split(" ")[0]?.charAt(0).toUpperCase(),
          body: response.body,
        });
        if (!readEmails.includes(response.id)) {
          setReadEmails((prevReadEmails) => {
            const updatedReadEmails = [...prevReadEmails, response.id];
            localStorage.setItem(
              "readEmails",
              JSON.stringify(updatedReadEmails)
            );

            return updatedReadEmails;
          });
        }
        setSelectedEmailId(response.id);
      } catch (error: any) {
        console.error("Error fetching email body", error.message);
        setError(error.message);
      } finally {
        setIsEmailBodyLoading(false);
      }
    },
    [allEmails, setSelectedEmailId, setReadEmails, readEmails]
  );

  const handlePrevPage = () => {
    setSelectedEmailId(null);
    setCurrentPage((prevPage: number) => prevPage - 1);
  };
  const handleNextPage = () => {
    setSelectedEmailId(null);
    setCurrentPage((prevPage: number) => prevPage + 1);
  };

  const handleEmailsFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  const filteredEmails = useCallback(() => {
    if (!allEmails || allEmails.length < 0) return [];
    switch (selectedFilter) {
      case "unread":
        return allEmails.filter((email) => !email.isRead);
      case "read":
        return allEmails.filter((email) => email.isRead);
      case "favourites":
        return allEmails.filter((email) => email.isFavourite);
      default:
        return allEmails;
    }
  }, [allEmails, selectedFilter]);

  useEffect(() => {
    loadEmails();
  }, [currentPage, setEmails]);

  const emails = filteredEmails();

  return (
    <section className="p-10 bg-[#F4F5F9] h-screen flex flex-col">
      <nav className="flex space-x-5 p-5">
        <span className="self-center">Filter By: </span>
        {FilterOptions.map((option) => (
          <button
            className={`${
              selectedFilter === option.filter &&
              "bg-[#E1E4EA] rounded-3xl border border-[#CFD2DC]"
            } px-3 py-1 rounded-2xl`}
            onClick={() => handleEmailsFilter(option.filter)}
            key={option._id}
          >
            {option.name}
          </button>
        ))}
      </nav>
      <div className="flex flex-grow overflow-hidden text-[#636363]">
        <div
          className={`flex flex-col overflow-y-auto ${
            emailDetails || isEmailBodyLoading ? "w-5/12" : "w-full"
          } h-full`}
        >
          {isEmailLoading && (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          )}
          {!isEmailLoading && emails.length > 0 ? (
            emails.map((email) => (
              <EmailCard
                onClick={() => loadEmailBody(email.id)}
                key={email.id}
                email={email}
              />
            ))
          ) : (
            <p className="text-center">No Emails found</p>
          )}

          {!isEmailLoading && (
            <div className="flex justify-center space-x-3 mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="bg-[#E54065] text-white px-3 py-1 rounded-lg"
              >
                Prev
              </button>
              <button
                onClick={handleNextPage}
                disabled={emails.length < 10}
                className="bg-[#E54065] text-white px-3 py-1 rounded-lg"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {emailDetails || isEmailBodyLoading ? (
          <div className="w-7/12 h-full overflow-y-auto">
            {error && <p className="text-center text-red-500">{error}</p>}
            {isEmailBodyLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader />
              </div>
            ) : (
              emailDetails && (
                <div className="sticky top-0">
                  <EmailViewer
                    setEmails={setEmails}
                    emailDetails={emailDetails}
                  />
                </div>
              )
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default EmailPage;
