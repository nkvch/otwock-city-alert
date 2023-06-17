import AddIcon from "@mui/icons-material/Add";
import {
  IconButton,
  Typography
} from "@mui/material";

export interface PlusButtonProps {
  onClick: () => void;
}

const PlusButton = ({ onClick }: PlusButtonProps) => {

  return (
    <IconButton
      onClick={onClick}
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

  );
};

export default PlusButton;
