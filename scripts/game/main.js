class Game {
    constructor() {
        let canvas = document.querySelector('.game_canvas');
        this.ctx = canvas.getContext("2d");

        let self = this;

        canvas.addEventListener("mousemove", function(ev) {
            self.event_mousemove(ev);
        });

        canvas.addEventListener("mousedown", function(ev) {
            self.event_click(ev);
        });

        canvas.addEventListener("mouseup", function(ev) {
            self.event_mouseup(ev);
        });
        
        this.sceneManager = new SceneManager();
        
        this.lastRender = 0.0;
        this.delta = 0.0;
    }

    start() {
        this.sceneManager.push(new SceneTitle());
    }

    update(timestamp) {
        this.delta = timestamp - this.lastRender;

        this.sceneManager.update(this.delta);

        this.ctx.clearRect(0, 0, 640, 480);

        this.sceneManager.render(this.ctx);

        this.lastRender = timestamp;
    }

    event_mousemove(ev) {
        this.sceneManager.event_mousemove(ev);
    }

    event_click(ev) {
        this.sceneManager.event_click(ev);
    }

    event_mouseup(ev) {
        this.sceneManager.event_mouseup(ev);
    }
}

class SceneManager {
    constructor() {
        this.scenes = [];
    }

    peek() {
        return this.scenes[this.scenes.length-1];
    }

    push(scene) {
        if (this.scenes.length > 0) {
            let oldScene = this.peek();
            oldScene.pause();
        }

        this.scenes.push(scene);
        scene.start();
    }

    replace(scene) {
        let oldScene = this.pop();
        this.push(scene);
        return oldScene;
    }

    pop() {
        let popScene = this.scenes.pop();
        popScene.stop();

        let newScene = this.peek();
        newScene.play();

        return popScene;
    }

    update(delta) {
        if (this.scenes.length > 0) {
            this.peek().update(delta);
        }
    }

    render(ctx) {
        if (this.scenes.length > 0) {
            this.peek().render(ctx);
        }
    }

    event_mousemove(ev) {
        if (this.scenes.length > 0) {
            this.peek().event_mousemove(ev);
        }
    }

    event_click(ev) {
        if (this.scenes.length > 0) {
            this.peek().event_click(ev);
        }
    }

    event_mouseup(ev) {
        if (this.scenes.length > 0) {
            this.peek().event_mouseup(ev);
        }
    }
}

class Scene {
    start() {}
    pause() {}
    play() {}
    stop() {}

    update(delta) {}
    render(ctx) {}
    
    event_mousemove(ev) {}
}

class SceneTitle extends Scene {
    constructor() {
        super();

        this.squares = [];

        this.x = 0;
        this.y = 0;

        this.dragging = false;
    }

    start() {
        console.log("Starting Title");
    }

    pause() {
        console.log("Pausing Title");
    }

    play() {
        console.log("Playing Title");
    }

    stop() {
        console.log("Stopping Title");
    }

    update(delta) {
        
    }

    render(ctx) {
        this.squares.forEach(square => ctx.fillRect(square.x - 32, square.y - 32, 64, 64));
        ctx.fillRect(this.x - 32, this.y - 32, 64, 64);
    }

    event_mousemove(ev) {
        this.x = ev.clientX;
        this.y = ev.clientY;

        if (this.dragging) {
            this.squares.push({
                x: ev.clientX,
                y: ev.clientY
            });
        }
    }

    event_click(ev) {
        this.dragging = true;
        
    }

    event_mouseup(ev) {
        this.dragging = false;
    }
}

let game = new Game();
game.start();

function loop(timestamp) {
    game.update(timestamp);
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);