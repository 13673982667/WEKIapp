var websocket;
!function(ws){
	ws.isOpen = false;
	ws.onopen = function (e){
		vm.$data.ready = true; 
		ws.isOpen = true 
		ws.login();
	}
	ws.onmessage = function(e){
		if(e.type == 'start'){
			ws.gameStart(e);
		}
		else if(e.type == 'login'){ //单个消息返回
			mui.toast('进入房间')
			ws.joinRoom(e);//进入房间
		}
//		else if(e.type == 'joinRoom'){ //单个消息返回
//			mui.toast('进入房间成功')
//		}
		else if(e.type == 'msg'){  
			ws.addMsg(e.data.data);
		} 
		else if (e.type == 'ToMsg'){ //系统消息
			ws.addRightMsg(e.data);
		}
		else if(e.type == 'ToRoom'){  //进入房间消息
			ws.addLeftMsg(e.data);
		}  
		else if(e.type == 'biu'){  // 
			ws.addMsg(e.data.data);  
			alert('biu');      
		}else if (e.type == 'setIncCb'){
			mui.toast('中奖了~')
			vm.$data.UserInfo.pay_points = (parseInt(vm.$data.UserInfo.pay_points) + parseInt(e.data.value))
		}    
		if(e.type == 'GameAdd'){//参加
			plus.nativeUI.closeWaiting(); //关闭等待框
//			console.log(JSON.stringify(e));  
			if(e.code == 1){
				vm.$data.UserInfo.pay_points = (vm.$data.UserInfo.pay_points - vm.$data.roomInfo.value)
				mui.toast('已加入，等待结束'); 
			}else{ 
				mui.toast(e.msg) 
			} 
		}  
	}      
 
	ws.gameStart = function(e){
		if(e && e.data){
			vm.$data.isBiu = false;
			vm.$data.start = false;
			vm.$data.ToMsg = [];
//			var timestamp=new Date().getTime()
			var outTime = e.data.data.endTime; 
			if(outTime <= 0){
				return ;
			} 
			$('#biu').show();
			setTimeout(function(){ 
				vm.$data.isBiu = true;  

				$('#biu').hide(); 
			},outTime * 1000)
			
			vm.$data.endTime = outTime;
			TweenLite.to(vm.$data, outTime, { endTime: 0 });
		}
	}
	//发送消息
 	ws.sendMessage = function(){
 		var Message = $('.Message').text();
		if(Message.length <= 0){
			return ;
		}
		$('.Message').text('');

 		var data = {
 			uid:uId,
 			toId:roomId,
 			toType:'room',
 			message:Message
 		}  
 		ws.send('Room','sendMsg',data); 
 	}
	ws.send = function(controller,action,data){
//		console.log(JSON.stringify(websocket)); 
		if(ws.isOpen == false){
			return alert('链接异常');  
		}     
		websocket.send(JSON.stringify({  
		    "controller": controller, 
		    "action": action, 
		    "data": data   
		}));   
	}    
	ws.addLeftMsg = function(e){
		if(e.type == 'ToRoom'){
			if(!vm.$data.Users[e.data.user_id]){ 
				Vue.set(vm.$data.Users,e.data.user_id,e.data) 
//				console.log('//'+JSON.stringify(vm.$data.Users)); 
			}
		}
		vm.$data.RoomMsg.push(e);
		$('.scroll').eq(0).scrollTop($('.scroll')[0].scrollHeight);
	}
	ws.addRightMsg = function(msg){
		if(msg.type == 'GameOver'){
			vm.$data.start = true;
		} 
//		console.log(JSON.stringify(msg));
		vm.$data.ToMsg.push(msg);
		$('.scroll').eq(1).scrollTop($('.scroll')[1].scrollHeight);
	} 
	ws.addMsg = function(msg){
		console.log(JSON.stringify(msg));
		vm.$data.Msg.push(msg);
		$('#chat-messages').scrollTop(($('#chat-messages')[0].scrollHeight));
	}
	             
	//登陆            
	ws.login = function(){ 
		var data = { 
		 	uid : uId 
		}         
		ws.send('Room','login',data); 
	}         
	//进入房间
	ws.joinRoom = function(){
		var data = {    
		 	uid : uId, 
		 	roomId : roomId   
		}           
		ws.send('Room','joinRoom',data); 
	}   
	//
	ws.getUserAllInfo = function(e){
		if(vm.$data.Users[e]){
			return vm.$data.Users[e]
		}else{
			return false;
		}    
	} 
	ws.onclose = function(e){
		ws.isOpen = false;
	}     
	ws.onerror = function(e){           
		mui.toast('链接超时！')   
	}
}(window.ws = {}) 
            