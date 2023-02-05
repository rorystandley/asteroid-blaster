document.addEventListener("deviceready", onDeviceReady, false);

	// user is returning home
	function returnHome(){
		clearTimeout(ultimateTimer);
		context.clearRect (0,0,canvasWidth,canvasHeight);
		asteroids = [];
		bullets = [];
		stars = [];
		playGame = false;
		$(".nav").hide();
		$("#game_over").hide();
		$("#home-wrapper").show();
		$("#title").show();
		$("#planet span").text("10");
		$("#score span").text("0");
		$("#level").text("10");
		$('.launch').show();
		$('.fire').hide();
		$('.mainTitle').removeClass('moveTitle').removeAttr('style');
		$('.myRocket').removeClass('moveRocket').removeAttr('style');
	}

    // variable to output the current x, y & z values of the accelerometer
    var valueX;

    // when PhoneGap tells us everything is ready, start watching the accelerometer
    function onDeviceReady() {
        valueX = document.getElementById("valueX");
        startWatch();
    }

    // start monitoring the state of the accelerometer
    function startWatch() {
        var options = { frequency: 33 };
        navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    }

    // if the z-axis has moved outside of our sensitivity threshold, move the aarvark's head in the appropriate direction
    function onSuccess(acceleration) {
        valueX.innerHTML = acceleration.x;
    }

    function onError() {
        
    }
    
    Array.prototype.removeByValue = function (val) {
    	for (var i = 0; i < this.length; i++) {
        	if (this[i] === val) {
            	this.splice(i, 1);
            	break;
            }
        }
    };

