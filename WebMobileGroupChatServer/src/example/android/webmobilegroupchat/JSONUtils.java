package example.android.webmobilegroupchat;

import org.json.JSONException;
import org.json.JSONObject;

public class JSONUtils {
	
	
	private static final String FLAG_SELF = "self", FLAG_NEW="new", 
			FLAG_MESSAGE = "message", FLAG_EXIT = "exit";
	
	public JSONUtils() {
		
	}
	
	public String geClientDetailsJson(String sessionId, String message) {
		
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
		
	}
	
}
