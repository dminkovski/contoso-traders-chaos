@description('First part of the resource name')
param nameprefix string

@description('Azure region for resources')
param location string = resourceGroup().location

param aksClusterResourceGroup string

param uamiName string

// First experiment: Disable a VMSS node
module chaos1 '../chaos-experiments/chaos-vmss-disable-node.bicep' = {
  name: '${nameprefix}-chaos-1'
  params: {
    nameprefix: nameprefix
    location: location
  }
}

// Second experiment: Deny access to a Key Vault
module chaos2 '../chaos-experiments/chaos-keyvault-deny.bicep' = {
  name: '${nameprefix}-chaos-2'
  params: {
    nameprefix: nameprefix
    location: location
  }
}

// Third experiment: Deny access to a Key Vault
module chaos3 '../chaos-experiments/chaos-aks-degradation.bicep' = {
  name: '${nameprefix}-chaos-3'
  params: {
    nameprefix: nameprefix
    location: location
  }
}

// Second experiment: Deny access to a Key Vault
module deploymentScript '../chaos-experiments/aks-deploymentscript.bicep' = {
  name: '${nameprefix}-deploymentScript'
  params: {
    nameprefix: nameprefix
    location: location
    aksClusterResourceGroup: aksClusterResourceGroup
    uamiName: uamiName
  }
  dependsOn: [
    chaos1
    chaos2
    chaos3
  ]
}

// References to next experiments to be added here. 

output vmssClusterName string = deploymentScript.outputs.vmssClusterName
