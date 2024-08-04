import { Restaurant } from "@mui/icons-material";
import { Box, Button, Container } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Container
        maxWidth="lg"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <h1 className="text-6xl font-extrabold uppercase">
            <span style={{ color: "#1B263B" }}>Pantry</span>
            <span style={{ color: "#A60067" }}>Tracker</span>
          </h1>
          <h4 className="mt-2 text-2xl font-bold">
            Keep track of your food inventory
          </h4>
          <div>
            <Restaurant sx={{ mt: 3, fontSize: 80, color: "#1B263B" }} />
          </div>
          <Button
            sx={{ mt: 3, backgroundColor: "#0077B6" }}
            variant="contained"
            href="/login"
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </main>
  );
}
