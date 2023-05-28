import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled: boolean
    status?: number

}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    console.log('EditableSpan called');
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const opacity = props.status === 2 ? 0.4 : undefined
    const lineThrough = props.status === 2 ? "line-through" : undefined

    return editMode
        ? <TextField disabled={props.disabled} value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} size={"small"}/>
        : <span  style={{padding: "5px", opacity: opacity, textDecoration:lineThrough}} onDoubleClick={activateEditMode}>{props.value}</span>
});
