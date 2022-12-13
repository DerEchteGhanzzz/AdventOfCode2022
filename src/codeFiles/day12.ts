import {cursorTo} from "readline";

export function solveA(lines: string) {
    let heightMap: HeightNode[][] = parseLines(lines);
    let [start, end] = getStartAndEnd(heightMap);
    return aStar(start, end, heightMap, false)
    //return dijkstra(start, end, heightMap, false);
}

export function solveB(lines: string) {
    let heightMap: HeightNode[][] = parseLines(lines);

    let [start, end] = getStartAndEnd(heightMap);
    start.letter = "a";
    return dijkstra(end, start, heightMap, true);
}

function parseLines(inputString: string): HeightNode[][] {
    const lines = inputString.split(/\r?\n/);
    const input = []
    for (let y = 0; y < lines.length; y++) {
        let nodeLine = [];
        for (let x = 0; x < lines[y].length; x++) {
            nodeLine.push(new HeightNode(1, {x, y}, lines[y].charAt(x)))
        }
        input.push(nodeLine);
    }
    return input;
}


function aStar(start: HeightNode, end: HeightNode, graph: HeightNode[][], reverse: boolean) {

    const priorityQueue: PriorityQueue<HeightNode, number> = new PriorityQueue<HeightNode, number>(); // een gesorteerde Q
    priorityQueue.enqueue(start, getDistance(start, end));  // de Q wordt gesorteerd op de afstand tussen een node en het einde.

    const previousNodeMap: Map<HeightNode, HeightNode> = new Map<HeightNode, HeightNode>(); // waar kom ik vandaan?

    const distanceMap: Map<HeightNode, number> = new Map(); // hoever is het om hier te komen?
    distanceMap.set(start, 0);

    const enqueued = new Set<HeightNode>();   // een set die bijhoudt of we buren al in de Q hebben zitten

    while (!priorityQueue.isEmpty()) {
        let currentNode: HeightNode = priorityQueue.dequeue().element;  // pop de voorste node in de q

        if (currentNode === end) {  // kijken of we d'r zijn
            return distanceMap.get(currentNode) // we zijn er!
        }

        for (let neighbour of getNeighs(currentNode.coords, graph, reverse)) {  // we lopen door de buren heen

            const distanceToNeighbour = distanceMap.get(currentNode) + neighbour.value; // de afstand naar deze buur

            if (distanceMap.get(neighbour) === undefined || distanceToNeighbour < distanceMap.get(neighbour)) { // hebben we een kortere afstand gevonden?

                distanceMap.set(neighbour, distanceToNeighbour);    // de buur zit niet in de map, of de nieuwe afstand is kleiner, dus: noteer
                previousNodeMap.set(neighbour, currentNode);        // deze buur kwam van de huidige node

                if (!enqueued.has(neighbour)) {   // als we de buur al in de Q hebben, hoeft ie er niet weer in.

                    priorityQueue.enqueue(neighbour, distanceToNeighbour + getDistance(neighbour, end));    // we stoppen de neighbour in de queue
                    enqueued.add(currentNode);  // nu staat de buur wel in de Q
                }
            }
        }
    }
    return Infinity;
}

function getDistance(here: HeightNode, there: HeightNode) {
    return Math.abs(here.coords.x - there.coords.x + here.coords.y - there.coords.y)
}

function dijkstra(start: HeightNode, end: HeightNode, graph: HeightNode[][], reverse: boolean): number {

    const distanceDict: Map<HeightNode, number> = new Map();
    distanceDict.set(start, 0);

    let queue: Map<HeightNode, number> = new Map();
    queue.set(start, 0);

    let visited = new Set<HeightNode>();

    let pathDictionary: Map<HeightNode, HeightNode> = new Map<HeightNode, HeightNode>();

    while (queue.size > 0) {

        //queue = new Map([...queue].sort((a, b) => (a[1] > b[1] ? 1 : -1))); // sort queue on distance
        let currentNode: HeightNode = [...queue][0][0]; // get node with the shortest path

        if (currentNode.letter === end.letter) {
            //printPath(end, pathDictionary)
            return distanceDict.get(currentNode);
        }

        visited.add(currentNode);
        queue.delete(currentNode);

        for (let neigh of getNeighs(currentNode.coords, graph, reverse)) {

            if (visited.has(neigh)) {
                continue;
            }

            distanceDict.set(neigh, neigh.value + distanceDict.get(currentNode))
            pathDictionary.set(neigh, currentNode);

            queue.set(neigh, distanceDict.get(neigh));

        }
    }
    return Infinity;
}

