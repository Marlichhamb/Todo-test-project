import type {FC} from "react";
import {Box} from "@mui/material";
import type {TTodo} from "../../../types/todo.ts";
import {ToDoItem} from "./ToDoItem/ToDoItem.tsx";

interface IToDoListProps {
    tasksArr: TTodo[]
}

export const ToDoList: FC<IToDoListProps> = ({ tasksArr }) => {
  return (
      <Box sx={{width: 500, bgcolor: '#c5ddf6', borderRadius: 4}}>


          { tasksArr.map((item) => (
              <ToDoItem item={ item }/>
          ))}




      </Box>
  )
}