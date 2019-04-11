
var waterfall = function(wrap,boxs){
	// 浏览器可以显示的列数
	var boxWidth = boxs.eq(0).width() + 40;//width内容的宽度，不算padding和margin和bored
	var windowWidth = $(window).width();
	var cols = Math.floor(windowWidth / boxWidth);

	// 设置容器宽度
	wrap.width(boxWidth*cols);

	// 定义每一个数组并存储每一列的高度
	var everyHeight = new Array();
	for(var i = 0;i<boxs.length;i++){
		if (i<cols){
			everyHeight[i] = boxs.eq(i).height() + 40;

		}else{
			var minHeight = Math.min.apply(null,everyHeight);
			
			var minIndex = getIndex(minHeight,everyHeight);
			// console.log("minIndex %o",minIndex);
			var leftValue = boxs.eq(minIndex).position().left;
			// console.log("leftValue %o",leftValue);
			setStyle(boxs.eq(i),minHeight,boxs.eq(minIndex).position().left,i);
				
			everyHeight[minIndex] += boxs.eq(i).height() +40;

		};
		boxs.eq(i).hover(function(){
			$(this).stop().animate({"opacity":"0.5"},500);
		},function(){
			$(this).stop().animate({"opacity":"1"},500);
		})
	};

}

// 获取最小列的索引
function getIndex(minHeight,everyHeight){
	for(index in everyHeight){
		if(everyHeight[index] == minHeight){
			return index;
		}
	}

}

// 设置追加盒子的样式
var getStartNum = 0;
var setStyle = function(box,top,left,index){
	if (getStartNum>=index){
		return false;
	}
	box.css({	
		"postion":"absolute",
		"top":top,
		"left":left,
		"opacity":"0"
	}).stop().animate({
		"opacity": "1"},1000);
	getStartNum=index;
		

	

}

// 数据请求检验
var getCheck = function(wrap){
	// 获取文档高度
	var documentHeight = $(window).height();
	// 获取文档向上高度
	var scrollHeight = $(window).scrollTop();
	//获取最后一个盒子所在列的高度
	var boxs = wrap.children('div');
	var lastBoxTop = boxs.eq(boxs.length-1).offset().top;
	var lastHeight = boxs.eq(boxs.length-1).height() + 20;
	var lastColHeight = lastBoxTop + lastHeight;
	return documentHeight + scrollHeight >= lastColHeight?true:false;
}



// 追加盒子函数
var appendBox = function(wrap){
	if(getCheck(wrap)){
	wrap.append('<div><img src="img/guai1.jpg" alt=""><a href="http://www.baidu.com" target="_blank">第一怪：鸡蛋用草串着卖</a></div>')
	}else{return false;
	};
	waterfall(wrap,wrap.children('div'));

}



$(document).ready(function(){
	var wrap = $("#wrap");
	var boxs = $("#wrap").children("div");
	waterfall(wrap,boxs);

	$(this).scroll(function(){
		appendBox(wrap);
	

	})

})


