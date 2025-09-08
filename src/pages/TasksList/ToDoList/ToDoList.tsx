import {type Dispatch, type FC, type SetStateAction, useEffect} from "react";
import {Box} from "@mui/material";
import {ToDoItem} from "./ToDoItem/ToDoItem.tsx";
import axios from "axios";
import {getAllTasks} from "../../../data/api_endpoint.ts";
import type {TTodo} from "../../../types/todo.ts";


interface IToDoListProps {
    tasks: TTodo[];
    setTasks: Dispatch<SetStateAction<TTodo[]>>
}
export const ToDoList: FC<IToDoListProps> = ({tasks, setTasks}) => {

    useEffect(()=> {
        axios
                .get(getAllTasks)
                .then(data => {
                    setTasks(data.data)
                }).catch( error => {
                console.error("GETTING DATA ERROR", error);
            }
            )
    },[]);


  return (
      <Box sx={{width: 500, borderRadius: 4}}>

          { tasks.map((item) => (
              <ToDoItem item={ item } />
          ))}

      </Box>
  )
}