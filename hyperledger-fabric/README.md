# Install Hyperleder Fabric chaincode via fabric-client
command: peer chaincode install -n fabcar -v 1.0 -p github.com/chaincode/

# List installed chaincode
command: peer chaincode list --installed

# Instaniante chaincode
command: peer chaincode instantiate -o orderer.switch2logic.co.za:7050 --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/switch2logic.co.za/orderers/orderer.switch2logic.co.za/msp/tlscacerts/tlsca.switch2logic.co.za-cert.pem -C rebelchannel -n fabcar -v 2.0 -c '{"Args":["init"]}' 

# Query hyperledger-fabric chaincode
peer chaincode query -C rebelchannel -n fabcar -c '{"Args":["queryAllCars"]}'
peer chaincode invoke -o orderer.switch2logic.co.za:7050 --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/switch2logic.co.za/orderers/orderer.switch2logic.co.za/msp/tlscacerts/tlsca.switch2logic.co.za-cert.pem -C rebelchannel -n car  --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt -c '{"Args":["createCar","CAR11","VW","Polo","Black","TheNewCar"]}'
