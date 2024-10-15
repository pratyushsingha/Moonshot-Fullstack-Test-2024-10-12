import { useContext } from "react"
import { EmailContext } from "../context/EmailContext"

export const useEmailContext = () => {
    const context = useContext(EmailContext)

    if (!context) {
        throw new Error("useEmailContext must be withn EmailProvider")
    }

    return context;
}