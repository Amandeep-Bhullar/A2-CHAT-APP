A few things to try:

(Server) Store incoming messages to an Array
(Server) Relay the entire chat history Array on (re)connection
(Front-end) Store the chat Array locally on connection
(Server) Each message gets sent individually (ie, not as a complete Array)
(Front-end) Store each new message to the local Array
(Front-end) Map and join data on the front end, using the Array as the "souce of truth"


