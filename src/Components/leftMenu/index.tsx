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
  Icon,
} from "@mui/material";
import React, { useState } from "react";
import { AlertInterface, LocationData } from "../Map/types";
import LocationCard from "../locationCard";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import ParkIcon from "@mui/icons-material/Park";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import BathtubIcon from "@mui/icons-material/Bathtub";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  alert: AlertInterface;
  // onSave: (alert: Alert) => void;
}

const LabeledIcon = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {icon}
      <Typography sx={{ marginLeft: "0.25rem", fontSize: "0.75rem" }}>
        {label}
      </Typography>
    </Box>
  );
};

const MenuDrawer = ({ open, setOpen, alert }: Props) => {
  const [locationsData, setLocationData] = useState<LocationData[]>([
    {
      place_id: 1,
      licence:
        "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
      osm_type: "node",
      osm_id: 707758,
      lat: "50.061914",
      lon: "19.936095",
      place_rank: 30,
      category: "place",
      type: "house",
      importance: 0.411,
      addresstype: "house",
      name: "Kościuszki 6, Kraków, małopolskie, 31-056, Polska",
      display_name: "Kościuszki 6, Kraków, małopolskie, 31-056, Polska",

      boundingbox: ["50.061864", "50.061964", "19.936045", "19.936145"],
    },
    {
      place_id: 2,
      licence:
        "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
      osm_type: "node",
      osm_id: 707758,
      lat: "50.061914",
      lon: "19.936095",
      place_rank: 30,
      category: "place",
      type: "house",
      importance: 0.411,
      addresstype: "house",
      name: "Kościuszki 6, Kraków, małopolskie, 31-056, Polska",
      display_name:
        "Kościussegezki 6, Kraków, małopolskie, 31-056, Polskafegrgr",

      boundingbox: ["50.061864", "50.061964", "19.936045", "19.936145"],
    },
    {
      place_id: 3,
      licence:
        "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
      osm_type: "node",
      osm_id: 707758,
      lat: "50.061914",
      lon: "19.936095",
      place_rank: 30,
      category: "place",
      type: "house",
      importance: 0.411,
      addresstype: "house",
      name: "Kościuszki 6, Kraków, małopolskie, 31-056, Polska",
      display_name:
        "Kościussegezki 6, Kraków, małopolskie, 31-056, Polskafegrgr",

      boundingbox: ["50.061864", "50.061964", "19.936045", "19.936145"],
    },
  ]);
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
  const [currentAlert, setCurrentAlert] = useState<AlertInterface>({
    ...alert,
    isUrgent: false,
  });
  const mockAlertCategories = [
    {
      id: 1,
      name: "Pożar",
      activeBackground: "#c26b02",
      inactiveBackground: "#c26b0290",
      chosen: false,
      isUrgent: true,
      icon: <LocalFireDepartmentIcon />,
    },
    {
      id: 2,
      name: "Wypadek na drodze",
      activeBackground: "#ff0000",
      inactiveBackground: "#ff6666",
      chosen: false,
      isUrgent: true,
      icon: <CarCrashIcon />,
    },
    {
      id: 3,
      name: "Drzewo na drodze",
      activeBackground: "#098217",
      inactiveBackground: "#09821790",
      chosen: false,
      isUrgent: true,
      icon: <ParkIcon />,
    },
    {
      id: 4,
      name: "przerwa w dostawie prądu",
      activeBackground: "#fcc612",
      inactiveBackground: "#fcc61290",
      chosen: false,
      isUrgent: false,
      icon: <PowerOffIcon />,
    },
    {
      id: 5,
      name: "przerwa w dostawie wody",
      activeBackground: "#2356c4",
      inactiveBackground: "#2356c490",
      chosen: false,
      isUrgent: false,
      icon: <BathtubIcon />,
    },
  ];
  const [numberOfHours, setNumberOfHours] = useState<number>(0);
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
            zIndex: 1000,
            top: "10%",
            left: "20px",
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography variant="h6">Pilne</Typography>
            <Switch
              checked={currentAlert.isUrgent}
              onChange={() => {
                setCurrentAlert({
                  ...currentAlert,
                  isUrgent: !currentAlert.isUrgent,
                });
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
              if (category.isUrgent !== currentAlert.isUrgent) return null;
              return (
                <Chip
                  label={
                    <LabeledIcon icon={category.icon} label={category.name} />
                  }
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem",
                    borderBottom: "1px solid #ccc",
                    cursor: "pointer",
                    width: "fit-content",
                    color: "white",
                    backgroundColor:
                      category.id === currentAlert.categoryId
                        ? category.activeBackground
                        : category.inactiveBackground,
                    "&:hover": {
                      backgroundColor: category.activeBackground,
                    },
                  }}
                  onClick={() => {
                    if (!currentAlert.categoryId) {
                      setCurrentAlert({
                        ...currentAlert,
                        categoryId: category.id,
                      });
                      category.chosen = true;
                    } else if (category.id === currentAlert.categoryId) {
                      setCurrentAlert({
                        ...currentAlert,
                        categoryId: null,
                      });
                      category.chosen = false;
                    } else if (currentAlert.categoryId !== null) {
                      mockAlertCategories.forEach((item) => {
                        if (item.id === currentAlert.categoryId) {
                          item.chosen = false;
                        }
                      });
                      setCurrentAlert({
                        ...currentAlert,
                        categoryId: category.id,
                      });
                    }
                  }}
                />
              );
            })}
          </Box>
          <Box
            className="target-for-scroll"
            sx={{
              width: "100%",
              justifyContent: "center",
              height: "110px",
              overflowY: "auto",
              overflowX: "hidden",
              borderBottom: "1px solid gray",
              borderRadius: "5px",
            }}
          >
            {locationsData.map((location, index) => {
              return (
                <LocationCard
                  locationData={location}
                  key={index}
                  handleDeleteAddress={() => {
                    setLocationData(
                      locationsData.filter(
                        (item) => item.place_id !== location.place_id
                      )
                    );
                  }}
                />
              );
            })}
          </Box>

          {currentAlert.isUrgent ? (
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
                onChange={(e) => setNumberOfHours(parseInt(e.target.value))}
                margin="normal"
                value={numberOfHours}
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
                  value={currentAlert.dateOfStart}
                  onChange={(e) => {
                    setCurrentAlert({
                      ...currentAlert,
                      dateOfStart: new Date(e.target.value),
                    });
                  }}
                  margin="normal"
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
                  type="datetime-local"
                  value={currentAlert.dateOfEnd}
                  onChange={(e) => {
                    setCurrentAlert({
                      ...currentAlert,
                      dateOfEnd: new Date(e.target.value),
                    });
                  }}
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
            name="body"
            onChange={(e) => {
              setCurrentAlert({
                ...currentAlert,
                body: e.target.value,
              });
            }}
            rows={3}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              console.log(currentAlert);
              handleMenuClose();
            }}
          >
            Zgłoś
          </Button>
        </Box>
      ) : null}
    </div>
  );
};

export default MenuDrawer;
