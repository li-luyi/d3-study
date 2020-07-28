<template>
  <!-- svg练习 -->
  <div id="svg-box">
    <!-- <svg width="300" height="300">
      <line x1="100" y1="100" x2="200" y2="100" style="stroke:rgb(255,0,0)" />
    </svg>-->
  </div>
</template>

<script>
export default {
  mounted() {
    this.initSvg();
  },
  methods: {
    initSvg() {
      let width = 1600;
      let height = 300;
      let svg = d3
        .select("#svg-box")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // 创建线
      svg
        .append("line")
        .attr("x1", 100)
        .attr("y1", 100)
        .attr("x2", 100)
        .attr("y2", 300)
        .style("stroke", "rgb(255,0,0)")
        .style("stroke-width", 2);

      // 创建矩形
      svg
        .append("rect")
        .attr("x", 130)
        .attr("y", 100)
        .attr("width", 50)
        .attr("height", 200)
        .attr("fill", "green");

      // 创建圆
      svg
        .append("circle")
        .attr("cx", 310)
        .attr("cy", 200)
        .attr("r", 100)
        .attr("fill", "blue");

      // 创建椭圆
      svg
        .append("ellipse")
        .attr("cx", 500)
        .attr("cy", 200)
        .attr("rx", 60)
        .attr("ry", 100)
        .attr("fill", "#faa");
    },
  },
};
</script>

<style>
</style>
