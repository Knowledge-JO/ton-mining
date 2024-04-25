import { FormControl, FormLabel } from "@chakra-ui/react";
import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000" : "#000",
  }),
};

function CountrySelector() {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <FormControl p={3}>
      <FormLabel>Country/Region</FormLabel>
      <Select
        options={options}
        value={value}
        onChange={changeHandler}
        styles={customStyles}
      />
    </FormControl>
  );
}

export default CountrySelector;
