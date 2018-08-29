var page1 = 1;
var size1 = 10;
function item1Fn(){
	item1 = new Vue({
		el:'#item1',
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
			fns.pullTo1();
        },
		updated:function(){
		}
	})
}


!function(fn){
	////积分
	fn.getItem1List = function (Callback){ 
		var data = {
			url:API.url1+'api/Order/order_list',
			p:page1,
//			type:2,//积分
			uId:uId,
			size:size1
		}
		common.get(data,Callback)
	}
	fn.pullTo1 = function(){
		mui("#scroll1 .mui-scroll").pullToRefresh({ 
			down: {  
				callback: function() { 
					self1 = this;
					page1 = 1;

					fn.getItem1List(function(e){ 
//						console.log(JSON.stringify(e));
						setTimeout(function(){ 
							if(e.code == 1){
								page1++
								item1.$data.List = [];
								fn.add1(e.data);
							}
							mui("#scroll1 .mui-scroll").pullToRefresh().endPullDownToRefresh();
							mui("#scroll1 .mui-scroll").pullToRefresh().refresh(true);//重置上拉
							
						},500)
					});
				}
			},
			up: {//上拉
				contentnomore:'没有了 ^_^',
				callback: function() {
					self1 = this;
					fn.getItem1List(function(e){ 
//						console.log(JSON.stringify(e));
						if(e.code == 1){ 
							page1++ 
							fn.add1(e.data);
							self1.endPullUpToRefresh();
//							console.log(JSON.stringify(item1.$data.List));
						}else{
							self1.endPullUpToRefresh(true);
						}
					});
				},
				auto:true,//可选,默认false.自动上拉加载一次 
			}
		});
	}
	
	fn.add1 = function(data){
		item1.$data.List = item1.$data.List.concat(data.lists)
		item1.$data.order_status = data.order_status;
		item1.$data.shipping_status = data.shipping_status;
		item1.$data.pay_status = data.pay_status;
	}
	
}(window.fns ? window.fns : window.fns = {})

