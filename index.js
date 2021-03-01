new Q5("global");
import Graph from "./Graph";
import { stringfy, container } from "./utils";

let G = null;
let start = null;
let end = null;
let start_node = null;
let end_node = null;
const button = document.querySelector("#btn");
const modalBody = document.querySelector("#modal-body");

button.addEventListener("click", (e) => {
  const [adjList, edges, matrix] = G.getGraph();
  let adj_list_string = stringfy(adjList);
  let edges_string = stringfy(edges);
  let matrix_string = stringfy(matrix);
  modalBody.innerHTML = "";
  modalBody.appendChild(container("Adjacency List", adj_list_string, "adj"));
  modalBody.appendChild(container("Edges", edges_string, "edge"));
  modalBody.appendChild(container("Matrix", matrix_string, "matrix", false));
  document.querySelectorAll(".clip").forEach((x) =>
    x.addEventListener("click", (e) => {
      const txt = document.createElement("input");
      txt.value = e.target.innerText;
      modalBody.appendChild(txt);
      txt.select();
      txt.setSelectionRange(0, 99999);
      document.execCommand("copy");
      txt.remove();
    })
  );
});

setup = function () {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(10);
  G = new Graph();
};

draw = function () {
  background(10);
  G.render();
};

mousePressed = function () {
  G.addNode(G.size, mouseX, mouseY);
  start = [mouseX, mouseY];
  start_node = G.checkInside(...start)[1];
};

mouseReleased = function () {
  end = [mouseX, mouseY];
  end_node = G.checkInside(...end)[1];
  if (start_node && end_node && start_node.id != end_node.id) {
    G.connect(start_node, end_node);
  }
};
