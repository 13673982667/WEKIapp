var vm;
!function(fn){
	fn.createVue = function(){
		vm = new Vue({
			el:'#app',
			data:{
				ready:false,
				userInfo:{
					'nickname':'请登陆',
					'head_pic':'../../img/touxiang.png'
				}
			},
			methods:{ 
				handClick:function(e){
					if(!uId){
						return mui.openWindow({
							url:'../login/index.html',
							id:'../login/index.html' 
						})
					}
					if(!uId){
						return mui.toast('链接异常')
					}
					mui.openWindow({
						url:e,
						id:e 
					})
				}
			},
			mounted:function(){
				this.$data.ready = true;
				fns.getInfo();
			},
			updated:function(){
				
			}
		})
	} 
	
	fn.getInfo = function(){ 
		var data = {
			url:API.url1+'api/Users/getUserInfo',
			uId:uId
		} 
		common.get(data,function(e){
			console.log(JSON.stringify(e)); 
			if(e.code == 1){ 
				connect = true;
				vm.$data.userInfo = e.data
			} else{  
				connect = false;
				mui.toast('链接异常')
			}
		});  
	} 
	
}(window.fns ? window.fns : window.fns = {})

document.addEventListener('plusready',function(){
	fns.createVue()
	
},false)
 

