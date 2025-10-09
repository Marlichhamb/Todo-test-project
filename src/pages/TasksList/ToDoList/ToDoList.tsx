import {type Dispatch, type FC, type SetStateAction} from "react";
import {Box} from "@mui/material";
import {ToDoItem} from "./ToDoItem/ToDoItem.tsx";
import type { TTodo} from "../../../types/todo.ts";


interface IToDoListProps {
    tasks: TTodo[];
    setTasks: Dispatch<SetStateAction<TTodo[]>>
}
export const ToDoList: FC<IToDoListProps> = ({tasks, setTasks}) => {

  return (
      <Box sx={{borderRadius: 4}}>

          { tasks.map((item) => (
              <ToDoItem item={ item } setTasks={setTasks} />
          ))}

      </Box>
  )
}