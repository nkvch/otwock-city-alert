import styled from "@emotion/styled";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { searchOpenStreetMap } from "../../Queries/searchOpenStreetMap";
import React, { useCallback, useState } from "react";
import { LocationData } from "../Map/types";

const StyledAutocomplete = styled(Autocomplete)`
  background-color: white;
  border-radius: 28px;
  width: 400px;

  .MuiOutlinedInput-root {
    border-radius: 28px;
    input {
      padding-left: 1rem !important;
    }
  }
`;

export interface SearcherProps {
  onSelectLocation: (location: LocationData) => void;
}

function Searcher(props: SearcherProps) {
  const { onSelectLocation } = props;
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

  return (
    <StyledAutocomplete
      
      loading={isFetching}
      id="free-solo-2-demo"
      options={data?.map((location) => location.display_name) || []}
      value={searchValue}
      onChange={onSelectOption}
      renderInput={(params) => (
        <TextField
        className="target-for-scroll"
          {...params}
          label="Szukaj..."
          onChange={(event) => setSearchValue(event.target.value)}
        />
      )}
    />
  );
}

export default Searcher;
