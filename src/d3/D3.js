import React, { Component } from "react";
import * as d3 from "d3";

let expenses = [
  {
    name: "coffee",
    amount: 4,
    date: new Date()
  },
  {
    name: "snickers",
    amount: 2,
    date: new Date()
  },
  {
    name: "misc.",
    amount: 100,
    date: new Date()
  },
  {
    name: "gym",
    amount: 20,
    date: new Date()
  }
];

const width = 900;
const height = 900;
const radius = 10;

const simulation = d3
  .forceSimulation()
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force('charge', d3.forceManyBody)

class D3 extends Component {

  componentWillMount() {
      simulation.on('tick', this.forceTick)
  }

  componentDidMount() {
    this.container = d3.select(this.refs.container);
    this.renderCircles();

    simulation.nodes(expenses)
  }

  renderCircles() {
    //draw expenses circles

    this.circles = this.container
      .selectAll("circle")
      .data(expenses, d => d.name);

    // exit

    this.circles.exit().remove();

    // enter update

    this.circles = this.circles
      .enter()
      .append("circle")
      .merge(this.circles)
      .attr("r", radius);
  }

  forceTick = () => {
      this.circles.attr('cx', d => d.x)
        .attr('cy', d => d.y)
  }

  render() {
    return (
      <div>
        <h1>D3 testing area</h1>
        <svg width={width} height={height} ref="container" />
      </div>
    );
  }
}

export default D3;
