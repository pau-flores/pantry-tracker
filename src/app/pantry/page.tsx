"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Kitchen, AddCircle, RemoveCircle } from "@mui/icons-material";
import { firestore } from "@/firebase";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import { useRouter } from "next/navigation";

export default function Pantry() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [item, setItem] = useState("");
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  interface InventoryItem {
    id: string;
    [key: string]: any;
  }

  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const updateInventory = async (term: string = "") => {
    if (!currentUser) return;
    const userPantryRef = collection(
      firestore,
      "users",
      currentUser.uid,
      "pantry"
    );
    const docs = await getDocs(query(userPantryRef));
    const inventoryList: InventoryItem[] = [];
    docs.forEach((doc) => {
      const itemData = doc.data();
      const itemName = doc.id;
      if (itemName.toLowerCase().includes(term.toLowerCase())) {
        inventoryList.push({
          id: doc.id,
          ...itemData,
        });
      }
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    updateInventory(term);
  };

  const addItem = async (item: string | undefined) => {
    if (!currentUser) return;
    const userPantryRef = collection(
      firestore,
      "users",
      currentUser.uid,
      "pantry"
    );
    const docRef = doc(userPantryRef, item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory(searchTerm);
  };

  const removeItem = async (item: string | undefined) => {
    if (!currentUser) return;
    const userPantryRef = collection(
      firestore,
      "users",
      currentUser.uid,
      "pantry"
    );
    const docRef = doc(userPantryRef, item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory(searchTerm);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                mb: 2,
                py: 1,
                textTransform: "uppercase",
                backgroundColor: "#1B263B",
                color: "#FFFFFF",
              }}
              variant="h5"
              component="h1"
            >
              Items In My Pantry
            </Typography>

            <SearchBar onSearch={handleSearch} />

            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "50%",
                },
              }}
              margin={"auto"}
            >
              <List>
                {inventory.map(({ id, quantity }) => (
                  <ListItem
                    key={id}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          sx={{ mr: 1 }}
                          onClick={() => addItem(id)}
                        >
                          <AddCircle sx={{ color: "#1B263B" }} />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeItem(id)}
                        >
                          <RemoveCircle sx={{ color: "#1B263B" }} />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#A60067" }}>
                        <Kitchen sx={{ color: "#FFFFFF" }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={id}
                      secondary={`Quantity: ${quantity}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Button
            sx={{
              mt: 4,
              py: 1,
              px: 3,
              backgroundColor: "#0077B6",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#1B263B",
                color: "#FFFFFF",
              },
            }}
            onClick={handleOpen}
          >
            <Typography color="inherit">
              <Add /> Add Item
            </Typography>
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: "400px",
                margin: "auto",
                backgroundColor: "#f5f5f5",
                padding: 4,
              }}
            >
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
              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: "#0077B6" }}
                onClick={() => {
                  addItem(item);
                  setItem("");
                  handleClose();
                }}
              >
                Submit
              </Button>
            </Box>
          </Modal>
        </Box>
      </Container>
    </>
  );
}
