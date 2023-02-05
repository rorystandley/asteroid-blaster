import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Explosion {
    x: number;
    y: number;
    lifetime: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.lifetime = 200;
    }
}

@Injectable({
    providedIn: 'root'
})
export class Bullet {
    x: number;
    y: number;
    rotation: number;
    vx: number;
    vy: number;
    speed: number;
    size: number;
    lifetime: number;
    owner: any;
    height: number;
    width: number;

    constructor(owner: any, imgBullet: any) {
        this.x = owner.x + 25;
        this.y = owner.y - 10;
        this.rotation = owner.rotation;
        this.vx = 0;
        this.vy = 0;
        this.speed = 10;
        this.size = 3;
        this.lifetime = 1620;
        this.owner = owner;
        this.height = imgBullet.height;
        this.width = imgBullet.width;
    }
}

@Injectable({
    providedIn: 'root'
})
export class Asteroid {
    x: number;
    y: number;
    vY: number;
    size: number;
    width: number;
    height: number;
    asteroidImg: any;

    constructor(x: number, y: number, width: number, height: number, vY: number, size: number, asteroidImg: any) {
        this.x = x;
        this.y = y;
        this.vY = vY;
        this.size = size;
        this.width = width;
        this.height = height;
        this.asteroidImg = asteroidImg;
    }
}

@Injectable({
    providedIn: 'root'
})
export class Boom {
    image: any;
    xpos: number;
    ypos: number;
    index: number;
    frameSize: number;
    numFrames: number;
    asteroidX: number;
    asteroidY: number;

    constructor(image: any, asteroidX: number, asteroidY: number, asteroidWidth: number, asteroidHeight: number) {
        this.image = image;
        this.xpos = 0;
        this.ypos = 0;
        this.index = 0;
        this.frameSize = 70;
        this.numFrames = 33;

        this.asteroidX = asteroidX - (asteroidWidth / 2);
        this.asteroidY = asteroidY - (asteroidHeight / 2);
    }
}
