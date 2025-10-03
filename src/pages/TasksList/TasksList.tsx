import {Box, Typography} from "@mui/material";
import {type FC, useEffect, useMemo, useState} from "react";
import {TasksListAction} from "./TasksListAction/TasksListAction.tsx";
import {ToDoList} from "./ToDoList/ToDoList.tsx";
import { type TTodo} from "../../types/todo.ts";
import axios from "axios";
import {getAllTasks} from "../../data/api_endpoint.ts";

export const TasksList: FC = () =>  {
    const [tasks, setTasks] = useState<TTodo[]>([]);

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

    const filteredListByStatus = useMemo(() => {
        return tasks.filter(task => task.status !== 'done');
    },[tasks])

    return (

        <Box
            sx={{
                height: '100vh',
                display: "flex",
                flexDirection:'column',
                alignItems: "center",
                justifyContent: "flex-start",
                bgcolor: '#c5ddf6',

            }}
        >
            <Typography sx={{color: '#3a3a5b'}} variant="h4" >Todos</Typography>

            <TasksListAction tasks={tasks} setTasks={setTasks}/>
            <ToDoList tasks={filteredListByStatus} setTasks={setTasks}/>
        </Box>
    );
}
