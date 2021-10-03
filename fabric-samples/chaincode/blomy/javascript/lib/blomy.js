/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Blomy extends Contract {

    // 1. 총기 장부 initialization
    // 순서대로 총기번호, 화기명, 보유자, 보유부대, 비고, 마지막 변경사유, 변경사항(수령(CREATE), 반납(CHECKIN), 불출(CHECKOUT), 대대반납(DELETE))
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const firearms = [
              {
                "serialNumber": "111111",
                "model": "K-1A",
                "owner": "21-1111111",
                "affiliatedUnit": "1div11regt1bn1co1p",
                "misc": "ready for deployment",
                "updateReason": "for new recruit",
                "opType": "CREATE"
              },
              {
                "serialNumber": "222222",
                "model": "K-2",
                "owner": "21-2222222",
                "affiliatedUnit": "1div11regt1bn1co2p",
                "misc": "ready for deployment",
                "updateReason": "for new recruit",
                "opType": "CREATE"
              },
              {
                "serialNumber": "333333",
                "model": "K-3",
                "owner": "21-3333333",
                "affiliatedUnit": "1div11regt1bn1co3p",
                "misc": "ready for deployment",
                "updateReason": "for new recruit",
                "opType": "CREATE"
              },
              {
                "serialNumber": "444444",
                "model": "K2C1",
                "owner": "21-4444444",
                "affiliatedUnit": "1div11regt2bn6coHQ",
                "misc": "ready for deployment",
                "updateReason": "for new recruit",
                "opType": "CREATE"
              },
              {
                "serialNumber": "555555",
                "model": "K-1A",
                "owner": "21-5555555",
                "affiliatedUnit": "1div11regt2bn6coHQ",
                "misc": "ready for deployment",
                "updateReason": "for new recruit",
                "opType": "CREATE"
              },
              {
                "serialNumber": "666666",
                "model": "K2C1",
                "owner": "21-6666666",
                "affiliatedUnit": "1div11regt2bn6coHQ",
                "misc": "ready for deployment",
                "updateReason": "for new recruit",
                "opType": "CREATE"
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
    async createFirearm(ctx, serialNumber, model, owner, affiliatedUnit, misc, updateReason ) {
        console.info('============= START : Create Firearm ===========');

        const firearm = {
            serialNumber,
            docType: 'firearm',
            model,
            owner,
            affiliatedUnit,
            misc,
            updateReason,
            opType: 'CREATE'
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
    async changeFirearmOwner(ctx, serialNumber, newOwner, affiliatedUnit, misc, updateReason) {
        console.info('============= START : changeFirearmOwner ===========');

        const firearmAsBytes = await ctx.stub.getState(serialNumber); // get the firearm from chaincode state
        if (!firearmAsBytes || firearmAsBytes.length === 0) {
            throw new Error(`${serialNumber} does not exist`);
        }
        const firearm = JSON.parse(firearmAsBytes.toString());
        firearm.owner = newOwner;
        firearm.affiliatedUnit = affiliatedUnit;
        firearm.misc = misc;
        firearm.updateReason = updateReason;
        firearm.opType = "CHECKOUT"

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
