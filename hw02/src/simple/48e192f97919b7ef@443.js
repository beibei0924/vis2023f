function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data (2)@1.json").json()
)}

function _CCounts(){return(
[]
)}

function _Constellations(data){return(
data.map(item => item.Constellation)
)}

function _Constellations_name(){return(
['牡羊座','金牛座','雙子座','巨蟹座','獅子座','處女座','天秤座','天蠍座','射手座','摩羯座','水瓶座','雙魚座']
)}

function _6(CCounts,Constellations,Constellations_name,data)
{
  CCounts.length = 0;
  var minConstellation = Math.min(...Constellations); 
  var maxConstellation = Math.max(...Constellations); 
  for (var y=minConstellation; y<=maxConstellation; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    
    CCounts.push({Constellation:Constellations_name[y], gender:"male", count:0}); 
    //Object包含：1. 星座，2.男性，3.人數(設為0)
    CCounts.push({Constellation:Constellations_name[y], gender:"female", count:0}); 
    //Object包含：1. 星座，2.女性，3.人數(設為0)
  }
    data.forEach (x=> {
    var i = (x.Constellation-minConstellation)*2 + (x.Gender== "男" ? 0 : 1); 
    CCounts[i].count++;
    //讀取data array，加總每個星座的人
  })
  return CCounts

}


function _7(Plot,CCounts){return(
Plot.plot({
  grid: true,
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(CCounts, {y: "count",x: "Constellation",  tip: true , fill:"gender"}),
  ]
})
)}

function _8(Plot,CCounts){return(
Plot.plot({  
  x: {grid: true, label: "Constellation"},  
	y: {grid: true, label: "count"},  
	marks: [    
		Plot.barY(CCounts, {y: "count",x: "Constellation",  tip: true , fill:"gender"}),
		Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0.5 }),
   
	 ]
  
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data (2)@1.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("CCounts")).define("CCounts", _CCounts);
  main.variable(observer("Constellations")).define("Constellations", ["data"], _Constellations);
  main.variable(observer("Constellations_name")).define("Constellations_name", _Constellations_name);
  main.variable(observer()).define(["CCounts","Constellations","Constellations_name","data"], _6);
  main.variable(observer()).define(["Plot","CCounts"], _7);
  main.variable(observer()).define(["Plot","CCounts"], _8);
  return main;
}
