$(function() {
	var mode = 0; //App mode
	var timeCounter = 0; //time counter
	var lapCounter = 0; //lap counter
	var action; //variable for setInterval
	var lapno = 0; //naumber of laps
	var timeMinutes,timeSeconds,timeCentiseconds,lapMinutes,lapSeconds,lapCentiseconds;
	
	//on app load how and lap buttons
	hideshowButton("#startButton","#lapButton");

	//click on start buttn
	$("#startButton").click(function() {
		//mode on
		mode = 1;
		//show stop and lap button
		hideshowButton("#stopButton","#lapButton");
		//startCounter
		startAction();
	});


	//click on stop button
	$("#stopButton").click(function() {
		//show resume and reset button
		hideshowButton("#resumeButton" ,"#resetButton");
		//stop counter
		clearInterval(action);
	});


	//clicking on resume button
	$("#resumeButton").click(function() {
		//show stop and lap button
		hideshowButton("#stopButton" ,"#lapButton");
		//start counter
		startAction();
	});


	//clicking on resume button
	$("#resetButton").click(function() {
		//reload page
		location.reload();
	});


	$("#lapButton").click(function() {
		//if mode is on 
		if(mode) {
			//stop action
			clearInterval(action);
			//resetlap and print lap details
			lapCounter = 0;
			addLap();
			//start action
			startAction();
		}
	});

	//functions
	function hideshowButton(x,y) {
		$(".control").hide();
		$(x).show();
		$(y).show();
	}

	//start the counter
	function startAction() {
		action = setInterval(function() {
			timeCounter++;
				if(timeCounter == 100*60*100) {
					timeCounter = 0;
				}
			lapCounter++;
			if(lapCounter == 100*60*100) {
					lapCounter = 0;
				}
			updateTime();
		},10);
	}

	//updateTime converts counters to minute seconds and centiseconds
	function updateTime() {
		//1min = 60*100centiseconds = 6000centiseconds
		timeMinutes = Math.floor(timeCounter/6000);
		//1sec = 100centiseconds
		timeSeconds = Math.floor((timeCounter%6000)/100);
		timeCentiseconds = Math.floor((timeCounter%6000)%100);
			$("#timeminute").text(format(timeMinutes));
			$("#timesecond").text(format(timeSeconds));
			$("#timecentisecond").text(format(timeCentiseconds));


		//1min = 60*100centiseconds = 6000centiseconds
		lapMinutes = Math.floor(lapCounter/6000);
		//1sec = 100centiseconds
		lapSeconds = Math.floor((lapCounter%6000)/100);
		lapCentiseconds = Math.floor((lapCounter%6000)%100);
			$("#lapminute").text(format(lapMinutes));
			$("#lapsecond").text(format(lapSeconds));
			$("#lapcentisecond").text(format(lapCentiseconds));
	}

	//format numbers 
	function format(number) {
		if(number<10) {
			return '0' + number;
		}else {
			return number;

		}
	}

	//print lap details inside the lap
	function addLap() {
		lapno++;
		var myLapDetails = 
			'<div class="lap">'+
				'<div class="laptimetitle">'+
					'Lap' + lapno +
				'</div' + 
				'<div class="laptime">' +
					'<span>' + format(lapMinutes) + '</span>' +  ':<span>' + format(lapSeconds) + '</span>' + ':<span>' + format(lapCentiseconds) + '</span>' +   
				'</div>' +
			'</div>';
		$(myLapDetails).prependTo("#laps");
	}
});