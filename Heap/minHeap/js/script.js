class minHeap{
    #heap=[];

   getHeap(){
    return [...this.#heap]
   } 
   #left(index){
    return 2*index + 1;
   }
   #rigth(index){
    return 2*index + 2;
   }
   #parent(index){
    return Math.floor((index - 1)/2);
   }
   #swap(index1 , index2){
    [this.#heap[index1] , this.#heap[index2]]=[this.#heap[index2] , this.#heap[index1]];
   }
   peak(){
    return this.#heap[0];
   }
   size(){
    return this.#heap.length;
   }

   insert(value){
    this.#heap.push(value);
    let current = this.#heap.length - 1;
    while(current > 0 && this.#heap[current].weight < this.#heap[this.#parent(current)].weight){
       this.#swap(current , this.#parent(current)) ;
       current = this.#parent(current);
    }
   }
    remove(){
     if(this.#heap.length === 0){
        return null;
     }  
     if(this.#heap.length === 1){
        return this.#heap.pop();
     } 
     let currentNode=this.#heap[0];
     this.#heap[0] =this.#heap.pop();
      this.#sinkDown(0)
      return currentNode;
    }

    #sinkDown(index){
   let currentIdex = index;
   let size = this.#heap.length;
   while(true){
    let leftIndex = this.#left(index);
    let rigthIndex = this.#rigth(index);

    if(leftIndex < size && this.#heap[leftIndex].weight < this.#heap[currentIdex].weight){
        currentIdex = leftIndex;
    }
    if(rigthIndex < size && this.#heap[rigthIndex].weight < this.#heap[currentIdex].weight){
        currentIdex = rigthIndex;
    }
    if(currentIdex != index){
        this.#swap(currentIdex , index);
        index = currentIdex;
    }else{
        return;
    }
   }
    }
}
