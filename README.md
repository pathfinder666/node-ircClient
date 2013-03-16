This is an IRC chat-server written in node.js using redis

Requirements:
Install Redis and start redis server on default port
Install redis client for node.js "npm install redis"

This uses redis pub/sub to achieve IRC chat-server communication

Usage:

Start the application by "node irc.js"

Join a channel "join:<channel name>"

Leave a channel "leave:<channel name>"

Send message to channel "<channel name>:<message>"

Quit app ":quit"

Quiting the app by using ":quit" is gracious shutdown as it unsubscibes to all the channels and then closes redis connection"



