//purpose: harvest local sources and bring to spawn & extensions. 

var roleStationaryHarvester = {
    // a function to run the logic for this role
    run: function(creep) {
        var src = Game.getObjectById(creep.memory.src);
        var lnk = Game.getObjectById(creep.memory.lnk);
        
        // done transferring, back to harvest
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // done harvesting, ready to transfer
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            if (creep.transfer(lnk, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(lnk);
            }
        }
        else {
            if(src.energy == 0 && creep.carryCapacity > 0) {
                creep.memory.working = true;
            }
            else if (creep.harvest(src) != '0') {
                creep.moveTo(src);
            }
            /*//console.log(creep.harvest(src));
            if (creep.harvest(src) != '0') {
                
                // move towards the source
                creep.moveTo(src);
            } */
        }
    }
};
module.exports = roleStationaryHarvester;