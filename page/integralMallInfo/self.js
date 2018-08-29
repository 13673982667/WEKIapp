var vm;
!function(fn){
	fn.createVue = function(){
		vm = new Vue({
			el:'#app',
			data:{
				ready:false,
				attrIsShow:false,
				goods_images_list:{},//商品缩略图
				goods:{},
				point_rate:0,//兑换率
//				store_count:0,//库存
//				price:0,
				spec_goods_price:{},// 规格 对应 价格 库存表
				filter_spec:{},//规格参数
				attrArr:{},//储存用户选择的所有规格
				item_id:0,
				show:'goods_info'
			},
			methods:{ 
			},
			mounted:function(){
				this.$data.ready = true;
				fn.getGoodsInfo();
//				mui('.mui-numbox').numbox()			
			},
			updated:function(){
//				console.log('s');
			},
			computed:{
				price:function(){
					var str = '';
					for(k in this.attrArr){
						str = str + "_" + this.attrArr[k].item_id
					}
//					console.log(str);
					return this.spec_goods_price[str.substring(1)] ? this.spec_goods_price[str.substring(1)].price : this.goods.shop_price;
				},
				store_count:function(){
					var str = '';
					for(k in this.attrArr){
						str = str + "_" + this.attrArr[k].item_id
					}
					this.item_id = this.spec_goods_price[str.substring(1)] ? this.spec_goods_price[str.substring(1)].item_id : 0;
					var num = this.spec_goods_price[str.substring(1)] ? this.spec_goods_price[str.substring(1)].store_count : 0;
					var mui_numbox = mui('.mui-numbox').numbox();
					if(num == 0){
						mui_numbox.setOption('min',num)//重新设置新值
						mui_numbox.setOption('max',num)
						mui_numbox.setValue(num)
					}else{
						mui_numbox.setOption('max',num)//重新设置新值
						mui_numbox.setOption('min',1)//重新设置新值 
						mui_numbox.setValue(1)
					}
					return num;
					
				}
			},
			watch:{ 
				goods_images_list:function(){
					setTimeout(function(){
						var swiper = new Swiper('.swiper-container', {
					      	pagination: {
					        	el: '.swiper-pagination',
					      	},
					  });	  
					},300)
				},
				store_count:function(){
//					mui('.mui-numbox').numbox().setOption('max',vm.$data.store_count)//重新设置新值
				},
				attrArr:function(){
//					console.log('a');
				}
			}
		})
	}
	fn.getGoodsInfo = function(){
		var data = {
			url:API.url1+'api/Goods/goodsInfo',
			id:goods_id
		}

		common.get(data,function(e){
//			console.log(JSON.stringify(e));
			if(e.code == 1){
				vm.$data.goods_images_list = e.data.goods_images_list
				vm.$data.goods = e.data.goods
				vm.$data.point_rate = e.data.point_rate
//				vm.$data.store_count = e.data.goods.store_count
				vm.$data.price = e.data.goods.price
				
				vm.$data.spec_goods_price = e.data.spec_goods_price// 规格 对应 价格 库存表
				vm.$data.filter_spec = e.data.filter_spec//规格参数
				for(k in e.data.filter_spec){
					Vue.set(vm.$data.attrArr,k,{
						item_id:e.data.filter_spec[k][0].item_id
					});
				}	
//				console.log(JSON.stringify(vm.$data.attrArr));
//				console.log(e.data.filter_spec.选择颜色[0].item_id);
				
			}
		});
		 
	}
	
	fn.btn = function(){
		var goods_num = mui('.mui-numbox').numbox().getValue();
		var item_id = vm.$data.item_id;
		if(goods_num <= 0 || item_id <= 0){
			return mui.toast('没有库存了')
		}
		var self_ = plus.webview.currentWebview();  //获得自己
		mui.openWindow({
			url:'../tianxiedingdan/index.html?goods_id='+goods_id+'&item_id='+item_id+'&goods_num='+goods_num,
			id:'../tianxiedingdan/index.html',
			extras: { //新窗口的额外扩展参数,可用来处理页面间传值
				closeId:self_.id
		    },
		})
	}
}(window.fns ? window.fns : window.fns = {})

document.addEventListener('plusready',function(){
	
},false)
 
setTimeout(function(){
	fns.createVue()
},500)

