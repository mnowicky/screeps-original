var roleStationaryUpgrader = {
    // a function to run the logic for this role
    run: function(creep) {
        var lnk = Game.getObjectById(creep.memory.lnk);
        
        // done upgrading, out of energy
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        // ready to upgrade, carry capacity full from link
        else if (creep.memory.working == false && creep.carry.energy > 0) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            if (creep.withdraw(lnk, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(lnk);
            }
        }
    }
};
module.exports = roleStationaryUpgrader;