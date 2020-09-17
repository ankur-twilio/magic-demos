const Video = Twilio.Video;
const toggleableVideo = false;
const videoDevices = [];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roomName = urlParams.get('room') ?? 'default-room';
let room;

const registerMuteButton = function(room) {
	$('.mic-holder').show();
	console.log('resgitering mute button');
	$('.mic-holder').on('click', function() {
		room.localParticipant.audioTracks.forEach(publication => {
			if(publication.track.isEnabled) {
				publication.track.disable();
				$('.unmuted').hide();
				$('.muted').show();
			}
			else {
				publication.track.enable();
				$('.unmuted').show();
				$('.muted').hide();
			}
		});
	});
}

const registerRemoteTracks = function(participant) {
	console.log('registering remote tracks');
	participant.tracks.forEach(publication => {
		if (publication.isSubscribed) {
			const track = publication.track;
			track.attach('#remote');
		}
	});

	participant.on('trackSubscribed', track => {
		track.attach('#remote');
	});
}

const deregisterRemoteTracks = function(participant) {
	participant.tracks.forEach(publication => {
		if (publication.isSubscribed) {
			const track = publication.track;
			track.detach();
		}
	});
}

const registerRemoteEvents = function(room) {
	// Log any Participants already connected to the Room
	room.participants.forEach(participant => {
	  console.log(`Participant "${participant.identity}" is connected to the Room`);
	  registerRemoteTracks(participant);
	});

	room.on('participantConnected', participant => {
	  console.log(`Participant connected: ${participant.identity}`);
	  registerRemoteTracks(participant);
	});

	room.on('participantDisconnected', participant => {
	  console.log(`Participant disconnected: ${participant.identity}`);
	  deregisterRemoteTracks(participant);
	});
}

const switchCameras = function(track) {
	console.log('resgitering switcher');
	$('.switch-camera').on('click', function() {
		let current = track.mediaStreamTrack.getSettings().facingMode;
		if (current === 'user') {
			track.restart({ facingMode: 'environment' });
		}
		else {
			track.restart({ facingMode: 'user' });
		}
	});
}

const getToken = function(callback) {
	return $.getJSON('https://proxy-demo-7914.twil.io/video_token')
	.then((data) => callback(data));
}

const connect = function(tracks) {
	return getToken(function(token) {
		return Video.connect(token, {
			name: roomName,
			tracks: tracks
		});
	});
}


Video.createLocalTracks({ 
		name: 'testing',
		audio: true,
		video: {
			width: 1280,
			facingMode: 'user'
		}
	}).then(localTracks => {
	 	localTracks.forEach(function(track) {
	 		if (track.kind === 'video') {
	 			
	 			track.attach('#local');
	 			track.restart({ facingMode: 'user' });

            	$( ".preview-container" ).draggable({
            		containment : ".videos-container"
            	});

            	let switchable = track.mediaStreamTrack.getSettings().facingMode;
            	if (switchable) {
            		$('.switch-camera').show(0, switchCameras(track));
            	}
	 		}
	 	})
	 	return connect(localTracks);
	}).then(room => {
		console.log('Room connected!');
		registerMuteButton(room);
		registerRemoteEvents(room);
	});


