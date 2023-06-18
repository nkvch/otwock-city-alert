import styled from "@emotion/styled";
import { Autocomplete, TextField, Typography, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { searchOpenStreetMap } from "../../Queries/searchOpenStreetMap";
import { LocationData } from "../Map/types";

import SearchIcon from "@mui/icons-material/Search";

const StyledAutocomplete = styled(Autocomplete)`
  background-color: white;
  border-radius: 28px;
  width: 400px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  .MuiOutlinedInput-root {
    border-radius: 28px;
    input {
      padding-left: 1rem !important;
    }
  }
`;

export interface SearcherProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelectLocation: (location: LocationData) => void;
}

function Searcher(props: SearcherProps) {
  const { onSelectLocation, ...rest } = props;
  const [searchValue, setSearchValue] = useState<string>("");

  const { data, isFetching } = useQuery(["locations", searchValue], () =>
    searchOpenStreetMap({
      q: searchValue,
    })
  );

  const onSelectOption = useCallback(
    (event: any, value: unknown) => {
      if (value) {
        const location = data?.find(
          (location) => location.display_name === value
        );

        if (location) {
          setSearchValue("");
          onSelectLocation(location);
        }
      }
    },
    [data, onSelectLocation]
  );
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

  return (
    <StyledAutocomplete
      {...rest}
      loading={isFetching}
      id="free-solo-2-demo"
      options={data?.map((location) => location.display_name) || []}
      value={searchValue}
      onChange={onSelectOption}
      renderInput={(params) => (
        <TextField
          className="target-for-scroll"
          {...params}
          label={<LabeledIcon icon={<SearchIcon />} label="Szukaj" />}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      )}
    />
  );
}

export default Searcher;
