//room 2 foreign harvesters harvest for the room extensions/spawn, not the controller

var roleUpgrader = require('role.upgrader');

var roleForeignHarvesterRm2 = {
    run: function (creep) {
        let targetFlag = Game.flags.rm2Target;
        let homeFlag = Game.flags.rm2Home;
        var rm2EdgeLnk = Game.getObjectById('602060c955093b1bf1021609');

        if (creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        //full of energy, headed back home
        if (creep.memory.working == true) {
            if (creep.room == targetFlag.room) {
                //contribute energy to nearby construction sites in target room
                var constructionSite = creep.pos.findInRange(FIND_CONSTRUCTION_SITES,2);
                if(constructionSite) {
                    if (creep.build(constructionSite[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite[0]);
                    }
                }
                //repair roads walked on in target room
                var road = creep.pos.findInRange(FIND_STRUCTURES,1, {
                    filter: (r) => r.hits < r.hitsMax && r.structureType == STRUCTURE_ROAD
                });
                if(road) {
                    creep.repair(road);
                }
                creep.moveTo(homeFlag);
            }
            
            
            if (creep.room == homeFlag.room) {
                
                //if room energy at full capacity, upgrade controller
                //if (creep.room.energyAvailable >= (creep.room.energyCapacityAvailable / 2)) {
                if(creep.transfer(rm2EdgeLnk, RESOURCE_ENERGY) != OK) {
                    creep.moveTo(rm2EdgeLnk);
                }
                //}
                
                //below is the setup to have them act as rm2 harvesters, instead of link upgraders
                
                //repair roads walked on in home room
                /*var road = creep.pos.findInRange(FIND_STRUCTURES,1, {
                    filter: (r) => r.hits < r.hitsMax && r.structureType == STRUCTURE_ROAD
                });
                if(road) {
                    creep.repair(road);
                }
                
                //contribute energy to nearby construction sites in home room
                var constructionSite = creep.pos.findInRange(FIND_CONSTRUCTION_SITES,2);
                if(constructionSite) {
                    if (creep.build(constructionSite[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite[0]);
                    }
                }
                
                
                //find spawns, extensions and towers not at full cap.
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    // the second argument for findClosestByPath is an object which takes
                    // a property called filter which can be a function
                    // we use the arrow operator to define it
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                || s.structureType == STRUCTURE_EXTENSION
                                || s.structureType == STRUCTURE_TOWER)
                                && s.energy < s.energyCapacity
                });

                //transfer energy to structures
                if (structure != undefined) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }*/
            }
        }
        else if(creep.memory.working == false){
            if (creep.room == homeFlag.room) {
                creep.moveTo(targetFlag);
            }
            
            else if (creep.room == targetFlag.room) {
                
                var dropped = creep.pos.findInRange(FIND_DROPPED_RESOURCES,10);
                if(dropped) {
                    if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropped[0]);
                    }
                }
                
                //if source to harvest is out of range, check if capacity more than half.
                //if yes, bring it back
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    if(creep.store[RESOURCE_ENERGY] > (creep.store.getCapacity()/2)) {
                        creep.memory.working = true;
                    }
                    else {
                    creep.moveTo(source);
                    }
                }
            }
        }
    }
};
module.exports = roleForeignHarvesterRm2;