import {Box, Typography} from "@mui/material";
import {type FC, useEffect, useMemo, useState} from "react";
import {TasksListAction} from "./TasksListAction/TasksListAction.tsx";
import {ToDoList} from "./ToDoList/ToDoList.tsx";
import { type TTodo} from "../../types/todo.ts";
import axios from "axios";
import {getAllTasks} from "../../data/api_endpoint.ts";

export type TStatus = 'all' | 'todo' | 'in_progress' | 'done';

export const TasksList: FC = () =>  {
    const [tasks, setTasks] = useState<TTodo[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<TStatus>('all')

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
        if (selectedStatus !== 'all') {
            return tasks.filter(task => task.status === selectedStatus);
        }

        return tasks
    },[tasks, selectedStatus])

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

            <TasksListAction tasks={tasks} setTasks={setTasks} setSelectedStatus={setSelectedStatus}/>
            <ToDoList tasks={filteredListByStatus} setTasks={setTasks}/>
        </Box>
    );
}
