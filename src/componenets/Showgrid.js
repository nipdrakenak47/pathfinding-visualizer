import React,{useState} from 'react'
import Gridcell from './Gridcell';
import './Showgrid.css'
import dijkstrsShortestPath from '../Algorithms/Dijkstrs.js';
import { useNavigate } from 'react-router-dom';

let eventvar = false,start_flag=false,end_flag=false,animation_on=false;
let start = [3,4], end=[5,23],pathvalue;

export default function Showgrid() {

    const navigate = useNavigate();
    
    const row=20,col=40;
    let grid = [];

    for(let i=0;i<row;i++){
        let row = [];
        for(let j=0;j<col;j++){
            row.push({
                key : i*100+j,
                r : i,
                c : j,
                start : start,
                end : end,
                isvisited : false,
                iswall : false,
                ispartofpath : false,
                weight : 1
            });
        }
        grid.push(row);
    }

    const [gridState,setgridState] = useState(grid);

    function runDijkstra(){
        if(animation_on){
            return ;
        }
        let obj,orderedVisitedNode,path;
        obj = dijkstrsShortestPath(gridState,row,col,start,end);
        orderedVisitedNode = obj.orderedVisitedNode;
        path = obj.path;
        pathvalue = obj.pathvalue;
        animateDijstras(orderedVisitedNode,path)
    }
    
    function animateDijstras(orderedVisitedNode,path){
        let n = orderedVisitedNode.length,element;
        let dummy_grid;
        animation_on = true;
        
        for(let i=0;i<n;i++){
            setTimeout(()=>{
            element = orderedVisitedNode[i];
            dummy_grid = gridState.slice();
            dummy_grid[element.r][element.c].isvisited = true;
            setgridState(dummy_grid)
            if(i==n-1){
                animatePath(path)
            }},20*i);
        }

    }

    function animatePath(path){
        let element,dummy_grid;
        for(let i=0;i<path.length;i++){
            setTimeout(()=>{
            element = path[i];
            dummy_grid = gridState.slice();
            dummy_grid[path[i].r][path[i].c].ispartofpath = true;
            dummy_grid[path[i].r][path[i].c].isvisited = false;
            setgridState(dummy_grid)
            if(i==path.length-1){
                document.getElementById('pathvalue').innerHTML=`<div id='inner-path-value'>Shortest path distance = ${pathvalue}</div>`;
                animation_on = false;
            }},100*i);
        }
    }


    function onMouseDown(r,c){
        if(animation_on){
            return ;
        }
        if(r==start[0] && c==start[1]){
            let dummy_grid = gridState.slice();
            start[0] = -1;
            start[1] = -1;
            for(let i=0;i<row;i++){
                for(let j=0;j<col;j++){
                    dummy_grid[i][j].start = start;
                }
            }
            setgridState(dummy_grid);
            start_flag=true;
            return ;
        }
        else if(r==end[0] && c==end[1]){
            let dummy_grid = gridState.slice();
            end[0] = -1;
            end[1] = -1;
            for(let i=0;i<row;i++){
                for(let j=0;j<col;j++){
                    dummy_grid[i][j].end = end;
                }
            }
            setgridState(dummy_grid);
            end_flag=true;
            return ;
        }
        //console.log('here eventvar becomes TRUE...',start_flag);
        eventvar = true;
        if((r==start[0] && c==start[1]) ||
            (r==end[0] && c==end[1])){
                return ;
            }
        if(document.getElementById('radio-1').checked){
            wallHandlerHelper(r,c);
        }
        else if(document.getElementById('radio-2').checked){
            weightHandlerHelper(r,c);
        }
    }

    function onMouseEnter(r,c){
        if(animation_on){
            return ;
        }
        //console.log("event variable...",eventvar,'start variable',start_flag);
        if(!eventvar || (r==start[0] && c==start[1]) ||
        (r==end[0] && c==end[1]) || start_flag==true || end_flag==true){
            return;
        }
        if(document.getElementById('radio-1').checked){
            wallHandlerHelper(r,c);
        }
        else if(document.getElementById('radio-2').checked){
            weightHandlerHelper(r,c);
        }
    }

    function onMouseUp(r,c){
        if(animation_on){
            return ;
        }
        if(start_flag){
            let dummy_grid = gridState.slice();
            start[0] = r;
            start[1] = c;
            for(let i=0;i<row;i++){
                for(let j=0;j<col;j++){
                    dummy_grid[i][j].start = start;
                }
            }
            dummy_grid[r][c].iswall=false;
            dummy_grid[r][c].weight=1;
            setgridState(dummy_grid);
            start_flag = false;
            return ;
        }
        else if(end_flag){
            let dummy_grid = gridState.slice();
            end[0] = r;
            end[1] = c;
            for(let i=0;i<row;i++){
                for(let j=0;j<col;j++){
                    dummy_grid[i][j].end = end;
                }
            }
            dummy_grid[r][c].iswall=false;
            dummy_grid[r][c].weight=1;
            setgridState(dummy_grid);
            end_flag=false;
            return ;
        }
        eventvar=false;
    }
    
    function wallHandlerHelper(r,c){
        let dummy_grid = gridState.slice();
        dummy_grid[r][c].iswall = !dummy_grid[r][c].iswall;
        setgridState(dummy_grid);
    }

    function weightHandlerHelper(r,c){
        let dummy_grid = gridState.slice();
        if(dummy_grid[r][c].iswall){
            return ;
        }
        if(dummy_grid[r][c].weight==1){
            dummy_grid[r][c].weight = 7;
        }
        else{
            dummy_grid[r][c].weight = 1;
        }
        setgridState(dummy_grid);
    }

    function clearGrid(){
        if(animation_on){
            return ;
        }
        setgridState(grid);
        document.getElementById('pathvalue').innerHTML='';
    }

    function clearPath(){
        if(animation_on){
            return ;
        }
        let dummy_grid = gridState.slice();
        for(let i=0;i<row;i++){
            for(let j=0;j<col;j++){
                dummy_grid[i][j].isvisited = false;
                dummy_grid[i][j].ispartofpath = false;
            }
        }
        setgridState(dummy_grid);
        document.getElementById('pathvalue').innerHTML='';
    }

    function goToAboutPage(){
        if(animation_on){
            return ;
        }
        navigate('/about')
    }

  return (
    <>
    <div className='header'>
        
        <input type="radio" className='radio' id='radio-1' name='select-algo'/>
        <label htmlFor="radio-1"><b>Put Wall !</b></label>
        <input type="radio" className='radio' id='radio-2' name='select-algo'/>
        <label htmlFor="radio-2"><b>Put Weight !</b></label>

        <button className='btn-1' onClick={()=>runDijkstra()}><b>Visualize Dijkstra's !</b></button>
        <button className='btn-2'onClick={()=>clearGrid()}><b>Clear Grid</b></button>
        <button className='btn-3' onClick={()=>clearPath()}><b>Clear Path</b></button>
        <button className='btn-4' onClick={()=>goToAboutPage()}><b>How to use it?</b></button>
    </div>

    <div className='startpoint'></div>
    <div className='start-text'>Start Node</div>

    <div className='endpoint'></div>
    <div className='end-text'>Finish Node</div>

    <div className='weightpoint'></div>
    <div className='weight-text'>Weighted Node</div>

    <div className='wallpoint'></div>
    <div className='wall-text'>Wall Node</div>

    <div className='visitedpoint'></div>
    <div className='visited-text'>Visited Node</div>

    <div className='pathpoint'></div>
    <div className='path-text'>Shortest Path Node</div>

    <div id='pathvalue'></div>

    <div className='container'> 
      {
        gridState.map((row)=>{
            return row.map((cell)=>{
                return <Gridcell key={cell.key} cell={cell}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseEnter={onMouseEnter}/>
            })

        })
      }
    </div>
    </>
  )
}
