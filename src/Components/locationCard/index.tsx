import { LocationData } from "../Map/types";
import { Card, IconButton, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
interface LocationCardProps {
  locationData: LocationData;
  handleDeleteAddress: (location: LocationData) => void;
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
        backgroundColor: "#f3dabe",
        marginBottom: "0.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "0.25rem",
        }}
      >
        <Typography
          sx={{
            textAlign: "left",
          }}
        >
          {locationData.display_name}
        </Typography>
        <IconButton onClick={() => handleDeleteAddress(locationData)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default LocationCard;
