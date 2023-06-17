import {pushHeap,popHeap} from './PriorityQueue.js'

const infinity = 100000;


function intialize(predecessor,visited,row,col){
    for(let i=0;i<row;i++){
        let temp = [],temp1=[]
        for(let j=0;j<col;j++){
            temp.push(false);
            temp1.push({pr:-1,pc:-1})
        }
        predecessor.push(temp1);
        visited.push(temp);
    }
}

export default function dijkstrsShortestPath(gridState,row,col,start,end){
    let heap = [],predecessor = [],visited = [],orderedVisitedNode = [],pathvalue;
    intialize(predecessor,visited,row,col);

     
    pushHeap(heap,{
        r : start[0],
        c : start[1],
        d : 0,
        p : {pr:-1,pc:-1}
    })

    while(heap.length>0){
        let top = popHeap(heap);
        let r=top.r,c=top.c,d=top.d;
    
        if(visited[r][c]){
            continue;
        }

        visited[r][c]=true;
        orderedVisitedNode.push(top);
        predecessor[r][c].pr = top.p.pr;
        predecessor[r][c].pc = top.p.pc;
        pathvalue=d;

        if(r==end[0] && c==end[1]){
            break;
        }
    
        if(r-1>=0 && !visited[r-1][c] && !gridState[r-1][c].iswall){
            pushHeap(heap,{
                r : r-1,
                c : c,
                d : d+decideWeight(gridState,r,c,r-1,c),
                p : {pr:top.r,pc:top.c}
            })
        }
        if(c+1<col && !visited[r][c+1] && !gridState[r][c+1].iswall){
            pushHeap(heap,{
                r : r,
                c : c+1,
                d : d+decideWeight(gridState,r,c,r,c+1),
                p : {pr:top.r,pc:top.c}
            })
        }
        if(r+1<row && !visited[r+1][c] && !gridState[r+1][c].iswall){
            pushHeap(heap,{
                r : r+1,
                c : c,
                d : d+decideWeight(gridState,r,c,r+1,c),
                p : {pr:top.r,pc:top.c}
            })
        }
        if(c-1>=0 && !visited[r][c-1] && !gridState[r][c-1].iswall){
            pushHeap(heap,{
                r : r,
                c : c-1,
                d : d+decideWeight(gridState,r,c,r,c-1),
                p : {pr:top.r,pc:top.c}
            })
        }
    }

    let path = generatePath(predecessor,end);
    return {orderedVisitedNode : orderedVisitedNode,path : path,pathvalue : pathvalue};
}

function generatePath(predecessor,end){
    if(predecessor[end[0]][end[1]].pr==-1){
        return [];
    }
   
    let current_parent = predecessor[end[0]][end[1]];
    let path = [];
    path.push({r:end[0],c:end[1]});

    while(current_parent.pr!=-1){
        path.push({r : current_parent.pr,c : current_parent.pc});
        current_parent = predecessor[current_parent.pr][current_parent.pc];
    }

    path.reverse();
    return path;
}

function decideWeight(gridState,r1,c1,r2,c2){
    let w=1;
    if(gridState[r1][c1].weight>1){
        w=gridState[r1][c1].weight
    }
    else if(gridState[r2][c2].weight>1){
        w=gridState[r2][c2].weight
    }
    return w;
}






