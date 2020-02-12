parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"H6mn":[function(require,module,exports) {
module.exports="/code_to_fullname.b2413411.csv";
},{}],"ReH6":[function(require,module,exports) {
module.exports="/population.39b7aa6e.csv";
},{}],"Focm":[function(require,module,exports) {
var e=d3.geoEquirectangular().center([0,15]).scale(200),t=d3.geoPath().projection(e),n=[0,0,0,0],r=[0,0,0,0],o=g(),c=createD3RangeSlider(0,2e9,"#slider-container1");c.onChange(function(e){d3.select("#range-label1").text(e.begin.toLocaleString()+" - "+e.end.toLocaleString()),n[0]=e.begin,r[0]=e.end,u()}),c.range(0,0);var a=createD3RangeSlider(0,2e9,"#slider-container2");a.onChange(function(e){d3.select("#range-label2").text(e.begin.toLocaleString()+" - "+e.end.toLocaleString()),n[1]=e.begin,r[1]=e.end,u()}),a.range(0,0);var s=createD3RangeSlider(0,2e9,"#slider-container3");s.onChange(function(e){d3.select("#range-label3").text(e.begin.toLocaleString()+" - "+e.end.toLocaleString()),n[2]=e.begin,r[2]=e.end,u()}),s.range(0,0);var d=createD3RangeSlider(0,1367485388,"#slider-container4");function u(){filterList=d3.selectAll(".country")._groups[0];var e=require("./code_to_fullname.csv");d3.csv(e,function(e){for(k=0;k<n.length;k++)for(i=0;i<filterList.length;i++)for(j=0;j<e.length;j++)if(filterList[i].id.substring(7)==e[j].A2){for(attribute="",l=0;l<o.length;l++)e[j].Name==o[l].Name&&(attribute=o[l].Value);attribute<n[k]||attribute>r[k]?d3.select(filterList[i]).classed("country-filtered",!0):d3.select(filterList[i]).classed("country-filtered",!1)}})}function p(e){e.each(function(e){e.bbox=this.getBBox()})}function g(){var e=require("./population.csv"),t=[];return d3.csv(e,function(e){for(var n=0;n<e.length;n++)t.push(e[n])}),t}function h(e,t){var n=require("./population.csv");d3.csv(n,function(n){for(var r=0;r<n.length;r++)n[r].Name==e&&(document.getElementById(t).innerText=parseInt(n[r].Value).toLocaleString())})}d.onChange(function(e){d3.select("#range-label4").text(e.begin.toLocaleString()+" - "+e.end.toLocaleString()),n[3]=e.begin,r[3]=e.end,u()}),d.range(0,1367485388),$(window).resize(function(){f.attr("max-width",$("#map-holder").width()).attr("max-height",$("#map-holder").height())});var f=d3.select("#map-holder").append("svg").attr("viewBox","0, 0, 1200, 600");d3.json("https://raw.githubusercontent.com/andybarefoot/andybarefoot-www/master/maps/mapdata/custom50.json",function(e){countriesGroup=f.append("g").attr("id","map"),countriesGroup.append("rect").attr("x",0).attr("y",0).attr("width",3e3).attr("height",1500),countries=countriesGroup.selectAll("path").data(e.features).enter().append("path").attr("d",t).attr("id",function(e,t){return"country"+e.properties.iso_a3}).attr("class","country").on("mouseover",function(e,t){d3.selectAll(".country").classed("country-hover",!1),d3.select(this).classed("country-filtered")||d3.select(this).classed("country-click_hover")||(d3.select(this).classed("country-click")?(console.log("hello"),d3.select(this).classed("country-click_hover",!0),document.getElementById("table-country-name2").innerText=e.properties.name,pop2=h(e.properties.name,"table-country-pop2")):(d3.select(this).classed("country-hover",!0),document.getElementById("table-country-name2").innerText=e.properties.name,pop2=h(e.properties.name,"table-country-pop2")))}).on("mouseout",function(e,t){document.getElementById("table-country-pop2").innerText="",document.getElementById("table-country-name2").innerText="",d3.select(this).classed("country-hover",!1),d3.select(this).classed("country-click_hover")&&(d3.select(this).classed("country-click_hover",!1),d3.select(this).classed("country-click",!0))}).on("click",function(e,t){d3.select(this).classed("country-filtered")||(d3.selectAll(".country").classed("country-click",!1),d3.select(this).classed("country-click_hover",!0),document.getElementById("table-country-name1").innerText=e.properties.name,pop=h(e.properties.name,"table-country-pop1"))}),countryLabels=countriesGroup.selectAll("g").data(e.features).enter().append("g").attr("class","countryLabel").attr("id",function(e){return"countryLabel"+e.properties.iso_a3})});
},{"./code_to_fullname.csv":"H6mn","./population.csv":"ReH6"}]},{},["Focm"], null)
//# sourceMappingURL=/src.038b5f63.js.map