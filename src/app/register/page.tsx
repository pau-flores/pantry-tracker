"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import Header from "../components/Header";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await register(email, password);
      router.push("/pantry");
    } catch (error) {
      console.error("Error signing up:", error);
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
        <Box textAlign={"center"}>
          <Typography variant="h4" gutterBottom>
            Create Account
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
            onClick={handleSignUp}
            sx={{ mt: 2, backgroundColor: "#0077B6" }}
          >
            Sign Up
          </Button>
          <p className="mt-4">
            <span>Already have an account?</span>
            <a href="/login" className="ml-1 font-semibold">
              Login here!
            </a>
          </p>
        </Box>
      </Container>
    </>
  );
}
