

$(document).ready(function($){

	// 登录链接事件
	$("#loginLink").click(function() {
		/* Act on the event */
		console.log("弹出层")
		// 显示遮罩层和窗体
		$("#layer-mask").show();

		$("#layer-pop").show();
		// 弹出层关闭事件
		$("#layer-close").click(function(event) {
			/* Act on the event */
			$("#layer-mask").hide();
			$("#layer-pop").hide();

		});
	});

})