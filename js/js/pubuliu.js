function waterfall(wrap,boxs){
	// 浏览器可以显示的列数
	var boxWidth =  boxs[0].offsetWidth + 20;//offsetWidth内容的宽度+padding的宽度+bored，不算margin
	var windowWidth = document.documentElement.clientWidth;
	var cols = Math.floor(windowWidth / boxWidth);
	console.log(cols);

	// 设置容器宽度
	wrap.style.width = boxWidth * cols +"px;";

	// 定义每一个数组并存储每一列的高度
	var everyHeight = new Array();
	for(var i = 0;i<boxs.length;i++){
		if (i<cols){
			everyHeight[i] = boxs[i].offsetHeight + 20;

		}else{
			var minHeight = Math.min.apply(null,everyHeight);
			console.log("everyHeight %o",everyHeight);
			var minIndex = getIndex(minHeight,everyHeight);
			console.log("minIndex %o",minIndex);
			// console.log("boxs[minIndex].offsetLeft %o",boxs[minIndex].offsetLeft);
			var leftValue = boxs[minIndex].offsetLeft - 10;
			// console.log("leftValue %o",leftValue);
			boxs[i].style.postion = "absolute";
			boxs[i].style.top = minHeight +"px;";
			boxs[i].style.left = leftValue +"px;";
			everyHeight[minIndex] += boxs[i].offsetHeight +20;

		};
	};

};

// 获取最小列的索引
function getIndex(minHeight,everyHeight){
	for(index in everyHeight){
		if(everyHeight[index] == minHeight){
			return index;
		}
	}

}


window.onload = function(){
	var wrap = document.getElementById("wrap");
	var boxs =wrap.getElementsByTagName("div");

	waterfall(wrap,boxs);	
}