$(document).ready(function(){

	$("#wrapper").prepend('<canvas id="myStars" width="'+window.innerWidth+'" height="'+window.innerHeight+'"></canvas>');
	$("#wrapper").prepend('<canvas id="gameBoard" width="'+window.innerWidth+'" height="'+window.innerHeight+'"></canvas>');
	
    
	//Create canvas
	canvas = $("#gameBoard");
	canvasStars = $("#myStars");
	context = canvas.get(0).getContext("2d");
	contextStars = canvasStars.get(0).getContext("2d");
	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight;
	
	// Game settings
	var playGame 			= true;
	var Player;
	var playAnimation 		= true;
	var planetLivesValue 	= 1;
	var numberAsteroids 	= 10;
	
	// Initialise Sounds
    var soundTrack = $("#sound-track").get(0), asteroidBlast = $("#bullet-sound").get(0);
    soundTrack.play();
	
	// Game Asset Arrays
	asteroids 	= [],
	bullets 	= [],
	stars 		= [],
	booms 		= [];
	players 	= [];
	
	// Load Spaceship
	var imgSpaceShipFile 	= new Image();
	imgSpaceShipFile.src 	= 'img/rocket_game.png';
	
	// Load Asteroid
	var imgAsteroidSmall 		= new Image();
	imgAsteroidSmall.src 		= 'img/asteroidSmall.png';
	imgAsteroidSmall.width 		= '38';
	imgAsteroidSmall.height 	= '28';

	var imgAsteroidMedium 		= new Image();
	imgAsteroidMedium.src 		= 'img/asteroidMedium.png';
	imgAsteroidMedium.width 	= '63';
	imgAsteroidMedium.height 	= '51';

	var imgAsteroidLarge 		= new Image();
	imgAsteroidLarge.src 		= 'img/asteroidLarge.png';
	imgAsteroidLarge.width 		= '85';
	imgAsteroidLarge.height 	= '68';
	
	// Load Explosion
	var imgExplosionFile 	= new Image();
	imgExplosionFile.src 	= 'img/explosion.png';

	// Load bullet
	var imgBullet 			= new Image();
	imgBullet.src 			= 'img/bullet.png';
	imgBullet.width 		= '7';
	imgBullet.height 		= '7';

	// We want our stars to show on the home screen so lets start this straight away
	setNumberOfStars(50);
	animateStars();
    
	function setNumberOfStars(number){
		Star = function (x, y) {
			this.x = x;
			this.y = y;
			this.brightness = Math.floor(Math.random() * 4);
			this.radius = Math.floor(Math.random() * 4);
		};
    	for (var i = 0; i < number; i++) {
        	var x = Math.floor(Math.random() * canvasWidth);
        	var y = Math.floor(Math.random() * canvasHeight - 100);
        	stars.push(new Star(x, y))
    	}
	}
	
	window.addEventListener('load', function() {
		Array.prototype.forEach.call(document.getElementsByClassName('fire'), function(fireMe) {
			fireMe.addEventListener('click', function() {
				bullets.push(new Bullet(players[0],imgBullet));
			}, false)
		});
	}, false);
				  
	function startGameArrays(){
		for(var i = 0; i < parseInt($("#level").text());i++){
			var x 		= 20+(Math.random()*(canvasWidth-40));
			var y 		= -canvasHeight+(Math.random()*(canvasHeight));
			var vY 		= 1+Math.random()*2;
			// var size = generate(4);
			var size 	= 1;

			if (size == 1) {
				var asteroidImg = imgAsteroidSmall;
			} else if (size == 2) {
				var asteroidImg = imgAsteroidMedium;
			} else if (size == 3) {
				var asteroidImg = imgAsteroidLarge;
			}
			var width 	= asteroidImg.width;
			var height 	= asteroidImg.height;
		
			asteroids.push(new asteroid(x,y,width,height,vY,size,asteroidImg));
		};
	}
    
	$(".launch").click(function(){

		var myHeightPosCss 	= parseInt(canvasHeight) + parseInt($('#rocket').height());
		var myWidthPosCss 	= parseInt(canvasWidth) + parseInt($('.mainTitle').width());

		$('.mainTitle').addClass('moveTitle');
		$('.topScore').addClass('moveScore');
		$('.myRocket').addClass('moveRocket');

		$('.moveTitle').css({
			'transform': 'translate(-'+myWidthPosCss+'px, 0px)',
		    '-webkit-transform': 'translate(-'+myWidthPosCss+'px, 0px)',
		    '-moz-transform': 'translate(-'+myWidthPosCss+'px, 0px)',
		    '-o-transform': 'translate(-'+myWidthPosCss+'px, 0px)',
		    '-ms-transform': 'translate(-'+myWidthPosCss+'px, 0px)'
		})

		$('.moveRocket').css({
			'transform': 'translate(0, -'+myHeightPosCss+'px)',
		    '-webkit-transform': 'translate(0, -'+myHeightPosCss+'px)',
		    '-moz-transform': 'translate(0, -'+myHeightPosCss+'px)',
		    '-o-transform': 'translate(0, -'+myHeightPosCss+'px)',
		    '-ms-transform': 'translate(0, -'+myHeightPosCss+'px)'
		});

		setTimeout(function(){
        	hideHomeScreen();
			// Now lest build our []
			startGameArrays();
			playGame = true;		
			setNumberOfStars();
			animate();
			changeCTAFire();
			createPlayer();
	    }, 2000);
	});
	
	$(".homeButton").click(function(){
		returnHome();
	});

	function hideHomeScreen() {
		$('#home-wrapper').hide();
		$('.nav').show();
		$('#title').hide();
	}

	function changeCTAFire() {
		$('.launch').hide();
		$('.fire').show();
	}

	function createPlayer() {
		Player = function(x,y){
			this.x 				= x;
			this.y 				= y;
			this.width 			= 40;
			this.height 		= 40;
			this.radius 		= 1;
			this.halfWidth 		= this.width/2;
			this.halfHeight 	= this.height/2
			this.vX 			= 0;
			this.vY 			= 0;
		}
		players.push(new Player((canvasWidth-60)/2,canvasHeight-120));
	}
	
	function animateBullet(bullet, i){
		bullet.y += -6;
		if (bullet.lifetime <= 0) {
			bullets.removeByValue(bullet);
		}else if(bullet.lifetime > 0){
			bullet.lifetime = bullet.lifetime - 10;
		}

		// Lets get the dimensions of our bullet
		var bWidth

		var asteroidsLength = asteroids.length;
		for(var i = 0; i < asteroidsLength; i++){
			tmpAsteroid = asteroids[i];
			if ((((bullet.y + bullet.height) - tmpAsteroid.height) < tmpAsteroid.y) && ((bullet.x >= tmpAsteroid.x) && (bullet.x <= (tmpAsteroid.x + tmpAsteroid.width)))) {
				asteroidBlast.play();
				booms.push(new Boom(imgExplosionFile, tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.width, tmpAsteroid.height));
				asteroids.removeByValue(tmpAsteroid);
				bullets.removeByValue(bullet);
				var accum = parseInt($("#score span").text())+10;
			  	$("#score span").text(accum);
			  	break;
			}
		}
		
	};

	function animateStars() {
		var starsLength = stars.length;
        for (var i = 0; i < starsLength; i++) {
        	var tmpStar = stars[i];        	
            var brightness = 'rgba(255,255,255, 0.' + tmpStar.brightness + ')';
            contextStars.fillStyle = brightness;
            contextStars.save();
            contextStars.beginPath();
            contextStars.arc(tmpStar.x, tmpStar.y, tmpStar.radius, 0, Math.PI * 2, true);
            contextStars.closePath();
            contextStars.fill();
            contextStars.restore();
        }
	}

	function animate() {

		context.clearRect(0, 0, canvasWidth, canvasHeight);

		if($("#planet span").text() <= "0") {
	    	playGame = false;
	    	asteroids 	= [],
			bullets 	= [],
			booms 		= [];
			players 	= [];
	    	$(".nav").hide();
	    	$(".cta").hide();
		    $("#game_over").show();
		    $("#game_over_score").html("YOUR SCORE: "+$("#score span").text());
		    $("#planet span").text("10");
		    $("#level").text('10');
		    context.clearRect(0, 0, canvasWidth, canvasHeight);
	    }else if((asteroids.length <= 0)&&($("#planet span").text() >= "1")){
	    	// We should add more asteroids
	    	$("#level").text(parseInt($("#level").text())+parseInt(10));
	    	startGameArrays();
	    }

		var bulletsLength = bullets.length;
		for (var i = 0; i < bulletsLength; i++) {
			var tmpBullet = bullets[i];
			if (tmpBullet) {
				context.save();
        		context.drawImage(imgBullet, tmpBullet.x, tmpBullet.y);
        		context.restore();
			  	animateBullet(tmpBullet, i);
			}
		}

        // Draw Booms
        if (booms.length > 0) {

        	for (var i = 0; i < booms.length; i++) {
        		var myBoom = booms[i];
        		context.drawImage(myBoom.image, myBoom.xpos, myBoom.ypos, myBoom.frameSize, myBoom.frameSize, myBoom.asteroidX, myBoom.asteroidY, myBoom.frameSize, myBoom.frameSize);
        		myBoom.xpos += myBoom.frameSize;
				//increase the index so we know which frame of our animation we are currently on
				myBoom.index += 1;

				if (myBoom.index == 33) {
					// We can remove our Boom from the array
					booms.removeByValue(myBoom);
				}
	        }
	    }

	    if (players.length == 1) {
	    	for (var i = 0; i < players.length; i++) {
	    		var myPlayer = players[i];
	    		//Draw Player		
				myPlayer.vX = parseFloat($("#valueX").text());
				
				if(myPlayer.vX <= -0.5){
					myPlayer.vX = Math.abs(myPlayer.vX)+6
				}else if(myPlayer.vX >= 0.5){
					myPlayer.vX = parseFloat("-"+myPlayer.vX)-6;
				}
				
				if(myPlayer.x > canvasWidth - 50){
					myPlayer.vX = -1;
				}else if(myPlayer.x <= 0){
					myPlayer.vX = 1;
				}

				myPlayer.x += myPlayer.vX;
				
				context.save();
				context.drawImage(imgSpaceShipFile, myPlayer.x, myPlayer.y);
				context.restore();
	    	};
	    }
		
		// Draw Asteroids
		var asteroidsLength = asteroids.length;
		for(var i = 0; i < asteroidsLength; i++){
			var tmpAsteroid = asteroids[i];

			tmpAsteroid.y += tmpAsteroid.vY;
			
			if(tmpAsteroid.y - tmpAsteroid.height > canvasHeight){
				asteroids.removeByValue(tmpAsteroid);
                $("#planet span").text(parseInt($("#planet span").text()) - parseInt(planetLivesValue));
				break;
			}

			context.save();
			context.drawImage(tmpAsteroid.asteroidImg, tmpAsteroid.x,tmpAsteroid.y);
			context.restore();
		}

		// Check to see if we can keep the animation going
		if (playGame) {
			ultimateTimer = setTimeout(animate, 33);
		}
	}
});