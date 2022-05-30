import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import style from '../css_modules/task.module.css';

const Task = ({ location, index, content, deleteTask, handlieClickForwardTask, handlieClickBackTask }) => {
    const [btnFwd, setBtnFwd] = useState(false);
    const [btnBack, setBtnBack] = useState(true);

    const handlieClickRemove = () => {
        deleteTask(index, location);
    }
    const handlieClickForward = () => {
        handlieClickForwardTask(index, location);
    }
    const handlieClickBack = () => {
        handlieClickBackTask(index, location);
    }

    useEffect(() => {
        if (location === 'done') {
            setBtnFwd(true);
            setBtnBack(false);
        } else if (location === 'backLog') {
            setBtnFwd(false);
            setBtnBack(true);
        } else {
            setBtnFwd(false);
            setBtnBack(false);
        }
    }, [])

    return (
        <div className="animate__animated animate__fadeIn">
            <div className= {style.box}>
                <h4>{content}</h4>
                <div className= {style.btnRemoveEdit}>
                    <button className= {style.btnItems} onClick={handlieClickBack} disabled={btnBack}><ArrowBackIcon sx={{ fontSize: 22 }} /></button>
                    <button className= {style.btnItems} onClick={handlieClickForward} disabled={btnFwd}><ArrowForwardIcon sx={{ fontSize: 22 }} /></button>
                    <button className= {style.btnItems} onClick={handlieClickRemove}><DeleteIcon sx={{ fontSize: 22 }} /></button>
                </div>
            </div>
        </div>
    );
}

export default Task