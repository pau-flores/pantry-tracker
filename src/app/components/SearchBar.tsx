// src/app/components/SearchBar.tsx
import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: "50%",
        },
        my: 3,
        mx: "auto",
      }}
    >
      <TextField
        id="search-bar"
        placeholder="Search Pantry Items"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ width: "100%" }}
        variant="standard"
        onChange={handleSearchChange}
        value={search}
      />
    </Box>
  );
}
