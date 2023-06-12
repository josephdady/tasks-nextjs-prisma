import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import DefaultIcon from "../asstes/icon-plus.svg";
import { ITask, ITaskCard, User } from "../types";
import TaskCard from "./TaskCard";
import { Status } from "../enums/status";

type Props = {
  assigness: User[];
  open: boolean;
  relatedList: ITaskCard[];
  handleClose?: () => void;
  handleTask?: (data: any) => void;
};

const NewTask: FC<Props> = ({
  open,
  handleClose,
  handleTask,
  assigness,
  relatedList,
}) => {
  const defaultTask: Pick<
    ITask,
    "status" | "title" | "description" | "assigneeId" | "relatedTo"
  > = {
    status: Status.OPEN,
    title: "",
    description: "",
    assigneeId: "",
    relatedTo: [],
  };
  const [step, setStep] = useState(1);
  const [submitStep1, setSubmitStep1] = useState(false);
  const statusList = Object.values(Status);
  const [formState, setFormState] = useState<ITask>({
    ...defaultTask,
  });

  const styles = {
    paper: {
      "& .MuiDialog-paper": {
        backgroundColor: "#F7F9FC",
      },
    },
    avater: {
      display: "flex",
      alignItems: "center",
      gap: 3,
      flex: 1,
      "& img": {
        borderRadius: 2.5,
      },
    },
  };

  useEffect(() => {
    console.log("formState", formState);
  }, [formState]);

  const handleFormState = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  const handleRelatedClick = (e, id) => {
    if (e.target.checked) {
      let relatedTo = formState?.relatedTo || [];
      relatedTo.push(id);
      const newFormState = { ...formState, relatedTo };
      setFormState(newFormState);
    } else {
      handleFormState(
        "relatedTo",
        formState?.relatedTo.filter((item) => item !== id)
      );
    }
  };

  const handleNext = () => {
    setSubmitStep1(true);
    if (!formState?.title || !formState?.assigneeId) return;
    setStep(step + 1);
  };

  const handleCloseDialog = () => {
    setStep(1);
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTask(formState);
  };

  useEffect(() => {
    if (!open) {
      setStep(1);
      setFormState({ ...defaultTask });
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        sx={styles.paper}
      >
        <DialogContent>
          {step == 1 && (
            <>
              <Box sx={styles.avater}>
                <Image
                  src={DefaultIcon.src}
                  alt="Picture of the assignee"
                  width={64}
                  height={64}
                />
                <Box display={"flex"} width={"100%"} gap={4}>
                  <Box flex={1}>
                    <TextField
                      error={!formState.title && submitStep1}
                      onChange={(e) => handleFormState("title", e.target.value)}
                      label="Title"
                      variant="filled"
                      size="small"
                      value={formState.title}
                    />
                    <Typography
                      mt={1}
                      component={"div"}
                      fontWeight={400}
                      color="#667085"
                    >
                      {new Date().toDateString()}
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    <FormControl fullWidth>
                      <InputLabel>Assignee</InputLabel>
                      <Select
                        size="small"
                        variant="filled"
                        label="Assignee"
                        error={!formState?.assigneeId && submitStep1}
                        value={formState.assigneeId}
                        onChange={(e) =>
                          handleFormState("assigneeId", e.target.value)
                        }
                      >
                        {assigness.map((assignee) => (
                          <MenuItem key={assignee.id} value={assignee.id}>
                            {assignee.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ my: 3 }} />
            </>
          )}
          {step == 2 && (
            <>
              <Box>
                <FormControl fullWidth>
                  <TextField
                    label="Description"
                    variant="filled"
                    size="small"
                    multiline
                    rows={4}
                    value={formState.description}
                    onChange={(e) =>
                      handleFormState("description", e.target.value)
                    }
                  />
                </FormControl>
              </Box>
              <Box mt={4}>
                <FormControl
                  sx={{
                    minWidth: 120,
                  }}
                >
                  <InputLabel>Status</InputLabel>
                  <Select
                    size="small"
                    variant="filled"
                    label="Status"
                    value={formState.status}
                    onChange={(e) => handleFormState("status", e.target.value)}
                  >
                    {statusList.map((status, index) => (
                      <MenuItem key={index} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box mt={4}>
                {relatedList.map((task, index) => {
                  return (
                    <Box
                      key={task.id}
                      width={"100%"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Checkbox
                        onChange={(e) => handleRelatedClick(e, task.id)}
                      />
                      <TaskCard task={task} key={task.id} noHover />
                    </Box>
                  );
                })}
              </Box>
            </> //
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            disabled={step == 1}
            onClick={() => setStep(step - 1)}
            type="button"
          >
            Back
          </Button>
          {step == 1 && (
            <Button variant="contained" onClick={handleNext} type="button">
              Next
            </Button>
          )}
          {step == 2 && (
            <Button onClick={handleSubmit} variant="contained">
              Finish
            </Button>
          )}
        </DialogActions>
        {/* </Box> */}
      </Dialog>
    </>
  );
};
export default NewTask;
