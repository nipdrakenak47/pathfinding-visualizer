
export function pushHeap(heap,obj){
    let n = heap.length;
    heap.push(obj);

    let i=n,parent;

    while(i>0){
        parent = Math.floor((i-1)/2);
        if(heap[parent].d>heap[i].d){
            let temp = heap[parent];
            heap[parent] = heap[i];
            heap[i] = temp;
            i=parent;
        }
        else{
            break;
        }
    }
}


export function popHeap(heap){
    if(heap.length==1){
        return heap.pop();
    }
    let x = heap[0];
    let last = heap.pop();
    heap[0] = last;
    let n = heap.length,i=0,left,right,min;

    while(i<n){
        min=i;
        left = 2*i+1;
        right = 2*i+2;

        if(left<n && heap[left].d<heap[min].d){
            min=left;
        }
        if(right<n && heap[right].d<heap[min].d){
            min=right;
        }

        if(min!=i){
            let temp = heap[i];
            heap[i] = heap[min];
            heap[min] = temp;
            i=min;
        }
        else{
            break;
        }
    }
    return x;
}