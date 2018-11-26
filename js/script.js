var startIndex = 0;
var colors = ["#cfe8f3","#73bfe2","#1696d2","#0a4c6a","#000000"];

// define starting variable
var curStep = "capFlowRate";
var circleOpacity = 0.8;
var fillOpacity = 0.7;

ready();	

function ready() {

	waypoints();
	createDots();
	longchart();
	shortchart();
	
	var map = mapDraw();	
	
	// map bounds
	var sw = new mapboxgl.LngLat(-76.7156027, 39.196494);
	var ne = new mapboxgl.LngLat(-76.5309037, 39.372537);
	var llb = new mapboxgl.LngLatBounds(sw, ne);

	// zoom to DC bounds
	map.fitBounds(llb, { duration: 0, padding: 10 })

    // Event Listeners
   	var resizeTimer;	
	window.addEventListener("resize", function(e){
	  clearTimeout(resizeTimer);
	  resizeTimer = setTimeout(function() {	   	
		map.fitBounds(llb, { duration: 0, padding: 10 })
		// update()
		// removeTooltip()
		// pymChild.sendHeight()

	  }, 250);
	})


	// helper function so we can map over dom selection
	function selectionToArray(selection) {
		var len = selection.length
		var result = []
		for (var i = 0; i < len; i++) {
			result.push(selection[i])
		}
		return result
	}

	// create waypoints for 
	function waypoints() {
		// select elements
		var graphicEl = document.querySelector('#story-container')
		var graphicVisEl = graphicEl.querySelector('#sticky-right')
		var triggerEls = selectionToArray(graphicEl.querySelectorAll('.trigger'))

		// viewport height
		var viewportHeight = window.innerHeight
		var halfViewportHeight = Math.floor(viewportHeight / 2)

		// a global function creates and handles all the vis + updates
		// var graphic = createGraphic('.graphic')

		// handle the fixed/static position of grahpic
		var toggle = function(fixed, bottom) {
			if (fixed) graphicVisEl.classList.add('is-fixed')
			else graphicVisEl.classList.remove('is-fixed')

			if (bottom) graphicVisEl.classList.add('is-bottom')
			else graphicVisEl.classList.remove('is-bottom')
		}
		
		// setup a waypoint trigger for each trigger element
		var waypoints = triggerEls.map(function(el) {
			
			// get the step, cast as number					
			var step = +el.getAttribute('data-step')

			return new Waypoint({
				element: el, // our trigger element
				handler: function(direction) {
					// if the direction is down then we use that number,
					// else, we want to trigger the previous one
					var nextStep = direction === 'down' ? step : Math.max(0, step - 1)
					
					if (direction === 'down') {
						var nextStep = step;
						var dataName = el.getAttribute('data-name');
					} else {
						var nextStep = Math.max(0, step - 1)
						try {							
							var dataName = $(el)[0].previousElementSibling.getAttribute('data-name');
						} 
						catch(err) {
							var dataName = el.getAttribute('data-name');
						}
					}

					// tell our graphic to update with a specific step
					try {
						curStep = dataName;
						updateChart(nextStep, dataName)	
					}
					catch(err) {}
					
				},
				offset: '50%',  // trigger halfway up the viewport
			})
		})

		// enter (top) / exit (bottom) graphic (toggle fixed position)
		var enterWaypoint = new Waypoint({
			element: graphicEl,
			handler: function(direction) {
				var fixed = direction === 'down'
				var bottom = false
				toggle(fixed, bottom)
			},
		})

		var exitWaypoint = new Waypoint({
			element: graphicEl,
			handler: function(direction) {
				var fixed = direction === 'up'
				var bottom = !fixed
				toggle(fixed, bottom)
			},
			offset: 'bottom-in-view', // waypoints convenience instead of a calculation
		})
	}

	function createDots() {
		// Count number of "trigger"
		var numTriggers = $('.trigger').length
		// create div for each
		for (var i = 0; i < numTriggers; i++) {
			// get item label

			var name = $('.trigger')[i].getAttribute('data-name');
			var itemLabel = varListMaster[name].chartTitle;
			
			// append items
			$(".bubble-nav").append("<div class='bubble'><div class='label'><p class='bubble-text'>" + itemLabel +"</p></div></div>");
		}
		
		// set first to active
		// $(".bubble").first().addClass("active")
		
		// create clearing div below everything
		$(".bubble-nav").append("<div class='clearer'></div>")
	}


	function updateChart(nextStep,dataName) {
		// update left-hand nav		
		$(".bubble").removeClass("active")

		$(".bubble:nth-child(" + (nextStep+1) +")").addClass("active")

		$(".chart-type").addClass("inactive")
		if (varListMaster[dataName].chartType === "poly-map") {
			$("#map").removeClass("inactive")
			advanceMap(map, dataName)	
		} else if (varListMaster[dataName].chartType === "long-bar-chart") {
			$("#chartLong").removeClass("inactive")
		} else if (varListMaster[dataName].chartType === "hor-bar-chart") {			
			$("#chartSmall").removeClass("inactive")
		}
		// update inside of the chart
		// use try???? if item is below the fold on load, don't shoot error
		
		// $(".graphic div").html(nextStep)

	}

	function mapDraw() {

	////// Initial map and other initial items//////
		mapboxgl.accessToken = 'pk.eyJ1IjoidXJiYW5pbnN0aXR1dGUiLCJhIjoiTEJUbmNDcyJ9.mbuZTy4hI_PWXw3C3UFbDQ';
		var map = new mapboxgl.Map({
		  container: 'map', 
		  style: 'mapbox://styles/urbaninstitute/cjm9fzb762tdd2ro26791vasq',
		  interactive: false
		});

		return map;
	}

	function advanceMap(map, item) {
		map.setPaintProperty("urban-areas-fill", 'fill-color', [
	                'interpolate',
	                ['linear'],
	                ['to-number',['get', item]],
	               	varListMaster[item].range[0], colors[0],
	               	varListMaster[item].range[1], colors[1],
	               	varListMaster[item].range[2], colors[2],
	               	varListMaster[item].range[3], colors[3],
	               	varListMaster[item].range[4], colors[4],
	            ]);
	}



	map.on('load', function () {		
		
		var layers = map.getStyle().layers;
		// console.log(layers)
	    // Find the index of the first symbol layer in the map style
	    var firstSymbolId;
	    for (var i = 0; i < layers.length; i++) {
	        if (layers[i].type === 'symbol') {
	            firstSymbolId = layers[i].id;
	            break;
	        }
	    }
	    
	    map.addLayer({
	        'id': 'urban-areas-fill',
	        'type': 'fill',
	        'source': {
	            'type': 'geojson',
	            'data': 'data/joined/balt_joined2.geojson'
	        },
	        'layout': {},
			'paint': {
				'fill-opacity': fillOpacity
				// 'fill-opacity': [
				// 	  "match",
				// 	  ["get", "HighPov_numeric"],
				// 	  ["1"],
				// 	  fillOpacity,		
				// 	  .1
				// 	]
			}
		// Do not remove, this is how you would bring the neighborhood name layer on top
    	// }, firstSymbolId);
    	});


    	map.addLayer({
	        'id': 'balt-tract-lines',
	        'type': 'line',
	        'source': {
	            'type': 'geojson',
	            'data': 'data/joined/balt_joined2.geojson'
	        },
	        'layout': {},
			"paint": {
	            "line-color": "#fff",
	            "line-width": 1
	        }			
    	});    	

	  //   map.addLayer({
	  //       'id': 'balt-tract-lines2',
	  //       'type': 'line',
	  //       'source': {
	  //           'type': 'geojson',
	  //           'data': 'data/joined/balt_joined2.geojson'
	  //       },
	  //       'layout': {},
			// "paint": {
	  //           "line-color": [
	  //               'interpolate',
	  //               ['linear'],
	  //               ['to-number',['get', "HighPov_numeric"]],
	  //              	0, "transparent",
	  //              	1, "#fdbf11",	     
	  //           ],
	  //           "line-width": 4
	  //       }
   //  	});   




	 //    map.addLayer({
	 //        'id': 'dots',
	 //        'type': 'circle',
	 //        'source': {
	 //            'type': 'vector',
	 //            'url': 'mapbox://urbaninstitute.1lmj6hin'
	 //        },
	 //        'source-layer':'combined_race_200-cg5tla',
	 //        'layout': {},
		// 	'paint': {'circle-color':[
		// 	  "match",
		// 	  ["get", "type"],
		// 	  "aapi",
		// 	  "#000",
		// 	  "hisp",
		// 	  "#fdbf11",
		// 	  "white",
		// 	  "#ec008b",
		// 	  "black",
		// 	  "hsl(199, 81%, 45%)",
		// 	  "#fdbf11"
		// 	],
		// 	'circle-radius':[
		// 	  "interpolate",
		// 	  ["exponential", 1.06],
		// 	  ["zoom"],
		// 	  0,
		// 	  1,
		// 	  14,
		// 	  4,
		// 	  22,
		// 	  15
		// 	],
		// 	'circle-opacity':circleOpacity
		// }
  //   	});

  		// console.log('start')
  		// updateChart(0, curStep)
	    // advanceMap(map, curStep)
	})


	// $("button").click(function(){
	// 	advanceMap(map, "AnnualCRAp")
	// })

	// initialize click function for lefthand nav bubbles
	$(".bubble").click(function(){
		// Get div index
		var index = $(this).parent().children().index(this)
		// Get div
		var mover = $(".trigger").eq(index)		

		// Scroll to div
		$('html,body').animate({
        	scrollTop: mover.offset().top - 100},
        	'slow');
	})



}

// wrap text
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", -5).attr("y", y).attr("dy", (dy-0.75) + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", -5).attr("y", y).attr("dy", ++lineNumber * lineHeight + (dy) + "em").text(word);
      }
    }
  });
}