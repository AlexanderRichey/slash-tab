import React from "react";

import { Box } from "./Styles";

export default ({ tabs }) => (
  <Box as="ol" flexDirection="row" mr="1rem">
    {tabs.slice(0, 5).map(tab => (
      <Box
        key={tab.id}
        as="img"
        src={tab.favIconUrl}
        height="1.6rem"
        width="1.6rem"
        mr="0.4rem"
      />
    ))}
  </Box>
);
