@extends('magic.layout')

@section('scripts')
	<script type="text/javascript" src="//media.twiliocdn.com/sdk/js/sync/v0.12/twilio-sync.min.js"></script>
@endsection

@section('content')

<div class="magic-container">
	<canvas id="canvas"></canvas>
	<div class="red-stripe"></div>
	<div class="text-container">
		<div class="circles">
		  <div class="circle-with-text">
		    Software Applications
		  </div>
		  <div class="circle-with-text">
		    Communications Systems
		  </div>
		</div>
		<div class="text-instruction">Text <span>Magic</span> to <span>(304) 317-7757</span></div>
	</div>
	<div class="results">
		<div id="waiting">Listening</div>
	</div>
	<div id="button"><svg fill="#F22F46" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 0C6.7 0 0 6.7 0 15s6.7 15 15 15 15-6.7 15-15S23.3 0 15 0zm0 26C8.9 26 4 21.1 4 15S8.9 4 15 4s11 4.9 11 11-4.9 11-11 11zm6.8-14.7c0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1 1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1zm0 7.4c0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1c0-1.7 1.4-3.1 3.1-3.1s3.1 1.4 3.1 3.1zm-7.4 0c0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1c0-1.7 1.4-3.1 3.1-3.1s3.1 1.4 3.1 3.1zm0-7.4c0 1.7-1.4 3.1-3.1 3.1S8.2 13 8.2 11.3s1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1z"/></svg>
</div>
</div>
	
@endsection

