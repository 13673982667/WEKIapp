var commonHtml = [
	{
		url:'../roomlist/index.html',
		name:'首页',
		icon:'mui-icon  mui-icon-chatboxes'
	},
	{
		url:'../integralMall/index.html',
		name:'积分商城',
		icon:'mui-icon iconfont  icon-store_icon'
	},
	{
		url:'../my/index.html',
		name:'我的',
		icon:'mui-icon  mui-icon-home'
	}
];
function createVue(){
	if(!vm){
		vm = new Vue({ 
			el:'#app',
			data:{ 
				navList:{}
			},
			methods:{
	
			},
			mounted:function(){
//				getUserType()
//				if(uType == null){
//					return mui.toast('出错了')
//				} 
//				if(uType == 0){
					this.$data.navList = commonHtml;
//				}
			},
			updated:function(){//当数据发生改变 渲染之后 
				subpages = [];
				for(k in this.$data.navList){
					subpages.push(this.$data.navList[k].url)
				}
	            jiazai()
	        },
		}) 
	}else{//有vue实例
		getUserType()
		if(uType == null){
			return mui.toast('出错了')
		}
		if(uType == 0){
			vm.$data.navList = commonHtml;
		}
	}
}

//检测用户登陆信息
function getUserInfo(){
	var uId = localStorage.getItem('uId');
	if(!uId){
		common.clearLogin();
	}
	var data = {       
		url:API.url1+'api/Users/checkUser',
		uId:uId
	}
	common.getp(data,function(e){
//		console.log(JSON.stringify(e)); 
//		alert(JSON.stringify(e)); 
		if(e.code == 1){ 
			uId = e.data.id
//			localStorage.setItem('uId',uId);
			createVue() 
		}else{ 
			common.clearLogin(); 
			mui.openWindow({
				url:'../login/index.html',
				id:'../login/index.html' 
			})
		}
	});
}



//静默更新
var wgtVer = null;
var wgtUrl;
var fn;
function ver(){
	// ......
    // 获取本地应用资源版本号
    plus.runtime.getProperty(plus.runtime.appid, function(inf) {
        wgtVer = inf.version;
        console.log("当前应用版本：" + wgtVer);
        update_wgt();
    });
}
function update_wgt(){
//	console.log(1.1 > '1.2'); 
    // 检测更新
    var data = {
    	url: API.url1+'api/Version/getVersion',
    };
    common.get(data,function(e){ 
//  		console.log(JSON.stringify(e)); 
    	
    	if(e.code == 1){
//  		console.log(JSON.stringify(e));
    		var data = e.data;
    		if(data.version != wgtVer){
    			wgtUrl = data.download_url
//  			if(mui.os.android){//安卓
	//  			}
    				fn = downWgt;
    			if(data.type == 0){ //静默更新  
    				downapk();
    			}else if(data.type == 1){//强制更新 
    				downapk();
    			} 
    		}
    	} 
    });  
}
function downapk(){ 
    mui.confirm('发现新版本是否更新？','消息',['更新','退出'],function(e){
    	if(e.index == 1){//退出
			plus.runtime.quit(); //关闭app
    	}else if(e.index == 0){
    		if(mui.os.ios){//如果是ios  打开appstore
    			var url = 'itms-apps://' //好像是打开appstore 后面是app下载地址 以后改
				plus.runtime.openURL( url, function(e){
					mui.toast(JSON.stringify(e))
				});
				return;
    		}
    		plus.nativeUI.showWaiting("正在更新");
    		fn();
    	}
    })
}
function downWgt(){
    console.log('下载wgt文件...');
//  plus.nativeUI.showWaiting("下载wgt文件...");
    plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
        if ( status == 200 ) { 
            console.log("下载wgt成功："+d.filename);
            installWgt(d.filename); // 安装wgt包
        } else {
//          console.log("下载wgt失败！");
//          plus.nativeUI.alert("下载wgt失败！");
        }
        plus.nativeUI.closeWaiting();
    }).start();
}
// 更新应用资源
function installWgt(path){
//  plus.nativeUI.showWaiting("安装wgt文件...");
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
//      plus.nativeUI.alert("应用资源更新完成！",function(){
//          plus.runtime.restart();  //重启应用  先关掉
//      });
    },function(e){
        plus.nativeUI.closeWaiting();
//      console.log("安装wgt文件失败["+e.code+"]："+e.message);
//      plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
    });
}


