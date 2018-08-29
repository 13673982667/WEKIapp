function socketstart(){
	var wsUrl = API.socket;
	websocket = new WebSocket(wsUrl);
	websocket.onopen = function(e){
		console.log('onopen-'+JSON.stringify(e));
		// console.log(e);
//		websocket.send('aksjdhakjsdhakjdsh');
 
		if(fns && ws.onopen){
			ws.onopen();
		}
		
	}
	websocket.onmessage = function(e){
//		console.log(new Date().getTime());
		console.log('onmessage-'+JSON.stringify(e.data));
		if(ws && ws.onmessage){
			 try {
			 	ws.onmessage(JSON.parse(e.data)); 
			 }catch(e){
			 	  
			 } 
		}   
	}       
	websocket.onclose = function(e){ 
		console.log('onclose-'+JSON.stringify(e));
		if(ws && ws.onclose){ 
			ws.onclose(); 
		}       
	}      
	websocket.onerror = function(e){
		console.log('onerror-'+JSON.stringify(e));
		if(ws && ws.onerror){ 
			ws.onerror();
		}  
	}
}  
	