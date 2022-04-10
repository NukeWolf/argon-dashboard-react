import React, { useState } from 'react';
import moment from 'moment';
const TimeslotSelector = (props) => {
    console.log("tees");
    const { setTimeslots, startdate, interval } = props;

    const [curdate, setCurDate] = useState(moment(startdate));
    const [timeslots, setInternalTimeslots] = useState([]);
    const timeinterval = 24*60/interval;
    const rows = [];
    const addTimeslot = (r,c)=>{
        const newts = [...timeslots];
        const ts = {start:moment(curdate).add(r,'days').add(interval*c,'minutes'),end:moment(curdate).add(r,'days').add(interval*c+9,'minutes')};

        newts.push(ts)
        setInternalTimeslots(ts);
        setTimeslots(newts, ts);
        console.log(newts);
    }
    for(let i =0; i < timeinterval;i++){
        rows.push(i);
    }
    const columns = [];
    for(let i =0;i < 7;i++){
        columns.push(i);
    }
    console.log("tees",rows,columns);
    return <div style={{width:"100%"}}>
        <table  class="table-bordered" style={{width:"100%"}}>
            {rows.map((row)=>{
                
                return <tr style={{width:"100%", margin:0, height:'5px'}}>
                   {columns.map((col)=>{
                        return <td 
                        style={{border:"1px solid #ff6235", height:"5px"}} 
                        onClick={()=>addTimeslot(row,col)}></td>
                    })}
                </tr>
            })}
        </table>
    </div>
};
export default TimeslotSelector;