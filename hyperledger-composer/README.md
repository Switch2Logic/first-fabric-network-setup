#-Hyperledger Composer to deploy chaincode
composer card create -p connection.json -u admin -c Admin@hospital1.switch2logic.co.za-cert.pem -k 520eb3685aa20f2522e4a2a6c9b6e627fb0defb1c2e6f30a6f32620a4e035871_sk -r PeerAdmin -r ChannelAdmin

composer card import -f admin@fabric-network.card

composer network install -c admin@fabric-network -a net1@0.0.1.bna

composer network start --networkName net1 --networkVersion 0.0.1 -A admin -S adminpw -c admin@fabric-network

composer card import -f admin@net1.card

composer network ping -c admin@net1