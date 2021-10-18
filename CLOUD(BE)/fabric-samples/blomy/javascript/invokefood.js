/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main(tx_params) {
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
        await contract.submitTransaction(...tx_params);
        console.log(tx_params + ' Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

async function mockTx1(){
    try {
        await main(['createUnit', '5사단-12여단-지원중대']);
        await main(['createUnit', '5사단-12여단-3대대-5중대-중대본부']);
        await main(['createUnit', '5사단-12여단-3대대-5중대-2소대']);
        await main(['createUnit', '5사단-12여단-3대대-대대본부']);
        
        await main(['checkinFood', '5사단-12여단-지원중대', '김치', 750]);
        await main(['checkinFood', '5사단-12여단-지원중대', '열무-김치', 750]);
        await main(['checkinFood', '5사단-12여단-지원중대', '깍두기', 300]);
        await main(['checkinFood', '5사단-12여단-지원중대', '조각-닭', 1200]);
        
        await main(['checkoutFood', '5사단-12여단-지원중대', '김치', 750]);
        await main(['checkoutFood', '5사단-12여단-지원중대', '열무-김치', 750]);
        await main(['checkoutFood', '5사단-12여단-지원중대', '깍두기', 300]);
        await main(['checkoutFood', '5사단-12여단-지원중대', '조각-닭', 1200]);

        await main(['checkinFood', '5사단-12여단-3대대-대대본부', '김치', 250]);
        await main(['checkinFood', '5사단-12여단-3대대-대대본부', '열무-김치', 250]);
        await main(['checkinFood', '5사단-12여단-3대대-대대본부', '깍두기', 100]);
        await main(['checkinFood', '5사단-12여단-3대대-대대본부', '조각-닭', 400]);

        await main(['checkoutFood', '5사단-12여단-3대대-대대본부', '김치', 210]);
        await main(['checkoutFood', '5사단-12여단-3대대-대대본부', '열무-김치', 210]);
        await main(['checkoutFood', '5사단-12여단-3대대-대대본부', '깍두기', 90]);
        await main(['checkoutFood', '5사단-12여단-3대대-대대본부', '조각-닭', 330]);
   
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

mockTx1();