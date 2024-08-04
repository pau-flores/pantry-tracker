"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import Header from "../components/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await login(email, password);
      router.push("/pantry");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          mt: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Sign In
          </Typography>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignIn}
            sx={{ mt: 2, backgroundColor: "#0077B6" }}
          >
            Login
          </Button>
          <p className="mt-4">
            <span>Don't have an account?</span>
            <a href="/register" className="ml-1 font-semibold">
              Register!
            </a>
          </p>
        </Box>
      </Container>
    </>
  );
}
