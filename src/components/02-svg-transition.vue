<template>
  <div id="svgTran-box"></div>
</template>

<script>
export default {
  mounted() {
    let width = 1600;
    let height = 500;
    let svg = d3
      .select("#svg-box")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    let group = svg.append("g").attr("transform", "translate(0,0) rotate(0)");

    group
      .append("rect")
      .attr("x", 100)
      .attr("y", 100)
      .attr("width", 50)
      .attr("height", 200)
      .attr("fill", "green");

    let circle = group
      .append("circle")
      .attr("cx", 280)
      .attr("cy", 200)
      .attr("r", 100)
      .attr("fill", "#faa");

    // transition()过渡属性
    circle.transition().attr("fill", "red").duration(2000);
  },
};
</script>

<style>
</style>
