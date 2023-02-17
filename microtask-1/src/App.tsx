import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";

export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksTypeState = {
    [key: string]: TaskType[]
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<todolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])


    let [tasks, setTasks] = useState<TasksTypeState>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(todoId: string, taskId: string) {
        setTasks({
            ...tasks,
            [todoId]: tasks[todoId].filter(f => f.id !== taskId)
        })
    }

    function addTask(todoId: string, title: string) {
        setTasks({
            ...tasks,
            [todoId]: [
                {id: v1(), title, isDone: false}
                , ...tasks[todoId]
            ]
        })
    }

    function changeStatus(todoId: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todoId]: tasks[todoId].map(t => t.id === taskId ? {...t, isDone} : t)
        })
    }


    function changeFilter(todoId: string, filterValue: FilterValuesType) {
        setTodolists(todolists.map(t => t.id === todoId ? {...t, filter: filterValue} : t));
    }

    let tasksForTodolist: TaskType[];

    return (
        <div className="App">
            {
                todolists.map(t => {

                    if (t.filter === "active") {
                        tasksForTodolist = tasks[t.id].filter(f => !f.isDone)
                    }
                    if (t.filter === "completed") {
                        tasksForTodolist = tasks[t.id].filter(f => f.isDone)
                    }
                    if (t.filter === "all") {
                        tasksForTodolist = tasks[t.id]
                    }
                    return (
                        <Todolist
                            todoId={t.id}
                            title={t.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={t.filter}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
