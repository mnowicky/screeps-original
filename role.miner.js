//finds deposits in target room, mines them, dumps in container in home room. 

var roleMiner = {
    run: function (creep) {
        let mineFlag = Game.flags.mineFlag;
        let storeFlag = Game.flags.storeFlag2;
        
        //if already dropped off load, make harvester and release
        if (creep.memory.working == true && JSON.stringify(creep.store) == '{}') {
            creep.memory.working = false;
            creep.memory.role = 'upgrader';
        }
        if (creep.memory.working == false && creep.store[RESOURCE_METAL] == creep.store.getCapacity()) {
            creep.memory.working = true;
        }
        if (creep.memory.working == false && creep.ticksToLive <= 350) {
            creep.memory.working = true;
        }
        
        if (creep.memory.working == true) {
            if (creep.room == storeFlag.room) {
                
                var tombstone = creep.room.find(FIND_TOMBSTONES);
                if(tombstone) {
                    if(creep.withdraw(tombstone[0], RESOURCE_METAL) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tombstone[0]);
                    }
                }
                
                var strg = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_STORAGE) //&& s.store < s.getCapacity()
                });
                
                if (strg) {
                    if(creep.transfer(strg, RESOURCE_METAL) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(strg);
                    }
                }else{
                    creep.moveTo(storeFlag);
                }
            }
            else {
                creep.moveTo(storeFlag);
            }
        }
        else if (creep.memory.working == false) {
            if (creep.room == mineFlag.room) {
                
                var dropped = creep.pos.findInRange(FIND_DROPPED_RESOURCES,25);
                if(dropped) {
                    if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropped[0]);
                    }
                }
                
                var deposit = creep.pos.findClosestByPath(FIND_DEPOSITS, {
                    filter: (d) => (d.depositType == RESOURCE_METAL
                                || d.depositType == RESOURCE_MIST
                                || d.depositType == RESOURCE_SILICON
                                || d.depositType == RESOURCE_MIST)
                });
                
                if (deposit) {
                    if (creep.harvest(deposit) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(deposit);
                    }
                }
            }
            else {
                creep.moveTo(mineFlag);
            }
        }
        
    }
};
module.exports = roleMiner;