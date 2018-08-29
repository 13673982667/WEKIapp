var vm;




document.addEventListener('plusready',function(){
	item1Fn();
//	item2Fn();

},false)

$('body').on('tap','.icon',function(e){
//	console.log(e.target.className == );
	if(item1.$data.show == 'icon-list'){
		item1.$data.show = 'icon-list1'
//		item2.$data.show = 'icon-list1'
	}else{
		item1.$data.show = 'icon-list'
//		item2.$data.show = 'icon-list'
	}
})
