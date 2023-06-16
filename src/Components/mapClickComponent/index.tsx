import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

interface Props {
  onSelectArea: () => void;
  onSelectPoint: () => void;
  isMenuOpened: boolean;
  address: string;
}

const MapMenu = () => {
  const [isPointsSelectorOpened, setIsPointsSelectorOpened] = useState(true);
  const [isAreaSelectorOpened, setIsAreaSelectorOpened] = useState(false);

  return (
    <>
      {isPointsSelectorOpened && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "20%",
            height: "30%",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#f5f5f5",
            padding: "1rem",
          }}
        >
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ flexGrow: 1, marginBottom: "1rem" }}
          >
            Co chcesz dodać?
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              padding: "0.2rem",
            }}
          >
            <Button
              id="points-selector"
              variant="contained"
              onClick={() => setIsPointsSelectorOpened(false)}
              sx={{
                padding: "0.2rem 0.5rem",
                fontSize: "0.8rem",
                backgroundColor: "#4caf50",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#388e3c",
                },
              }}
            >
              Dodaj ten punkt
            </Button>
            <Button
              id="area-selector"
              variant="contained"
              sx={{
                padding: "0.2rem 0.5rem",
                fontSize: "0.8rem",
                backgroundColor: "#2196f3",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#1976d2",
                },
              }}
              onClick={() => setIsAreaSelectorOpened(true)}
            >
              Wybierz obszar
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MapMenu;