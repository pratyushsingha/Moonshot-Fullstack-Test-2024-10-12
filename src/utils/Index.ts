import { FilterOption } from "../types/types";

export const FilterOptions: FilterOption[] = [
    {
        _id: 1,
        name: "All",
        filter: ""
    },
    {
        _id: 2,
        name: "Unread",
        filter: "unread"
    },
    {
        _id: 3,
        name: "Read",
        filter: "read"
    },
    {
        _id: 4,
        name: "Favourites",
        filter: "favourites"
    }
]