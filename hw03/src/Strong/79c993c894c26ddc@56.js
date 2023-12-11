import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# HW03  Medium baseline (4pt)`
)}

function _data(FileAttachment){return(
FileAttachment("Data.json").json()
)}

function _taiwan(taiwanMap){return(
taiwanMap(800, 600, -0.0, -0.6, 8000)
)}

function _taiwanMap(d3,topojson,tw,DOM,LivePlaceCounts){return(
(width, height, offsetX, offsetY, scale) => {
  offsetX = offsetX + 0.75;

  const bboxCenter = (bbox) => [
    (bbox[0] + bbox[2]) / 2 + offsetX,
    (bbox[1] + bbox[3]) / 2 + offsetY
  ];
  const projection = d3
    .geoMercator()
    .center(bboxCenter(topojson.bbox(tw)))
    .translate([width / 2, height / 2])
    .scale(scale);

  const path = d3.geoPath().projection(projection);

  const svg = d3
    .select(DOM.svg(width, height))
    .style("width", "auto")
    .style("height", "auto")
    .style("background-color", "White");

  const details = svg
    .append("g")
    .selectAll("path")
    .data(topojson.feature(tw, tw.objects.counties).features);

  svg
    .append("path")
    .datum(topojson.mesh(tw, tw.objects.counties, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

  const maxValue = 42;
  const thresholds = d3.range(0, maxValue + 1);
  const colorRange = thresholds.map(value => d3.interpolateReds(value / maxValue));
  const thresholdScale = d3.scaleThreshold().domain(thresholds).range(colorRange);
  
  details
    .enter()
    .append("path")
    .attr("fill", (d) => {
      const foundData = LivePlaceCounts.find(
        (t) =>
          t.value === d.properties.COUNTYNAME ||
          t.value.replace("臺", "台") === d.properties.COUNTYNAME
      );
      return foundData ? thresholdScale(foundData.count) : thresholdScale(0);
    })
    .attr("stroke", "gray")
    .attr("d", path)
    .append("title")
    .text((d) => {
      const foundData = LivePlaceCounts.find(
        (t) =>
          t.value === d.properties.COUNTYNAME ||
          t.value.replace("臺", "台") === d.properties.COUNTYNAME
      );
      return `${d.properties.COUNTYNAME} ${foundData ? foundData.count : 0}人`;
    });
  

  svg.append("g");
 
  return svg.node();
}
)}

function _LivePlaceColumn(data){return(
data.map(row => row['LivingPlaceFirst'])
)}

function _LivePlaceValue(LivePlaceColumn){return(
[...new Set(LivePlaceColumn)].sort()
)}

function _LivePlaceCounts(LivePlaceValue,LivePlaceColumn){return(
LivePlaceValue.map(val => ({
  value: val,
  count: LivePlaceColumn.filter(v => v === val).length,
  series:"LivePlace"
}))
)}

function _tw(d3){return(
d3.json("https://cdn.jsdelivr.net/npm/taiwan-atlas/towns-10t.json")
)}

function _topojson(require){return(
require("topojson-client@3")
)}

function _path(d3){return(
d3.geoPath()
)}

function _buildHierarchy(){return(
function buildHierarchy(csv) {
  // Helper function that transforms the given CSV into a hierarchical format.
  const root = { name: "root", children: [] };
  for (let i = 0; i < csv.length; i++) {
    const sequence = csv[i][0];
    const size = +csv[i][1];
    if (isNaN(size)) {
      // e.g. if this is a header row
      continue;
    }
    const parts = sequence.split("-");
    let currentNode = root;
    for (let j = 0; j < parts.length; j++) {
      const children = currentNode["children"];
      const nodeName = parts[j];
      let childNode = null;
      if (j + 1 < parts.length) {
        // Not yet at the end of the sequence; move down the tree.
        let foundChild = false;
        for (let k = 0; k < children.length; k++) {
          if (children[k]["name"] == nodeName) {
            childNode = children[k];
            foundChild = true;
            break;
          }
        }
        // If we don't already have a child node for this branch, create it.
        if (!foundChild) {
          childNode = { name: nodeName, children: [] };
          children.push(childNode);
        }
        currentNode = childNode;
      } else {
        // Reached the end of the sequence; create a leaf node.
        childNode = { name: nodeName, value: size };
        children.push(childNode);
      }
    }
  }
  return root;
}
)}

function _down(d3){return(
function down(svg, data) {
  // Ref : https://observablehq.com/@d3/hierarchical-bar-chart
  // Ref : https://d3-graph-gallery.com/graph/barplot_horizontal.html

  const transition1 = svg.transition().duration(250);
  const transition2 = transition1.transition();

  data.sort((a, b) => b.value - a.value);
  
  svg.selectAll(".bar,.barText")
    .attr("fill-opacity", 1)
    .transition(transition1)
    .attr("fill-opacity", 0)
    .remove();

  let sum = data.reduce((curr, d) => d.value + curr, 0);
  
  let x = d3.scaleLinear()
    .domain([0, sum])
    .range([ 0, 550 ]);

  let y = d3.scaleBand()
    .domain(data.map((d) => d.name))
    .range([ 0, Math.min(31.875 * data.length, 510) ])
    .padding(0.1);
  
  svg.selectAll(".background")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 550)
    .attr("y", d => y(d.name) + 125)
    .attr("width", d => x(d.value))
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2")
    .attr("fill-opacity", 0)
    .transition(transition2)
    .attr("fill-opacity", 1)

  svg.selectAll(".background")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "barText")
    .attr("x", 575 )
    .attr("y", d => y(d.name) + 125 + parseInt(y.bandwidth() / 2) + 5)
    .text(d => (d.value / sum * 100).toFixed(1) + "% - " + d.name)
    .attr("fill-opacity", 0)
    .transition(transition2)
    .attr("fill-opacity", 1)
  
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Data.json", {url: new URL("./files/37a09ac7213b196f8dfc9f01c6e2cdf63bf5bf446fedded78b4ce6a9a636a2745ecacb45a6d689d3d21c8e215c76b37380cd8dbf847d839f753f6b8e4e0d4bed.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("taiwan")).define("taiwan", ["taiwanMap"], _taiwan);
  main.variable(observer("taiwanMap")).define("taiwanMap", ["d3","topojson","tw","DOM","LivePlaceCounts"], _taiwanMap);
  main.variable(observer("LivePlaceColumn")).define("LivePlaceColumn", ["data"], _LivePlaceColumn);
  main.variable(observer("LivePlaceValue")).define("LivePlaceValue", ["LivePlaceColumn"], _LivePlaceValue);
  main.variable(observer("LivePlaceCounts")).define("LivePlaceCounts", ["LivePlaceValue","LivePlaceColumn"], _LivePlaceCounts);
  main.variable(observer("tw")).define("tw", ["d3"], _tw);
  const child1 = runtime.module(define1);
  main.import("select", child1);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("path")).define("path", ["d3"], _path);
  main.variable(observer("buildHierarchy")).define("buildHierarchy", _buildHierarchy);
  main.variable(observer("down")).define("down", ["d3"], _down);
  return main;
}
