var vm;
!function(fn){
	fn.createVue = function(){
		Vue.filter('currency', {
//		  read: function (value) {
//		    return '$' + value.toFixed(2)
//		  },
//		  write: function (value) {
//		    var number = +value.replace(/[^\d.]/g, '')
//		    return isNaN(number) ? 0 : number
//		  }
		})
		vm = new Vue({
			el:'#app',
			data:{ 
				isBtn:false,
				isCode:false,
				Time:60,
				ready:false,
				phone:'',
				code:'', 
			},
			methods:{ 
				getCode:function(){
					var reg =  /^1[3|4|5|7|8][0-9]{9}$/;
					if(!reg.test(vm.$data.phone)){
						return mui.toast('手机号码格式不对')
					}
					var data = {
						url:API.url1+'api/Login/sendSms',
						phone:vm.$data.phone,
					}
//					console.log(JSON.stringify(data));
					common.getp(data,function(e){
						console.log(JSON.stringify(e));
						if(e.code == 1){
							vm.$data.isCode = true;
							var cron = setInterval(function(){
								vm.$data.Time --;
								if(vm.$data.Time == 0){
									clearInterval(cron);
									vm.$data.Time = 60;
									vm.$data.isCode = false;
								} 
							},1000)
						}else{
							mui.toast(e.msg) 
						}
					})
					
				},
				Btn:fn.loginIn,
				updatePhone:function(value){
//					var result = currencyValidator.parse(value, this.value)
//					console.log(result);
				}
			},
			mounted:function(){
				this.$data.ready = true;
				
			},
			updated:function(){
				
			},
			watch:{
				code:function(){
					this.$data.code = this.$data.code.replace(/[^0-9]/,'').substring(0,4); 
					fn.cheakBtn();
				},
				phone:function(){
					this.$data.phone = this.$data.phone.replace(/[^0-9]/,'').substring(0,11);
					fn.cheakBtn();
				}
			},
			computed:{
				
			},
		})
	}
	
	fn.cheakBtn = function(){
		var reg =  /^1[3|4|5|7|8][0-9]{9}$/;
		if(vm.$data.code && vm.$data.phone && reg.test(vm.$data.phone)){
			vm.$data.isBtn = true;
		}else{
			vm.$data.isBtn = false;
		}
	}
	
	fn.loginIn = function(){
		var data = {
			url:API.url1+'api/Login/in',
			phone:vm.$data.phone,
			code:vm.$data.code,
//			nickname:vm.$data.nickname,
		};
		 
		common.getp(data,function(e){
			console.log(JSON.stringify(e)); 
			if(e.code == 1){
				mui.toast('登陆成功')
				localStorage.setItem('uId',e.data.id); 
				//通知页面刷新
				var arr = [plus.runtime.appid];
				ca.sendNotice(arr,'Refresh',{}); 
				back();
			} else{
				mui.toast(e.msg)
			}
		});
		return;

		
		
	}
	
	
}(window.fns ? window.fns : window.fns = {})
document.addEventListener('plusready',function(){
	fns.createVue()
	
},false)
 


