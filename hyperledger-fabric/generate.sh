#!/bin/sh
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
export PATH=$GOPATH/src/github.com/hyperledger/fabric/build/bin:${PWD}/../bin:${PWD}:$PATH
export FABRIC_CFG_PATH=${PWD}
CHANNEL_NAME=rebelchannel

# remove previous crypto material and config transactions
rm -fr channel-artifacts/*
rm -fr crypto-config/*

# generate crypto material
cryptogen generate --config=./crypto-config.yaml
if [ "$?" -ne 0 ]; then
  echo "Failed to generate crypto material..."
  exit 1
fi

# generate genesis block for orderer
configtxgen -profile TwoOrgOrdererGenesis -outputBlock ./channel-artifacts/genesis.block
if [ "$?" -ne 0 ]; then
  echo "Failed to generate orderer genesis block..."
  exit 1
fi

# generate channel configuration transaction
configtxgen -profile TwoOrgChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID $CHANNEL_NAME
if [ "$?" -ne 0 ]; then
  echo "Failed to generate channel configuration transaction..."
  exit 1
fi

# generate anchor peer transaction
configtxgen -profile TwoOrgChannel -outputAnchorPeersUpdate ./channel-artifacts/Hospital1MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Hospital1MSP
if [ "$?" -ne 0 ]; then
  echo "Failed to generate anchor peer update for Hospital1MSP..."
  exit 1
fi

# generate anchor peer transaction
configtxgen -profile TwoOrgChannel -outputAnchorPeersUpdate ./channel-artifacts/Hospital2MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Hospital2MSP
if [ "$?" -ne 0 ]; then
  echo "Failed to generate anchor peer update for Hospital1MSP..."
  exit 1
fi
