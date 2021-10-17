#!/bin/bash 

curl -sSL https://bit.ly/2ysbOFE | bash -s
cd ./fabric-samples/blomy/javascript
npm install
cd ..
cd ../chaincode/blomy/javascript
npm install
cd ..
cd ../blomyfood/javascript
npm install
cd ..
cd ..
cd ../blomy
. startFabric.sh javascript
cd ../test-network
./networkFood.sh up createChannel -ca -s couchdb
./networkFood.sh deployCC -ccn blomyfood -ccv 1 -cci initLedger -ccl javascript -ccp ../chaincode/blomyfood/javascript
cd ../blomy/javascript
node enrollAdmin.js
node registerUser.js
node invoke.js
node invokefood.js
node rest.js &

cd ..
cd ..
cd ../../WEB/backend
sudo apt-get install pkg-config
sudo apt-get install libcairo2-dev --yes
pip install -r requirements.txt
pip3 install requests --force-reinstall
pip install lxml
python manage.py runserver
