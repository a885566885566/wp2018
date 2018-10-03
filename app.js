$('.curtain').each(function( index, value ) {
	$(this).css('margin-left', ((index+1)*20).toString() + '%');
});
$('.curtain_thin').each(function( index, value ) {
	$(this).css('margin-left', ((index+1)*20).toString() + '%');
});
//$('.eng_name').css({'font-size':'0em'});
$('.bar').css({width:'0%'});
$('.box').css({opacity:'0%', height:'0%'});
$('.box span').css({display:'none'});
$('#header_nav').css({display:'none'});
$('.introduction').css({display:'none'});
$('.subject').css({display:'none'});
$('.nav').css({display:'none'});


var rowing_speed = 500;
var delay_time = 250;
$('.curtain').each(function( index, value ) {
setTimeout(()=>{$(this).animate({height:'0%'}, rowing_speed)}, index*delay_time)}); 

//$('.eng_name').animate({'font-size':'5em'}, 2000);
//$('.eng_name').fadeIn(2000);
$('#header_nav').show('slide', 'right', 2000, ()=>{
	$('#Header').show('slide', 'right', 1000);
	setTimeout(()=>{$('.introduction').show('blind', 'down', 1000, ()=>{
		$('.subject').show('blind', 'down', 1000)
		$('.bar').animate({width:'100%'}, 2000, ()=>{
			$('.box').animate({opacity:'0%', height:'3em', padding:'0px 25px 0px 25px'}, 1000, ()=>{
				//$('div span').css({display:'block'});
				//$('#info').show('blind', 'down', 1000);
				//$('.box span').animate({display:'block'}, 1000);
				$('.nav').show('slide', 'right', 1000);
			})
		});
	})})
});



/*setTimeout(()=>{$('.row').animate({opacity:'100%'}, 10000)}, 2000);
/*
$('.c1').animate({height:'0%'}, rowing_speed, function(){
	$('.c2').animate({height:'0%'}, rowing_speed, function(){
		$('.c3').animate({height:'0%'}, rowing_speed, function(){
			$('.c4').animate({height:'0%'}, rowing_speed, function(){
$('.c5').animate({height:'0%'}, rowing_speed)})})})})
*/