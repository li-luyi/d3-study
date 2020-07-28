<template>
  <div class="d3-box">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xml:space="preserve"
      width="960"
      height="500"
    />
  </div>
</template>

<script>
export default {
  mounted() {
    this.initD3Data();
  },
  methods: {
    initD3Data() {
      var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        color = d3.scaleOrdinal(d3.schemeCategory10);
      var a = { id: "a" },
        b = { id: "b" },
        c = { id: "c" },
        d = { id: "d" },
        e = { id: "e" },
        nodes = [a, b, c, d, e],
        links = [];
      var simulation = d3
        .forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("link", d3.forceLink(links).distance(200))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .on("tick", ticked);

      var g = svg
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
        link = g
          .append("g")
          .attr("stroke", "#000")
          .attr("stroke-width", 1.5)
          .selectAll(".link"),
        node = g
          .append("g")
          .attr("stroke", "#fff")
          .attr("stroke-width", 5)
          .selectAll(".node");

      restart();

      d3.timeout(function () {
        links.push({
          source: a,
          target: b,
        });
        links.push({
          source: b,
          target: c,
        });
        links.push({
          source: c,
          target: d,
        });
        links.push({
          source: d,
          target: e,
        });
        links.push({
          source: e,
          target: a,
        });
        restart();
      }, 1000);

      d3.interval(
        function () {
          nodes.pop();
          // links.pop();
          // links.pop();
          restart();
        },
        2000,
        d3.now()
      );

      d3.interval(
        function () {
          nodes.push(e);
          // links.push({
          //   source: d,
          //   target: e
          // });
          // links.push({
          //   source: e,
          //   target: a
          // });
          restart();
        },
        2000,
        d3.now() + 1000
      );

      function restart() {
        node = node.data(nodes, function (d) {
          return d.id;
        });
        node.exit().transition().attr("r", 0).remove();
        node = node
          .enter()
          .append("circle")
          .attr("fill", function (d) {
            return colorRgba(color(d.id), 0.4);
          })
          .attr("stroke", function (d) {
            return color(d.id);
          })
          .call(function (node) {
            node.transition().attr("r", 36);
          })
          .merge(node);
        link = link.data(links, function (d) {
          return d.source.id + "-" + d.target.id;
        });
        link
          .exit()
          .transition()
          .attr("stroke-opacity", 0)
          .attrTween("x1", function (d) {
            return function () {
              return d.source.x;
            };
          })
          .attrTween("x2", function (d) {
            return function () {
              return d.target.x;
            };
          })
          .attrTween("y1", function (d) {
            return function () {
              return d.source.y;
            };
          })
          .attrTween("y2", function (d) {
            return function () {
              return d.target.y;
            };
          });

        link = link
          .enter()
          .append("line")
          .call(function (link) {
            link.transition().attr("stroke-opacity", 1);
          })
          .merge(link);
        simulation.nodes(nodes);
        simulation.force("link").links(links);
        simulation.alpha(1).restart();
      }

      function ticked() {
        node
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          });

        link
          .attr("x1", function (d) {
            return d.source.x;
          })
          .attr("y1", function (d) {
            return d.source.y;
          })
          .attr("x2", function (d) {
            return d.target.x;
          })
          .attr("y2", function (d) {
            return d.target.y;
          });
      }
      // rgba颜色值的计算
      function colorRgba(sHex, alpha) {
        // 十六进制颜色值的正则表达式
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        /* 16进制颜色转为RGB格式 */
        let sColor = sHex.toLowerCase();
        if (sColor && reg.test(sColor)) {
          if (sColor.length === 4) {
            var sColorNew = "#";
            for (let i = 1; i < 4; i += 1) {
              sColorNew += sColor
                .slice(i, i + 1)
                .concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
          }
          // 处理六位的颜色值
          var sColorChange = [];
          for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
          }
          // return sColorChange.join(',')
          return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
        } else {
          return sColor;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.d3-box {
  width: 100%;
  height: 100%;
}
</style>
