import { useMemo } from "react";

const useFormatDate = (timestamp?: Date) => {
    if (!timestamp) return;
    return useMemo(() => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;
        hours = hours ? hours : 12;

        const time = `${hours}:${minutes} ${ampm}`;
        return `${day}/${month}/${year} ${time}`;
    }, [timestamp]);
};

export { useFormatDate };
