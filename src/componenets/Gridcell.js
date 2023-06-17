import React from 'react'
import './Gridcell.css';


export default function Gridcell(props) {
    let start = props.cell.start,end=props.cell.end;
    let extraclass = 'cell';
    let retainclass = 'cell'

    if(start[0]==props.cell.r && start[1]==props.cell.c){
        extraclass = 'start-cell';
    }
    else if(end[0]==props.cell.r && end[1]==props.cell.c){
        extraclass = 'end-cell';
    }
    else if(props.cell.isvisited){
        extraclass = 'visited'
        if(props.cell.weight>1){
            retainclass = 'weight-1';
        }
    }
    else if(props.cell.iswall){
        extraclass = 'wall'
    }
    else if(props.cell.ispartofpath){
        extraclass = 'partofpath'
        if(props.cell.weight>1){
            retainclass = 'weight-2';
        }
    }
    else if(props.cell.weight>1){
        extraclass = 'weight';
    }


  return (
    <div className={`cell ${extraclass} ${retainclass}`}
        onMouseDown={()=>props.onMouseDown(props.cell.r,props.cell.c)}
        onMouseUp={()=>props.onMouseUp(props.cell.r,props.cell.c)}
        onMouseEnter={()=>props.onMouseEnter(props.cell.r,props.cell.c)}>
       
    </div>
  )
}

