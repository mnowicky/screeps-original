var roleUpgrader = require('role.upgrader');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        
        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        
        if (creep.room.energyAvailable == creep.room.energyCapacityAvailable) {
            roleUpgrader.run(creep);
        }

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            creep.say('⚡');
            // find closest spawn, extension or tower which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_TOWER)
                             && s.energy < s.energyCapacity
            });

            if (structure != undefined) {
                creep.say('⚡');
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
        }
        else {
            /*var dropped = creep.pos.findInRange(FIND_DROPPED_RESOURCES,25);
            if(dropped) {
                if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped[0]);
                    }
                }*/
            
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(source == [] && creep.carryCapacity > 0) {
                creep.memory.working == true;
            }else if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};