$(function(){
	$(".box").eq(0).banner({
		imgs : [
			{src:"images/1.jpg", href:"xx1.html"},
			{src:"images/2.jpg", href:"xx2.html"},
			{src:"images/3.jpg", href:"xx3.html"},
			{src:"images/4.jpg", href:"xx4.html"}
		],
		width : 590,
		height : 470,
		duration : 5000,
		addPrevNextBtn: true
	});
	$(".box").eq(1).banner({
		imgs : [
			{src:"images/s_1.jpg!q90!cc_180x260", href:"xx1.html"},
			{src:"images/s_2.jpg!q90!cc_180x260", href:"xx2.html"},
		],
		width : 180,
		height : 260,
		duration : 2000,
		addPrevNextBtn : false
	});
});