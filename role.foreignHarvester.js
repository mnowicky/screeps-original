//implemented only for room w6s19 at this time, because it only has 1 source.
//utilizes flags 3 and 4 to harvest from w5s19 and w7s19, respectively.

var roleForeignHarvester = {
    run: function (creep) {
        let targetFlag = Game.flags.fhTarget1;
        let homeFlag = Game.flags.fhHome;
        var edgeLink = Game.getObjectById('6017b81240d4f16a9eb45fa2');
        var src = Game.getObjectById('5bbcac9b9099fc012e635d78');

        if (creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        else if (creep.ticksToLive <= 100 && creep.carry.energy > 150) {
            creep.memory.working = true;
        }
        else if (creep.ticksToLive <= 100) {
            creep.memory.working = true;
        }
        
        //has energy, headed back to home room
        if (creep.memory.working == true) {
            if (creep.room == targetFlag.room) {
                
                //contribute energy to nearby construction sites in target room
                var constructionSite = creep.pos.findInRange(FIND_CONSTRUCTION_SITES,2);
                if(constructionSite) {
                    if (creep.build(constructionSite[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite[0]);
                    }
                }
                
                //repair roads walked on
                var road = creep.pos.findInRange(FIND_STRUCTURES,2, {
                    filter: (r) => r.hits < r.hitsMax && r.structureType == STRUCTURE_ROAD
                });
                if(road) {
                    creep.repair(road);
                }
                creep.moveTo(homeFlag);
            //end "way back to home room after harvesting energy" 
            }
            
            //has energy, back in home room after harvesting
            else if (creep.room == homeFlag.room) {
                if(creep.transfer(edgeLink, RESOURCE_ENERGY) != OK) {
                    creep.moveTo(edgeLink);
                }
            }
        }
        //creep dropped off resources, back in target room on way to source.
        else if(creep.memory.working == false){
            if (creep.room == homeFlag.room) {
                creep.moveTo(targetFlag);
            }
            else if (creep.room == targetFlag.room) {
                
                //pick up dropped shit from dead creeps
                var dropped = creep.pos.findInRange(FIND_DROPPED_RESOURCES,10);
                if(dropped) {
                    if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropped[0]);
                    }
                }
                
                //go to harvest source
                //var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(src) != OK) {
                    creep.moveTo(src);
                }
                /*if (source == 'null') {
                    var src = Game.getObjectById(creep.room.find(FIND_SOURCES));
                    creep.moveTo(src[0]);
                }*/
            }
        }
    }
};
module.exports = roleForeignHarvester;