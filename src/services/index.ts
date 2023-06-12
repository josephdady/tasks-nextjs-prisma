import { ITask } from "../types";

export async function getTask(id: string) {
  const res = await fetch(`api/task/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch Task");
  }
  return res.json();
}

export async function addRelatedTask(
  relatedIds: { id: string }[],
  taskId: string
) {
  const res = await fetch(`api/task/add-related`, {
    method: "POST",
    body: JSON.stringify({ relatedIds, taskId }),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Task");
  }
  return res.json();
}

export async function getRelatedTasks(id: string[]) {
  const res = await fetch(`api/task/get-related`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Related Tasks");
  }
  return res.json();
}

export async function addTask(task: ITask) {
  const res = await fetch(`api/task/add-task`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Task");
  }
  return res.json();
}
export async function setWatcher(watcherId: string, taskId: string) {
  const res = await fetch(`api/task/set-watcher`, {
    method: "POST",
    body: JSON.stringify({ watcherId, taskId }),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Task");
  }
  return res.json();
}
