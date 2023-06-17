import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Icon,
  IconButton,
  ListItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LeftMenu from "../leftMenu";
import { AlertInterface } from "../Map/types";

interface Address {
  id: number;
  name: string;
}

const mockAddresses: Address[] = [
  { id: 1, name: "123 Main St, Anytown, USA" },
  { id: 2, name: "456 Elm St, Anytown, USA" },
  { id: 3, name: "789 Oak St, Anytown, USA" },
];

const PLusButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {!isOpen ? (
        <IconButton
          onClick={handleOpen}
          sx={{
            backgroundColor: "#f5f5f5",
            border: "1px solid #ccc",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "32px",
            padding: "0.25rem 1rem",
            zIndex: 1000,
            position: "fixed",
            top: "20px",
            left: "20px",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <AddIcon />
          <Typography
            sx={{
              fontSize: "0.8rem",
            }}
          >
            Dodaj
          </Typography>
        </IconButton>
      ) : (
        <LeftMenu open={isOpen} setOpen={setIsOpen} alert={{} as AlertInterface} />
      )}
    </>
  );
};

export default PLusButton;
