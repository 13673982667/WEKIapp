const  API = {
	url:'http://122.114.166.181:9501/',//
	url1:'http://jln901.top/',//
	
//	url:'http://106.12.91.213:9501/',
//	url1:'http://192.168.0.110/',//
//	url1:'http://192.168.0.110/api.php/',
//	socket:'ws://192.168.0.102:9501'
	socket:'ws://122.114.166.181:9501'

}  
var defaultHead = '../../img/touxiang.png';
var connect = false;
var uId = localStorage.getItem('uId');
var uType = localStorage.getItem('uType');//用户类型
var $_GET = (function() {
	var url = window.document.location.href.toString();
	var u = url.split("?");
	if (typeof(u[1]) == "string") { 
		u = u[1].split("&");  
		var get = {};
		for (var i in u) {
			var j = u[i].split("="); 
			get[j[0]] = j[1];
		}
		return get;
	} else { 
		return {}; 
	} 
})();

//阻止a标签跳转 
mui('body').on('click','a',function(e){
	e.preventDefault();
	var href = $(this).attr('href') 
	if(href && href.length>1 && href.substring(0,1) !== '#'){
		mui.openWindow({
			url:href, 
			id:href
		})
	} 
});

!(function(com){

	com.get = function(data,fn,async){
		var url = data.url ? data.url : API.url
		if(data.url){
			delete data.url
		}
		data.isApp = true;
		$.ajax({
			url:url,
			type:'GET',
	    	data:data,
	    	dataType:'json',
	    	timeout:'10000',
	    	async:async ? false : true,
	    	success:function(e){
	    		fn(e);
	    	},
	    	error:function(e){
	    		fn(e);
	    	},
		})
	}
	com.post = function(data,fn){
		var url = data.url ? data.url : API.url
		if(data.url){
			delete data.url
		}
		data.isApp = true;
		$.ajax({
			url:url,
			type:'POST',
	    	data:data,
	    	timeout:'5000',
	    	dataType:'json',
	    	success:function(e){
	    		fn(e);
	    	},
	    	error:function(e){
	    		fn(e);
	    	},
		})
	}
	//使用等待框
	com.getp = function(data,fn){
		plus.nativeUI.showWaiting();  //显示等待框
		var url = data.url ? data.url : API.url
		if(data.url){
			delete data.url
		}
		data.isApp = true;
		$.ajax({
			url:url,
			type:'GET',
	    	data:data,
	    	dataType:'json',
	    	timeout:'5000',
	    	success:function(e){
	    		fn(e);
	    		plus.nativeUI.closeWaiting(); //关闭等待框
	    	},
	    	error:function(e){
	    		fn(e);
	    		plus.nativeUI.closeWaiting(); //关闭等待框
	    	},
		})
	}
	//使用等待框
	com.postp = function(data,fn){
		var url = data.url ? data.url : API.url
		if(data.url){
			delete data.url
		}
		plus.nativeUI.showWaiting();  //显示等待框
		data.isApp = true;
		$.ajax({
			url:url,
			type:'POST',
	    	data:data,
	    	dataType:'json',
	    	timeout:'5000',
	    	success:function(e){
	    		fn(e);
	    		plus.nativeUI.closeWaiting(); //关闭等待框
	    	},
	    	error:function(e){
	    		fn(e);
	    		plus.nativeUI.closeWaiting(); //关闭等待框
	    	},
		})
	}
	//打开的页面需要登陆的时候
	com.openWindow = function(obj){
		if(uId){
			mui.openWindow(obj)
		}
	}
	
	//时间格式化
	com.dateFtt = function(fmt,date)   
	{ //author: meizz   
	  var o = {   
	    "M+" : date.getMonth()+1,                 //月份   
	    "d+" : date.getDate(),                    //日   
	    "h+" : date.getHours(),                   //小时   
	    "m+" : date.getMinutes(),                 //分   
	    "s+" : date.getSeconds(),                 //秒   
	    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
	    "S"  : date.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
	    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
	}  
	com.crtTimeFtt = function(value,row,index){
	    var crtTime = new Date(value ? (value * 1000) : new Date()); 
	    if(!row){
	    	row = 'yyyy-MM-dd:hh:mm:ss'
	    }else if (row == 1){
	    	row = 'hh:mm:ss'
	    }
	    return com.dateFtt(row,crtTime);//直接调用公共JS里面的时间类处理的办法     
	}
	//清除登陆信息
	com.clearLogin = function(){
		
	}
	
}(window.common ? window.common : window.common = {}))

