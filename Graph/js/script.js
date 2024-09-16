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
       this.adj[u].push({node:v , weight:w});
       if(!this.directed){
        this.adj[v].push({node:u , weight:w});
       } 
    }
    dijkstra(start){
        let n = this.adj.length;
        let distance = Array(n).fill(Infinity);
        let visited = Array(n).fill(false);
        let priorityQueue = new MinHeap()
    
        distance[start] = 0;
        priorityQueue.insert({node:start , weight:0}) 
    
     while(priorityQueue.size() > 0){
        const { node } = priorityQueue.remove();
        if(visited[node]) continue;
        visited[node] = true;
    
        for(const neighbor of this.adj[node]){
            const newDistance = distance[node] + neighbor.weight;
    
            if(newDistance < distance[neighbor.node]){
                distance[neighbor.node] = newDistance;
                priorityQueue.insert({node:neighbor.node , weight:newDistance})
            }
        }
     }
        return distance;
        }
}
class MinHeap {
    #heap = [];

    getHeap() {
        return [...this.#heap];
    }

    #leftIndex(index) {
        return 2 * index + 1;
    }

    #rightIndex(index) {
        return 2 * index + 2;
    }

    #parent(index) {
        return Math.floor((index - 1) / 2);
    }

    #swap(index1, index2) {
        [this.#heap[index1], this.#heap[index2]] = [this.#heap[index2], this.#heap[index1]];
    }

    front() {
        return this.#heap[0];
    }

    size() {
        return this.#heap.length;
    }

    insert(value) {
        this.#heap.push(value);
        let current = this.#heap.length - 1;

        while (current > 0 && this.#heap[current].weight < this.#heap[this.#parent(current)].weight) {
            this.#swap(current, this.#parent(current));
            current = this.#parent(current);
        }
    }

    remove() {
        if (this.#heap.length === 0) {
            return null;
        }
        if (this.#heap.length === 1) {
            return this.#heap.pop();
        }
        let currentNode = this.#heap[0];
        this.#heap[0] = this.#heap.pop();
        this.#sink(0);
        return currentNode;
    }

    #sink(index) {
        let currentIndex = index;

        while (true) {
            let leftIndex = this.#leftIndex(currentIndex);
            let rightIndex = this.#rightIndex(currentIndex);
            let smallestIndex = currentIndex;

            if (leftIndex < this.size() && this.#heap[leftIndex].weight < this.#heap[smallestIndex].weight) {
                smallestIndex = leftIndex;
            }
            if (rightIndex < this.size() && this.#heap[rightIndex].weight < this.#heap[smallestIndex].weight) {
                smallestIndex = rightIndex;
            }
            if (smallestIndex !== currentIndex) {
                this.#swap(currentIndex, smallestIndex);
                currentIndex = smallestIndex;
            } else {
                return;
            }
        }
    }
}

const graph = new listGraph(5); // Create a graph with 5 nodes

// Add edges: graph.addEdges(node1, node2, weight)
graph.addEdge(0, 1, 10);
graph.addEdge(0, 2, 5);
graph.addEdge(1, 2, 2);
graph.addEdge(1, 3, 1);
graph.addEdge(2, 1, 3);
graph.addEdge(2, 3, 9);
graph.addEdge(2, 4, 2);
graph.addEdge(3, 4, 4);
graph.addEdge(4, 3, 6);
console.log(graph.adj);
//Run Dijkstra's algorithm from node;
let node = 0; 
const distances = graph.dijkstra(node);

console.log(`Shortest distances from node ${node} `);
for (let i = 0; i < distances.length; i++) {
    console.log(`Distance to node ${i}: ${distances[i]}`);
}