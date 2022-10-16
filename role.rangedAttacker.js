//works on flag named raFlag

var roleRangedAttacker = {
    run: function (creep) {
        let targetFlag = Game.flags.raFlag;
        
         let power = Game.getObjectById('602218ccfdff27036bb05838');

        if (creep.room == targetFlag.room) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            if (creep.room == targetFlag.room) {
                var enemySpawns = creep.room.find(FIND_HOSTILE_SPAWNS);
                var nearbyEnemy = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
                var enemiesInRoom = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 50);
                
                var powerBank = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_POWER_BANK)
                });
                
                if(power){
                    if(creep.rangedAttack(power) == ERR_NOT_IN_RANGE){
                        creep.moveTo(power);
                    }
                }
                

                // step 1: take out the spawn, destroy any creeps encountered on the way
                if (enemySpawns[0]) {
                    if (creep.rangedAttack(enemySpawns[0]) == ERR_NOT_IN_RANGE) {
                        creep.say('COMING FOR SPAWN!');
                        creep.moveTo(enemySpawns[0]);
                        if(nearbyEnemy.length > 0) {
                            creep.say('🏹');
                            creep.rangedAttack(nearbyEnemy[0]);
                        }
                    }
                }
                // step 2: take out the rest of the creeps
                if (enemiesInRoom.length > 0) {
                    if (creep.rangedAttack(enemiesInRoom[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(enemiesInRoom[0]);
                        creep.say('🏹');
                    }
                }
            } else {
                creep.moveTo(targetFlag);
            }
        } else {
            creep.moveTo(targetFlag);
        }
    }
};
module.exports = roleRangedAttacker;