function getNeighs(coords: { x: number, y: number }, graph: HeightNode[][], reverse: boolean): HeightNode[] {

    const neighs = [];
    for (let i = -1; i < 2; i++) {

        for (let j = -1; j < 2; j++) {

            const neighbourX = coords.x + i;
            const neighbourY = coords.y + j;

            if (neighbourX < 0 || neighbourX >= graph[coords.y].length ||
                neighbourY < 0 || neighbourY >= graph.length ||
                Math.abs(i) === Math.abs(j)) {
                continue;   // out of bounds and skip diagonals
            }

            if (reverse) {
                if (!(graph[coords.y][coords.x].height <= graph[neighbourY][neighbourX].height + 1)) {
                    continue;
                }
            } else {
                if (!(graph[coords.y][coords.x].height >= graph[neighbourY][neighbourX].height - 1)) {
                    continue;
                }
            }


            neighs.push(graph[neighbourY][neighbourX])
        }
    }
    return neighs;
}

function printPath(current: HeightNode, pathDictionary: Map<HeightNode, HeightNode>) {

    if (pathDictionary.has(current)) {
        printPath(pathDictionary.get(current), pathDictionary);
    }

    console.log(`${current.height} at ${current.coords.x}, ${current.coords.y}`)
}

function getStartAndEnd(graph: HeightNode[][]): [HeightNode, HeightNode] {

    let start: HeightNode;
    let end: HeightNode;

    for (let y = 0; y < graph.length; y++) {
        for (let x = 0; x < graph[y].length; x++) {

            if (graph[y][x].letter === "S") {
                start = graph[y][x];
            } else if (graph[y][x].letter === "E") {
                end = graph[y][x];
            }
        }
    }
    return [start, end]
}

class HeightNode {
    public readonly coords: { x: number, y: number }
    public value: number;
    public letter: string;
    public height: number;

    constructor(value: number, coords: { x: number, y: number }, letter: string) {
        this.value = value;
        this.coords = coords;

        this.letter = letter;
        if (letter.toUpperCase() === letter) {
            this.height = this.letter === "S" ? 0 : 25;
        } else {
            this.height = letter.charCodeAt(0) - "a".charCodeAt(0);
        }
    }
}

// PriorityQueue class
class PriorityQueue<K, V> {

    // An array is used to implement priority
    public items: { element: K, priority: V }[];

    constructor() {
        this.items = [];
    }

    // functions to be implemented
    public enqueue(element: K, priority: V) {
        // creating object from queue element
        var qElement = {element: element, priority: priority};
        var contain = false;

        // iterating through the entire
        // item array to add element at the
        // correct location of the Queue
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                // Once the correct location is found it is
                // enqueued
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        // if the element have the highest priority
        // it is added at the end of the queue
        if (!contain) {
            this.items.push(qElement);
        }
    }


    // dequeue method to remove
    // element from the queue
    public dequeue(): { element: K, priority: V } {
        // return the dequeued element
        // and remove it.
        // if the queue is empty
        // returns Underflow
        if (this.isEmpty())
            return undefined;
        return this.items.shift();
    }

    // front function
    public front(): { element: K, priority: V } {
        // returns the highest priority element
        // in the Priority queue without removing it.
        if (this.isEmpty())
            return undefined;
        return this.items[0];
    }

    // rear function
    public

    public rear(): { element: K, priority: V } {
        // returns the lowest priority
        // element of the queue
        if (this.isEmpty())
            return undefined;
        return this.items[this.items.length - 1];
    }

    // isEmpty function
    isEmpty() {
        // return true if the queue is empty.
        return this.items.length == 0;
    }

    // printQueue function
    // prints all the element of the queue
    printPQueue() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i].element + " ";
        return str;
    }
}