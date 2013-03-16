var redis = require("redis");

var st = process.openStdin();

client = redis.createClient();
client1 = redis.createClient();

client.on("subscribe", function (channel, count) {
  console.log("You have joined channel: " + channel);
});

client.on("unsubscribe", function (channel, count) {
  console.log("You have left channel: " + channel);
});

client.on("message", function (channel, message) {
  console.log(channel + ": " + message);
});

st.addListener("data", function(input)
{
	var userData = input.toString().trim();
	if(userData === ":quit")
	{
		console.log("bye bye");
		client.unsubscribe();
		client.end();
	}
	else if(userData.toString().startsWith(":join:"))
	{
		var channel = userData.toString().replace(":join:", "");
		client.subscribe(channel);
	}
	else if(userData.toString().startsWith(":leave:"))
	{
		var channel = userData.toString().replace(":leave:", "");
		client.unsubscribe(channel);
	}
	else
	{
		var index = userData.toString().indexOf(":");
		var channel = userData.toString().substring(0, index);
		if(channel.toString() === "")
		{
			return;
		}
		
		var message = userData.toString().substring(index + 1);
		client1.publish(channel, message);
	}
});

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}
