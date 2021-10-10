/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class BlomyFood extends Contract {

    // 1. 부식 부대 initialization
    // 부대명, 보유 음식
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const units = [
              {
                    "affiliatedUnit": "1div11regt1bn1co1p",
                    "foods": [
                        {
                            "name" : "kimchi",
                            "amount" : 50,
                        },
                        {
                            "name" : "tuna",
                            "amount" : 90
                        }
                    ],
                    "opType": "CREATE"
              }
        ];

        for (let i = 0; i < units.length; i++) {
            units[i].docType = 'unit';
            await ctx.stub.putState(units[i].affiliatedUnit, Buffer.from(JSON.stringify(units[i])));
            console.info('Added <--> ', units[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    // 2. 부대 생성
    async createUnit(ctx, affiliatedUnit) {
        console.info('============= START : Create Unit ===========');

        const unit = {
            affiliatedUnit,
            docType: 'unit',
            foods: [
                
            ],
            opType: "CREATE"
        };

        await ctx.stub.putState(affiliatedUnit, Buffer.from(JSON.stringify(unit)));
        console.info('============= END : Create Unit ===========');
    }

    // 3. 부식 수령(부대에 그 부식이 없으면, 생성하고, 있으면 더한다.)
    async checkinFood(ctx, affiliatedUnit, foodname, amount) {
        amount = Number(amount);
        console.info('============= START : checkinFood ===========');

        const unitAsBytes = await ctx.stub.getState(affiliatedUnit); // get the affiliatedUnit from chaincode state
        if (!unitAsBytes || unitAsBytes.length === 0) {
            throw new Error(`${affiliatedUnit} does not exist`);
        }
        const unit = JSON.parse(unitAsBytes.toString());

        const checkFood = food => food.name === foodname;

        if(unit.foods.some(checkFood)){
            let currentAmount = Number(unit.foods.find(food => food.name ===foodname).amount);
            unit.foods.find(food => food.name ===foodname).amount = currentAmount + amount;
        }else{
            unit.foods.push({
                "name": foodname,
                "amount": amount
            });
        }
        
        unit.opType = "CHECKIN";

        await ctx.stub.putState(affiliatedUnit, Buffer.from(JSON.stringify(unit)));
        console.info('============= END : checkinFood ===========');
    }
    // 4. 부식 불출
    async checkoutFood(ctx, affiliatedUnit, foodname, amount) {
        amount = Number(amount);
        console.info('============= START : checkoutFood ===========');

        const unitAsBytes = await ctx.stub.getState(affiliatedUnit); // get the affiliatedUnit from chaincode state
        if (!unitAsBytes || unitAsBytes.length === 0) {
            throw new Error(`${affiliatedUnit} does not exist`);
        }
        const unit = JSON.parse(unitAsBytes.toString());

        const checkFood = food => food.name === foodname;

        if(unit.foods.some(checkFood)){
            let currentAmount = Number(unit.foods.find(food => food.name ===foodname).amount);

            if(currentAmount < amount){
                throw new Error(`The current amount is less than the checkout amount`);
            }
            unit.foods.find(food => food.name ===foodname).amount = currentAmount - amount;
        }else{
            throw new Error(`${foodname} does not exist`);
        }

        await ctx.stub.putState(affiliatedUnit, Buffer.from(JSON.stringify(unit)));
        console.info('============= END : checkoutFood ===========');
    }

    // 5. 부대 정보 조회
    async queryUnit(ctx, affiliatedUnit) {
        const unitAsBytes = await ctx.stub.getState(affiliatedUnit); // get the firearm from chaincode state
        if (!unitAsBytes || unitAsBytes.length === 0) {
            throw new Error(`${affiliatedUnit} does not exist`);
        }
        console.log(unitAsBytes.toString());
        return unitAsBytes.toString();
    }

    // 6. 부대 부식 과거 이력 조회
    async GetUnitHistory(ctx, affiliatedUnit) {

		let resultsIterator = await ctx.stub.getHistoryForKey(affiliatedUnit);
		let results = await this._GetAllResults(resultsIterator, true);

		return JSON.stringify(results);
	}

    // 7. 모든 부대 조회
    async queryAllUnits(ctx) {
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

module.exports = BlomyFood;
