//works on flag named resFlag
//purpose: to go into target unoccupied rooms, claim it if possible, if not reserve it. 

var roleRoomReserver = {
    run: function (creep) {
        let flag = Game.flags.resFlag;

        if (creep.room == flag.room) {
            
            if(creep.signController(creep.room.controller, "WARNING: Planned expansion. 💣 NO TRESSPASSING!") == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            
            if(creep.claimController(creep.room.controller) != OK) {
                if(creep.reserveController(creep.room.controller) != OK) {
                    creep.moveTo(creep.room.controller);
                }
            }    
        }else{
            creep.moveTo(flag)
        }
    }
};
module.exports = roleRoomReserver;