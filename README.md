# First Hyperledger Fabric Network Setup
I am a masters student learning Hyperledger Fabric. The purpose of this project was to learn how to set up a simple single organization network on Hyperledger Fabric from the ground up. This network includes the following 4 peers, 1 Orderer, 1 CA and a fabric-client. 

# Chanlenges
1. Understanding what the crypto-config.yaml and configtx.yaml files actualy do. 
2. Seting up docker-composer.yaml files. I did not understand what I was doing. I got confused with example code provided Hyperledger Fabric. This mainly due to the fact that I thought the docker-compose.yaml was appart of Hyperledger Fabric. 
3. Getting the peers to comunicate was an issue even on the local machine.
4. Then networking the peers accross multiple physical nodes. This was the most difficult thing to grasp for me.
5. Getting peers to join the channel.

# Solutions
I solved most of these issues by learning docker from a book called Master Docker. This is a must read will really clear up some miss conceptions. Docker Containers Currently, I feel like an idiot for struggling with these simple concepts. Understanding docker lets you actually get on with learning Hyperledger Fabric itself. 

# Setup
Create a Docker Swarm cluster and connect all the computers to it.
Setup an overlay network on docker swarm.
Add the network configuration to the docker-compose.yaml file.
Then coppy all the crypto and channel artifacts to each computer. 
Create docker-compose.yaml files for each computer only containing the Fabric componets you want to install on that computer.
Run the start.sh scrip on each computer and all should be well.

# Lessons Learned
If you want to get started with Hyperledger Fabric you need a firm understanding of docker.

