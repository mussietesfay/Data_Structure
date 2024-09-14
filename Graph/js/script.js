class listGraph{
    constructor(n, directed=false){
        this.n=n;
        this.directed=directed;
        this.adj=[];
        for(let i=0; i<n; i++){
            this.adj.push([])
        }
    }
    addEdge(u , v , w){
       this.adj[u].push({node:v , weigth:w});
       if(!this.directed){
        this.adj[v].push({node:u , weigth:w});
       } 
    }
}

const list =new listGraph(4);
list.addEdge(0 , 1 , 10);
list.addEdge(1 ,2 ,100);
list.addEdge(2 , 3 , 500);
list.addEdge(3 , 1 ,30);
console.log(list)
console.log(list.adj)