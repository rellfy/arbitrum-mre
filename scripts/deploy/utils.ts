import hardhat, { ethers } from "hardhat";
const upgrades = hardhat.upgrades;

/** Deploy a regular contract */
export const deployContract = async (
  contractName: string,
  constructorArguments: any[],
  waitCount: number = 1
) => {
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy(...constructorArguments);
  await contract.deployTransaction.wait(waitCount);
  return contract;
};

/** Deploy an OZ proxy contract */
export const deployProxy = async (
  contractName,
  constructorArguments,
  waitCount = 6
) => {
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await upgrades.deployProxy(Contract, constructorArguments, {
    kind: "uups",
  });
  await contract.deployTransaction.wait(waitCount);
  return contract;
};

/**
 * Returns a contract address given a contract name within an address config object.
 * @param key The contract name.
 * @param configForNetwork The config object holding contract addresses.
 */
export const getContractAddressFromConfigKey = (key: string, configForNetwork) => {
  if (key?.length === 42) return key;
  const searchInObject = (object) => {
    const keys = Object.keys(object);
    if (!keys.includes(key)) return null;
    return object[key];
  };
  const rootResult = searchInObject(configForNetwork);
  if (rootResult != null) return rootResult;
  // Search in inner config objects, i.e. thirdPartyContracts.
  for (let key in configForNetwork) {
    const object = configForNetwork[key];
    if (typeof object !== "object" || object == null) continue;
    const result = searchInObject(object);
    if (result != null) return result;
  }
  return null;
};
