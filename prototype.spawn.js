module.exports = function () {
    StructureSpawn.prototype.createCustomCreep =
        function (energy, roleName) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor(energy / 200);
            numberOfParts = Math.min(numberOfParts,16);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            return this.createCreep(body, undefined, { role: roleName, working: false });
        };
        
    StructureSpawn.prototype.createMiner = 
        function () {
            return this.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'miner', working: false });   
        }
    
    StructureSpawn.prototype.createPowerBrute = 
        function () {
            return this.createCreep([ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'brute', working: false });
        }

    StructureSpawn.prototype.createRangedAttacker = 
        function (energy, roleName) {
            var numberOfParts = Math.floor(energy / 200);
            numberOfParts = Math.min(numberOfParts,25);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(RANGED_ATTACK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            return this.createCreep(body, undefined, { role: roleName, working: false });
        };
    
    StructureSpawn.prototype.createInvader = 
        function (energy, roleName) {
            var numberOfParts = Math.floor((energy-600) / 140);
            numberOfParts = Math.min(numberOfParts,16);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(ATTACK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(TOUGH);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            body.push(CLAIM);
            return this.createCreep(body, undefined, { role: roleName, working: false });
        };

    StructureSpawn.prototype.createRoomReserver = 
        function (energy, roleName) {
            var numberOfParts = Math.floor(energy / 650);
            numberOfParts = Math.min(numberOfParts,24);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CLAIM);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            return this.createCreep(body, undefined, { role: roleName, working: false });
        };


    StructureSpawn.prototype.createStationaryHarvester = 
        function (energy, roleName, srcId, lnkId) {
            var numberOfParts = Math.floor((energy-200) / 150);
            numberOfParts = Math.min(numberOfParts,23);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            body.push(MOVE);
            body.push(MOVE);
            body.push(MOVE);
            body.push(MOVE);
            return this.createCreep(body, undefined, { role: roleName, working: false, src: srcId, lnk: lnkId})
        };
        
    StructureSpawn.prototype.createStationaryUpgrader = 
        function (energy, roleName, lnkId) {
            var numberOfParts = Math.floor((energy-200) / 150);
            numberOfParts = Math.min(numberOfParts,23);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            body.push(MOVE);
            body.push(MOVE);
            body.push(MOVE);
            body.push(MOVE);
            return this.createCreep(body, undefined, { role: roleName, working: false, lnk: lnkId})
        };


    /* example how to manually spawn a creep
    StructureSpawn.prototype.createClaimer =
        function () {
            return this.createCreep([CLAIM, MOVE, MOVE, WORK, WORK, CARRY, CARRY], undefined, { role: 'claimer', working: false });
        } */

};