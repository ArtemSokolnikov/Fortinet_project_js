import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import style from '../css_modules/home.module.css';
import { HomeContainer } from "../styles/HomeStyles";
import Task from './Task';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [tasksToDo, setTasksToDo] = useState([]);
    const [tasksOnGoing, setTasksOnGoing] = useState([]);
    const [tasksDone, setTasksDone] = useState([]);
    const [currentTask, setcurrentTask] = useState('');
    let currentIndex = localStorage.getItem('index');
    let currentIndexToDo = localStorage.getItem('indexToDo');
    let currentIndexOnGoing = localStorage.getItem('indexOnGoing');
    let currentIndexDone = localStorage.getItem('indexDone');

    const handleCreateTask = (e) => {
        setcurrentTask(e.target.value);
    }

    const removeTask = (index, location) => {
        if (location === 'backLog') {
            setTasks(prev => prev.filter((t, i) => i !== index));
            if (tasks.length > 0) {
                localStorage.setItem('index', +`${currentIndex}` - 1);
            }
        } else if (location === 'toDo') {
            setTasksToDo(prev => prev.filter((t, i) => i !== index));
            if (tasksToDo.length > 0) {
                localStorage.setItem('indexToDo', +`${currentIndexToDo}` - 1);
            }
        } else if (location === 'onGoing') {
            setTasksOnGoing(prev => prev.filter((t, i) => i !== index));
            if (tasksOnGoing.length > 0) {
                localStorage.setItem('indexOnGoing', +`${currentIndexOnGoing}` - 1);
            }
        } else if (location === 'done') {
            setTasksDone(prev => prev.filter((t, i) => i !== index));
            if (tasksDone.length > 0) {
                localStorage.setItem('indexDone', +`${currentIndexDone}` - 1);
            }
        }
    }

    const handlieClickAddTask = () => {
        if (currentTask) {
            setTasks(prev => {
                const tasks = [...prev].filter(Boolean);
                tasks[currentIndex] = currentTask;
                localStorage.setItem('index', +`${currentIndex}` + 1);
                return tasks;
            })
        } else {
            alert('Please, describe the task')
        }
        setTimeout(setcurrentTask(''), 300);
    }

    const handlieClickForward = (index, location) => {
        if (location === 'backLog') {
            setTasks(prev => prev.filter((t, i) => i !== index));
            setTasksToDo(prev => {
                const tasksToDo = [...prev].filter(Boolean);
                tasksToDo[currentIndexToDo] = tasks[index];
                localStorage.setItem('indexToDo', +`${currentIndexToDo}` + 1);
                localStorage.setItem('index', +`${currentIndex}` - 1);
                return tasksToDo;
            })
        } else if (location === 'toDo') {
            setTasksToDo(prev => prev.filter((t, i) => i !== index));
            setTasksOnGoing(prev => {
                const tasksOnGoing = [...prev].filter(Boolean);
                tasksOnGoing[currentIndexOnGoing] = tasksToDo[index];
                localStorage.setItem('indexOnGoing', +`${currentIndexOnGoing}` + 1);
                localStorage.setItem('indexToDo', +`${currentIndexToDo}` - 1);
                return tasksOnGoing;
            })
        } else if (location === 'onGoing') {
            setTasksOnGoing(prev => prev.filter((t, i) => i !== index));
            setTasksDone(prev => {
                const tasksDone = [...prev].filter(Boolean);
                tasksDone[currentIndexDone] = tasksOnGoing[index];
                localStorage.setItem('indexDone', +`${currentIndexDone}` + 1);
                localStorage.setItem('indexOnGoing', +`${currentIndexOnGoing}` - 1);
                return tasksDone;
            })
        }
    }

    const handlieClickBack = (index, location) => {
        if (location === 'toDo') {
            setTasksToDo(prev => prev.filter((t, i) => i !== index));
            setTasks(prev => {
                const tasks = [...prev].filter(Boolean);
                tasks[currentIndex] = tasksToDo[index];
                localStorage.setItem('index', +`${currentIndex}` + 1);
                localStorage.setItem('indexToDo', +`${currentIndexToDo}` - 1);
                return tasks;
            })
        } else if (location === 'onGoing') {
            setTasksOnGoing(prev => prev.filter((t, i) => i !== index));
            setTasksToDo(prev => {
                const tasksToDo = [...prev].filter(Boolean);
                tasksToDo[currentIndexToDo] = tasksOnGoing[index];
                localStorage.setItem('indexToDo', +`${currentIndexToDo}` + 1);
                localStorage.setItem('indexOnGoing', +`${currentIndexOnGoing}` - 1);
                return tasksToDo;
            })
        } else if (location === 'done') {
            setTasksDone(prev => prev.filter((t, i) => i !== index));
            setTasksOnGoing(prev => {
                const tasksOnGoing = [...prev].filter(Boolean);
                tasksOnGoing[currentIndexOnGoing] = tasksDone[index];
                localStorage.setItem('indexOnGoing', +`${currentIndexOnGoing}` + 1);
                localStorage.setItem('indexDone', +`${currentIndexDone}` - 1);
                return tasksOnGoing;
            })
        }
    }

    return (
        <HomeContainer>
            <div className={style.header}>
                <TextField onChange={handleCreateTask} id="outlined-basic" label="New task name" variant="outlined" value={currentTask || ''} />
                <div className={style.mainBtn} ><Button onClick={handlieClickAddTask} variant="contained">Create task</Button></div>
            </div>
            <div className="row">
                <div className="col">
                    <div className={style.mainItem} >
                        <h3 className={style.headerTitle}> Backlog</h3>
                        {tasks.map((item, index) => (
                            <Task
                                location={'backLog'}
                                key={index + 1}
                                index={index}
                                content={item}
                                deleteTask={removeTask}
                                setTasks={setTasks}
                                currentTask={currentTask}
                                handlieClickForwardTask={handlieClickForward}
                            />
                        ))}
                    </div>

                </div>
                <div className="col">
                    <div className={style.mainItem} >
                        <h3 className={style.headerTitle}> To Do</h3>
                        {tasksToDo.map((item, index) => (
                            <Task
                                key={index + 1}
                                location={'toDo'}
                                index={index}
                                content={item}
                                deleteTask={removeTask}
                                setTasks={setTasks}
                                currentTask={currentTask}
                                handlieClickForwardTask={handlieClickForward}
                                handlieClickBackTask={handlieClickBack}
                            />
                        ))}
                    </div>
                </div>
                <div className="col">
                    <div className={style.mainItem} >
                        <h3 className={style.headerTitle}> Ongoing</h3>
                        {tasksOnGoing.map((item, index) => (
                            <Task
                                key={index + 1}
                                location={'onGoing'}
                                index={index}
                                content={item}
                                deleteTask={removeTask}
                                setTasks={setTasks}
                                currentTask={currentTask}
                                handlieClickForwardTask={handlieClickForward}
                                handlieClickBackTask={handlieClickBack}
                            />
                        ))}
                    </div>
                </div>
                <div className="col">
                    <div className={style.mainItem} >
                        <h3 className={style.headerTitle}> Done</h3>
                        {tasksDone.map((item, index) => (
                            <Task
                                key={index + 1}
                                location={'done'}
                                index={index}
                                content={item}
                                deleteTask={removeTask}
                                setTasks={setTasks}
                                currentTask={currentTask}
                                handlieClickForwardTask={handlieClickForward}
                                handlieClickBackTask={handlieClickBack}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </HomeContainer>
    )
}

export default Home