// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png'; // enemy image
    this.x = 0; //initial coordinates
    this.y = y;
    this.speed = getRandomInt(2, 7); //get a random speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x = this.x + 1 * this.speed;
    var flag;
    allEnemies.forEach(function(enemy) {
        if (enemy.x > 500) {
            flag = true;
        } else {
            flag = false;
        }
    });
    if (flag) {
        generateEnemies();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() { //initialize player
    this.initX = 200;
    this.initY = 370;
    this.x = this.initX;
    this.y = this.initY;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  self=this //detects collision, if collides reset the game.
    allEnemies.forEach(function(enemy) {
        if (self.x < self.x + 20 && self.x + 20 > enemy.x &&
            self.y < enemy.y + 60 && self.y + 60 > self.y) {
            self.x = self.initX;
            self.y = self.initY;
            return;
            // The objects are touching
        }
    });
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //draw player
};

Player.prototype.handleInput = function(key) { //takes appropriate action on key input
    if (key === 'left' && this.x != 0) {
        this.x = this.x - 100;
    } else if (key === 'right' && this.x != 400) {
        this.x = this.x + 100;
    } else if (key === 'up') {
        if (this.y === 10) {

            this.y = this.initY;
            this.x = this.initX;
            alert("You won");
        } else {
            this.y = this.y - 90;
        }
    } else if (key === 'down' && this.y != this.initY) {
        this.y = this.y + 90;
    }
};




// Now instantiate your objects.
var player = new Player(); // instanantiate player
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
/*var randY = [60]
for(var i=0;i<6;i++)
{
allEnemies.push(new Enemy(ge));
}*/
function getRandomInt(min, max) { //get random integer between min and max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

function generateEnemies() { //instantiate enemies and push in allEnemies
    for (var i = 0; i < 6; i++) {
        allEnemies[i] = new Enemy(70 + 70 * getRandomInt(0, 3));
    }
};
window.onload = generateEnemies(); //initial generate on load



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
