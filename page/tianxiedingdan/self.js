var vm;
!function(fn){
	fn.createVue = function(){
		vm = new Vue({
			el:'#app',
			data:{
				ready:false,
				specGoodsPrice:{},//规格参数
				point_rate:0, //积分兑换比例
				goods:{},
				goods_price:0,//价格
				goods_num: 0, //数量
				address:{},   //地址信息
				address_id:0, //选择的地址id
				shipping_price:0,//配送费
			},
			methods:{ 
				openAddressList:function(){
					var self_ = plus.webview.currentWebview();  //获得自己
					mui.openWindow({
						url:'../address/index.html',
						id:'../address/index.html',
						extras: { //新窗口的额外扩展参数,可用来处理页面间传值
							closeId:self_.id
					    },
					})
				}
			},
			mounted:function(){
				this.$data.ready = true;
				fn.getInfo();
				fn.getDefaultAddress();
			},
			updated:function(){
				
			},
			computed:{ 
				price:function(){
					var price = this.goods_price * goods_num - this.goods.exchange_integral / this.point_rate * goods_num + this.shipping_price
					return price.toFixed(2);
				}
			}
		})
	}
	fn.getInfo = function(){
		var data = {
			url:API.url1+'api/Cart/integral',
			goods_id:goods_id,
			item_id:item_id,  
			goods_num:goods_num,
			uId:uId,
		}
		common.getp(data,function(e){
//			console.log(JSON.stringify(e));
			if(e.code == 1){
				vm.specGoodsPrice = e.data.specGoodsPrice;//规格参数
				vm.point_rate = e.data.point_rate;
				vm.goods = e.data.goods;
				vm.goods_price = e.data.goods_price;
				vm.goods_num = e.data.goods_num;
			}
		});
	}
	//获取默认地址
	fn.getDefaultAddress = function(address_id){
		var data = {
			url : API.url1+'api/Users/getDefaultAddress',
			uId:uId,
			address_id:address_id
		}
		common.get(data,function(e){
			if(e.code == 1){
				vm.address = e.data
				vm.address_id = e.data.address_id
//				console.log(JSON.stringify(vm.address));
			}
		});
	}
	//提交
	fn.btn = function(){
		var user_note = $('#user_note').val();//备注
//		var payPwd = $('#payPwd').val();
//		if(!payPwd){
//			return mui.toast('请输入支付密码')
//		}
		var data = {
			url:API.url1+'api/Cart/integral2',
			act:'submit_order',
			goods_id:vm.goods.goods_id,
			item_id:vm.specGoodsPrice.item_id,
			goods_num:vm.goods_num,
			address_id:vm.address_id,
			user_note:user_note,
//			payPwd:123456,
			uId:uId
		}
//			console.log(JSON.stringify(data)); 
		common.postp(data,function(e){
			console.log(JSON.stringify(e)); 
			if(e.code == 1){
				mui.toast(e.msg)
				if(closeId){
					var target = plus.webview.getWebviewById(closeId)//mui的底部导航的界面id 就是url
					if(target){
						target.close('none');
					}
				}
				var self_ = plus.webview.currentWebview()
				mui.openWindow({
					url:'../order/index.html',
					id:'../order/index.html',
					extras: { //新窗口的额外扩展参数,可用来处理页面间传值
						closeId:plus.webview.currentWebview().id
				    }					
				})
			}else{
				mui.toast(e.msg)
			}
		})
	}
}(window.fns ? window.fns : window.fns = {})

document.addEventListener('plusready',function(){
	fns.createVue()
	var self_ = plus.webview.currentWebview();  //获得自己
	closeId = self_.closeId; 
	
},false)
 

