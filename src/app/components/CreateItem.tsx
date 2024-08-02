import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const CreateItem = () => {
  const [item, setItem] = useState("");

  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h5"
        component="h5"
        gutterBottom
      >
        Add Pantry Item
      </Typography>
      <TextField
        label="Item"
        variant="outlined"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </>
  );
};

export default CreateItem;
