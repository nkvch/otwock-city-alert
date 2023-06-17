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

interface Address {
  id: number;
  name: string;
}

const mockAddresses: Address[] = [
  { id: 1, name: "123 Main St, Anytown, USA" },
  { id: 2, name: "456 Elm St, Anytown, USA" },
  { id: 3, name: "789 Oak St, Anytown, USA" },
];

const AutocompleteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState<Address[]>([]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelectAddress = (event: any, value: Address[]) => {
    setSelectedAddresses(value);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          backgroundColor: "#f5f5f5",
          border: "1px solid #ccc",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
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
      <Modal open={isOpen} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            width: "500px",
          }}
        >
          <Autocomplete
            multiple
            options={mockAddresses}
            getOptionLabel={(option) => option.name}
            value={selectedAddresses}
            onChange={handleSelectAddress}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for an address"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
            renderOption={(props, option, { selected }) => (
              <ListItem {...props}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.5rem",
                    borderBottom: "1px solid #ccc",
                    width: "100%",
                    backgroundColor: selected ? "#eee" : "transparent",
                  }}
                >
                  <Typography>{option.name}</Typography>
                </Box>
              </ListItem>
            )}
          />
        </Box>
      </Modal>
    </>
  );
};

export default AutocompleteModal;
