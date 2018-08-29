var page1 = 1;
var size1 = 10;
function item1Fn(){
	item1 = new Vue({
		el:'#item1',
		data:{
			List:[],
			show:'icon-list',
			point_rate:0,//兑换率
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
			url:API.url1+'api/Goods/integralMall',
			p:page1,
			brandType:2,//积分
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
						console.log(JSON.stringify(e));
						setTimeout(function(){ 
							if(e.code == 1){
								page1++
								item1.$data.List = [];
								item1.$data.List = item1.$data.List.concat(e.data.goods_list)
								item1.$data.point_rate = e.data.point_rate
							}
							self1.endPullDownToRefresh();
							self1.refresh(true);//重置上拉
							
						},500)
					});
				}
			},
			up: {//上拉
				contentnomore:'没有更多商品了',
				callback: function() {
					self1 = this;
					fn.getItem1List(function(e){ 
//						console.log(JSON.stringify(e));
						if(e.code == 1){ 
							page1++ 
							item1.$data.List = item1.$data.List.concat(e.data.goods_list)
							item1.$data.point_rate = e.data.point_rate
							
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
	
}(window.fns ? window.fns : window.fns = {})

mui('.mui-content').on('tap','.mui-scroll li',function(e){
	var goods_id = $(this).attr('goods_id')
	if(goods_id){
		mui.openWindow({
			url:'../integralMallInfo/index.html?goods_id='+goods_id,
			id:'../integralMallInfo/index.html'
		})
	}
})
