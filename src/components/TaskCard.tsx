import React from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Status } from "../enums/status";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DefaultIcon from "../../public/icon.svg";
import { Assignee } from "@prisma/client";
import { ITask } from "./Task";

export interface ITaskCard {
  id: string;
  createdAt: Date;
  title: string;
  status: Status;
  assignee: Assignee;
}

type Props = {
  task: ITaskCard | ITask;
  onClick?: (id: string) => void;
  noHover?: boolean;
};

const TaskCard: React.FC<Props> = ({ task, onClick, noHover }) => {
  const styles = {
    card: {
      padding: { xs: "14px 16px", sm: !noHover ? "24px 28px" : "" },
      mb: 2,
      borderRadius: 2.5,
      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      border: "1px solid #F0F2F7",
      ...(!noHover && { cursor: "pointer" }),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      ...(!noHover && {
        "&:hover": {
          boxShadow:
            "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        },
      }),
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
    metadata: {
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
    },
    statusWrapper: {
      borderLeft: "1px solid #DFE3EB",
      pl: 4,
      display: "flex",
      alignItems: "center",
      gap: 2,
    },
    status: {
      border: "1px solid #DFE3EB",
      px: 1.5,
      py: 1.25,
      width: 100,
      borderRadius: 1.5,
    },
  };
  return (
    <Card sx={styles.card} onClick={() => !noHover && onClick(task.id)}>
      <Box sx={styles.avater}>
        <Image
          src={task.assignee?.avatar || DefaultIcon.src}
          alt="Picture of the assignee"
          width={64}
          height={64}
        />
        <Box>
          <Typography
            variant="body2"
            component={"span"}
            fontWeight={600}
            mb={1}
          >
            {task.title}
          </Typography>
          <Box sx={styles.metadata}>
            {task.assignee?.name && (
              <Typography
                component={"div"}
                fontWeight={600}
                color="text.disabled"
              >
                {task.assignee?.name} ·&nbsp;
              </Typography>
            )}
            <Typography
              component={"div"}
              fontWeight={500}
              color="text.disabled"
            >
              Creation Date&nbsp;
            </Typography>
            <Typography component={"div"} fontWeight={400} color="#667085">
              {new Date(task.createdAt).toDateString()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={styles.statusWrapper}>
        <Box sx={styles.status}>{Status[task.status]}</Box>
        <ChevronRightRoundedIcon
          fontSize="medium"
          sx={{
            color: "text.disabled",
          }}
        />
      </Box>
    </Card>
  );
};

export default TaskCard;
