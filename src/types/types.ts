export interface FilterOption {
    _id: number;
    name: string;
    filter: string;
}

export interface Email {
    id: number;
    from: {
        name: string;
        email: string;
    };
    date: Date;
    subject: string;
    short_description: string
    isFavourite?: boolean
    isRead?: boolean
}

export interface EmailCardProps {
    email: Email;
    onClick: () => void;
}

export interface EmailDetails {
    id: number;
    subject?: string;
    date?: Date;
    avatar?: string;
    body: string;
}

export interface EmailViewerProps {
    emailDetails: {
        id: number;
        subject?: string;
        date?: Date;
        avatar?: string;
        body: string;
    };
    setEmails: React.Dispatch<React.SetStateAction<Email[]>>
}

export interface EmailContextType {
    favouriteEmails: number[];
    setFavouriteEmails: React.Dispatch<React.SetStateAction<number[]>>;
    setIsFavEmail: React.Dispatch<React.SetStateAction<boolean>>;
    isFavEmail: boolean
    checkIsFavEmail: (emailId: number) => void,
    readEmails: number[],
    setReadEmails: React.Dispatch<React.SetStateAction<number[]>>
    selectedEmailId: number | null
    setSelectedEmailId: React.Dispatch<React.SetStateAction<number | null>>
}
