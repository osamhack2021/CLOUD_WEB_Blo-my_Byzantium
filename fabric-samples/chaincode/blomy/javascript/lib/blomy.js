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
                "owner": "21-11111111",
                "affiliatedUnit": "5사단-12여단-3대대-5중대-2소대",
                "misc": "ready for deployment",
                "updateReason": "for new recruit",
                "opType": "CREATE"
              },
              {
                "serialNumber": "222222",
                "model": "K-2",
                "owner": "21-22222222",
                "affiliatedUnit": "5사단-12여단-3대대-5중대-중대본부",
                "misc": "ready for deployment",
                "updateReason": "for new recruit",
                "opType": "CREATE"
              },
              {
                "serialNumber": "333333",
                "model": "K-3",
                "owner": "21-33333333",
                "affiliatedUnit": "5사단-12여단-3대대-5중대-중대본부",
                "misc": "ready for deployment",
                "updateReason": "for new recruit",
                "opType": "CREATE"
              },
              {
                "serialNumber": "444444",
                "model": "K2C1",
                "owner": "19-44444444",
                "affiliatedUnit": "5사단-12여단-3대대-5중대-중대본부",
                "misc": "ready for deployment",
                "updateReason": "for new recruit",
                "opType": "CREATE"
              },
              {
                "serialNumber": "555555",
                "model": "K-1A",
                "owner": "20-55555555",
                "affiliatedUnit": "5사단-12여단-3대대-5중대-중대본부",
                "misc": "ready for deployment",
                "updateReason": "for new recruit",
                "opType": "CREATE"
              },
              {
                "serialNumber": "666666",
                "model": "K2C1",
                "owner": "21-66666666",
                "affiliatedUnit": "5사단-12여단-3대대-5중대-중대본부",
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

    // 2. 수령(CREATE)
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

    // 3. 반납(CHECKIN)
    async checkinFirearm(ctx, serialNumber, misc, updateReason) {
        console.info('============= START : checkinFirearm ===========');

        const firearmAsBytes = await ctx.stub.getState(serialNumber); // get the firearm from chaincode state
        if (!firearmAsBytes || firearmAsBytes.length === 0) {
            throw new Error(`${serialNumber} does not exist`);
        }
        const firearm = JSON.parse(firearmAsBytes.toString());
        firearm.misc = misc;
        firearm.updateReason = updateReason;
        firearm.opType = "CHECKIN"

        await ctx.stub.putState(serialNumber, Buffer.from(JSON.stringify(firearm)));
        console.info('============= END : checkinFirearm ===========');
    }
    // 4. 불출(CHECKOUT)
    async checkoutFirearm(ctx, serialNumber, misc, updateReason) {
        console.info('============= START : checkoutFirearm ===========');

        const firearmAsBytes = await ctx.stub.getState(serialNumber); // get the firearm from chaincode state
        if (!firearmAsBytes || firearmAsBytes.length === 0) {
            throw new Error(`${serialNumber} does not exist`);
        }
        const firearm = JSON.parse(firearmAsBytes.toString());
        firearm.misc = misc;
        firearm.updateReason = updateReason;
        firearm.opType = "CHECKOUT"

        await ctx.stub.putState(serialNumber, Buffer.from(JSON.stringify(firearm)));
        console.info('============= END : checkoutFirearm ===========');
    }
    // 5. 대대 반납(DELETE)
    async deleteFirearm(ctx, serialNumber) {
        const exists = await this._AssetExists(ctx, serialNumber);
        if (!exists) {
            throw new Error(`The firearm ${serialNumber} does not exist`);
        }
        return ctx.stub.deleteState(serialNumber);
    }

    // 6. 총기 정보 조회
    async queryFirearm(ctx, serialNumber) {
        const firearmAsBytes = await ctx.stub.getState(serialNumber); // get the firearm from chaincode state
        if (!firearmAsBytes || firearmAsBytes.length === 0) {
            throw new Error(`${serialNumber} does not exist`);
        }
        console.log(firearmAsBytes.toString());
        return firearmAsBytes.toString();
    }

    // 7. 총기 과거 이력 조회
    async GetAssetHistory(ctx, serialNumber) {

		let resultsIterator = await ctx.stub.getHistoryForKey(serialNumber);
		let results = await this._GetAllResults(resultsIterator, true);

		return JSON.stringify(results);
	}

    // 8. 총기 속성 변경(CHANGE)
    async changeFirearmAttributes(ctx, serialNumber, model, owner, affiliatedUnit, misc, updateReason ) {
        console.info('============= START : changeFirearmAttributes ===========');

        const firearmAsBytes = await ctx.stub.getState(serialNumber); // get the firearm from chaincode state
        if (!firearmAsBytes || firearmAsBytes.length === 0) {
            throw new Error(`${serialNumber} does not exist`);
        }
        const firearm = JSON.parse(firearmAsBytes.toString());
        firearm.model = model;
        firearm.owner = owner;
        firearm.affiliatedUnit = affiliatedUnit;
        firearm.misc = misc;
        firearm.updateReason = updateReason;
        firearm.opType = "CHANGE"

        await ctx.stub.putState(serialNumber, Buffer.from(JSON.stringify(firearm)));
        console.info('============= END : changeFirearmAttributes ===========');
    }

    // 9. 모든 총기 조회
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

    // AssetExists returns true when asset with given ID exists in world state.
    async _AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

}

module.exports = Blomy;
