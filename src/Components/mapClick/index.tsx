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
        // <Box
        //   sx={{
        //     display: "flex",
        //     justifyContent: "center",
        //     flexDirection: "column",
        //     width: "20%",
        //     height: "30%",
        //     borderRadius: "10px",
        //     boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        //     backgroundColor: "#f5f5f5",
        //     padding: "1rem",
        //   }}
        // >
        <>

          {/* </Box> */}
        </>
      )}
    </>
  );
};

export default MapMenu;