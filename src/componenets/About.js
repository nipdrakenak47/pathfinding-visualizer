import React from 'react'
import './About.css';
import { useNavigate } from 'react-router-dom';

export default function About() {

    const navigate = useNavigate();

  return (
    <div className='about'>
        <div className='title'>
            <h1>Welcome to Pathfinding Visualizer</h1>
        </div>

        <div className='t-100'>
            <p id='title-1'>What is pathfinding algorithm?</p>
            <p>A pathfinding algorithm seeks to find the shortest path between two points.</p>
            <p>This application visualizes Dijkstra's pathfinding algorithms on 2D grid.</p>
            <p><b>Dijkstra's Algorithm is weighted and guarantees the shortest path!</b></p>
        </div>

        <div className='t-200'>
            <p Id='title-2'>How this 2D grid cell represents weights and edges?</p>
            <p>Each of the cell contains <b>4 edges</b>. Up, Right, Down and Left.</p>
            <p>If the cell is weighted then, all 4 edge's weight will be <b>7 units</b> else <b>1 unit</b>.</p>
            <p>You can also <b>change the position</b> of start or finish node by drop and drag in 2d grid anywhere.</p>
        </div>

        <div className='t-300'>
            <p Id='title-3'>How to put walls and weights?</p>
            <p>Wall node is like blocked node, any path can not pass from that cell.</p>
            <p>To put wall or weight in 2d grid, first <b>turn on the radio-button</b> from top left corner.</p>
            <p>Then <b>hold down the left click button of mouse, then keep hovering over the grid</b> where you want to put wall or weight.</p>
            <p>When you done then release the mouse button. Hit the Visualize button !</p>
            <p id = 'final'>Clicking on <b>Clear Path</b> button will clear only the visited nodes, but keeps weighted and wall nodes as it is</p>
            <p>Clicking on <b>Clear Grid</b> button will clear the complete 2d grid.</p>
        </div>

        <div className='btn'>
            <button onClick={()=>navigate('/')}><b>Back to Home Page</b></button>
        </div>
    </div>
  )
}
