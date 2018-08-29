var vm;
!function(fn){
	fn.createVue = function(){
		vm = new Vue({
			el:'#app',
			data:{
				ready:false,
				address_lists:{},
				region_list:{}
			},
			methods:{ 
				handClick:function(e,k){
					if(!uId){
						return mui.openWindow({
							url:'../login/index.html',
							id:'../login/index.html' 
						})
					} 
					var parameter = k ? '?address_id='+k : '';	
					mui.openWindow({
						url:e + parameter,
						id:e 
					})
				},
				handClickLi:function(k){
					if(closeId){
						//先通知
						var target = plus.webview.getWebviewById(closeId)//mui的底部导航的界面id 就是url	
						mui.fire(target, 'addressSel', {
							'address_id': k //自定义事件参数
						});
						mui.back();
					}
				}
			},
			mounted:function(){
				this.$data.ready = true;
				fn.getList();
			},
			updated:function(){
				
			}
		})
	}
	fn.getList = function(){
		var data = {
			url : API.url1 + 'api/Users/address_list',
			uId : uId
		}
		common.getp(data,function(e){
//			console.log(JSON.stringify(e));
			if(e.code == 1){
				vm.$data.address_lists = e.data.address_lists
				vm.$data.region_list = e.data.region_list
//				console.log(JSON.stringify(vm.$data.address_lists));
			}
		});
	}  
}(window.fns ? window.fns : window.fns = {})

document.addEventListener('plusready',function(){
	fns.createVue()
	var self_ = plus.webview.currentWebview();  //获得自己
	closeId = self_.closeId; 
},false)
 

