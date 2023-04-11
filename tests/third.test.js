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