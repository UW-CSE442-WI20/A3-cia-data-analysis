      // DEFINE FUNCTIONS/OBJECTS
      // Define map projection
      var projection = d3
        .geoEquirectangular()
        .center([0, 15]) // set centre to further North as we are cropping more off bottom of map
        .scale(200) // scale to fit group width
      ;

      // Define map path
      var path = d3
        .geoPath()
        .projection(projection)
      ;

    var sliders_begin = [0, 0, 0, 0];
    var sliders_end = [100, 100, 100, 100];
    var attributes = ["unemployment", "obesity_rate", "birth_rate", "death_rate", "population"];
    var list_dict = new Object();
    const dataLoc1 = require("./unemployment.csv");
    const dataLoc2 = require("./obesity_rate.csv");
    const dataLoc3 = require("./birth_rate.csv");
    const dataLoc4 = require("./death_rate.csv");
    const dataLoc5 = require("./population.csv");
    list_dict[attributes[0]] = generateAttribute(dataLoc1);
    list_dict[attributes[1]] = generateAttribute(dataLoc2);
    list_dict[attributes[2]] = generateAttribute(dataLoc3);
    list_dict[attributes[3]] = generateAttribute(dataLoc4);
    list_dict[attributes[4]] = generateAttribute(dataLoc5);


    var slider1 = createD3RangeSlider(0, 100, "#slider-container1");

    slider1.onChange(function(newRange){
        d3.select("#range-label1").text(newRange.begin.toLocaleString() + " - " + newRange.end.toLocaleString());
        sliders_begin[0] = newRange.begin;
        sliders_end[0] = newRange.end;
        updateFilter();
    });

    slider1.range(0, 100);


     var slider2 = createD3RangeSlider(0, 100, "#slider-container2");

    slider2.onChange(function(newRange){
        d3.select("#range-label2").text(newRange.begin.toLocaleString() + " - " + newRange.end.toLocaleString());
        sliders_begin[1] = newRange.begin;
        sliders_end[1] = newRange.end;
        updateFilter();
    });

    slider2.range(0,100);


 var slider3 = createD3RangeSlider(0, 100, "#slider-container3");

    slider3.onChange(function(newRange){
        d3.select("#range-label3").text(newRange.begin.toLocaleString() + " - " + newRange.end.toLocaleString());
        sliders_begin[2] = newRange.begin;
        sliders_end[2] = newRange.end;
        updateFilter();
    });

    slider3.range(0,100);


 var slider4 = createD3RangeSlider(0, 100, "#slider-container4");

    slider4.onChange(function(newRange){
        d3.select("#range-label4").text(newRange.begin.toLocaleString() + " - " + newRange.end.toLocaleString());
        sliders_begin[3] = newRange.begin;
        sliders_end[3] = newRange.end;
        updateFilter();
    });

    slider4.range(0,100);


      function updateFilter() {
        filterList = d3.selectAll(".country")._groups[0];
        const dataLoc = require('./code_to_fullname.csv');
        // console.log(dataLoc);

        d3.csv(dataLoc, function(data) {
        for (i = 0; i < filterList.length; i++) {
          is_out = false
          for (k = 0; k < sliders_begin.length; k++) {
            for (j = 0; j < data.length; j++) {
              if (filterList[i].id.substring(7) == data[j].A2) {
                attribute = attributes[k]
                at_val = ""
                for (l = 0; l < list_dict[attribute].length; l++) {
                  if (data[j].Name == list_dict[attribute][l]["Name"]) {
                    at_val = list_dict[attribute][l].Value
                  }
                }
                if (at_val < sliders_begin[k] || at_val > sliders_end[k]) {
                    is_out = true
                }
              }
            }
          }
          if (is_out) {
            d3.select(filterList[i]).classed("country-filtered", true);
          } else {
            d3.select(filterList[i]).classed("country-filtered", false);
          }
        }
        })
      }

      function getTextBox(selection) {
        selection
          .each(function(d) {
            d.bbox = this
              .getBBox();
            })
        ;
      }

      function generateAttribute(dataLoc) {
        // console.log(dataLoc);
        var list = [];
        d3.csv(dataLoc, function(data) {
          // console.log(data[0].Value);
          for (var i = 0; i < data.length; i++) {
            list.push(data[i]);
          }
        })
        return list;
      }

      function readAttribute(country, tablename, attribute) {
          // console.log(data[0].Value);
          for (var i = 0; i < list_dict[attribute].length; i++) {
            if (attribute == 'population') {
                if (list_dict[attribute][i]["Name"] == country) {
                    document.getElementById(tablename).innerText = parseInt(list_dict[attribute][i].Value).toLocaleString();
                }
                // these will all need to be hardcoded  
             } else {
                if (list_dict[attribute][i]["Name"] == country) {
                    document.getElementById(tablename).innerText = list_dict[attribute][i].Value + "%";  // if not all of them are percent add another branch
                }
              }
          }
      }
      
      // on window resize
      $(window).resize(function() {
        // Resize SVG
        svg
          .attr("max-width", $("#map-holder").width())
          .attr("max-height", $("#map-holder").height())
        ;
      });

      // create an SVG
      var svg = d3
        .select("#map-holder")
        .append("svg")
        // set to the same size as the "map-holder" div
        // .attr("width", $("#map-holder").width())
        // .attr("height", $("#map-holder").height())
        .attr("viewBox", "0, 0, 1200, 600")
      ;


      // get map data
      d3.json(
        "https://raw.githubusercontent.com/andybarefoot/andybarefoot-www/master/maps/mapdata/custom50.json",
        function(json) {
          //Bind data and create one path per GeoJSON feature
          countriesGroup = svg.append("g").attr("id", "map");
          // add a background rectangle
          countriesGroup
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 3000)
            .attr("height", 1500)

          // draw a path for each feature/country
          countries = countriesGroup
            .selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("id", function(d, i) {
              return "country" + d.properties.iso_a3;
            })
            .attr("class", "country")
            // add a mouseover action to show name label for feature/country
            .on("mouseover", function(d, i) {
              d3.selectAll(".country").classed("country-hover", false);

              if (d3.select(this).classed("country-filtered") || d3.select(this).classed("country-click_hover")) {
              } else if (d3.select(this).classed("country-click")) {
                d3.select(this).classed("country-click_hover", true)
                document.getElementById("table-country-name2").innerText = d.properties.name;
                pop2 = readAttribute(d.properties.name, "table-country-pop2", 'population');

              } else {
                d3.select(this).classed("country-hover", true);
                document.getElementById("table-country-name2").innerText = d.properties.name;
                readAttribute(d.properties.name, "table-country-pop2", 'population');
                readAttribute(d.properties.name, "r2c4", 'death_rate');
                readAttribute(d.properties.name, "r2c5", 'obesity_rate');
                readAttribute(d.properties.name, "r2c6", 'unemployment');
                readAttribute(d.properties.name, "r2c7", 'death_rate');

              }
            })
            .on("mouseout", function(d, i) {
                document.getElementById("table-country-pop2").innerText = "";
                document.getElementById("table-country-name2").innerText = "";
                document.getElementById("r2c4").innerText = "";
                document.getElementById("r2c5").innerText = "";
                document.getElementById("r2c6").innerText = "";
                document.getElementById("r2c7").innerText = "";

                d3.select(this).classed("country-hover", false);
                if (d3.select(this).classed("country-click_hover")) {
                    d3.select(this).classed("country-click_hover", false)
                    d3.select(this).classed("country-click", true)
                }
            })
            .on("click", function(d, i) {
              document.getElementById("table-country-pop1").innerText = "";
              document.getElementById("table-country-name1").innerText = "";
              document.getElementById("r1c4").innerText = "";
              document.getElementById("r1c5").innerText = "";
              document.getElementById("r1c6").innerText = "";
              document.getElementById("r1c7").innerText = "";
              if (d3.select(this).classed("country-filtered")) {
                // do nothing?
              } else {
                d3.selectAll(".country").classed("country-click", false);
                d3.select(this).classed("country-click_hover", true);
                document.getElementById("table-country-name1").innerText = d.properties.name;
                readAttribute(d.properties.name, "table-country-pop1", 'population');
                readAttribute(d.properties.name, "r1c4", 'death_rate');
                readAttribute(d.properties.name, "r1c5", 'obesity_rate');
                readAttribute(d.properties.name, "r1c6", 'unemployment');
                readAttribute(d.properties.name, "r1c7", 'death_rate');

              }
            })
	    countryLabels = countriesGroup
            .selectAll("g")
            .data(json.features)
            .enter()
            .append("g")
            .attr("class", "countryLabel")
            .attr("id", function(d) {
              return "countryLabel" + d.properties.iso_a3;
            })
         }
      );

