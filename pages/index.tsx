import { FC, useState } from "react";
import { GetStaticProps } from "next";
import prisma from "../src/lib/prisma";
import TaskCard, { ITaskCard } from "../src/components/TaskCard";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Task, { ITask } from "../src/components/Task";
import Header from "../src/components/Header";
import NewTask from "../src/components/NewTask";
import { addRelatedTask, addTask, getTask } from "../src/services";
import Loading from "../src/components/Loading";
import { User } from "../src/types";
//
export const getStaticProps: GetStaticProps = async () => {
  const task = await prisma.task.findMany({
    include: {
      assignee: {
        select: { name: true, avatar: true },
      },
    },
  });
  const assignees = await prisma.user.findMany();

  return {
    props: {
      tasks: JSON.parse(JSON.stringify(task)),
      assignees: JSON.parse(JSON.stringify(assignees)),
    },
    revalidate: 10,
  };
};

type Props = {
  tasks: ITaskCard[];
  assignees: User[];
};

const Home: FC<Props> = ({ tasks, assignees }) => {
  const [task, setTask] = useState<ITask>(null);
  const [taskOpen, setTaskOpen] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [newTaskLoading, setNewTaskLoading] = useState(false);

  // New task handlers
  const handleNewTaskOpen = () => {
    setNewTaskOpen(true);
  };
  const handleNewTaskClose = () => {
    setNewTaskOpen(false);
  };
  const handleAddTask = async (payload: ITask) => {
    setNewTaskLoading(true);
    setNewTaskOpen(false);
    const task = await addTask(payload);
    tasks.push(task);
    setNewTaskLoading(false);
  };

  // Handle getting task
  const handleTaskClick = async (id: string) => {
    setTaskOpen(true);
    setTaskLoading(true);
    const task = await getTask(id);

    setTaskLoading(false);
    setTask(task);
  };
  const handleTaskClose = () => {
    setTaskOpen(false);
    setTask(null);
  };

  // Related task handler
  const handleAddRelated = async (relatedIds: { id: string }[], id: string) => {
    try {
      setRelatedLoading(true);
      const task = await addRelatedTask(relatedIds, id);
      setTask(task);
    } catch (err) {
      console.error(err);
    } finally {
      setRelatedLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={13}>
        <Header handleNewTask={handleNewTaskOpen} assignees={assignees} />
        {newTaskLoading && <Loading />}
        {!newTaskLoading &&
          tasks.map((task) => {
            return (
              <TaskCard task={task} key={task.id} onClick={handleTaskClick} />
            );
          })}
        {taskOpen && (
          <Task
            task={task}
            relatedList={tasks}
            open={taskOpen}
            taskLoading={taskLoading}
            relatedLoading={relatedLoading}
            handleClose={handleTaskClose}
            sendRelated={handleAddRelated}
          />
        )}
        <NewTask
          relatedList={tasks}
          open={newTaskOpen}
          handleClose={handleNewTaskClose}
          assigness={assignees}
          handleTask={handleAddTask}
        />
      </Box>
    </Container>
  );
};

export default Home;
