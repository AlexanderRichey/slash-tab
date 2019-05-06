import React, { useState, useEffect, useRef } from "react";
import { Text, Box } from "./Styles";

export default props => {
  const { value, handleUpdate, toggleIsEditing, isEditing, ...rest } = props;
  const [buffer, updateBuffer] = useState(value);
  const inputEl = useRef(null);

  function doUpdate(e) {
    e && e.preventDefault();
    if (isEditing) handleUpdate({ title: buffer });
    toggleIsEditing();
  }

  function handleChange(e) {
    updateBuffer(e.target.value);
  }

  useEffect(() => {
    if (isEditing && inputEl.current) {
      inputEl.current.focus();
      inputEl.current.select();
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <Box as="form" onSubmit={doUpdate} display="inline">
        <Text
          as="input"
          type="text"
          ref={inputEl}
          value={buffer}
          onChange={handleChange}
          onBlur={doUpdate}
          {...rest}
        />
      </Box>
    );
  } else {
    return (
      <Text onDoubleClick={toggleIsEditing} {...rest}>
        {value}
      </Text>
    );
  }
};
