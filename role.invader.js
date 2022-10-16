//works on flag named invFlag
//purpose: move to target room, take out remaining creeps, 
// take out remaining spawn, move to controller at attack it. 
// once neutral, claim it. 

var roleInvader = {
    run: function (creep) {
        let targetFlag = Game.flags.invFlag;

        if (creep.room == targetFlag.room) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            if (creep.room == targetFlag.room) {
                var enemySpawns = creep.room.find(FIND_HOSTILE_SPAWNS);
                var enemies = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                var nearbyEnemy = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 2);
                
                //take out remaining creeps
                if(enemies) {
                    if(creep.attack(enemies) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(enemies);
                        creep.say('COMING FOR YOU!');
                    }
                }
                // if spawn remains, attack it (should be taken out by rangedAttacker)
                if (enemySpawns[0]) {
                    if (creep.attack(enemySpawns[0]) == ERR_NOT_IN_RANGE) {
                        creep.say('COMING FOR SPAWN!');
                        creep.moveTo(enemySpawns[0]);
                        if(nearbyEnemy.length > 0) {
                            creep.say('DIE!');
                            creep.attackttack(nearbyEnemy[0]);
                        }
                    }
                }
                //finally, if there's a controller, and it's not mine...
                //if my attempt to claim is anything but ok...
                //if it's too far to attack...
                //move to controller
                if(creep.room.controller && !creep.room.controller.my) {
                    if(creep.claimController(creep.room.controller) != OK) {
                        if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                        }
                    }    
                }else{
                    creep.moveTo(targetFlag);
                    creep.say('LOL OWNED!');
                }
            } else {
                creep.moveTo(targetFlag);
            }
        } else {
            creep.moveTo(targetFlag);
        }
    }
};
module.exports = roleInvader;