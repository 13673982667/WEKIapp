var page2 = 1;
var size2 = 10;
function item2Fn(){
	item2 = new Vue({
		el:'#item2',
		data:{
			List:[],
			order_status:[],
			shipping_status:[],
			pay_status:[],
		},
		methods:{
			
		},
		mounted:function(){  
//			//获取列表
			fns.pullTo2();
        },
		updated:function(){
		}
	})
}


!function(fn){
	////积分
	fn.getItem2List = function (Callback){ 
		var data = {
			url:API.url1+'api/Order/order_list',
			p:page2,
			type:'WAITSEND',//代收货 
			uId:uId,
			size:size2
		}
		common.get(data,Callback)
	}
	fn.pullTo2 = function(){
		mui("#scroll2 .mui-scroll").pullToRefresh({ 
			down: {  
				callback: function() { 
					self2 = this;
					page2 = 1;

					fn.getItem2List(function(e){ 
//						console.log(JSON.stringify(e));
						setTimeout(function(){ 
							if(e.code == 1){
								page2++
								item2.$data.List = [];
								fn.add2(e.data);
							}
							self2.endPullDownToRefresh();
							self2.refresh(true);//重置上拉
							
						},500)
					});
				}
			},
			up: {//上拉
				contentnomore:'没有了 ^_^',
				callback: function() {
					self2 = this;
					fn.getItem2List(function(e){ 
//						console.log(JSON.stringify(e));
						if(e.code == 1){ 
							page2++ 
							fn.add2(e.data);
							self2.endPullUpToRefresh();
//							console.log(JSON.stringify(item1.$data.List));
						}else{
							self2.endPullUpToRefresh(true);
						}
					});
				},
				auto:true,//可选,默认false.自动上拉加载一次 
			}
		});
	}
	 
	fn.add2 = function(data){
		item2.$data.List = item2.$data.List.concat(data.lists)
		item2.$data.order_status = data.order_status;
		item2.$data.shipping_status = data.shipping_status;
		item2.$data.pay_status = data.pay_status;
	}
	
}(window.fns ? window.fns : window.fns = {})

