var redis = require("redis");
var tty = require("tty");
var sys = require("sys");

var st = process.openStdin();

client = redis.createClient();

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
	if(userData.toString().startsWith(":join"))
	{
		var channel = userData.toString().replace(":join:", "");
		client.subscribe(channel);
	}
	else if(userData.toString().startsWith(":leave"))
	{
		var channel = userData.toString().replace(":leave:", "");
		client.unsubscribe(channel);
	}
	else
	{
		var index = userData.toString().indexOf(":");
		var channel = userData.toString().substring(0, index);
		var message = userData.toString().substring(index + 1);
		client.publish(channel, message);
	}
});

if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}
