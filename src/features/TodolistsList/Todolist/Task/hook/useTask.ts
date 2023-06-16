import {ChangeEvent, useCallback} from "react";
import {TaskStatuses} from "../../../../../api/todolists-api";

const useTask = (propsRemoveTask:any, propsTaskId:any,propsTodolistId:any,propsChangeTaskStatus:any,propsChangeTaskTitle:any)=>{
    const onClickHandler = useCallback(() => propsRemoveTask(propsTaskId, propsTodolistId), [propsTaskId, propsTodolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        propsChangeTaskStatus(propsTaskId, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, propsTodolistId)
    }, [propsTaskId, propsTodolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        propsChangeTaskTitle(propsTaskId, newValue, propsTodolistId)
    }, [propsTaskId, propsTodolistId]);

    return{
        onClickHandler,
        onTitleChangeHandler,
        onChangeHandler
    }
}

export default useTask