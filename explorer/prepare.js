var fs = require('fs');
const editJsonFile = require("edit-json-file");

// Get crypto key filename
var dirname = "/workspaces/CLOUD_WEB_Blo-my_Byzantium/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/"
var filename = fs.readdirSync(dirname).filter(fn => fn.endsWith('_sk'));
var tempdirname = dirname.replace("/workspaces/CLOUD_WEB_Blo-my_Byzantium/fabric-samples/test-network/organizations", "/tmp/crypto");


// change explorer profile config with new key filename
let file = editJsonFile("/workspaces/CLOUD_WEB_Blo-my_Byzantium/explorer/connection-profile/test-network.json");
file.set("organizations.Org1MSP.adminPrivateKey.path", tempdirname+filename);
file.save();
file = editJsonFile("/workspaces/CLOUD_WEB_Blo-my_Byzantium/explorer/connection-profile/test-network-copy.json", {
    autosave: true
});
