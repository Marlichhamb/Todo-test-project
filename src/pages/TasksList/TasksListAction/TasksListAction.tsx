import {type FC, useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export const TasksListAction: FC = () => {
    const [CreateOpen, setCreateOpen] = useState(false)
    const [CompletedOpen, setCompletedOpen] = useState(false)

    const handleOpenCreate = () => {

        setCreateOpen(true)
    };

    const handleCloseCreate = () => {
        setCreateOpen(false)
    };

    const handleOpenCompleted = () => {
        setCompletedOpen(true)
    };

    const handleCloseCompleted = () => {
        setCompletedOpen(false)
    };

    return (

      <Box sx={{ mb: 2, mt: 2, width:'250px', display: 'flex', justifyContent: 'space-between'}}>
          <Tooltip title="Create a new Note"  placement="top">
              <IconButton sx={{ bgcolor: '#C5DDF6'}} onClick={handleOpenCreate} >
                <AddCircleIcon sx = {{fontSize: '35px'}} />
              </IconButton>
          </Tooltip>
          <Tooltip title="Completed Notes"  placement="top">
              <IconButton sx={{ml: 3, bgcolor: '#C5DDF6'}} onClick={handleOpenCompleted}>
                <EventAvailableIcon sx = {{fontSize: '35px'}}/>
              </IconButton>
          </Tooltip>

          <Dialog open={CreateOpen} onClose={handleCloseCreate}>
                  <DialogTitle>Create a new Note</DialogTitle>
                  <DialogContent>
                      <TextField placeholder="Input your Note..."/>
                  </DialogContent>
              <DialogActions>
                  <Button onClick={handleCloseCreate}>CANCEL</Button>
                  <Button>Add</Button>
              </DialogActions>
          </Dialog><Dialog open={CompletedOpen} onClose={handleCloseCompleted}>
              <DialogActions>
                  <Button onClick={handleCloseCompleted}>CANCEL</Button>
              </DialogActions>
          </Dialog>
      </Box>
  )
}