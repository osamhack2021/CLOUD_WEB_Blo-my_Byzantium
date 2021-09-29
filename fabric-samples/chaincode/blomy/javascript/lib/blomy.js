/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Blomy extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const firearms = [
              {
                "serialNumber": "76982975",
                "model": "K-2",
                "owner": "21-73847385",
                "notes": ""
              },
              {
                "serialNumber": "95885216",
                "model": "K-2",
                "owner": "21-73333385",
                "notes": "Dud"
              },
              {
                "serialNumber": "68204105",
                "model": "K2C1",
                "owner": "21-73645485",
                "notes": ""
              },
              {
                "serialNumber": "79077509",
                "model": "K-3",
                "owner": "21-12347385",
                "notes": ""
              },
              {
                "serialNumber": "96372174",
                "model": "K2C1",
                "owner": "21-73811185",
                "notes": "Hang fire"
              }
        ];

        for (let i = 0; i < firearms.length; i++) {
            firearms[i].docType = 'firearm';
            await ctx.stub.putState('FIREARM' + i, Buffer.from(JSON.stringify(firearms[i])));
            console.info('Added <--> ', firearms[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryFirearm(ctx, serialNumber) {
        const firearmAsBytes = await ctx.stub.getState(serialNumber); // get the firearm from chaincode state
        if (!firearmAsBytes || firearmAsBytes.length === 0) {
            throw new Error(`${serialNumber} does not exist`);
        }
        console.log(firearmAsBytes.toString());
        return firearmAsBytes.toString();
    }

    async createFirearm(ctx, firearmNumber, serialNumber, model, owner, notes ) {
        console.info('============= START : Create Firearm ===========');

        const firearm = {
            serialNumber,
            docType: 'firearm',
            model,
            owner,
            notes,
        };

        await ctx.stub.putState(firearmNumber, Buffer.from(JSON.stringify(firearm)));
        console.info('============= END : Create Firearm ===========');
    }

    async queryAllFirearms(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeFirearmOwner(ctx, serialNumber, newOwner) {
        console.info('============= START : changeFirearmOwner ===========');

        const firearmAsBytes = await ctx.stub.getState(serialNumber); // get the firearm from chaincode state
        if (!firearmAsBytes || firearmAsBytes.length === 0) {
            throw new Error(`${serialNumber} does not exist`);
        }
        const firearm = JSON.parse(firearmAsBytes.toString());
        firearm.owner = newOwner;

        await ctx.stub.putState(serialNumber, Buffer.from(JSON.stringify(firearm)));
        console.info('============= END : changeFirearmOwner ===========');
    }

}

module.exports = Blomy;
