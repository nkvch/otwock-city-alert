import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Box,
  IconButton,
  ListItem,
  Typography,
  TextField,
  Chip,
  Switch,
  Divider,
  Button,
} from "@mui/material";
import { useFormik, FormikHandlers } from "formik";
import { useState } from "react";
interface Alert {
  id: number;
  name: string;
  isUrgent: boolean;
  categoryId: number;
  addresses: Address[];
  dateOfCreation: Date;
  dateOfStart: Date;
  dateOfEnd: Date;
}
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  // alert: Alert;
  // onSave: (alert: Alert) => void;
}

interface Address {
  id: number;
  name: string;
}

const MenuDrawer = ({ open, setOpen }: Props) => {
  const mockAddresses: Address[] = [
    { id: 1, name: "123 Main St, Anytown, USA" },
    { id: 2, name: "456 Elm St, Anytown, USA" },
    { id: 3, name: "789 Oak St, Anytown, USA" },
  ];
  const initialValues = {
    id: 1,
    isUrgent: false,
    categoryId: 0,
    addresses: [],
    dateOfCreation: new Date(),
    dateOfStart: new Date(),
    dateOfEnd: new Date(),
    numberOfHours: 0,
    text: "",
  };

  const handleMenuClose = () => {
    setOpen(false);
  };
  const styles = {
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: 3,
    },
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const [selectedAddresses, setSelectedAddresses] = useState<Address[]>([]);
  const [isAlertUrgent, setIsAlertUrgent] = useState(false);
  const [chosenAlertCategoryId, setChosenAlertCategoryId] = useState<
    number | null
  >(null);
  const mockAlertCategories = [
    {
      id: 1,
      name: "Pożar",
      chosen: false,
      isUrgent: true,
      color: "orange",
    },
    {
      id: 2,
      name: "Wypadek na drodze",
      chosen: false,
      isUrgent: true,
    },
    {
      id: 3,
      name: "Napad",
      chosen: false,
      isUrgent: true,
    },
    {
      id: 4,
      name: "Drzewo na drodze",
      chosen: false,
      isUrgent: true,
    },
    {
      id: 5,
      name: "przerwa w dostawie prądu",
      chosen: false,
      isUrgent: false,
    },
    {
      id: 6,
      name: "przerwa w dostawie wody",
      chosen: false,
      isUrgent: false,
    },
  ];
  return (
    <div style={styles.root}>
      {open ? (
        <Box
          sx={{
            position: "fixed",
            width: "30%",
            backgroundColor: "#f5f5f5",
            height: "80%",
            borderRadius: "5%",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            padding: "1rem",
          }}
        >
          <Box
            position="absolute"
            sx={{
              top: "0.5rem",
              right: "0.5rem",
            }}
          >
            <IconButton onClick={handleMenuClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography variant="h6">Pilne</Typography>
              <Switch
                checked={isAlertUrgent}
                onChange={() => {
                  setIsAlertUrgent(!isAlertUrgent);
                  setChosenAlertCategoryId(null);
                  formik.setFieldValue("isUrgent", !isAlertUrgent);
                }}
                color="error"
              ></Switch>
            </Box>
            <Divider
              sx={{
                margin: "0.5rem",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {mockAlertCategories.map((category, index) => {
                if (category.isUrgent !== isAlertUrgent) return null;
                return (
                  <Chip
                    label={category.name}
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.5rem",
                      borderBottom: "1px solid #ccc",
                      cursor: "pointer",
                      width: "fit-content",
                      backgroundColor:
                        category.id === chosenAlertCategoryId
                          ? "#2196f3"
                          : "inherit",
                      color:
                        category.id === chosenAlertCategoryId
                          ? "white"
                          : "inherit",
                      "&:hover": {
                        backgroundColor: "#1976d2",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      if (chosenAlertCategoryId === null) {
                        setChosenAlertCategoryId(category.id);
                        formik.setFieldValue("categoryId", category.id);
                        category.chosen = true;
                      } else if (category.id === chosenAlertCategoryId) {
                        setChosenAlertCategoryId(null);
                        category.chosen = false;
                        formik.setFieldValue("categoryId", 0);
                      } else if (chosenAlertCategoryId !== null) {
                        category.chosen = true;
                        formik.setFieldValue("categoryId", category.id);
                        setChosenAlertCategoryId(category.id);
                      }
                    }}
                  />
                );
              })}
            </Box>
            <Autocomplete
              multiple
              options={mockAddresses}
              getOptionLabel={(option) => option.name}
              value={selectedAddresses}
              onChange={formik.handleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for an address"
                  name = "addresses"
                  onChange={formik.handleChange}
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
            {isAlertUrgent ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <TextField
                  label="Wybierz ile godzin"
                  variant="outlined"
                  onChange={formik.handleChange}
                  margin="normal"
                  type="number"
                  name="numberOfHours"
                  InputProps={{
                    inputProps: {
                      min: 0,
                      step: 0.5,
                    },
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    label="Wybierz datę początkową"
                    variant="outlined"
                    margin="normal"
                    onChange={formik.handleChange}
                    type="datetime-local"
                    name="startDate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    label="Wybierz końiec"
                    variant="outlined"
                    margin="normal"
                    onChange={formik.handleChange}
                    type="datetime-local"
                    name="endDate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Box>
              </Box>
            )}
            <TextField
              label="Tekst alertu"
              variant="outlined"
              margin="normal"
              multiline
              onChange={formik.handleChange}
              name="text"
              rows={4}
              fullWidth
            />
            <Button type="submit" variant="contained">
              Zgłoś
            </Button>
          </form>
        </Box>
      ) : null}
    </div>
  );
};

export default MenuDrawer;
