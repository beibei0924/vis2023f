function _1(md){return(
md`# Hw6`
)}

function _artistpublic(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistPublic.csv"),{from:{table:"artistPublic"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _artistver(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistVer.csv"),{from:{table:"artistVer"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _artistver_key3(artistver){return(
Object.keys(artistver[0])[3]
)}

function _artistpublic_key3(artistpublic){return(
Object.keys(artistpublic[0])[4]
)}

function _artistver_3(artistver,artistver_key3){return(
artistver.map(row => String(row[artistver_key3]))
)}

function _artistpublic_3(artistpublic,artistpublic_key3){return(
artistpublic.map(row => String(row[artistpublic_key3]))
)}

function _artistver_sort3(artistver_3){return(
[...new Set(artistver_3)].sort()
)}

function _artistpublic_sort3(artistpublic_3){return(
[...new Set(artistpublic_3)].sort()
)}

function _artistver_count3(artistver_sort3,artistver_3){return(
artistver_sort3.map(val => ({
  value: val,
  count: artistver_3.filter(v => v === val).length
}))
)}

function _artistpublic_count3(artistpublic_sort3,artistpublic_3){return(
artistpublic_sort3.map(val => ({
  value: val,
  count: artistpublic_3.filter(v => v === val).length
}))
)}

function _alldata(artistver_count3,artistpublic_count3){return(
artistver_count3.flatMap((item, index) => ([
  {
    value: item.value,
    count: item.count,
    series: 'artist'
  },
  {
    value: item.value,
    count: artistpublic_count3[index].count,
    series: 'artistpublic'
  }
]))
)}

function _checkbottom(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _14(Plot,artistver_key3,alldata,checkbottom){return(
Plot.plot({
  grid: true,
  title: artistver_key3,
  y: {label: "count"},
  color: {
    domain: ['artist', 'artistpublic'],
    range: ['#A8D8B9', '#8E354A'],
    legend: true
  },
  marks: [
    Plot.barY(alldata.filter(d => checkbottom.includes(d.series)), Plot.stackY({ 
      x: "value",
      y: "count",
      fill: "series",
      title: d => `${d.series}\nvalue: ${d.value}\ncount: ${d.count}`
}))   
]
})
)}

function _checkbottom2(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _chart(alldata,checkbottom2,d3)
{
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;  
  const keys = Array.from(new Set(alldata.map(d => d.series)));
  const filteredData = alldata.filter(d => checkbottom2.includes(d.series));
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  const xScale = d3.scaleBand()
    .domain(alldata.map(d => d.value))
    .range([0, width])
    .padding(0.1);
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#A8D8B9', '#8E354A']);
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)

          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _chart2(alldata,checkbottom2,d3)
{
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;  
  const keys = Array.from(new Set(alldata.map(d => d.series)));
  const filteredData = alldata.filter(d => checkbottom2.includes(d.series));
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  const xScale = d3.scaleBand()
    .domain(alldata.map(d => d.value))
    .range([0, width])
    .padding(0.1);
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#A8D8B9', '#8E354A']);
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
        //新增以下兩行可新增出過渡效果
          .transition() 
          .duration(1000) //改為0可以呈現無過度效果
        //新增到這兩行可新增出過渡效果
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));
  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _chart3(alldata,checkbottom2,d3)
{
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;  
  const keys = Array.from(new Set(alldata.map(d => d.series)));
  const filteredData = alldata.filter(d => checkbottom2.includes(d.series));
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  const xScale = d3.scaleBand()
    .domain(alldata.map(d => d.value))
    .range([0, width])
    .padding(0.1);
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#A8D8B9', '#8E354A']);
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  // 添加陰影濾鏡效果
  const defs = svg.append("defs");
  const filter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");
  filter.append("feGaussianBlur") //SVG濾鏡效果(高斯模糊) 用於模糊影像
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 4) //模糊的程度
      .attr("result", "blur"); //濾鏡的輸出

  filter.append("feOffset") //濾鏡的輸出(位移)
      .attr("in", "blur") //濾鏡的輸出(為前面定義的blur)
      .attr("dx", 4) //水平位移量
      .attr("dy", 4) //垂直位移量
      .attr("result", "offsetBlur"); //濾鏡的輸出名稱

  const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
               .attr("in", "offsetBlur");
        feMerge.append("feMergeNode")
               .attr("in", "SourceGraphic"); 
 // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
   series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
        //新增到這兩行可新增出過渡效果
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]))
          .attr("filter", "url(#drop-shadow)") // 添加陰影濾鏡效果
          .on("mouseover", function(d) {
              d3.select(this).attr("fill", "#CA7A2C");
              })
        .on("mouseout", function(d) {
            d3.select(this).attr("fill", colorScale(serie.key)); // 恢復原來的顏色
        d3.select(".tooltip").remove();

        });
  });
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));
  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistVer.csv", {url: new URL("./artistVer.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artistPublic.csv", {url: new URL("./artistPublic.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artistpublic")).define("artistpublic", ["__query","FileAttachment","invalidation"], _artistpublic);
  main.variable(observer("artistver")).define("artistver", ["__query","FileAttachment","invalidation"], _artistver);
  main.variable(observer("artistver_key3")).define("artistver_key3", ["artistver"], _artistver_key3);
  main.variable(observer("artistpublic_key3")).define("artistpublic_key3", ["artistpublic"], _artistpublic_key3);
  main.variable(observer("artistver_3")).define("artistver_3", ["artistver","artistver_key3"], _artistver_3);
  main.variable(observer("artistpublic_3")).define("artistpublic_3", ["artistpublic","artistpublic_key3"], _artistpublic_3);
  main.variable(observer("artistver_sort3")).define("artistver_sort3", ["artistver_3"], _artistver_sort3);
  main.variable(observer("artistpublic_sort3")).define("artistpublic_sort3", ["artistpublic_3"], _artistpublic_sort3);
  main.variable(observer("artistver_count3")).define("artistver_count3", ["artistver_sort3","artistver_3"], _artistver_count3);
  main.variable(observer("artistpublic_count3")).define("artistpublic_count3", ["artistpublic_sort3","artistpublic_3"], _artistpublic_count3);
  main.variable(observer("alldata")).define("alldata", ["artistver_count3","artistpublic_count3"], _alldata);
  main.variable(observer("viewof checkbottom")).define("viewof checkbottom", ["Inputs"], _checkbottom);
  main.variable(observer("checkbottom")).define("checkbottom", ["Generators", "viewof checkbottom"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","artistver_key3","alldata","checkbottom"], _14);
  main.variable(observer("viewof checkbottom2")).define("viewof checkbottom2", ["Inputs"], _checkbottom2);
  main.variable(observer("checkbottom2")).define("checkbottom2", ["Generators", "viewof checkbottom2"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["alldata","checkbottom2","d3"], _chart);
  main.variable(observer("chart2")).define("chart2", ["alldata","checkbottom2","d3"], _chart2);
  main.variable(observer("chart3")).define("chart3", ["alldata","checkbottom2","d3"], _chart3);
  return main;
}
