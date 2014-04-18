jQuery(document).ready(function($){
	var actions = {
	    vote: function() {
	    	var poll = $(this).data('poll');
	    	var choice = $(this).text();
	    	$.ajax({
	    		url: '/polls/' + poll + '/vote',
	    		data: { choice: choice },
	    		method: 'post',
	    		success: function(response){
	    			console.log(response);
	    		},
	    		error: function(response){
	    			console.log('error');
	    			console.log(response);
	    		}
	    	});
	    }
	};

	$('body').on('click', '[data-action]', function() {
	    var action = $(this).data('action');
	    if (action in actions) {
	        actions[action].apply(this, arguments);
	    }
	});
})