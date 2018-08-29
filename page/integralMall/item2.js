var page2 = 1;
var size2 = 10;
//预约历史
function item2Fn(){
	item2 = new Vue({
		el:'#item2',
		data:{
			List:[] 
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
	fn.getItem2List = function(Callback){
		var data = { 
			url:API.url1+'api/Goods/integralMall', 
			p:page2,
			brandType:1,//全部积分 
			size:size2
		}
		common.get(data,Callback)
	} 
	fn.pullTo2 = function(){
		mui("#scroll2 .mui-scroll").pullToRefresh({ 
			down: {  
				callback: function() { 
					self = this;
					page2= 1;

					fn.getItem2List(function(e){ 

						setTimeout(function(){
							if(e.code == 1){
								page2++
								item2.$data.List = [];
								item2.$data.List = item2.$data.List.concat(e.data)//合并
							}
							self.endPullDownToRefresh();
							self.refresh(true);//重置上拉
							
						},500)
					});
				}
			},
			up: {//上拉
				callback: function() {
					self = this;
					fn.getItem2List(function(e){
//						console.log(JSON.stringify(e));
						if(e.code == 1){ 
							page2++ 
							item2.$data.List = item2.$data.List.concat(e.data.goods_list)
							self.endPullUpToRefresh();
//							console.log(JSON.stringify(item2.$data.List));
						}else{
							self.endPullUpToRefresh(true);
						}
					});
				},
				auto:true,//可选,默认false.自动上拉加载一次 
			}
		});
	}
}(window.fns ? window.fns : window.fns = {})
