import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { IconButton } from "@mui/material";
import { KeyboardEvent } from "react";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    backgroundColor: alpha(theme.palette.common.white, 0.05),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
    marginLeft: 0,
    width: "100%",
    borderRadius: 4,
    display: "flex",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 0, 1, 0),
    },
}));

// @ts-ignore
function SearchBar({ query, setQuery, executeSearch }) {
    const handleKeyDown = (
        event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        if (event.key === "Enter") {
            executeSearch(event);
        }
    };

    return (
        <Search>
            <IconButton sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <StyledInputBase
                value={query}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                autoFocus
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </Search>
    );
}

export default SearchBar;
