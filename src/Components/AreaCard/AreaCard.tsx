import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { Area } from "../Map/types";
import { metersToKm } from "../../Utils/metersToKm";

interface AreaCardProps {
  areaData: Area;
  handleDeleteArea: () => void;
}

const AreaCard = ({
  areaData,
  handleDeleteArea: handleDeleteAddress,
}: AreaCardProps) => {
  return (
    <Card
      sx={{
        alignItems: "center",
        padding: "1rem",
        borderRadius: "8px",
        backgroundColor: "#b9d7f0",
        marginBottom: "0.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "0.25rem",
        }}
      >
        <Typography
          sx={{
            // height: "100%",
            // overflow: "hidden",
            // limit to one line of text
            // textOverflow: "ellipsis",
            // whiteSpace: "nowrap",
            // overflow: "hidden",
            textAlign: "left",
          }}
        >
          Obszar {metersToKm(areaData.area.radius)} km wokół {areaData.area.center.display_name}
        </Typography>
        <IconButton onClick={() => handleDeleteAddress()}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default AreaCard;
