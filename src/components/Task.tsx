import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Avatar, Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import DefaultIcon from "../asstes/icon-plus.svg";
import { Status, Status as StatusEnum } from "../enums/status";
import AddRelated from "./AddRelated";
import TaskCard, { ITaskCard } from "./TaskCard";
import Loading from "./Loading";
import { setWatcher } from "../services";
import { User } from "../types";
//

export interface ITask {
  id?: string;
  createdAt?: string;
  title?: string;
  description?: string;
  status?: Status;
  relatedTo?: ITask[];
  assignee?: User;
  assigneeId?: string;
  viewers?: User[];
}

type Props = {
  task: ITask;
  relatedList: ITaskCard[];
  open: boolean;
  taskLoading?: boolean;
  relatedLoading?: boolean;
  handleClose?: () => void;
  sendRelated?: (tasks: { id: string }[], id: string) => void;
};

const Task: React.FC<Props> = ({
  task,
  relatedList,
  open,
  taskLoading,
  relatedLoading,
  handleClose,
  sendRelated,
}) => {
  const [tabValue, setTabValue] = useState("1");
  const [relatedOpen, setRelatedOpen] = useState(false);

  const handleTabChange = (_, newValue: string) => {
    setTabValue(newValue);
  };
  const handleRelatedClose = () => {
    setRelatedOpen(false);
  };

  const handleAddRelated = async (tasks: { id: string }[]) => {
    sendRelated(tasks, task.id);
    setRelatedOpen(false);
  };

  useEffect(() => {
    if (task?.viewers) {
      handleSetWatcher();
    }
  }, [task]);

  const handleSetWatcher = async () => {
    const viewers = task.viewers.map((viewer) => viewer.id) as string[];

    const loggedUser = localStorage.getItem("loggedUser");
    if (!viewers.includes(loggedUser)) {
      const { viewers } = await setWatcher(loggedUser, task.id);
      console.log("viewers", viewers);
      task.viewers = viewers;
    }
  };
  const styles = {
    avater: {
      display: "flex",
      alignItems: "center",
      gap: 3,
      flex: 1,
      "& img": {
        borderRadius: 2.5,
      },
    },
    date: {
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
    },
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      {taskLoading && <Loading />}
      {task && !taskLoading && (
        <>
          <Paper
            sx={{
              backgroundColor: "#F7F9FC",
              px: 4,
              py: 3,
            }}
          >
            <Box sx={styles.avater}>
              <Image
                src={task.assignee?.avatar || DefaultIcon.src}
                alt="Picture of the assignee"
                width={64}
                height={64}
              />
              <Box>
                <Typography
                  variant="body1"
                  component={"span"}
                  fontWeight={600}
                  mb={1}
                >
                  {task.title}
                </Typography>
                <Box sx={styles.date}>
                  <Typography
                    component={"div"}
                    fontWeight={500}
                    color="text.disabled"
                  >
                    Creation Date&nbsp;
                  </Typography>
                  <Typography
                    component={"div"}
                    fontWeight={400}
                    color="#667085"
                  >
                    {new Date(task.createdAt).toDateString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box
              display={"flex"}
              columnGap={{ xs: 2, sm: 8 }}
              rowGap={2}
              flexWrap="wrap"
            >
              <Box>
                <Typography
                  component={"div"}
                  fontWeight={500}
                  color="text.disabled"
                  mb={1}
                >
                  Status
                </Typography>
                <Chip label={StatusEnum[task.status]} />
              </Box>
              <Box>
                <Typography
                  component={"div"}
                  fontWeight={500}
                  color="text.disabled"
                  mb={1}
                >
                  Date created
                </Typography>
                <Chip label={new Date(task.createdAt).toDateString()} />
              </Box>
              <Box>
                <Typography
                  component={"div"}
                  fontWeight={500}
                  color="text.disabled"
                  mb={1}
                >
                  Assignee
                </Typography>
                <Chip label={task.assignee?.name || "Unssigned"} />
              </Box>
            </Box>
            <Box mt={4}>
              <Typography
                component={"div"}
                fontWeight={500}
                color="text.disabled"
                mb={1}
              >
                Description
              </Typography>
              <Box display="flex" alignItems={"center"} gap={1}>
                <Chip
                  sx={{
                    height: "134px",
                    width: "100%",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    "& .MuiChip-label": {
                      display: "block",
                      whiteSpace: "normal",
                      p: 2,
                    },
                  }}
                  label={task.description}
                  size="medium"
                />
                <ChevronRightRoundedIcon
                  fontSize="medium"
                  sx={{
                    color: "text.disabled",
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ width: "100%", mt: 8 }}>
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleTabChange}>
                    <Tab
                      sx={{
                        textTransform: "none",
                      }}
                      label="Related"
                      value="1"
                    />
                    <Tab
                      sx={{
                        textTransform: "none",
                      }}
                      label="Watchers"
                      value="2"
                    />
                  </TabList>
                </Box>
                <TabPanel
                  value="1"
                  sx={{
                    px: 0,
                  }}
                >
                  {relatedLoading && <Loading />}
                  {!relatedLoading &&
                    task?.relatedTo?.map((task) => {
                      return <TaskCard task={task} key={task.id} noHover />;
                    })}
                  <Button
                    disabled={relatedList.length == 0}
                    variant="text"
                    sx={{
                      color: "text.primary",
                      textTransform: "none",
                    }}
                    startIcon={<AddIcon />}
                    onClick={() => setRelatedOpen(true)}
                  >
                    Link to other tasks
                  </Button>
                </TabPanel>
                <TabPanel value="2">
                  {task.viewers?.map((viewer) => (
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
                      <Typography
                        variant="body2"
                        component={"span"}
                        fontWeight={500}
                      >
                        {viewer.name}
                      </Typography>
                    </Box>
                  ))}
                </TabPanel>
              </TabContext>
            </Box>
          </Paper>

          <AddRelated
            task={task}
            open={relatedOpen}
            relatedList={relatedList}
            handleClose={handleRelatedClose}
            handleAddRelated={handleAddRelated}
          />
        </>
      )}
    </Dialog>
  );
};
export default Task;
