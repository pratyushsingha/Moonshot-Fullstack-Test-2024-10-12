import { useEmailContext } from "../hooks/useEmailContext";
import { useFormatDate } from "../hooks/useFormatDate";
import { EmailCardProps } from "../types/types";

const EmailCard: React.FC<EmailCardProps> = ({ email, onClick }) => {
  const {
    id: emailId,
    from,
    subject,
    short_description,
    date,
    isFavourite,
  } = email;
  const { name, email: fromEmail } = from;

  const { readEmails, selectedEmailId } = useEmailContext();

  return (
    <section
      onClick={onClick}
      className={`flex space-x-3 border rounded-lg m-3 p-5 cursor-pointer ${
        readEmails.includes(emailId) ? "bg-[#F2F2F2]" : "bg-white"
      } ${
        emailId === selectedEmailId ? "border-[#E54065]" : "border-[#CFD2DC]"
      }`}
    >
      <div className="w-10 h-10 rounded-full bg-[#E54065] text-white flex justify-center items-center font-bold text-xl">
        {name.split(" ")[0].charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col space-y-2">
        <div>
          <p>
            {" "}
            From : <span className="font-bold">{`${name} <${fromEmail}>`}</span>
          </p>
          <p>
            Subject : <span className="font-bold">{subject}</span>
          </p>
        </div>
        <div>
          <p> {short_description}.</p>
          <div className="flex space-x-4">
            <span>{useFormatDate(date)}</span>
            {isFavourite && (
              <span className="text-[#E54065] font-bold text-xs self-center">
                Favourite
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailCard;
