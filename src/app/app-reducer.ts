import {Dispatch} from "redux";
import { setEntityStatusAC} from "../features/TodolistsList/todolists-reducer";
import {authAPI, AuthRequestType, TaskType, todolistsAPI} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {addTaskAC, ErrorsType, ResultCode} from "../features/TodolistsList/tasks-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    addTodoListStatus: "idle" as RequestStatusType
}

// export type ErrorType = {
//     error: null | string
// }
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        case 'SET-ADD-TODOLIST-STATUS':
            return {...state, addTodoListStatus: action.status}
        default:
            return state
    }
}

export const setRequestStatusAC = (status:RequestStatusType) => {
    return {
        type:'APP/SET-STATUS',
        status
    } as const
}
export const setErrorAC = (error: null|string) => {
    return {
        type:'APP/SET-ERROR',
        error
    } as const
}

export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type:'APP/SET-IS-INITIALIZED',
        isInitialized
    } as const
}

export const setAddTodoListStatusAC = (status: RequestStatusType) => ({
    type: 'SET-ADD-TODOLIST-STATUS',
    status
} as const)

// export const loginTC = (data:AuthRequestType) => (dispatch: Dispatch<ActionsType>) => {
//     // dispatch(setRequestStatusAC("loading"))
//     // dispatch(setEntityStatusAC(todolistId, "loading"))
//     authAPI.login(data)
//         .then(res => {
//             if(res.data.resultCode === ResultCode.OK){
//                 const task = res.data.data.item
//                 const action = addTaskAC(task)
//                 dispatch(action)
//                 dispatch(setRequestStatusAC("idle"))
//                 dispatch(setEntityStatusAC(todolistId, "succeeded"))
//             } else {
//                 handleServerAppError<{ item: TaskType }>(res.data, dispatch)
//                 dispatch(setEntityStatusAC(todolistId, "failed"))
//             }
//         })
//         .catch((e: AxiosError<ErrorsType>)=>{
//             const errorMessage = e.response ? e.response.data.message : e.message
//             handleServerNetworkError(errorMessage, dispatch)
//             dispatch(setEntityStatusAC(todolistId, "failed"))
//         })
// }
export type setIsInitializedACType = ReturnType<typeof setIsInitializedAC>
export type setRequestStatusType = ReturnType<typeof setRequestStatusAC>
export type setErrorType = ReturnType<typeof setErrorAC>
export type SetAddTodolistStatusType = ReturnType<typeof setAddTodoListStatusAC>;


type ActionsType = setRequestStatusType | setErrorType | setIsInitializedACType | SetAddTodolistStatusType
