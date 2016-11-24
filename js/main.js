var SimplePeer = require("simple-peer");
var $ = function(s){ return document.querySelector(s) };

navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(function(stream){
	$('#vid1').src = URL.createObjectURL(stream);

	var peer = new SimplePeer({initiator: location.hash === "#1", trickle: false, stream: stream});

	$('#button').onclick = function(){
		peer.signal(JSON.parse($('#area').value));
		$('#area').value = "";
	};

	peer.on('signal', function(data){
		$('#area').value = JSON.stringify(data);
	});

	peer.on('stream', function(stream){
		$('#vid2').src = URL.createObjectURL(stream);
	});

}).catch(function(err){
	alert("Error\n" + err.message);
});
