import styled from '@emotion/styled';
import BathtubIcon from '@mui/icons-material/Bathtub';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import CloseIcon from '@mui/icons-material/Close';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ParkIcon from '@mui/icons-material/Park';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import AreaCard from '../AreaCard/AreaCard';
import { AlertInterface, Area, LocationData } from '../Map/types';
import Searcher from '../Searcher/Searcher';
import LocationCard from '../locationCard';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  alert: AlertInterface;
  locationsData: LocationData[];
  setLocationsData: (locations: LocationData[]) => void;
  areasData: Area[];
  onDeleteArea: (area: Area) => void;
  // onSave: (alert: Alert) => void;
}

const AnimatedBox = styled(Box)`
  animation: 0.5s ease-out 0s 1 slideInFromLeft;
  position: fixed;
  width: 35%;
  background-color: #f5f5f5;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  z-index: 1000;
  top: 20px;
  left: 20px;
  bottom: 20px;
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes slideOutToRight {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  .slide-in {
    animation: slideInFromLeft 0.3s ease-out 0s 1 forwards;
  }

  .slide-out {
    animation: slideOutToRight 0.3s ease-out 0s 1 forwards;
  }
`;

const MenuTitle = styled(Typography)`
  text-align: start;
  margin-bottom: 1rem;
`;

const StyledSearcher = styled(Searcher)`
  border-radius: 10px !important;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2);
  width: 100%;
  .MuiOutlinedInput-root {
    border-radius: 10px !important;
    input {
      padding-left: 1rem !important;
    }
  }
`;

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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {icon}
      <Typography sx={{ marginLeft: '0.25rem', fontSize: '0.75rem' }}>
        {label}
      </Typography>
    </Box>
  );
};

const LeftMenu = ({
  open,
  setOpen,
  alert,
  locationsData,
  setLocationsData,
  onDeleteArea,
  areasData,
}: Props) => {
  const styles = {
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: 3,
    },
  };

  const [currentAlert, setCurrentAlert] = useState<AlertInterface>({
    ...alert,
    dateOfCreation: new Date(),
    dateOfEnd: new Date(),
    dateOfStart: new Date(),
    isUrgent: false,
  });

  const mockAlertCategories = [
    {
      id: 1,
      name: 'Pożar',
      activeBackground: '#c26b02',
      inactiveBackground: '#c26b0270',
      chosen: false,
      isUrgent: true,
      icon: <LocalFireDepartmentIcon />,
    },
    {
      id: 2,
      name: 'Wypadek na drodze',
      activeBackground: '#ff0000',
      inactiveBackground: '#ff000070',
      chosen: false,
      isUrgent: true,
      icon: <CarCrashIcon />,
    },
    {
      id: 3,
      name: 'Drzewo na drodze',
      activeBackground: '#098217',
      inactiveBackground: '#09821770',
      chosen: false,
      isUrgent: true,
      icon: <ParkIcon />,
    },
    {
      id: 4,
      name: 'przerwa w dostawie prądu',
      activeBackground: '#fcc612',
      inactiveBackground: '#fcc61270',
      chosen: false,
      isUrgent: false,
      icon: <PowerOffIcon />,
    },
    {
      id: 5,
      name: 'przerwa w dostawie wody',
      activeBackground: '#2356c4',
      inactiveBackground: '#2356c470',
      chosen: false,
      isUrgent: false,
      icon: <BathtubIcon />,
    },
  ];

  const [numberOfHours, setNumberOfHours] = useState<number>(0);
  const [currentClass, setCurrentClass] = useState('slide-in');
  const onSubmit = () => {
    const dataToSend = {
      createdAt: currentAlert.dateOfCreation,
      dateOfEnd: currentAlert.dateOfEnd,
      dateOfStart: currentAlert.dateOfStart,
      description: currentAlert.body,
      isUrgent: currentAlert.isUrgent,
      location: locationsData,
      areas: areasData,
      categoryId: currentAlert.categoryId,
    };
    if (dataToSend.isUrgent)
      dataToSend.dateOfEnd = new Date(
        dataToSend.dateOfStart.getTime() + numberOfHours * 60 * 60 * 1000
      );
  };

  const handleMenuClose = () => {
    setCurrentClass('slide-out');
    setOpen(false);
  };

  return (
    <div style={styles.root}>
      {open ? (
        <AnimatedBox className={currentClass}>
          <Box
            className="target-for-scroll"
            sx={{
              overflowY: 'auto',
              overflowX: 'hidden',
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <MenuTitle variant="h5">Nowy alert</MenuTitle>
              <IconButton onClick={handleMenuClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography color={'black'} variant="h6">
                Pilne
              </Typography>
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
                margin: '0.5rem',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '0.5rem',
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
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.5rem',
                      borderBottom: '1px solid #ccc',
                      cursor: 'pointer',
                      width: 'fit-content',
                      color: 'white',
                      backgroundColor:
                        category.id === currentAlert.categoryId
                          ? category.activeBackground
                          : category.inactiveBackground,
                      '&:hover': {
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
              sx={{ display: 'flex', flexDirection: 'row', margin: '1rem 0' }}
            >
              <StyledSearcher
                onSelectLocation={(location) => {
                  setLocationsData([...locationsData, location]);
                }}
                sx={{
                  width: '100%',
                }}
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '1rem',
                borderBottom: '1px solid gray',
                borderRadius: '5px',
              }}
            >
              {locationsData.map((location, index) => {
                return (
                  <LocationCard
                    locationData={location}
                    key={index}
                    handleDeleteAddress={(location: LocationData) => {
                      setLocationsData(
                        locationsData.filter(
                          (item) => item.place_id !== location.place_id
                        )
                      );
                    }}
                  />
                );
              })}
              {areasData.map((area, index) => {
                return (
                  <AreaCard
                    areaData={area}
                    key={index}
                    handleDeleteArea={() => {
                      onDeleteArea(area);
                    }}
                  />
                );
              })}
            </Box>
            {currentAlert.isUrgent ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
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
                      step: 1,
                    },
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextField
                    label="Wybierz datę początkową"
                    variant="outlined"
                    value={currentAlert.dateOfStart.toISOString().slice(0, 16)}
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
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextField
                    label="Wybierz końiec"
                    variant="outlined"
                    margin="normal"
                    type="datetime-local"
                    value={currentAlert.dateOfEnd.toISOString().slice(0, 16)}
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="contained"
                sx={{
                  width: '30%',
                  borderRadius: '28px',
                  padding: '0.5rem',
                  backgroundColor: '#3f51b5',
                  margin: '1rem 0',
                }}
                startIcon={<CheckIcon />}
                onClick={() => {
                  onSubmit();
                  handleMenuClose();
                }}
              >
                Zgłoś
              </Button>
            </Box>
          </Box>
        </AnimatedBox>
      ) : null}
    </div>
  );
};

export default LeftMenu;
