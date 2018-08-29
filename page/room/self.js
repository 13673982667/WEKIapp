var vm;
!function(fn){
	fn.createVue = function(){
		vm = new Vue({
			el:'#app',
			data:{
				ready:false,
				RoomMsg:[],
				ToMsg:[],
				isBiu:true,
				start:true,
				endTime:0, 
				TimeShow:true,
				Msg:[],
				Users:{},
				UserInfo:{},
				roomInfo:{},
			},
			methods:{ 
				onStart:fn.start,
				sendMessage:function(){
					ws.sendMessage();
				}
			},
			mounted:function(){

				fn.ready()
			},
			updated:function(){
			},
			computed:{
				endTime_: function() {
			    	return this.endTime.toFixed(0);
			   },
			   
			},
			watch:{
				
			}
		})  
	}     
	//mounted Event
	fn.ready = function(){
		fn.getRoomInfo();           
		socketstart();  //startWebSocket
		fn.startBtn();
	}  
	fn.getRoomInfo = function(){
		var data = {
			url:API.url1+'api/Room/getRoomInfo',
			roomId : roomId,
			uId : uId 
		}  
		common.get(data,function(e){
			console.log('1'+JSON.stringify(e));  
			if(e.code == 1){
				if(e.data.userArr.length > 0){
					for(k in e.data.userArr){
						Vue.set(vm.$data.Users,e.data.userArr[k].id,e.data.userArr[k]);
					}
				}
				console.log('//*'+JSON.stringify(vm.$data.Users));
				$('.mui-title').html(e.data.name);
				vm.$data.UserInfo = e.data.UserInfo 
				delete e.data.UserInfo
				vm.$data.roomInfo = e.data 
			} 
       
		})
	}    
   
	//投注
	fn.biuClick = function(){ 
		if(vm.$data.UserInfo.pay_points < vm.$data.roomInfo.value){
			return mui.toast('积分不够') 
		} 
		var data = {   
		 	uId : uId,
		 	roomId : roomId   
		}         
		plus.nativeUI.showWaiting();  //显示等待框
		ws.send('Game','add',data);    
	}  
	//StartGame
	fn.start = function(){ 
		var data = {   
		 	roomId : roomId,
		 	time:5 
		}            
		ws.send('Game','gameStart',data); 
	}
	fn.startBtn = function(){
		$('#biu').on('tap',function(){
			
			fn.biuClick();
		}).hide(); 
		
	}
	
//	fn.getUserInfo = function(){
//		
//	}
	   
}(window.fns ? window.fns : window.fns = {})

document.addEventListener('plusready',function(){
//	fns.createVue()
	 plus.webview.currentWebview().setStyle({ 
		softinputMode: "adjustResize",
		background:'#ffffff' 
	});
	

},false) 
 
setTimeout(function(){  
	fns.createVue()
},100)
//$(window).on('tap',function(e){
//	console.log(e.target.className);
//	if(e.target.className != 'Message'){
//		console.log('s');
//		$('.Message').attr('contenteditable',false);
//		$('.Message').blur(); 
//	}else{
////		$('.Message').attr('contenteditable',true);
//	}
//});

