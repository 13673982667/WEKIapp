var vm;

Vue.component("QuXiaoDingDan",{
    props:[
        'order_id'
    ],
    template:'<button type="button"  @click="hClick(order_id)" class="mui-btn">取消订单</button>',
    methods:{
    	hClick:function(order_id){
//  		console.log(order_id);  
    		var data = {
    			url:API.url1+'api/Order/cancel_order',
    			uId:uId,
    			order_id:order_id
    		}
    		common.getp(data,function(e){
    			console.log(JSON.stringify(e));
    		})
    	}
    }
})
//立即付款
Vue.component("LiJiFuKuan",{
    props:[
        'order_id'
    ],
    template:'<button type="button" class="mui-btn mui-btn-danger">立即付款</button>',
    methods:{
    	hClick:function(){
    		console.log(this.order_id);
    	}
    }
})
//查看物流
Vue.component("ChaKanWuLiu",{
    props:[
        'order_id'
    ],
    template:'<button type="button" class="mui-btn">查看物流</button>',
    methods:{
    	hClick:function(){
    		console.log(this.order_id);

    		
    	}
    }
})
//确认收货
Vue.component("QueRenShouHuo",{
    props:[
        'order_id'
    ],
    template:'<button type="button" class="mui-btn mui-btn-danger" @click="hClick(order_id)">确认收货</button>',
    methods:{
    	hClick:function(order_id){
    		console.log(order_id); 
    		var data = {
    			url:API.url1+'api/Order/confirm_order',
    			uId:uId,
    			order_id:order_id
    		}
    		common.getp(data,function(e){
    			console.log(JSON.stringify(e));
    			if(e.code == 1){
					mui.toast('确认收货')    	
					fns.refresh();
    			}else{
    				mui.toast(e.msg)
    			}
    		})
    	}
    }
})

!function(fn){
	fn.refresh = function(){
		fn.getItem1List(function(e){ 
				if(e.code == 1){
					page1++
					item1.$data.List = [];
					fn.add1(e.data);
				}
				mui("#scroll1 .mui-scroll").pullToRefresh().endPullDownToRefresh();
				mui("#scroll1 .mui-scroll").pullToRefresh().refresh(true);//重置上拉
		});
		
	}
	fn.status = function(pay_status,shipping_status,order_status){
		if(pay_status == 0 && order_status == 0 && shipping_status == 0){
			return '待支付';
		}else if(pay_status == 1){
			if(shipping_status == 0 && order_status == 1){
				return '待发货'
			}else if(shipping_status == 1){
				if(order_status == 1){
					return '待收货';
				}else{
					return item1.order_status[order_status];
				}
			}else if(shipping_status == 2){
				return '部分发货';
			}else{
				return item1.order_status[shipping_status];
			}
		}else if(pay_status == 3){
			return '已退款';
		}else{
			return item1.order_status[order_status];
		}
		
	}
}(window.fns ? window.fns : window.fns = {})

document.addEventListener('plusready',function(){
	item1Fn();
	item2Fn(); 
	item3Fn(); 
	item4Fn(); 
	var self_ = plus.webview.currentWebview();  //获得自己
	closeId = self_.closeId; 
	if(closeId){
		var target = plus.webview.getWebviewById(closeId)//mui的底部导航的界面id 就是url
		if(target){
			target.close('none');
		}
	}
},false)

