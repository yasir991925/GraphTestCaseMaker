export const stringfy = (adj) => {
  let res = "[";
  adj.forEach((arr, i) => {
    if (arr.length == 0) {
      res += "[]" + (i + 1 != adj.length ? "," : "");
    } else {
      res += "[";
      arr.forEach((e, i) => {
        res += String(e);
        if (i + 1 != arr.length) {
          res += ",";
        }
      });
      res += "]" + (i + 1 != adj.length ? "," : "");
    }
  });
  res += "]";
  return res;
};

export const container = (heading, content, id, hr = true) => {
  const container_DOM = document.createElement("div");

  const heading_DOM = document.createElement("h4");
  heading_DOM.innerText = heading;

  const content_DOM = document.createElement("samp");
  content_DOM.setAttribute("data-clipboard-text", content);
  content_DOM.setAttribute("class", "clip");
  content_DOM.setAttribute("data-toggle", "tooltip");
  content_DOM.setAttribute("data-placement", "top");
  content_DOM.setAttribute("title", "Copy to Clipboard");
  content_DOM.appendChild(document.createTextNode(content));
  container_DOM.appendChild(heading_DOM);
  container_DOM.appendChild(content_DOM);

  hr && container_DOM.appendChild(document.createElement("hr"));
  return container_DOM;
};
