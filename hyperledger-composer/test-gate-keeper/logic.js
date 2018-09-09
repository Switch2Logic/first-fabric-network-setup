/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getCurrentParticipant getParticipantRegistry getFactory emit */

/**
 * Granting a resident access to the gate.
 * @param {org.example.gate.AuthorizeGateAccess} authorize
 * @transaction
 */
async function authorizeGateAccessFunction(authorize) {
    let index = -1;
    const me = getCurrentParticipant();
    console.log("Gate: " + authorize.gate.name + " access granted to resident " + authorize.resident.email);

    if(!me) 
    {
        throw new Error('A participant/certificate mapping does not exist.');
    }

    if(!authorize.gate.GateAccess) 
    {
        authorize.gate.GateAccess = [];
    }
    else 
    {
        index = authorize.gate.GateAccess.indexOf(authorize.resident.email);
    }

    if(index < 0) 
    {
        authorize.gate.GateAccess.push(authorize.resident.email);
        const assetRegistry = await getAssetRegistry('org.example.gate.Gate');
        await assetRegistry.update(authorize.gate);
    }
}

/**
 * Revoking a residents access to the gate.
 * @param {org.example.gate.RevokeGateAccess} revoke
 * @transaction
 */
async function revokeGateAccessFunction(revoke) { 

    const me = getCurrentParticipant();
    console.log("Gate: " + revoke.gate.name + " access revoked for resident " + revoke.resident.email);

    if(!me) 
    {
        throw new Error('A participant/certificate mapping does not exist.');
    }
  
 	const index = revoke.gate.GateAccess ? revoke.gate.GateAccess.indexOf(revoke.resident.email) : -1;
  
    if(index > -1) 
    {
        revoke.gate.GateAccess.splice(index, 1);
        const memberRegistry = await getAssetRegistry('org.example.gate.Gate');
        await memberRegistry.update(revoke.gate);
    }
}

/**
 * Resdent sending the gate open command.
 * @param {org.example.gate.OpenGate} openGate
 * @transaction
 */
async function openGateFunction(openGate) {

    let index = -1;
    const me = getCurrentParticipant();
    console.log("Resident: " + me.email + " sending open gate command to " + openGate.gate.name);

    if(!me) 
    {
        throw new Error('A participant/certificate mapping does not exist.');
    }
    else
    {
        index = openGate.gate.GateAccess.indexOf(me.email)

        if(index > -1) 
        {
            let event = getFactory().newEvent('org.example.gate', 'GateOpenEvent');
            event.message = "open";
            event.gateKey = openGate.gate.gateKey;
            emit(event);
        }    
    }
}

/**
 * Resdent sending the gate close command.
 * @param {org.example.gate.CloseGate} closeGate
 * @transaction
 */
async function closeGateFunction(closeGate) { 

	let index = -1;
    const me = getCurrentParticipant();
  	console.log("Resident: " + me.email + " sending close gate command to " + closeGate.gate.name);  
  
	if(!me) 
	{
  		throw new Error('A participant/certificate mapping does not exist.');
    }
  	else
  	{
  		index = closeGate.gate.GateAccess.indexOf(me.email)
		if(index > -1) 
    	{
    	let event = getFactory().newEvent('org.example.gate', 'GateCloseEvent');
      	event.message = "close";
        event.gateKey = closeGate.gate.gateKey;
      	emit(event);
    	}
    	else
    	{
    		throw new Error('A participant/certificate mapping does not exist.');
  		}
	}
}

/**
 * The gate sending a opened response.
 * @param {org.example.gate.GateOpenSensor} openSensor
 * @transaction
 */
async function gateOpenSensor(openSensor) {  

    const me = getCurrentParticipant();
  
    if(!me) 
    {
    	throw new Error('A participant/certificate mapping does not exist.');
    }
  	else
  	{
		openSensor.gate.status = "open";
    	const assetRegistry = await getAssetRegistry('org.example.gate.Gate');
   		await assetRegistry.update(openSensor.gate);
    }
}
/**
 * The gate sending a closed response.
 * @param {org.example.gate.GateClosedSensor} closedSensor
 * @transaction
 */
async function gateClosesSenso(closedSensor) {  

    const me = getCurrentParticipant();
  
    if(!me) 
    {
    	throw new Error('A participant/certificate mapping does not exist.');
    }
  	else
  	{
		closedSensor.gate.status = "closed";
    	const assetRegistry = await getAssetRegistry('org.example.gate.Gate');
   		await assetRegistry.update(closedSensor.gate);
    }
}

