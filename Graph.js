import Node from "./Node";

class Graph {
  constructor() {
    this.node_list = [];
    this.graph = [];
    this.size = 0;
  }

  addNode(val, x, y) {
    if (this.checkInside(x, y)[0]) return;
    let new_node = new Node(val, x, y);
    this.node_list.push(new_node);
    new_node.id = this.size;
    this.size += 1;
  }

  checkInside(x, y) {
    let flag = 0;
    let under_node = null;
    this.node_list.forEach((node) => {
      if (node.inside(x, y)) {
        flag = 1;
        under_node = node;
        return;
      }
    });
    return [flag, under_node];
  }

  connect(at, to) {
    at.connect(to);
    this.graph[at.id] = at;
    this.graph[to.id] = to;
  }

  getGraph() {
    const n = this.graph.length;
    const adjList = [];
    const edges = [];
    const matrix = Array(n)
      .fill(0)
      .map(() => new Array(n).fill(0));
    this.graph.forEach((at) => {
      adjList[at.id] = [];
      at.children.forEach((to) => {
        adjList[at.id].push(to.id);
        edges.push([at.id, to.id]);
        matrix[at.id][to.id] = 1;
      });
    });
    return [adjList, edges, matrix];
  }

  render() {
    this.node_list.forEach((node) => node.render());
  }
}

export default Graph;
