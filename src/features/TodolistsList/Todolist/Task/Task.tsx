import React, { ChangeEvent, useCallback } from 'react'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { TaskStatuses } from '../../../../api/todolists-api'

import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskTypeWithEntityTaskStatusType} from "../../tasks-reducer";
import {RequestStatusType} from "../../../../app/app-reducer";

type TaskPropsType = {
    task: TaskTypeWithEntityTaskStatusType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    entityTaskStatus: RequestStatusType
    entityStatus: RequestStatusType
    status?: number

}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>

        <IconButton disabled=
                        {props.task.entityTaskStatus==="loading" || props.entityStatus === "loading"}
                    onClick={onClickHandler} color={"error"}>

            <Delete/>
        </IconButton>

        <Checkbox
            disabled={props.task.entityTaskStatus==="loading"}
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan disabled=
                          {props.task.entityTaskStatus==="loading" || props.entityStatus === "loading"}
                      status={props.status}
                      value={props.task.title}
                      onChange={onTitleChangeHandler}/>

    </div>
})
