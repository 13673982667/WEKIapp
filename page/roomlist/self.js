var vm;
!function(fn){
	fn.createVue = function(){
		vm = new Vue({
			el:'#app',
			data:{
				ready:false,
				List:[
					{
						'id':'1',
						'name':'1'
					}
				]
			},
			methods:{ 
				handleClick:function(k){
					var id = this.$data.List[k].id
//					alert(this.$data.List[k].id);
					mui.openWindow({
						'url':'../room/index.html?id='+id,
						id:'../room/index.html'
					})
				}
			},
			mounted:function(){
				this.$data.ready = true;
				fns.getList();
			},
			updated:function(){
				
			}  
		})
	} 
	fn.getList = function(){
		var data = {  
			url:API.url1+'api/Room/getlist',   
		}    
		common.get(data,function(e){
			console.log(JSON.stringify(e));
			if(e.code == 1){
				vm.$data.List = e.data
			} 
		}) 
	}   
	
}(window.fns ? window.fns : window.fns = {})

document.addEventListener('plusready',function(){
	fns.createVue()
	
},false)
 

