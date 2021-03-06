$(function(){
	var heigeht = window.innerHeight;
	var mobileSubTop =  $('.chat-send').offset().top;
	$(".friend-chat-content").css("height",mobileSubTop - 5);
	$(".friend-chat-content").mCustomScrollbar({
		theme:"minimal-dark",
		// autoDraggerLength:false,
		// horizontalScroll:false,
		// advanced:{ 
		// 	autoExpandHorizontalScroll:false,
		// 	updateOnBrowserResize:false,
		// 	updateOnContentResize:false,
		// 	autoScrollOnFocus:true }
	});
	var chatRegion = $('.friend-chat-content .mCSB_container');
	var msgInput = $('.chat-content-mobile');
	var userName = $('#user').val();

	socket = io.connect(window.location.host);

	
	socket.on('open',function(){
		console.log('I am online');	
		// if (userName != msgObj.name) {

		// }
	});

	socket.on('system',function(json){
		var message = '';
		if (json.type == 'welcome') {
			console.log('welcome');
			chatRegion.append('<p> welcome back,'+json.name + '</p>');
		} else if (json.type == 'disconnect') {
			console.log('logout');
			chatRegion.append('<p> see you,'+json.name + '</p>');
		}
	})

	socket.on('message',function(msgObj){
		console.log('message sends');
		if (userName != msgObj.name) {
			chatRegion.append('<div class="chat-msg"><div class="user-name">'+msgObj.name + '</div><div class="chat-content"><div>' + msgObj.text + '</div><div style="text-align: right;">' + msgObj.time +'</div></div></div>');
		} else {
			chatRegion.append('<div class="chat-msg"><div class="user-name-right">'+msgObj.name + '</div><div class="chat-content-right"><div>' + msgObj.text + '</div><div style="text-align: right;">' + msgObj.time + '</div></div></div>');
		}
		$(".friend-chat-content")[0].scrollTop = $(".friend-chat-content")[0].scrollHeight;
		$(".friend-chat-content").mCustomScrollbar('update');
		$(".friend-chat-content").mCustomScrollbar('scrollTo','last');
	})

	// msgInput[0].onkeydown=function(e){
	// 	if (e.keyCode == 13) {
	// 		var msg = $(this).val();

	// 		if (!msg) {
	// 			return;
	// 		}

	// 		socket.send(msg);

	// 		$(this).val('');
	// 	} 
	// }

	$('.chat-submit').click(function(){
		var msg = $('.chat-content-mobile').val();
		if (!msg) {
			return;
		}
		socket.send(msg);
		$('.chat-content-mobile').val('');
	})
});