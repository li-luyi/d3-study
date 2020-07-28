<template>
  <div id="chart-box">
    <div class="barChart"></div>
    <div class="circleChart"></div>
    <div class="pieChart"></div>
    <div class="donutChart"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initBarChart();
    this.initCirclehart();
    this.initPieChart();
    this.initDonutChart();
  },
  methods: {
    // 柱状图
    initBarChart() {
      var data = [10, 5, 12, 15];

      var width = 300;
      var scaleFactor = 20;
      var barHeight = 30;

      var graph = d3
        .select(".barChart")
        .append("svg")
        .attr("width", width)
        .attr("height", barHeight * data.length);

      var bar = graph
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
          return "translate(0," + i * barHeight + ")";
        });

      bar
        .append("rect")
        .attr("width", function (d) {
          return d * scaleFactor;
        })
        .attr("height", barHeight - 1);

      bar
        .append("text")
        .attr("x", function (d) {
          return d * scaleFactor;
        })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function (d) {
          return d;
        });
    },
    // 圆形图
    initCirclehart() {
      var width = 400;
      var height = 200;
      var data = [10, 20, 30];
      var colors = ["green", "purple", "yellow"];
      var svg = d3
        .select(".circleChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      var g = svg
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
          return "translate(0,0)";
        });

      g.append("circle")
        .attr("cx", function (d, i) {
          return i * 75 + 50;
        })
        .attr("cy", function (d, i) {
          return 75;
        })
        .attr("r", function (d, i) {
          return d * 1.5;
        })
        .attr("fill", function (d, i) {
          return colors[i];
        });

      g.append("text")
        .attr("x", function (d, i) {
          return i * 75 + 25;
        })
        .attr("y", 80)
        .attr("stroke", "teal")
        .attr("font-size", "10px")
        .attr("font-family", "sans-serif")
        .text(function (d) {
          return d;
        });
    },
    // 饼图
    initPieChart() {
      var width = 300;
      var height = 300;
      var radius = Math.min(width, height) / 2;
      var colors = d3.scaleOrdinal(d3.schemeCategory10);
      let data = [
        { name: "购物", value: 983 },
        { name: "日常饮食", value: 300 },
        { name: "医药", value: 640 },
        { name: "交通", value: 402 },
        { name: "杂费", value: 334 },
      ];

      var svg = d3
        .select(".pieChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      var g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var pie = d3
        .pie()
        .sort(null)
        .value(function (d) {
          return d.value;
        });

      var pieData = pie(data);
      var arc = d3.arc().innerRadius(0).outerRadius(radius);
      var outerArc = d3
        .arc()
        .outerRadius(radius)
        .innerRadius(radius - 80);
      var oArc = d3
        .arc()
        .innerRadius(1.1 * radius)
        .outerRadius(1.1 * radius);

      var slices = g.append("g").attr("class", "slices");
      var labels = g.append("g").attr("class", "labels");

      var path = slices
        .selectAll("g")
        .data(pieData)
        .enter()
        .append("path")
        .attr("fill", function (d, i) {
          return colors(i);
        })
        .attr("d", function (d) {
          return arc(d);
        });

      var text = labels
        .selectAll("text")
        .data(pieData)
        .enter()
        .append("text")
        .attr("dy", "0.35em")
        .text(function (d, i) {
          return d.data.name;
        })
        .style("text-anchor", function (d, i) {
          return midAngel(d) < Math.PI ? "start" : "end";
        })
        .attr("transform", function (d, i) {
          // 找出外弧形的中心点
          var pos = outerArc.centroid(d);
          // 改变文字标识的x坐标
          // pos[0] = radius * (midAngel(d) > Math.PI ? 1.5 : -1.5);

          return "translate(" + pos + ")";
        })
        .style("opacity", 1);

      function midAngel(d) {
        console.log(d);
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }
    },
    // 环状饼图
    initDonutChart() {
      var width = 300;
      var height = 300;
      var radius = Math.min(width, height) / 2;
      var colors = d3.scaleOrdinal(d3.schemePaired);
      let data = [
        { name: "购物", value: 983 },
        { name: "日常饮食", value: 300 },
        { name: "医药", value: 640 },
        { name: "交通", value: 402 },
        { name: "杂费", value: 334 },
      ];

      var svg = d3
        .select(".donutChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      var g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var pie = d3.pie().value(function (d) {
        return d.value;
      });

      var pieData = pie(data);
      var path = d3.arc().outerRadius(radius).innerRadius(80);
      var label = d3
        .arc()
        .outerRadius(radius)
        .innerRadius(radius - 80);

      var arc = g
        .selectAll(".arc")
        .data(pieData)
        .enter()
        .append("g")
        .attr("class", "arc");

      arc
        .append("path")
        .attr("d", path)
        .attr("fill", function (d, i) {
          return colors(i);
        });

      arc
        .append("text")
        .attr("transform", function (d) {
          return "translate(" + label.centroid(d) + ")";
        })
        .text(function (d) {
          return d.data.name;
        });
    },
  },
};
</script>

<style>
svg rect {
  fill: gray;
}
svg text {
  fill: #000;
  font: 12px sans-serif;
  text-anchor: end;
}
.arc text {
  font: 12px arial;
  text-anchor: middle;
}
.arc path {
  stroke: #fff;
}
.title {
  fill: green;
  font-weight: italic;
}
</style>
