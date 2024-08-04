"use client";

import Link from "next/link";
import { Typography, Button, Grid } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Grid container sx={{ py: 2 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, fontWeight: "bold", textTransform: "uppercase" }}
      >
        <Link href="/" passHref>
          <span style={{ color: "#1B263B" }}>Pantry</span>
          <span style={{ color: "#A60067" }}>Tracker</span>
        </Link>
      </Typography>
      {currentUser && (
        <>
          <Button
            sx={{
              mr: 2,
              color: "#1B263B",
              "&:hover": { color: "#A60067", backgroundColor: "transparent" },
            }}
          >
            <Link href="/pantry" passHref>
              <Typography color="inherit">My Pantry</Typography>
            </Link>
          </Button>
          <Button
            sx={{
              mr: 2,
              color: "#1B263B",
              "&:hover": { color: "#A60067", backgroundColor: "transparent" },
            }}
            onClick={handleLogout}
          >
            <Typography color="inherit">Sign Out</Typography>
          </Button>
        </>
      )}
    </Grid>
  );
}
