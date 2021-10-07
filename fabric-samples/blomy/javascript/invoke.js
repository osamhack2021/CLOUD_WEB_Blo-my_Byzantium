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
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('blomy');

        // Submit the specified transaction.
        // createFirearm transaction - requires 6 argument, ex: ('createFirearm', 'Firearm12', '96372174', 'K2C1', '21-22922385', 'Case head separation')
        // changeFirearmOwner transaction - requires 3 args , ex: ('changeFirearmOwner', 'FIREARM12', '21-22922385')
        // await contract.submitTransaction('createFirearm', '963722174', 'K2C1', '21-22922385', false, 'Case head separation');
        // console.log('Transaction has been submitted');
/*
        // 오동재 상병의 모의 총기 이력
        // 1. 생성
        await contract.submitTransaction('createFirearm', '1234567', 'K-1A', '박한성', '5div12regt3bn5co2p', '지급 대기', "전입 신병 중대 총기수령");
        console.log('Transaction has been submitted');

        // 2. 불출
        await contract.submitTransaction('checkoutFirearm', '1234567', '이상 무', '전입 신병 총기 수여식');
        console.log('Transaction has been submitted');

        // 3. 반납
        await contract.submitTransaction('checkinFirearm', '1234567', '이상 무', '보직 변경으로 인한 총기 반납');
        console.log('Transaction has been submitted');

        // 4. 변경
        await contract.submitTransaction('changeFirearmAttributes', '1234567', 'K-1A', '오동재', '5div12regt3bn5coHQ', '지급 대기', "보직 변경");
        console.log('Transaction has been submitted');

        // 5. 불출
        await contract.submitTransaction('checkoutFirearm', '1234567', '이상 무', '보직 변경으로 인한 총기 조정 지급');
        console.log('Transaction has been submitted');

        // 6. 반납
        await contract.submitTransaction('checkinFirearm', '1234567', '장전 손잡이 고장', '기능고장으로 인한 정비');
        console.log('Transaction has been submitted');

        // 7. 불출
        await contract.submitTransaction('checkoutFirearm', '1234567', '이상 무', '총기 정비 후 재지급');
        console.log('Transaction has been submitted');

        // 8. 대대 반납
        await contract.submitTransaction('deleteFirearm', '1234567');
        console.log('Transaction has been submitted');
*/

        await contract.submitTransaction(...tx_params);
        console.log(tx_params + ' Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}
// 같은 asset에 대한 transaction은 분리하는걸 추천한다. 순서가 뒤바뀌기때문. 여럿 asset의 변경, 생성, 삭제 등은 한 블럭에 들어갈 수 있다.
const tx1_params = ['createFirearm', '1000000', 'K-1A', '박한성', '5div12regt3bn5co2p', '지급 대기', "전입 신병 중대 총기수령"];
const tx2_params = ['createFirearm', '2000000', 'K-1A', '박한성', '5div12regt3bn5co2p', '지급 대기', "전입 신병 중대 총기수령"];
const tx3_params = ['createFirearm', '3000000', 'K-1A', '박한성', '5div12regt3bn5co2p', '지급 대기', "전입 신병 중대 총기수령"];
//const tx1_params = ['deleteFirearm', '1234567'];
//const tx2_params = ['checkoutFirearm', '1234567', '이상 무', '전입 신병 총기 수여식'];
//const tx3_params = ['checkinFirearm', '1234567', '이상 무', '보직 변경으로 인한 총기 반납'];

main(tx1_params);
main(tx2_params);
main(tx3_params);