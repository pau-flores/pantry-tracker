import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";

export default function Header() {
  return (
    <Grid container>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        PT
      </Typography>
      <Button color="inherit">
        <Link href="/pantry" passHref>
          <Typography color="inherit">My Pantry</Typography>
        </Link>
      </Button>
    </Grid>
  );
}
