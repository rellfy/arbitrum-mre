import { deployProxy } from "../utils";

export const deploy = async (setAddresses) => {
  console.log("deploying Contract");
  const contract = await deployProxy(
    "Contract",
    [],
    1
  );
  console.log(`deployed Contract to address ${contract.address}`);
  setAddresses({ contract: contract.address });
  return contract;
};
