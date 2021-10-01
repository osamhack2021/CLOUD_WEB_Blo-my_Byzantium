/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Blomy extends Contract {

    // 1. 총기 장부 initialization
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const firearms = [
              {
                "serialNumber": "76982975",
                "model": "K-2",
                "owner": "21-73847385",
                "iswithOwner": true,
                "notes": ""
              },
              {
                "serialNumber": "95885216",
                "model": "K-2",
                "owner": "21-73333385",
                "iswithOwner": false,
                "notes": "Dud"
              },
              {
                "serialNumber": "68204105",
                "model": "K2C1",
                "owner": "21-73645485",
                "iswithOwner": true,
                "notes": ""
              },
              {
                "serialNumber": "79077509",
                "model": "K-3",
                "owner": "21-12347385",
                "iswithOwner": true,
                "notes": ""
              },
              {
                "serialNumber": "96372174",
                "model": "K2C1",
                "owner": "21-73811185",
                "iswithOwner": true,
                "notes": "Hang fire"
              }
        ];

        for (let i = 0; i < firearms.length; i++) {
            firearms[i].docType = 'firearm';
            await ctx.stub.putState(firearms[i].serialNumber, Buffer.from(JSON.stringify(firearms[i])));
            console.info('Added <--> ', firearms[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    // 2. 새 총기 등록
    async createFirearm(ctx, serialNumber, model, owner, iswithOwner, notes ) {
        console.info('============= START : Create Firearm ===========');

        const firearm = {
            serialNumber,
            docType: 'firearm',
            model,
            owner,
            iswithOwner,
            notes,
        };

        await ctx.stub.putState(serialNumber, Buffer.from(JSON.stringify(firearm)));
        console.info('============= END : Create Firearm ===========');
    }

    // 3. 총기 정보 조회
    async queryFirearm(ctx, serialNumber) {
        const firearmAsBytes = await ctx.stub.getState(serialNumber); // get the firearm from chaincode state
        if (!firearmAsBytes || firearmAsBytes.length === 0) {
            throw new Error(`${serialNumber} does not exist`);
        }
        console.log(firearmAsBytes.toString());
        return firearmAsBytes.toString();
    }

    // 4. 총기 과거 이력 조회
    async GetAssetHistory(ctx, serialNumber) {

		let resultsIterator = await ctx.stub.getHistoryForKey(serialNumber);
		let results = await this._GetAllResults(resultsIterator, true);

		return JSON.stringify(results);
	}

    // 5. 총기의 주인 변경
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

    // 6. 모든 총기 조회
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
    
    // This is JavaScript so without Funcation Decorators, all functions are assumed
	// to be transaction functions
	//
	// For internal functions... prefix them with _
	async _GetAllResults(iterator, isHistory) {
		let allResults = [];
		let res = await iterator.next();
		while (!res.done) {
			if (res.value && res.value.value.toString()) {
				let jsonRes = {};
				console.log(res.value.value.toString('utf8'));
				if (isHistory && isHistory === true) {
					jsonRes.TxId = res.value.txId;
					jsonRes.Timestamp = (await this._toDate(res.value.timestamp)).toString('utf-8');
					try {
						jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Value = res.value.value.toString('utf8');
					}
				} else {
					jsonRes.Key = res.value.key;
					try {
						jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Record = res.value.value.toString('utf8');
					}
				}
				allResults.push(jsonRes);
			}
			res = await iterator.next();
		}
		iterator.close();
		return allResults;
	}

    // Makes timestamps readable
    async _toDate(timestamp) {
        const milliseconds = (timestamp.seconds.low + ((timestamp.nanos / 1000000) / 1000)) * 1000;
        return new Date(milliseconds);
    }

}

module.exports = Blomy;
