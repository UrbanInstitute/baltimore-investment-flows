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
}; 

// define starting variable
var curStep = "agg_1000"

ready();

function ready() {

	// helper function so we can map over dom selection
	function selectionToArray(selection) {
		var len = selection.length
		var result = []
		for (var i = 0; i < len; i++) {
			result.push(selection[i])
		}
		return result
	}

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
			var itemLabel = getRandomTitle()
			// append items
			$(".bubble-nav").append("<div class='bubble'><div class='label'><p class='bubble-text'>" + itemLabel +"</p></div></div>");
		}
		
		// set first to active
		$(".bubble").first().addClass("active")
		
		// create clearing div below everything
		$(".bubble-nav").append("<div class='clearer'></div>")
	}


	function updateChart(nextStep,dataName) {
		// update left-hand nav
		$(".bubble").removeClass("active")
		$(".bubble:nth-child(" + (nextStep+1) +")").addClass("active")

		// update inside of the chart
		// use try???? if item is below the fold on load, don't shoot error
		advance(map, dataName)
		// $(".graphic div").html(nextStep)

	}

	function getRandomTitle() {
		var words = "suricate homonomous unconsiderable asphaltene sturdiness Trionyx pigmentation episcope torchlight keynoter Kharia osmose Halteridium underproduce misbecomingly compulsory zyme overdaringly Cristivomer unaffrightedly bailey septemplicate alterity sarcophagy"
		var words = words.split(" ")	
		var max = 10;
		var min = 3;
		var num = Math.floor(Math.random() * (max - min) ) + min;
		var num2 = Math.floor(Math.random() * (max - min) ) + min;
		var randTitle = "";
		for (var i = 0; i < num; i++) {
			randTitle = randTitle + " " + words[i+num2];
		}

		return randTitle;
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

	function advance(map, item) {
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

	waypoints();
	createDots();
	var map = mapDraw();	
	

	// map bounds
	var sw = new mapboxgl.LngLat(-76.7156027, 39.196494);
	var ne = new mapboxgl.LngLat(-76.5309037, 39.372537);
	var llb = new mapboxgl.LngLatBounds(sw, ne);

	// zoom to DC bounds
	map.fitBounds(llb, { duration: 0, padding: 10 })
	


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
		map.fitBounds(llb, { duration: 0, padding: 10 })
		// update()
		// removeTooltip()
		// pymChild.sendHeight()

	  }, 250);
	})

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
	            'data': 'data/joined/balt_joined.geojson'
	        },
	        'layout': {},
			'paint': {}
    	}, firstSymbolId);

	    advance(map, curStep)
	})


	$("button").click(function(){
		advance(map, "AnnualCRAp")
	})

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