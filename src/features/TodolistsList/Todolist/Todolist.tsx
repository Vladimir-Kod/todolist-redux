import React from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Task} from './Task/Task'
import {TaskStatuses} from '../../../api/todolists-api'
import {FilterValuesType} from '../todolists-reducer'
import {TaskTypeWithEntityTaskStatusType} from '../tasks-reducer'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Delete} from '@mui/icons-material';
import {RequestStatusType} from "../../../app/app-reducer";
import useTodolist from "./hook/useTodolist";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskTypeWithEntityTaskStatusType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const Todolist = React.memo(function (props: PropsType) {
    console.log('Todolist called')
    const {
        addTask,
        removeTodolist,
        changeTodolistTitle,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        tasksForTodolist
    } = useTodolist(props.addTask,
        props.id,
        props.removeTodolist,
        props.changeTodolistTitle,
        props.changeFilter,
        props.tasks,
        props.filter)

    // const addTask = useCallback((title: string) => {
    //     props.addTask(title, props.id)
    // }, [props.addTask, props.id])
    //
    // const removeTodolist = () => {
    //     props.removeTodolist(props.id)
    // }
    // const changeTodolistTitle = useCallback((title: string) => {
    //     props.changeTodolistTitle(props.id, title)
    // }, [props.id, props.changeTodolistTitle])
    //
    // const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.id, props.changeFilter])
    // const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.id, props.changeFilter])
    // const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.id, props.changeFilter])
    //
    //
    // let tasksForTodolist = props.tasks
    //
    // if (props.filter === 'active') {
    //     tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    // }
    // if (props.filter === 'completed') {
    //     tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    // }

    return <div>
        <div style={{
            display: "flex",
            height: "30px",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "20px",
            margin: "15px 0"
        }}>

            <IconButton disabled={props.entityStatus === "loading"} onClick={removeTodolist} color={"error"}>
                <Delete/>
            </IconButton>
            <EditableSpan disabled={props.entityStatus === "loading"} value={props.title}
                          onChange={changeTodolistTitle}/>
        </div>


        <AddItemForm disabled={props.entityStatus === "loading"} addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.id}
                                                status={t.status}
                                                entityStatus={props.entityStatus}
                                                entityTaskStatus={t.entityTaskStatus}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}
                />)
            }
        </div>
        <div style={{paddingTop: '10px', display: "flex", justifyContent: "center"}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


