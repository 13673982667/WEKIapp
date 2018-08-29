var page4 = 1;
var size4 = 10;
function item4Fn(){
	item4 = new Vue({
		el:'#item4',
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
			fns.pullTo4();
        },
		updated:function(){
		}
	})
}


!function(fn){
	////积分
	fn.getItem4List = function (Callback){ 
		var data = {
			url:API.url1+'api/Order/order_list',
			p:page4,  
			type:'WAITCCOMMENTFINISH',//代发货    
			uId:uId,
			size:size4
		}
		common.get(data,Callback)
	}
	fn.pullTo4 = function(){
		mui("#scroll4 .mui-scroll").pullToRefresh({ 
			down: {  
				callback: function() { 
					self4 = this;
					page4 = 1;

					fn.getItem4List(function(e){ 
//						console.log(JSON.stringify(e));
						setTimeout(function(){ 
							if(e.code == 1){
								page4++
								item4.$data.List = [];
								fn.add4(e.data);
							}
							self4.endPullDownToRefresh();
							self4.refresh(true);//重置上拉
							
						},500)
					});
				}
			},
			up: {//上拉
				contentnomore:'没有了 ^_^',
				callback: function() {
					self4 = this;
					fn.getItem4List(function(e){ 
//						console.log(JSON.stringify(e));
						if(e.code == 1){ 
							page4++ 
							fn.add4(e.data);
							self4.endPullUpToRefresh();
//							console.log(JSON.stringify(item1.$data.List)); 
						}else{
							self4.endPullUpToRefresh(true);
						}
					});
				},
				auto:true,//可选,默认false.自动上拉加载一次 
			}
		});
	}
	 
	fn.add4 = function(data){
		item4.$data.List = item4.$data.List.concat(data.lists)
		item4.$data.order_status = data.order_status;
		item4.$data.shipping_status = data.shipping_status;
		item4.$data.pay_status = data.pay_status;
	}
	
}(window.fns ? window.fns : window.fns = {})

