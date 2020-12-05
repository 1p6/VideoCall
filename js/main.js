let SimplePeer = require("simple-peer");
let $ = function(s){ return document.querySelector(s) };

$('#start').onclick = async () => {
	let stream1 = [], stream2 = [];

	try {
		stream1 = (await navigator.mediaDevices.getUserMedia({audio: true})).getTracks();
	} catch(e) {
		if(e.name !== 'NotFoundError' && e.name !== 'NotAllowedError') {
			alert(`audio\n${e.name}\n${e.message}`);
			throw e;
		}
	}
	try {
		stream2 = (await navigator.mediaDevices.getUserMedia({video: true})).getTracks();
	} catch(e) {
		if(e.name !== 'NotFoundError' && e.name !== 'NotAllowedError') {
			alert(`video\n${e.name}\n${e.message}`);
			throw e;
		}
	}

	let stream = new MediaStream(stream1.concat(stream2));
	$('#vid1').srcObject = stream;

	let peer = new SimplePeer({initiator: location.hash === "#1", trickle: false, stream: stream});

	$('#button').onclick = function(){
		peer.signal(JSON.parse($('#area').value));
		$('#area').value = "";
	};

	peer.on('signal', function(data){
		$('#area').value = JSON.stringify(data);
	});

	peer.on('stream', function(stream){
		$('#vid2').srcObject = stream;
	});

	peer.on('error', function(e){
		alert(`peer\n${e.name}\n${e.message}`);
	});
};
