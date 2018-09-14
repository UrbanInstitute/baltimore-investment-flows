var startIndex = 0;

var pymChild = new pym.Child();

// https://bl.ocks.org/shimizu/5f4cee0fddc7a64b55a9

	
d3.json("data/baltimore.geojson", function(err, data) {	
	d3.csv("data/tract_forFigs.csv", function(err, demo) {	
		mapDraw(data,demo);		
	});		
});

function mapDraw(geojson,demo) {
	// var indiaLoc = [-76.9274017,38.903382];
	// var indiaSchool = [-77.0707787,38.915167];

////// Initial map and other initial items//////
	mapboxgl.accessToken = 'pk.eyJ1IjoidXJiYW5pbnN0aXR1dGUiLCJhIjoiTEJUbmNDcyJ9.mbuZTy4hI_PWXw3C3UFbDQ';
	var map = new mapboxgl.Map({
	  container: 'map', 
	  style: 'mapbox://styles/urbaninstitute/cjdozdvbd02lv2sswwwuxsxmr', 
	  // center: [-77.0265709, 38.8970754], 
	  // zoom: 9,
	  interactive: false
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

	var featureElement = svg.selectAll("path")
		.data(geojson.features)
		.enter()
		.append("path")		
		.attr("class",function(d){
			console.log(d)
			return "tractmap tract t" + d.properties.GEOID
		})

	// Functions!!!!	

    function update() {
        featureElement.attr("d",path);        
    }

	function projectPoint(lon, lat) {
        var point = map.project(new mapboxgl.LngLat(lon, lat));
		this.stream.point(point.x, point.y);
	}

    // Event Listeners
 //    map.on("viewreset", function(){    	
 //    	// map.fitBounds(llb, { duration: 0, padding: 20 })
 //    	update()
	// 	// pymChild.sendHeight()
	// 	// console.log("viewreset")
 //    });	    	

   	var resizeTimer;	
	window.addEventListener("resize", function(e){
	  clearTimeout(resizeTimer);
	  resizeTimer = setTimeout(function() {	   	
		map.fitBounds(llb, { duration: 0, padding: 20 })
		update()
		removeTooltip()
		pymChild.sendHeight()

	  }, 250);
	})

    update()


  	// What to do when we get to the map in the parent container
	pymChild.onMessage('hover', onHover);
}

