	//轮播图jquery
$(document).ready(function(){
	var index = 0;
	var length = $('#list li').size();
	var time = null;

	function show(){
		$('#list li').eq(index).stop().fadeIn().siblings().stop().fadeOut();
		$('.list li').eq(index).addClass('bg').siblings().removeClass('bg');
	}
	show();
  function showtime(){
		index ++
		if (index > length-1) {
			index = 0;
		}
  	show();
  }
  time = setInterval(showtime,2000);

  $('#list li').mouseover(function(){
  	clearInterval(time);
  });
  $('#list li').mouseleave(function(){
  	show();
  	time = setInterval(showtime,2000);
  });

  $('.list li').click(function(){
  	clearInterval(time);
  	index = $(this).index();
  	show();
  	time = setInterval(showtime,2000);
  })
  $('.ileft').click(function(){
  	clearInterval(time);
  	index--;
  	if (index < 0) {
  		index = length-1;
  	}
  	show();
  	time = setInterval(showtime,2000);
  })
  $('.iright').click(function(){
  	clearInterval(time);
  	index++;
  	if (index > length - 1) {
  		index = 0
  	}
  	show();
  	time = setInterval(showtime,2000);
  })
})