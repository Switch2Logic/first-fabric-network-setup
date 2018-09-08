# First Hyperledger Fabric Network Setup
I am a masters student learning Hyperledger Fabric. The purpose of this project was to learn how to set up a simple single organization network on Hyperledger Fabric from the ground up. This network includes the following 4 peers, 1 Orderer, 1 CA and a fabric-client. 

# Chanlenges
1. Understanding what the crypto-config.yaml and configtx.yaml files actualy do. 
2. Seting up docker-composer.yaml files. I did not understand what I was doing. I got confused with example code provided Hyperledger Fabric. This mainly due to the fact that I thought the docker-compose.yaml was appart of Hyperledger Fabric. 
3. Getting the peers to comunicate was an issue even on the local machine.
4. Then networking the peers accross multiple physical nodes. This was the most difficult thing to grasp for me.
5. Getting peers to join the channel.

# Solutions
I solved most of these issues by learning docker from a book called Master Docker. I solved most of these issues by learning docker from a book called Master Docker.  Understanding docker lets you actually get on with learning Hyperledger Fabric itself. 

# Steps
Step1: Create Docker Swarm
command: docker swarm init --advertise-addr 192.168.1.139

Step2: Join Swarm
command: docker swarm join --token TOKEN 192.168.1.139:2377

Step3: Verify hosts on Swarm
command: docker node ls

Step4: Create a overlay network on first computer
command: docker network create -d overlay --attachable network-name-go's-here
note: The name of the network I used is "rebnet" if you use a different name please make sure to propagate this change through the docker-compose.yaml files you use. I recommend doing a find and replace on the term "rebnet". 

Step5: Connect second computer to overlay network
docker run -itd --name dummyContainer --net "network-name-go's-here" alpine /bin/sh
note: This is a work around to get the second computer to connect to the ovelay network.

Step6: Copy the project folder to each computer. 
note: The channel-artifacts and the crypto-config folders are the most important. Then each computer should contain a docker-compose.yaml file with Hyperledger fabric components in for that computer. Also, the start scripts also come in handy. For example docker-compose-host1.yaml and start-host.sh on the one computer. 

Step7: Start the network
command: start-host1.sh
note: Please make sure the .sh file is excutable in the terminal. 

Step8: Create and join a channel and join peer 0 via fabric-client.
command: docker exec -it cli bash
command: export CORE_PEER_ADDRESS=peer0.hospital1.switch2logic.co.za:7051
command-peer: peer channel create -o orderer.switch2logic.co.za:7050 -c rebelchannel -f ./channel-artifacts/channel.tx --cafile tlsca.switch2logic.co.za-cert.pem
note: channel can only be created ones and will give an error if you recreate it just move on.

Step9: Join each peer to the channel
command: docker exec -it cli bash
command: export CORE_PEER_ADDRESS=peer1.hospital1.switch2logic.co.za:7051
command-peer: peer channel fetch 0 rebelchannel.block --channelID rebelchannel --orderer orderer.switch2logic.co.za:7050
command-peer: peer channel join -b rebelchannel.block

Step10: Check docker logs
command: docker logs peer1.hospital1.switch2logic.co.za:7051 -f
Note: There should be no errors. 


# Lessons Learned
If you want to get started with Hyperledger Fabric you need a firm understanding of docker.

