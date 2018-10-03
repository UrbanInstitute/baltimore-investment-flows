var startIndex = 0;
var colors = ["#cfe8f3","#73bfe2","#1696d2","#0a4c6a","#000000"];
var pymChild = new pym.Child();
var ranges = {
	"sales_1000":{
		"range":[135,270,404,539,680]	
	},
	"permits_1000":{
		"range":[467,934,1402,1869,2336]	
	},
	"agg_1000":{
		"range":[1389,2778,4166,5555,6944]	
	},
	"res_1000":{
		"range":[656,1312,1967,2623,3279]	
	},
	"loans_1000":{
		"range":[556,1112,1668,2224,2780]	
	},
	"AnnualCRAp":{
		"range":[4884,9769,14653,19537,24573]	
	},
	"pub_1000":{
		"range":[228,456,684,912,1140]	
	},
	"miss_1000":{
		"range":[139,278,418,557,696]	
	}
}


// https://bl.ocks.org/shimizu/5f4cee0fddc7a64b55a9

	
d3.json("data/baltimore.geojson", function(err, data) {	
	d3.csv("data/tract_forFigs.csv", function(err, demo) {	
		mapDraw(data,demo);		
	});		
});

function mapDraw(geojson,demo) {

////// Initial map and other initial items//////
	mapboxgl.accessToken = 'pk.eyJ1IjoidXJiYW5pbnN0aXR1dGUiLCJhIjoiTEJUbmNDcyJ9.mbuZTy4hI_PWXw3C3UFbDQ';
	var map = new mapboxgl.Map({
	  container: 'map', 
	  // style:  'mapbox://styles/urbaninstitute/cjdozdvbd02lv2sswwwuxsxmr'
	  
	  // This is the city roads/water
	  style: 'mapbox://styles/urbaninstitute/cjm9fzb762tdd2ro26791vasq',

	  // This is just the labels (for on top)
	  // style: 'mapbox://styles/urbaninstitute/cjm6prd44d8w42smglmi2qrqx',
	  // center: [-77.0265709, 38.8970754], 
	  // zoom: 9,
	  interactive: true
	});

	// map bounds

	var sw = new mapboxgl.LngLat(-76.7340567, 39.185865);
	var ne = new mapboxgl.LngLat(-76.5244847, 39.376696);
	var llb = new mapboxgl.LngLatBounds(sw, ne);

	// zoom to DC bounds
	map.fitBounds(llb, { duration: 0, padding: 20 })

    var container = map.getCanvasContainer()
    var svg = d3.select(container).append("svg")

    var transform = d3.geoTransform({point: projectPoint});
	var path = d3.geoPath().projection(transform);

	console.log(demo)
	var key = d3.map(demo, function(d) { return d.tractID; });	

	var color = d3.scaleThreshold()
	    .domain([50000, 100000, 150000, 200000])
	    .range(["#cfe8f3","#73bfe2","#1696d2","#0a4c6a","#000000"]);

	// var featureElement = svg.selectAll("path")
	// 	.data(geojson.features)
	// 	.enter()
	// 	.append("path")		
	// 	.attr("class",function(d){	
	// 		return "tractmap tract t" + d.properties.GEOID
	// 	})
	// 	.attr("fill",function(d){
	// 		var geoid = d.properties.GEOID;
	// 		var thisVariable = +key.get(geoid)["aggregate investment $ Per capita"]
	// 		var thisColor = color(thisVariable)
	// 		return thisColor;
	// 	})

	// Functions!!!!	

    // function update() {
    //     featureElement.attr("d",path);        
    // }

	function projectPoint(lon, lat) {
        var point = map.project(new mapboxgl.LngLat(lon, lat));
		this.stream.point(point.x, point.y);
	}

    // Event Listeners
    map.on("viewreset", function(){    	
    	// map.fitBounds(llb, { duration: 0, padding: 20 })
    	// update()
		// pymChild.sendHeight()
		// console.log("viewreset")
    });	    	

   	var resizeTimer;	
	window.addEventListener("resize", function(e){
	  clearTimeout(resizeTimer);
	  resizeTimer = setTimeout(function() {	   	
		map.fitBounds(llb, { duration: 0, padding: 20 })
		// update()
		removeTooltip()
		pymChild.sendHeight()

	  }, 250);
	})

    // update()


  	// What to do when we get to the map in the parent container
	// pymChild.onMessage('hover', onHover);

	map.on('load', function () {
		
		var layers = map.getStyle().layers;
		console.log(layers)
	    // Find the index of the first symbol layer in the map style
	    var firstSymbolId;
	    for (var i = 0; i < layers.length; i++) {
	        if (layers[i].type === 'symbol') {
	            firstSymbolId = layers[i].id;
	            break;
	        }
	    }
	    
	    // https://www.mapbox.com/mapbox-gl-js/example/updating-choropleth/
	    // https://www.mapbox.com/help/mapbox-gl-js-expressions/
	    map.addLayer({
	        'id': 'urban-areas-fill',
	        'type': 'fill',
	        'source': {
	            'type': 'geojson',
	            'data': 'data/joined/balt_joined.geojson'
	        },
	        'layout': {},
			'paint': {
	            'fill-color': [
	                'interpolate',
	                ['linear'],
	                ['to-number',['get', 'miss_1000']],
	                0, '#F2F12D',
	                10, '#EED322',
	                20, '#E6B71E'
	            ],
	            'fill-opacity': 0.75
	        }
    	}, firstSymbolId);

	})

	function advance(item) {
		map.setPaintProperty("urban-areas-fill", 'fill-color', [
	                'interpolate',
	                ['linear'],
	                ['to-number',['get', item]],
	               	ranges[item].range[0], colors[0],
	               	ranges[item].range[1], colors[1],
	               	ranges[item].range[2], colors[2],
	               	ranges[item].range[3], colors[3],
	               	ranges[item].range[4], colors[4],
	            ]);
	}

	$("button").click(function(){
		console.log('here')
		advance("AnnualCRAp")
	})
}


// Toggle layers on/off
// https://www.mapbox.com/mapbox-gl-js/example/toggle-layers/
// https://www.mapbox.com/mapbox-gl-js/example/hover-styles/ hover details
// set paint property https://www.mapbox.com/mapbox-gl-js/example/color-switcher/
