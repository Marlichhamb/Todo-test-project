import {Box, Typography} from "@mui/material";
import {type FC, useEffect, useMemo, useState} from "react";
import {TasksListAction} from "./TasksListAction/TasksListAction.tsx";
import {ToDoList} from "./ToDoList/ToDoList.tsx";
import {type TStatus, type TTodo} from "../../types/todo.ts";
import axios from "axios";
import {apiToDoUrl} from "../../data/api_endpoint.ts";

export const TasksList: FC = () =>  {
    const [tasks, setTasks] = useState<TTodo[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<TStatus>('all')


    useEffect(()=> {
        axios
            .get(apiToDoUrl)
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
                height: '100%',
                display: "flex",
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: "center",
                bgcolor: '#c5ddf6',

            }}
        >
            <Typography sx={{color: '#198bdc'}} variant="h4" >Task Manager</Typography>

            <TasksListAction tasks={tasks} setTasks={setTasks} setSelectedStatus={setSelectedStatus}/>
            <ToDoList tasks={filteredListByStatus} setTasks={setTasks} selectedStatus={selectedStatus}/>
        </Box>
    );
}
