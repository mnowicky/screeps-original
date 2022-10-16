//Signs rooms... simple as that

var roleRoomSigner = {
    run: function (creep) {
        let flag = Game.flags.signFlag;
        let warnExpansion = "WARNING: Planned expansion. 💣 NO TRESSPASSING 💣"
        let warnInUse = "WARNING: Room currently in use. 💀 KEEP OUT 💀"

        if (creep.room == flag.room) {
            
            if(creep.signController(creep.room.controller, warnExpansion) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            
            if(creep.signController(creep.room.controller, warnInUse) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            
        }else{
            creep.moveTo(flag)
        }
    }
};
module.exports = roleRoomSigner;