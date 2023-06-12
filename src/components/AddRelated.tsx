import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { Button, Checkbox, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";
import { ITask, ITaskCard } from "../types";
import TaskCard from "./TaskCard";

type Props = {
  task: ITask;
  relatedList: ITaskCard[];
  open: boolean;
  handleClose?: () => void;
  handleAddRelated?: (tasks: { id: string }[]) => void;
};

const Task: React.FC<Props> = ({
  task,
  relatedList,
  open,
  handleClose,
  handleAddRelated,
}) => {
  const [addingRelated, setAddingRelated] = useState<{ id: string }[]>([]);
  const handleTaskClick = async (e: any, id: string) => {
    if (e.target.checked) {
      setAddingRelated([...addingRelated, { id }]);
    } else {
      setAddingRelated(addingRelated.filter((item) => item.id !== id));
    }
  };

  const done = () => {
    handleAddRelated(addingRelated);
    handleClose();
    setAddingRelated([]);
  };

  const handleCloseDialog = () => {
    handleClose();
    setAddingRelated([]);
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <DialogContent
        sx={{
          px: 0,
        }}
      >
        {relatedList
          .filter(
            (item) =>
              item.id !== task?.id &&
              !task?.relatedTo?.map((item) => item.id).includes(item.id)
          )
          .map((task) => {
            return (
              <Box
                key={task.id}
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
              >
                <Checkbox
                  checked={addingRelated
                    .map((item) => item.id)
                    .includes(task.id)}
                  onChange={(e) => handleTaskClick(e, task.id)}
                />
                <TaskCard task={task} key={task.id} noHover />
              </Box>
            );
          })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          disabled={addingRelated.length == 0}
          variant="contained"
          autoFocus
          onClick={done}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Task;
