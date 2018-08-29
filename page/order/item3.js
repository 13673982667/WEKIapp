var page3 = 1;
var size3 = 10;
function item3Fn(){
	item3 = new Vue({
		el:'#item3',
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
			fns.pullTo3();
        },
		updated:function(){
		}
	})
}


!function(fn){
	////积分
	fn.getItem3List = function (Callback){ 
		var data = {
			url:API.url1+'api/Order/order_list',
			p:page3,
			type:'WAITRECEIVE',//代收货    WAITRECEIVE 
			uId:uId,
			size:size3
		}
		common.get(data,Callback)
	}
	fn.pullTo3 = function(){
		mui("#scroll3 .mui-scroll").pullToRefresh({ 
			down: {  
				callback: function() { 
					self3 = this;
					page3 = 1;

					fn.getItem3List(function(e){ 
//						console.log(JSON.stringify(e));
						setTimeout(function(){ 
							if(e.code == 1){
								page3++
								item3.$data.List = [];
								fn.add3(e.data);
							}
							self3.endPullDownToRefresh();
							self3.refresh(true);//重置上拉
							
						},500)
					});
				}
			},
			up: {//上拉
				contentnomore:'没有了 ^_^',
				callback: function() {
					self3 = this;
					fn.getItem3List(function(e){ 
//						console.log(JSON.stringify(e));
						if(e.code == 1){ 
							page3++ 
							fn.add3(e.data);
							self3.endPullUpToRefresh();
//							console.log(JSON.stringify(item1.$data.List)); 
						}else{
							self3.endPullUpToRefresh(true);
						}
					});
				},
				auto:true,//可选,默认false.自动上拉加载一次 
			}
		});
	}
	 
	fn.add3 = function(data){
		item3.$data.List = item3.$data.List.concat(data.lists)
		item3.$data.order_status = data.order_status;
		item3.$data.shipping_status = data.shipping_status;
		item3.$data.pay_status = data.pay_status;
	}
	
}(window.fns ? window.fns : window.fns = {})

