import { LocationData } from "../Map/types";
import { Card, IconButton, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
interface LocationCardProps {
  locationData: LocationData;
  handleDeleteAddress: () => void;
}
const LocationCard = ({
  locationData,
  handleDeleteAddress,
}: LocationCardProps) => {
  return (
    <Card
      sx={{
        fontSize: "0.75rem",
        alignItems: "center",
        padding: "0.75rem",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
        height: "25px",
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
            height: "100%",
            overflow: "hidden",
            textAlign: "left",
          }}
        >
          {locationData.display_name}
        </Typography>
        <IconButton onClick={() => handleDeleteAddress()}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default LocationCard;
