//封装获取ID的参数
function byId(id) {
	return typeof(id)==="string"?document.getElementById(id):id;
}


var index = 0,
	timer = null,
	dots = byId("dots").getElementsByTagName("span"),
	prev = byId("prev"),
	next = byId("next"),
	pics = byId("banner").getElementsByTagName("div"),
	len = pics.length,
	menu = byId("menu-content"),
	menuItems = menu.getElementsByClassName("menu-item"),
	subMenu = byId("sub-menu"),
	innerBox = subMenu.getElementsByClassName("inner-box");
	

function slideImg() {
	var main = byId("main");
	// 滑过清除定时器，离开继续
	main.onmouseover = function(){
		// 清除定时器
		if (timer) clearInterval(timer);

	}
	main.onmouseout = function(){
		// 间歇调用
		timer = setInterval(function(){
			index++;
			if (index>=len){
				index = 0;
			}
			// 切换图片
			changImg();			
			console.log(index);	

		},2000)

	}


	// 上面的main.onmouseout是一个事件，下面的是一个方法
	// 自动在main上触发鼠标离开时的事件
	main.onmouseout();


	// 圆点切换图片
	for(var d=0;d<len;d++){
		// 给所有span添加一个ID属性，值为d,作为当前span的索引
		dots[d].id = d;
		dots[d].onclick = function(){
			// 改变index为当前span的索引
			index = this.id;

			// 切换图片
			changImg();			
		}

	}

	// 按钮切换图片
	next.onclick = function(){
		index++;
		if (index>=len){
			index = 0;
		}
		changImg();
	}
	prev.onclick = function(){
		index--;
		if (index<0){
			index = len-1;
		}
		changImg();
	}

	// 导航菜单
	for(var m=0;m<menuItems.length;m++){
		menuItems[m].setAttribute("data-index",m);
		// 主菜单项滑过
		menuItems[m].onmouseover = function(){
			subMenu.className = "sub-menu";
			var idx = this.getAttribute("data-index");
			// 遍历所有子菜单，将每一个都隐藏
			for(var j=0;j<innerBox.length;j++){
				innerBox[j].style.display = "none";
				menuItems[j].style.background = "none";
			}
			
			innerBox[idx].style.display = "block";
			menuItems[idx].style.background = "rgba(0,0,0,0.1)";


		}
		// 主菜单项离开
		menuItems[m].onmouseout = function(){
				for(var k=0;k<innerBox.length;k++){
				menuItems[k].style.background = "none";
			}			
		}		
	}
	menu.onmouseout = function(){
		subMenu.className = "sub-menu hide";

	}	
	subMenu.onmouseover = function(){
		this.className = "sub-menu";
	}
	subMenu.onmouseout = function(){
		this.className = "sub-menu hide";
	}
}
// 切换图片
function changImg(){
	// 遍历banner下的di及dots下的所有span，将div隐藏，span清除类
	for(var i = 0;i<len;i++){
		pics[i].style.display = "none";
		dots[i].className = "";
	}
	// 根据index索引找到当前div和当前span，将其显示和设为当前
	pics[index].style.display = "block";
	dots[index].className = "active";

}

slideImg()