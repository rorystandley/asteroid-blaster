// Explosion
Explosion = function(x,y){
	this.x 				= x;
	this.y 				= y;
	this.lifetime 		= 200;
}

//Create Bullets
Bullet = function (owner, imgBullet) {
	this.x 				= owner.x + 25;
	this.y 				= owner.y - 10;
	this.rotation 		= owner.rotation;
	this.vx 			= 0;
	this.vy 			= 0;
	this.speed 			= 10;
	this.size 			= 3;
	this.lifetime 		= 1620;
	this.owner 			= owner;
	this.height 		= imgBullet.height;
	this.width 			= imgBullet.width;
}

// Asteroid	
asteroid = function(x, y, width, height, vY, size, asteroidImg){
	this.x 				= x;
	this.y 				= y;
	this.vY 			= vY;
	this.size 			= size;
	this.width 			= width;
	this.height 		= height;
	this.asteroidImg 	= asteroidImg;
}

// Booms
Boom = function(image, asteroidX, asteroidY, asteroidWidth, asteroidHeight) {
				
    this.image 		= image;
    this.xpos 		= 0;
    this.ypos 		= 0;
    this.index 		= 0;
    this.frameSize 	= 70;
    this.numFrames 	= 33;

    this.asteroidX 	= asteroidX - (asteroidWidth/2);
    this.asteroidY  = asteroidY - (asteroidHeight/2);
}