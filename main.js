require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleForeignHarvester = require('role.foreignHarvester');
var roleForeignHarvesterRm2 = require('role.foreignHarvesterRm2');
var roleRangedAttacker = require('role.rangedAttacker');
var roleInvader = require('role.invader');
var roleStationaryHarvester = require('role.stationaryHarvester');
var roleStationaryUpgrader = require('role.stationaryUpgrader');
var roleMiner = require('role.miner');
var roleRoomReserver = require('role.roomReserver');
var roleRoomSigner = require('role.roomSigner');


module.exports.loop = function () {
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            console.log('Deleting' + Memory.creeps[name] + 'from memory; creep dead');
            delete Memory.creeps[name];
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'foreignHarvester') {
            roleForeignHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else if (creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
        else if (creep.memory.role == 'rangedAttacker') {
            roleRangedAttacker.run(creep);
        }
        else if (creep.memory.role == 'invader') {
            roleInvader.run(creep);
        }
        else if (creep.memory.role == 'stationaryHarvester') {
            roleStationaryHarvester.run(creep);
        }
        else if (creep.memory.role == 'stationaryUpgrader') {
            roleStationaryUpgrader.run(creep);
        }
        else if (creep.memory.role == 'foreignHarvesterRm2') {
            roleForeignHarvesterRm2.run(creep);
        }
        else if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        else if (creep.memory.role == 'roomReserver') {
            roleRoomReserver.run(creep);
        }
        else if (creep.memory.role == 'roomSigner') {
            roleRoomSigner.run(creep);
        }
    }
    

    
    //console.log('Defining tower functionality');
    var towers = Game.rooms.W5S18.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
    }
    
    var towers2 = Game.rooms.W6S18.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower2 of towers2) {
        var target2 = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target2 != undefined) {
            tower2.attack(target2);
        }
    }
    
    var towers3 = Game.rooms.W6S19.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower3 of towers3) {
        var target3 = tower3.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target3 != undefined) {
            tower3.attack(target3);
        }
    }
    
    
    //links
    var lnk_rm1_north = Game.getObjectById('5ffe3244017b7f138d559e92');
    var lnk_rm1_south = Game.getObjectById('601f65410ef766467c1be942');
    var lnk_rm1_ctrl = Game.getObjectById('5ffe35b66efa2a652c53fba3');
    var lnk_rm2_south = Game.getObjectById('601342fea3a2be03c4dff8ce');
    var lnk_rm2_edge = Game.getObjectById('602060c955093b1bf1021609');
    var lnk_rm2_ctrl = Game.getObjectById('600ab0cc820e7b26a398b0b8');
    var lnk_rm3_edge = Game.getObjectById('6017b81240d4f16a9eb45fa2');
    var lnk_rm3_ctrl = Game.getObjectById('601708bb54d5a5237766e701');
    
    //link transfers
    if(lnk_rm1_north.store[RESOURCE_ENERGY] >= 300) {
        lnk_rm1_north.transferEnergy(lnk_rm1_ctrl);
    }
    if(lnk_rm1_south.store[RESOURCE_ENERGY] >= 300) {
        lnk_rm1_south.transferEnergy(lnk_rm1_ctrl);
    }
    if(lnk_rm2_edge.store[RESOURCE_ENERGY] >= 200) {
        lnk_rm2_edge.transferEnergy(lnk_rm2_ctrl);
    }    
    if(lnk_rm2_south.store[RESOURCE_ENERGY] >= 200) {
        lnk_rm2_south.transferEnergy(lnk_rm2_ctrl);
    }
    if(lnk_rm3_edge.store[RESOURCE_ENERGY] >= 200) {
        lnk_rm3_edge.transferEnergy(lnk_rm3_ctrl);
    }
    
    for (let spawnName in Game.spawns) {
        let spawn = Game.spawns[spawnName];
        let creepsInRoom = spawn.room.find(FIND_CREEPS);

        var numberOfHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'harvester');
        var numberOfUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader');
        var numberOfBuilders = _.sum(creepsInRoom, (c) => c.memory.role == 'builder');
        var numberOfRepairers = _.sum(creepsInRoom, (c) => c.memory.role == 'repairer');
        var numberOfWallRepairers = _.sum(creepsInRoom, (c) => c.memory.role == 'wallRepairer');
        var numberOfForeignHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'foreignHarvester');
        var numberOfRangedAttackers = _.sum(Game.creeps, (c) => c.memory.role == 'rangedAttacker');
        var numberOfInvaders = _.sum(Game.creeps, (c) => c.memory.role == 'invader');
        var numberOfForeignHarvestersRm2 = _.sum(Game.creeps, (c) => c.memory.role == 'foreignHarvesterRm2');
        var numberOfStationaryHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'stationaryHarvester');
        var numberOfStationaryUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'stationaryUpgrader');
        var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
        var numberOfStatHarv_rm1_n = _.sum(creepsInRoom, (c) => c.memory.role == 'stationaryHarvester' && c.memory.src == '5bbcac8e9099fc012e635b46');
        var numberOfStatHarv_rm1_s = _.sum(creepsInRoom, (c) => c.memory.role == 'stationaryHarvester' && c.memory.src == '5bbcac8e9099fc012e635b47');
        var numberOfStatHarv_rm2_n = _.sum(creepsInRoom, (c) => c.memory.role == 'stationaryHarvester' && c.memory.src == '5bbcac9b9099fc012e635d74');
        var numberOfStatHarv_rm2_s = _.sum(creepsInRoom, (c) => c.memory.role == 'stationaryHarvester' && c.memory.src == '5bbcac9b9099fc012e635d76');
        var numberOfStatHarv_rm3 = _.sum(creepsInRoom, (c) => c.memory.role == 'stationaryHarvester' && c.memory.src == '5bbcac8e9099fc012e635b4b');
        var numberOfRoomReservers = _.sum(Game.creeps, (c) => c.memory.role == 'roomReserver');
        
        //===================== Set energy properties per spawn =========================
        var availEnergy = spawn.room.energyAvailable;
        var halfEnergy = spawn.room.energyCapacityAvailable/2;
        var fullEnergy = spawn.room.energyCapacityAvailable;
        var name = undefined;

        if (numberOfHarvesters < spawn.memory.minHarvesters) {
            console.log(spawnName + ': next spawn, harvester.');
            name = spawn.createCustomCreep(halfEnergy, 'harvester');
            if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
                console.log(spawnName + ': spawning failed, clan dying; emergency spawn of harvester');
                name = spawn.createCustomCreep(
                    spawn.room.energyAvailable, 'harvester');
            }
        }
        else if (numberOfRoomReservers < spawn.memory.minRoomReservers) {
            console.log(spawnName + ': next spawnm room reserver.');
            name = spawn.createRoomReserver(fullEnergy, 'roomReserver');
        }
        else if (numberOfMiners < spawn.memory.minMiners) {
            if (spawnName == 'Spawn4') {
                console.log(spawnName + ': next spawn, miner.');
                name = spawn.createMiner();
            }
            else {
                console.log(spawnName + ': next spawn, miner.');
                name = spawn.createCustomCreep(fullEnergy, 'miner');
            }
        }
        else if (numberOfStationaryUpgraders < spawn.memory.minStationaryUpgraders) {
            if (spawnName == 'Spawn1') {
                console.log(spawnName + ': next spawn, stationary upgrader [W6S18 - rm1].');
                name = spawn.createStationaryUpgrader(halfEnergy, 'stationaryUpgrader', '5ffe35b66efa2a652c53fba3');
            }
            if (spawnName == 'Spawn2') {
                console.log(spawnName + ': next spawn, stationary upgrader [W5S18 - rm2].');
                name = spawn.createStationaryUpgrader(1800, 'stationaryUpgrader', '600ab0cc820e7b26a398b0b8');
            }
            if (spawnName == 'Spawn3') {
                console.log(spawnName + ': next spawn, stationary upgrader [W6S19 - rm3].');
                name = spawn.createStationaryUpgrader(halfEnergy, 'stationaryUpgrader', '601708bb54d5a5237766e701');
            }
            if (spawnName == 'Spawn4') {
                console.log(spawnName + ': next spawn, stationary upgrader [W6S18 - rm1].');
                name = spawn.createStationaryUpgrader(halfEnergy, 'stationaryUpgrader', '5ffe35b66efa2a652c53fba3');
            }
        }
        else if (numberOfStationaryHarvesters < spawn.memory.minStationaryHarvesters) {
            console.log(spawnName + ': needs stationary harvesters');
            if (numberOfStatHarv_rm1_n == 0 && spawnName == 'Spawn1') {
                console.log(spawnName + ': next spawn, stationary harvester north.');
                name = spawn.createStationaryHarvester(2000, 'stationaryHarvester', '5bbcac8e9099fc012e635b46', '5ffe3244017b7f138d559e92');
            }
            if (numberOfStatHarv_rm1_s == 0 && spawnName == 'Spawn1') {
                console.log(spawnName + ': next spawn, stationary harvester south.');
                name = spawn.createStationaryHarvester(2000, 'stationaryHarvester', '5bbcac8e9099fc012e635b47', '601f65410ef766467c1be942');
            }
            if (numberOfStatHarv_rm2_s == 0 && spawnName == 'Spawn2') {
                console.log(spawnName + ': next spawn, stationary harvester south.');
                name = spawn.createStationaryHarvester(2000, 'stationaryHarvester', '5bbcac9b9099fc012e635d76', '601342fea3a2be03c4dff8ce');
            }
            /*if (numberOfStatHarv_rm2_n == 0 && spawnName == 'Spawn2') {
                console.log(spawnName + ': next spawn, stationary harvester north.');
                name = spawn.createStationaryHarvester(1600, 'stationaryHarvester', '5bbcac9b9099fc012e635d74', '600a998343b38e2428ab5d3c');
            }*/
            if (numberOfStatHarv_rm3 == 0 && spawnName == 'Spawn3') {
                console.log(spawnName + ' next spawn, stationary harvester.');
                name = spawn.createStationaryHarvester(halfEnergy, 'stationaryHarvester', '5bbcac8e9099fc012e635b4b', 'TBD');
            }
            if (numberOfStatHarv_rm1_n == 0 && spawnName == 'Spawn4') {
                console.log(spawnName + ': next spawn, stationary harvester north.');
                name = spawn.createStationaryHarvester(2000, 'stationaryHarvester', '5bbcac8e9099fc012e635b46', '5ffe3244017b7f138d559e92');
            }
            if (numberOfStatHarv_rm1_s == 0 && spawnName == 'Spawn4') {
                console.log(spawnName + ': next spawn, stationary harvester south.');
                name = spawn.createStationaryHarvester(2000, 'stationaryHarvester', '5bbcac8e9099fc012e635b47', '601f65410ef766467c1be942');
            }
        }
        else if (numberOfRangedAttackers < spawn.memory.minRangedAttackers) {
            console.log(spawnName + ': next spawn, ranged attacker.');
            name = spawn.createRangedAttacker(halfEnergy, 'rangedAttacker');
        }
        else if (numberOfInvaders < spawn.memory.minInvaders) {
            console.log(spawnName + ': next spawn, invader.');
            name = spawn.createInvader(halfEnergy, 'invader');
        }
        else if (numberOfForeignHarvesters < spawn.memory.minForeignHarvesters) {
            console.log(spawnName + ': next spawn, foreign harvester rm3 east.');
            name = spawn.createCustomCreep(halfEnergy , 'foreignHarvester');
        } 
        else if (numberOfForeignHarvestersRm2 < spawn.memory.minForeignHarvestersRm2) {
            if(spawnName == 'Spawn2') {
                console.log(spawnName + ': next spawn, foreign harvester rm2 east.');
                name = spawn.createCustomCreep(2000, 'foreignHarvesterRm2');
            }
        }
        else if (numberOfBuilders < spawn.memory.minBuilders) {
            console.log(spawnName + ': next spawn, builder.');
            name = spawn.createCustomCreep(halfEnergy, 'builder');
        }
        else if (numberOfUpgraders < spawn.memory.minUpgraders) {
            console.log(spawnName + ': next spawn, upgrader.');
            name = spawn.createCustomCreep(halfEnergy, 'upgrader');
        }
        else if (numberOfRepairers < spawn.memory.minRepairers) {
            console.log(spawnName + ': next spawn, repairer.');
            name = spawn.createCustomCreep(2000, 'repairer');
        }
        else if (numberOfWallRepairers < spawn.memory.minWallRepairer) {
            console.log(spawnName + ': next spawn, wall repairer.');
            name = spawn.createCustomCreep(halfEnergy, 'wallRepairer');
        }
        else if (numberOfHarvesters > spawn.memory.minHarvesters && numberOfHarvesters < spawn.memory.maxHarvesters) {
            name = spawn.createCustomCreep(2000, 'harvester');
            console.log(spawnName + ': minimums met, harvesters not at max, spawning harvester...');
        }
        else {
            console.log(spawnName + ' roles fulfilled. Harvesters at max');
        }

        if (Math.floor(Game.time) % 15 === 0) {
            console.log('=======' + spawnName + ' CURRENT NUMBERS =======');
            console.log(spawnName + ' Harvesters: ' + numberOfHarvesters);
            console.log(spawnName + ' Upgraders: ' + numberOfUpgraders);
            console.log(spawnName + ' Builders: ' + numberOfBuilders);
            console.log(spawnName + ' Repairers: ' + numberOfRepairers);
            console.log(spawnName + ' Wall Repairers: ' + numberOfWallRepairers);
            console.log(spawnName + ' Stat. Harvesters: ' + numberOfStationaryHarvesters);
            console.log(spawnName + ' Stat. Upgraders: ' + numberOfStationaryUpgraders);
            console.log('-------------------------------------------------------');
            console.log(spawnName + ' Energy available: ' + availEnergy + '/' + fullEnergy);
            console.log('-------------------------------------------------------');
        }
    
    }
    if (Math.floor(Game.time) % 15 === 0) {
        console.log('##############  GLOBAL COUNTS  #####################');
        console.log('Global Room Reservers: ' + numberOfRoomReservers);
        console.log('Global foreign Harvesters: ' + numberOfForeignHarvesters);
        console.log('Global foreign Harvesters Rm2: ' + numberOfForeignHarvestersRm2);
        console.log('Global ranged Attackers: ' + numberOfRangedAttackers);
        console.log('Global invaders: ' + numberOfInvaders);
        console.log('Global miners: ' + numberOfMiners);
        console.log('####################################################');
    }   
};