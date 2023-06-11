import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useState } from "react";
import { User } from "../types";

type Props = {
  handleNewTask: () => void;
  assignees: User[];
};

const Header: FC<Props> = ({ handleNewTask, assignees }) => {
  const [loggedUser, setLoggedUser] = useState<string | null>("");
  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      setLoggedUser(loggedUser);
    }
  }, [loggedUser]);
  const handleUserChange = (e) => {
    setLoggedUser(e.target.value);
    localStorage.setItem("loggedUser", e.target.value);
  };
  return (
    <Box
      display={"flex"}
      width={"100%"}
      columnGap={2.5}
      mb={2.5}
      alignItems={"flex-end"}
    >
      <Typography
        fontSize={22}
        fontWeight={600}
        color={"text.secondary"}
        component="h1"
      >
        Tasks
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleNewTask}
        sx={{
          fontSize: 12,
          lineHeight: 1.6,
          textTransform: "none",
        }}
      >
        New task
      </Button>
      <Box>
        <FormControl
          sx={{
            minWidth: 140,
          }}
        >
          <InputLabel>Set Watcher</InputLabel>
          <Select
            onChange={handleUserChange}
            size="small"
            variant="filled"
            label="Assignee"
            value={loggedUser}
          >
            {assignees.map((assignee) => (
              <MenuItem key={assignee.id} value={assignee.id}>
                {assignee.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
export default Header;
