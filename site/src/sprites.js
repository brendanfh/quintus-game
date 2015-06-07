Quintus.GameSprites = function(Q) {
    Q.Sprite.extend("Player", {
        init: function(p) {
            this._super(p, {
                x: 0,
                y: 100,
                w: 100,
                h: 100,
                angle: 45,
            });
        },
        
        getDir: function() {
            var dx = 0;
            var dy = 0;
            if(!Q.input.joypadEnabled) {
                if(Q.inputs["up"]) dy = -1;
                if(Q.inputs["down"]) dy = 1;
                if(Q.inputs["left"]) dx = -1;
                if(Q.inputs["right"]) dx = 1;
            }
            else {
                if(Q.joypad.joypadTouch != null) {
                    var xx = Q.joypad.x || Q.joypad.centerX;
                    var yy = Q.joypad.y || Q.joypad.centerY;
                    dx = (xx - Q.joypad.centerX) / Q.joypad.size;
                    dy = (yy - Q.joypad.centerY) / Q.joypad.size;
                }
            }
            
            return [dx, dy];
        },
        
        step: function(dt) {
            var speed = 200;
            var dir = this.getDir();
            this.p.x += dir[0] * speed * dt;
            this.p.y += dir[1] * speed * dt;
            this.p.angle += 360 * dt;
        },
        
        draw: function(ctx) {
            ctx.fillStyle = "#f00";
            ctx.fillRect(-this.p.cx, -this.p.cy, this.p.w, this.p.h);
            
            ctx.fillStyle = "#00f";
            ctx.fillRect(-2, -2, 4, 4);
        }
    });
};