describe('Soldier class', function(){
    let soldier = new Soldier(150, 90, futureSoldier, 60, 70);

    it('should be a number for x', function(){
        expect(typeof soldier.x).toBe('number');
    })
    it('should be a number for y', function(){
        expect(typeof soldier.y).toBe('number');
    })
    it('should be a number for width', function(){
        expect(typeof soldier.width).toBe('number');
    })
    it('should be a number for height', function(){
        expect(typeof soldier.height).toBe('number');
    })
    it('should be a boolean for alive', function(){
        expect(typeof soldier.alive).toBe('boolean');
    })
})

describe('Mine class', function(){
    let mine = new Mine(35, 200, randomMine, 25, 25);

    it('should be a number for x', function(){
        expect(typeof mine.x).toBe('number');
    })
    it('should be a number for y', function(){
        expect(typeof mine.y).toBe('number');
    })
    it('should be a number for width', function(){
        expect(typeof mine.width).toBe('number');
    })
    it('should be a number for height', function(){
        expect(typeof mine.height).toBe('number');
    })
    it('should be a boolean for alive', function(){
        expect(typeof mine.alive).toBe('boolean');
    })
})

describe('detectHit', function() {
    it('should return a boolean', function(){
        let result = detectHit(soldier, Mine);
        expect(typeof(result)).toBe('boolean')
    })
})

describe('moveSoldier', function() {
    it('should move the soldier to the right when key is pressed ', function() {
        const e = {key: 'd'};
        moveSoldier(e);
        expect(soldier.x).toBe(175);
    })
    it('should move the soldier to the left when key is pressed ', function() {
        const e = {key: 'a'};
        moveSoldier(e);
        expect(soldier.x).toBe(150);
    })
    it('should move the soldier up when key is pressed ', function() {
        const e = {key: 'w'};
        moveSoldier(e);
        expect(soldier.y).toBe(65);
    })
})