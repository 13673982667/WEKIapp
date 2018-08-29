var vm;
!function(fn){
	fn.createVue = function(){
		vm = new Vue({
			el:'#app',
			data:{
				ready:false,
				userInfo:{}
			},
			methods:{ 
				picClick:function(){
					upfile.bts(function(e){
//						console.log(e);
						var obj = {
							head_pic:e
						}
						fn.updateUserInfo(obj,function(){
							vm.$data.userInfo.head_pic = obj.head_pic
						})
					}) 
				},
				nicknameClick:function(){
					mui.prompt('','','修改昵称',['确定','取消'],function(e){
						if(e.index == 0 && e.value !== ''){
							var obj = {
								nickname:e.value
							}
							fn.updateUserInfo(obj,function(){
								vm.$data.userInfo.nickname = obj.nickname
							})
						} 
//						console.log(JSON.stringify(e));
					},'div')
				}
			},
			mounted:function(){
				this.$data.ready = true;
				fn.getInfo();
			},
			updated:function(){
				
			}
		})
	}
	fn.updateUserInfo = function(e,callback){
		e.url = API.url1+'api/Users/updateUserInfo';
		e.uId = uId;
		common.postp(e,function(e){
//			console.log(JSON.stringify(e)); 
			if(e.code == 1){
				mui.toast('OK')  
				callback();  
			}else{ 
				mui.toast('Error!')
			} 
		});
	}
	fn.getInfo = function(){
		var data = {
			url:API.url1+'api/Users/getUserInfo',
			uId:uId
		}
		common.get(data,function(e){
//			console.log(JSON.stringify(e)); 
			if(e.code == 1){
				vm.$data.userInfo = e.data
			}  
		}); 
	}
	
}(window.fns ? window.fns : window.fns = {})

document.addEventListener('plusready',function(){
	fns.createVue()
	
},false)
 

