import React, { FC } from "react";
import { User } from "../types";
import { Box, Avatar, Typography } from "@mui/material";

type Props = {
  viewers: User[];
};

const Viewers: FC<Props> = ({ viewers }) => {
  return (
    <Box>
      {viewers?.map((viewer) => (
        <Box
          key={viewer.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
            }}
            src={viewer.avatar}
          />
          <Typography variant="body2" component={"span"} fontWeight={500}>
            {viewer.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Viewers;
