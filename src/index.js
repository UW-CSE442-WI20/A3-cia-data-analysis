      
// variables for catching min and max zoom factors

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
    var sliders_end = [0, 0, 0, 0];
    var pop_list = generatePopulation();


    var slider1 = createD3RangeSlider(0, 2000000000, "#slider-container1");

    slider1.onChange(function(newRange){
        d3.select("#range-label1").text(newRange.begin + " - " + newRange.end);
        sliders_begin[0] = newRange.begin;
        sliders_end[0] = newRange.end;
        updateFilter();
    });

    slider1.range(0, 0);


     var slider2 = createD3RangeSlider(0, 2000000000, "#slider-container2");

    slider2.onChange(function(newRange){
        d3.select("#range-label2").text(newRange.begin + " - " + newRange.end);
        sliders_begin[1] = newRange.begin;
        sliders_end[1] = newRange.end;
        updateFilter();
    });

    slider2.range(0,0);


 var slider3 = createD3RangeSlider(0, 2000000000, "#slider-container3");

    slider3.onChange(function(newRange){
        d3.select("#range-label3").text(newRange.begin + " - " + newRange.end);
        sliders_begin[2] = newRange.begin;
        sliders_end[2] = newRange.end;
        updateFilter();
    });

    slider3.range(0,0);


 var slider4 = createD3RangeSlider(0, 1367485388, "#slider-container4");

    slider4.onChange(function(newRange){
        d3.select("#range-label4").text(newRange.begin + " - " + newRange.end);
        sliders_begin[3] = newRange.begin;
        sliders_end[3] = newRange.end;
        updateFilter();
    });

    slider4.range(0,1367485388);


      function updateFilter() {
        filterList = d3.selectAll(".country")._groups[0];
        const dataLoc = require('./code_to_fullname.csv');
        // console.log(dataLoc);
        d3.csv(dataLoc, function(data) {
        for (k = 0; k < sliders_begin.length; k++) {
          for (i = 0; i < filterList.length; i++) {
            for (j = 0; j < data.length; j++) {
              if (filterList[i].id.substring(7) == data[j].A2) {
                attribute = "";
                // Going to need to make sure that we have an if branch for each
                // of the 4 sliders so that we don't overwrite all the countries that are being dropped off
                // with just the last slider (Right now only 4th slider affects the map)
                for (l = 0; l < pop_list.length; l++) {
                  if (data[j].Name == pop_list[l]["Name"]) {
                    attribute = pop_list[l].Value;
                  }
                }
                if (attribute < sliders_begin[k] || attribute > sliders_end[k]) { 
                  d3.select(filterList[i]).classed("country-filtered", true);
                } else {
                  d3.select(filterList[i]).classed("country-filtered", false);
                }
              }
            }
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

       function generatePopulation() {
        const dataLoc = require('./population.csv');
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

      function readPopulation(country, tablename) {
        const dataLoc = require('./population.csv');
        // console.log(dataLoc);
        d3.csv(dataLoc, function(data) {
          // console.log(data[0].Value);
          for (var i = 0; i < data.length; i++) {
            if (data[i]["Name"] == country) {
              console.log(data[i].Name + "   " + data[i].Value);
              document.getElementById(tablename).innerText = data[i].Value;
            }
          }
        })
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
                d3.select(this).classed("country-hover", true);
                document.getElementById("country-label-box").innerText = "Country name: " + d.properties.name;
                document.getElementById("table-country-name2").innerText = d.properties.name;  
                pop2 = readPopulation(d.properties.name, "table-country-pop2");
            })
            .on("mouseout", function(d, i) {
                document.getElementById("country-label-box").innerText = "Country name:";
            })
            .on("click", function(d, i) {
              d3.selectAll(".country").classed("country-click", false);
              d3.select(this).classed("country-click", true);
              document.getElementById("table-country-name1").innerText = d.properties.name;
              pop = readPopulation(d.properties.name, "table-country-pop1");
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

