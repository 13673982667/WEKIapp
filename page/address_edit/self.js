var vm;
!function(fn){
	fn.createVue = function(){
		vm = new Vue({
			el:'#app',
			data:{
				ready:false,
				consignee:'',//收货人
				mobile:'',//手机
				address:'',//详细地址
				province:0,//省
				provinceArr:{},//省
				city:0,//市
				cityArr:{},//市
				district:0,//区
				districtArr:{},//区
				twon:0,//县
				moren:true,
				RegionList:{},
				sel:false,
				
			},
			methods:{ 
				morenClick:function(){
					vm.$data.moren = !vm.$data.moren
				},
				btnClick:function(){
					fn.btn();
				},
				selClick:function(){
					vm.$data.sel = true;
				},
				delClick:function(){
					fn.delAddress();
				}
				
			},
			mounted:function(){
				mui.init();
				fns.getRegionList(0,function(e){
					if(e.code == 1){
						vm.$data.provinceArr = e.data   
					}
				})
				this.$data.ready = true; 
			},
			updated:function(){ 
//				console.log('asd');

			},
			watch:{
				consignee:function(){
					console.log('ad');
				},
				province:function(){
					if(!vm.$data.sel){
						return ;
					}
					vm.$data.city = 0
					vm.$data.district = 0
//					console.log(vm.$data.province);
					if(vm.$data.province !== 0){
						fns.getRegionList(vm.$data.province,function(e){
							if(e.code == 1){
								vm.$data.cityArr = e.data
							}
						})
					}
				},
				city:function(){ 
					if(!vm.$data.sel){
						return ;
					}
					vm.$data.district = 0
					if(vm.$data.city !== 0){
						fns.getRegionList(vm.$data.city,function(e){
							if(e.code == 1){
								vm.$data.districtArr = e.data
							}
						})
					}
				},
				mobile:function(){
					this.$data.mobile = this.$data.mobile.replace(/[^0-9]/,'').substring(0,11);
				},
				consignee:function(){
					this.$data.consignee = this.$data.consignee.replace(/[0-9]/,'').substring(0,10);
					
				}
			}
		})
	}
	
	fn.getRegionList = function(parent_id,Callback){
		
		$.ajax({
			url:API.url1 + 'api/Users/getRegionList',
			type:'GET',
	    	dataType:'json',
//	    	timeout:'5000',
			data:{
				parent_id:parent_id ? parent_id : 0
			},
	    	success:function(e){
				Callback(e);
	    	},
	    	error:function(e){
	    		console.log(JSON.stringify(e));
	    	},
		})
	}  
	
	fn.getaddressInfo = function(){
		var data = {
			url:API.url1+'api/Users/address_info',
			address_id: address_id,
			uId: uId
		}
		common.get(data,function(e){
			if(e.code == 1){
				vm.consignee=e.data.consignee;//收货人
				vm.mobile=e.data.mobile;//手机 
				vm.address=e.data.address;//详细地址
				vm.provinceArr=e.data.p;
				vm.cityArr=e.data.c;
				vm.districtArr=e.data.d;  
				vm.province=e.data.province;//省
				vm.city=e.data.city;//市
				vm.district=e.data.district;//区
				vm.moren = e.data.is_default 
			}
		})
	}
	fn.btn = function(){ 
		var data = {
			url:API.url1+'api/Users/edit_address',
			consignee:vm.consignee,
			mobile:vm.mobile,
			province:vm.province,
			city:vm.city,
			district:vm.district,
			address:vm.address,
			is_default:vm.moren ? 1 : 0,
			uId:uId,
			address_id:address_id,
			
		} 
//		console.log(JSON.stringify(data))
		common.postp(data,function(e){
//			console.log(JSON.stringify(e));
			if(e.status == 1){ 
				mui.toast('OK')
				back();
			}else{
				mui.toast(e.msg);
			}
		});
	};
	fn.delAddress = function(){
		var data = {
			url:API.url1+'api/Users/del_address',
			address_id:address_id,
			uId:uId 
		}
			console.log(JSON.stringify(data));
		
		common.getp(data,function(e){
			console.log(JSON.stringify(e));
			if(e.code == 1){ 
				mui.toast('OK');
				back();
			}else{
				mui.toast(e.msg)
			}
		}) 
	}
}(window.fns ? window.fns : window.fns = {})
var back;
document.addEventListener('plusready',function(){
	fns.createVue()
	back = function(){
		//先通知
		var target = plus.webview.getWebviewById('../address/index.html')//mui的底部导航的界面id 就是url	
		mui.fire(target,'Refresh');
		mui.back();
	}
},false)
 

