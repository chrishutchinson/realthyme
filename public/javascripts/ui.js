jQuery(document).ready(function($){
	// Array of actions - keeps everything neat
	var actions = {
		// Vote in the poll
	    vote: function() {
	    	var poll = $(this).data('poll');
	    	var choice = $(this).text();
	    	$.ajax({
	    		url: '/polls/' + poll + '/vote',
	    		data: { choice: choice },
	    		method: 'post',
	    		success: function(poll){
	    			actions.drawChart(poll);
	    		},
	    		error: function(response){
	    			console.log('Error', response);
	    		}
	    	});
	    },	

	    // Draw the chart
	    drawChart: function(poll){
	    	// Redraw the chart
	    	var heighestVote = Math.max.apply(Math, poll.votes);
	    	var stepWidth = 5;
	    	if(heighestVote == '-Infinity'){
	    		var steps = (10)/stepWidth;
	    	} else {
	    		var steps = (Math.ceil(heighestVote/10)*10)/stepWidth;
	    	}

			var chartData = {
				labels: poll.choices,
				datasets: [{
					data: poll.votes,
				}],
			};
			var chartOptions = {
				scaleOverlay: true,
				scaleOverride: true,
				scaleSteps: steps,
				scaleStepWidth: stepWidth,
				scaleStartValue: 0,
			};

			$('#results').html('').attr('width', 400).attr('height', 400).css({ height: '', width: '' }); // We clear the entire results canvas before redrawing

			var ctx = document.getElementById('results').getContext("2d");
			var chart = new Chart(ctx).Bar(chartData, chartOptions);
	    },

	    // Initialise the chart on first load
	    initialiseChart: function() {
	    	if(typeof pollID !== 'undefined'){
		    	$.ajax({
		    		url: '/polls/' + pollID,
		    		method: 'get',
		    		success: function(poll){
		    			actions.drawChart(poll);
		    		},
		    		error: function(response){
		    			console.log('Error', response);
		    		}
		    	});
		    }
	    },

	    cloneField: function(){
	    	var field = $(this).clone();
	    	$(this).removeAttr('data-action');
	    	$(this).after(field);
	    }
	};

	// Trigger these actions on load
	actions.initialiseChart();

	// Handles any clicks on elements with [data-action] attributes as required
	$('body').on('click', '[data-action]', function() {
	    var action = $(this).data('action');
	    if (action in actions) {
	        actions[action].apply(this, arguments);
	    }
	});
});