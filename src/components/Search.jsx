import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import { DataContext } from "../redux";
import { Icon } from "./Styles";

const Setter = styled.div`
  width: 3rem;
  color: ${themeGet("colors.lightGray")} !important;
`;

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid ${themeGet("colors.lightGray")};
  position: relative;
  width: 30rem;
  height: 3.2rem;
  align-items: center;

  &:focus-within {
    border-bottom: 1px solid ${themeGet("colors.darkGray")};
  }

  &:focus-within ${Setter} {
    color: ${themeGet("colors.darkGray")} !important;
  }

  transition: border 0.2s ease;
`;

const Field = styled.input`
  width: 27rem;
  border: none;
  text-align: center;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

export default () => {
  const { dispatch } = useContext(DataContext);
  const timeout = useRef(null);
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      dispatch({
        type: "QUERY",
        payload: value.toLowerCase()
      });
    }, 100);
  }, [value]);

  return (
    <Container>
      <Setter>
        <Icon name="search" cursor="unset" />
      </Setter>
      <Field value={value} onChange={handleChange} />
    </Container>
  );
};
