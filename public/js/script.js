$(document).ready(function(){
	
	$('#cta').on('click', function(event){
		event.preventDefault();
		$.get('/shop', function(data){
			console.log(data);
		});
	})


}); //Closing Document Ready Tags