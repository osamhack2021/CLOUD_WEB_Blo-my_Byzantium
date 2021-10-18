/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


async function foodQuery(affiliatedUnit) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('myfoodchannel');

        // Get the contract from the network.
        const contract = network.getContract('blomyfood');

        // Evaluate the specified transaction.
        // queryFirearm transaction - requires 1 argument, ex: ('queryFirearm', 'FIREARM4')
        // queryAllFirearms transaction - requires no arguments, ex: ('queryAllFirearms')
        const result = await contract.evaluateTransaction('queryUnit', affiliatedUnit);

        // Disconnect from the gateway.
        await gateway.disconnect();

        return result.toString();
        
    } catch (error) {
        console.log('failed');
        return false
    }
}


 async function modifyFoodTransaction(tx_params) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('myfoodchannel');

        // Get the contract from the network.
        const contract = network.getContract('blomyfood');

        // Submit the specified transaction.
        // createFirearm transaction - requires 6 argument, ex: ('createFirearm', 'Firearm12', '96372174', 'K2C1', '21-22922385', 'Case head separation')
        // changeFirearmOwner transaction - requires 3 args , ex: ('changeFirearmOwner', 'FIREARM12', '21-22922385')
        // await contract.submitTransaction('createFirearm', '963722174', 'K2C1', '21-22922385', false, 'Case head separation');
        // console.log('Transaction has been submitted');

        // await contract.submitTransaction();
        const result = await contract.submitTransaction(...tx_params);
        await gateway.disconnect();
        return tx_params + `Transaction has been submitted\n result: ${result}`;

        // Disconnect from the gateway.
       

    } catch (error) {
        return 'Failed to submit transaction';
    }
}


exports.foodQuery = foodQuery;
exports.modifyFoodTransaction = modifyFoodTransaction;