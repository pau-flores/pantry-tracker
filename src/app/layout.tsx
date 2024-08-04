import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Container } from "@mui/material";
import ThemeWrapper from "./components/ThemeWrappper";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pantry Tracker",
  description: "Keep track of your food inventory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeWrapper>
            <Container maxWidth="lg">{children}</Container>
          </ThemeWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
