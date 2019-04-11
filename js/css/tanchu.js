

$(document).ready(function($){
	$("#loginLink").click(function() {
		/* Act on the event */
		console.log("弹出层");
		$("#layer-mask").show();

		$("#layer-pop").show();

		$("#layer-close").click(function() {
			/* Act on the event */
			console.log("点击关闭");
			$("#layer-mask").hide();
			$("#layer-pop").hide();
		});
	});

})