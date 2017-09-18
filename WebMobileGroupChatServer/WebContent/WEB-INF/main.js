

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

/**
 * Parsing the json message. This type of message is identified by 'flag'
 * available flag can be self, new, message, exit
 */
function parseMessage(message) {
	var jObj = $.parseJSON(message);
	
	//if flag is 'self', message must contain the session id
	if(jObj.flag == 'self'){
		sessionId = jObj.sessionId;
	} else if (jObj.flag == 'new') {
		//if flag is 'new', a client joined the chatting room
		var new_name = 'You';
		
		//number of people online
		var online_count = jObj.onlineCount;
		
		$('p.online_count').html(
				'Hello, <span class="green">' + name + '</span>. <b>'
				+ online_count + '</b> people online right now')
				.fadeIn();
		
		if (jObj.sessionId != sessionId) {
			new_name = jObj.name;
		}
		
		var li = '<li class="new"><span class="name">' + new_name + '</span>'
				+ jObj.message + '</li>';
		
		$('#messages').append(li);
		$('#input_message').value('');
		
	} else if (jObj.flag == 'message') {
		//if flag is 'message', a user has sent a chatting message
		
		var from_name = 'You';
		
		if(jObj.sessionId != sessionId){
			from_name = jObj.name;
		}
		
		var li = '<li><span class="name">' + from_name + '</span>'
				+ jObj.message + '</li>';
		
		//appending the sent message to list
		appendChatMessage(li);
		
		$('#input_message').val('');
		
	} else if (jObj.flag == 'exit') {
		//if flag is 'exit', it means a user has left the chatting room
		var li = '<li class="exit"><span class="name red">' + jObj.name
				+ '</span>' + jObj.message + '</li>';
		
		var online_count = jObj.onlineCount;
		
		$('p.online_count').html(
				'Hello, <span class="green">' + name + '</span>. <b>'
				+ online_count + '</b>people online right now');
		
		appendChatMessage(li);
	}
}

/**
 * @param li
 * Append the new message to message list
 */
function appendChatMessage(li){
	$('#messages').append(li);
	
	//scrolling the message list to bottom, so the new message will be visible
	$('#messages').scrollTop($('#messages').height());
}

/**
 * Send message to socket server
 * message will be formatted to json
 */
function sendMessageToServer() {
	var json = '{""}';
	
	//parse json object
	var userObject = new Object();
	userObject.sessionId = sessionId;
	userObject.message = message;
	userObject.flag = flag;
	
	//convert json object to json string
	json = JSON.stringify(userObject);
	
	//send message to server
	webSocket.send(json);
	
}

