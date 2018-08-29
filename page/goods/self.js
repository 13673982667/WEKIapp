var vm;
!function(fn){
	fn.createVue = function(){
		vm = new Vue({
			el:'#app',
			data:{
				ready:false,
			},
			methods:{ 
			},
			mounted:function(){
				this.$data.ready = true;
				
			},
			updated:function(){
				
			}
		})
	}
	
}(window.fns ? window.fns : window.fns = {})

document.addEventListener('plusready',function(){
	fns.createVue()
	
},false)
 

