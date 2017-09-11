package example.android.webmobilegroupchat;

import org.json.JSONException;
import org.json.JSONObject;

public class JSONUtils {
	
	
	private static final String FLAG_SELF = "self", FLAG_NEW="new", 
			FLAG_MESSAGE = "message", FLAG_EXIT = "exit";
	
	public JSONUtils() {
		
	}
	
//	In the below code, if you observer each json contains flag node which tell the clients the purpose of JSON message. On the client side we have to take appropriate action considering the flag value.
//
//	Basically the flag contains four values.
//
//	self = This JSON contains the session information of that particular client. This will be the first json a client receives when it opens a sockets connection.
//
//	new = This JSON broadcasted to every client informing about the new client that is connected to socket server.
//
//	message = This contains the message sent by a client to server. Hence it will broadcasted to every client.
//
//	exit = The JSON informs every client about the client that is disconnected from the socket server.
	
	
	public String getClientDetailsJson(String sessionId, String message) {
		
		String json = null;
		
		try {
			JSONObject jObj = new JSONObject();
			jObj.put("flag", FLAG_SELF);
			jObj.put("sessionId", sessionId);
			jObj.put("message", message);
			
			json = jObj.toString();
		} catch(JSONException e) {
			e.printStackTrace();
		}
		
		return json;
		
	}
	
	
	public String getNewClientJson(String sessionId, String name,
			String message, int onlineCount) {
		
		String json = null;
		
		try {
			JSONObject jObj = new JSONObject();
			jObj.put("flag", FLAG_NEW);
			jObj.put("name", name);
			jObj.put("sessionId", sessionId);
			jObj.put("message", message);
			jObj.put("onlineCount", onlineCount);
			
			json = jObj.toString();
		} catch (JSONException	e) {
			e.printStackTrace();
		}
		
		return json;
	}
	
	public String getClientExitJson(String sessionId, String name, 
			String message, int onlineCount) {
		
		String json = null;
		
		try {
			JSONObject jObj = new JSONObject();
			jObj.put("flag", FLAG_EXIT);
			jObj.put("name", name);
			jObj.put("sessionId", sessionId);
			jObj.put("message", message);
			jObj.put("onlineCount", onlineCount);
			
			json = jObj.toString();
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		return json;		
	}
	
	public String getSendAllMessageJson(String sessionId, String fromName,
			String message) {
		
		String json = null;
		
		try {
			JSONObject jObj = new JSONObject();
			jObj.put("flag", FLAG_MESSAGE);
			jObj.put("sessionId", sessionId);
			jObj.put("name", fromName);
			jObj.put("message", message);
			
			json = jObj.toString();
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		return json;
		
		
	}
	
	
}
