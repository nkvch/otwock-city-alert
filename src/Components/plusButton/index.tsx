import AddIcon from '@mui/icons-material/Add';
import { IconButton, Typography } from '@mui/material';

export interface PlusButtonProps {
  onClick: () => void;
}

const PlusButton = ({ onClick }: PlusButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      size="large"
      sx={{
        backgroundColor: '#ffffff',
        border: '1px solid #ccc',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '32px',
        padding: '0.25rem 1rem',
        height: '56px',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <AddIcon />
      <Typography
        sx={
          {
            // fontSize: '0.8rem',
          }
        }
      >
        Dodaj
      </Typography>
    </IconButton>
  );
};

export default PlusButton;
