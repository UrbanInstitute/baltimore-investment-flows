

(function() {

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
					
					// tell our graphic to update with a specific step
					// graphic.update(nextStep)		
					updateChart(nextStep)										
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

	waypoints()
	createDots()

})()

function updateChart(nextStep) {
	// update left-hand nav
	$(".bubble").removeClass("active")
	$(".bubble:nth-child(" + (nextStep+1) +")").addClass("active")

	// update inside of the chart
	$(".graphic div").html(nextStep)


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