

//keep the session id
var sessionId = '';

//name of the client
var name = '';	

//socket connection url and port
var socket_url = '192.168.253.1';
var port = '8080';

$(document).ready(function() {
	$("#form_submit, #form_send_message").submit(function(e) {
		e.preventDeafult();
		join();
	});
	
});


var webSocket;

/**
 * connecting to socket
 */
function join() {
	
	//checking person name
	if($('#input_name').val().trim().length <= 0){
		
		alert('Enter your name');
		
	} else {
		
		name = $('#input_name').val().trim();
		
		$('#prompt_name_container').fadeOut(1000, function() {
		
			//opening socket connection
			openSocket();
			
		});		
		
	}
	
	return false;
}

/**
 * open the socket connection
 */
function openSocket() {
	
	//ensure only one connection is open at a time
	if (webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED) {
		return;
	}
	
	//create a new instance of the webSocket
	webSocket = new WebSocket("ws://" + socket_url + ":" + port
			+ "/WebMobileGroupChatServer/char?name=" + name);
	
	webSocket.onOpen = function(event) {
		$('#message_container').fadeIn();
		
		if(event.data === undefined)
			return;
	};
	
	webSocket.onmessage = function(event) {
		//parsing the json data
		parseMessage(event.data);
	};
	
	webSocket.onclose = function(event) {
		alert('Error! Connection is closed! Please try connecting again');
	};
	
}


/**
 * send the chat message to server
 */
function send() {
	
	var message = $('#input_message').val();
	
	if(message.trim().length > 0) {
		sendMessageToServer('message', message);
	} else {
		alert('Please enter message to send!');
	}
}

/**
 * close the socket connection
 */
function closeSocket() {
	
	webSocket.close();
	
	$('#message_container').fadeOut(600, function() {
		$('#prompt_name_container').fadeIn();
		//clear the name and session id
		sessionId = '';
		name = '';
		
		//clear the ul li messages
		$('#messages').html('');
		$('#p.online_count').hide();
		
	});
	
}





