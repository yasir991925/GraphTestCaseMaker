class Node {
  constructor(val, x, y) {
    this.val = val;
    this.x = x;
    this.y = y;
    this.r = 50;
    this.pos = createVector(x, y);
    this.id = 0;
    this.children = new Set();
  }

  connect(other) {
    if (this.children.has(other)) {
      this.disconnect(other);
    } else {
      this.children.add(other);
    }
  }

  disconnect(other) {
    this.children.delete(other);
  }

  renderCircle() {
    noStroke(255);
    fill(255, 198, 74);
    circle(this.pos.x, this.pos.y, this.r);
  }

  renderText() {
    fill(10);
    textSize(24);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(this.val, this.x, this.y);
  }

  renderLine(arrow) {
    this.children.forEach((other) => {
      stroke(255);
      strokeWeight(4);
      if (arrow) {
        push();
        let at = Vector.sub(other.pos, this.pos);
        let angle = at.heading();
        let delta_x = sin(angle);
        let delta_y = cos(angle);
        translate(this.pos.x, this.pos.y);
        at.setMag(at.mag() - this.r);
        let _x = delta_x * 40;
        let _y = delta_y * 40;
        line(_y, _x, at.x, at.y);
        rotate(at.heading());
        let arrowSize = 7;
        translate(at.mag(), 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
      }
      noStroke();
    });
  }

  render(arrow = true) {
    this.renderLine(arrow);
    this.renderCircle();
    this.renderText();
  }

  inside(x, y) {
    return (
      x >= this.x - this.r && x <= this.x + this.r && y >= this.y - this.r && y <= this.y + this.r
    );
  }
}

export default Node;
