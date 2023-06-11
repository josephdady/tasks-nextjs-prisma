import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

const Loading: FC = () => (
  <Box textAlign={"center"} py={2}>
    <CircularProgress />
  </Box>
);

export default Loading;
