var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {

        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        
        /*if (creep.store[RESOURCE_METAL] == creep.store.getCapacity()) {
            var strg = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_STORAGE) //&& s.store < s.getCapacity()
            });
                
            if (strg) {
                if(creep.transfer(strg, RESOURCE_METAL) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(strg);
                }
            }
        }*/

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working == true) {
            creep.say('⛏️');
            // find closest constructionSite
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if one is found
            if (constructionSite != undefined) {
                creep.say('⛏️');
                // try to build, if the constructionSite is not in range
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                    creep.moveTo(constructionSite);
                }
            }
            /*
            //repair roads walked on
            var road = creep.pos.findInRange(FIND_STRUCTURES,1, {
                filter: (r) => r.hits < r.hitsMax && r.structureType == STRUCTURE_ROAD
            });
            if(road) {
                creep.repair(road);
            }
            */
            // if no constructionSite is found, count room harvesters, if less than 2, harvest- if 2 or more, upgrade
            else {
                
                roleUpgrader.run(creep);
                //let crpsInRoom = creep.room.find(FIND_CREEPS);
                //var numHarvesters = _.sum(crpsInRoom, (c) => c.memory.role == 'harvester');
                //if (numHarvesters < 2) {
                    //roleHarvester.run(creep);
                //}
                //else {
                    //roleUpgrader.run(creep);
                //}
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            //first, pickup any dropped energy
            var dropped = creep.pos.findInRange(FIND_DROPPED_RESOURCES,20);
            if(dropped) {
                if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped[0]);
                }
            }
            
            /*var tombstone = creep.room.find(FIND_TOMBSTONES);
            if(tombstone) {
                if(creep.withdraw(tombstone[0], RESOURCE_METAL) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tombstone[0]);
                }
            }
            
            var dropped = creep.pos.findInRange(FIND_DROPPED_RESOURCES,20);
            if(dropped) {
                if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped[0]);
                }
            }*/
            
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};