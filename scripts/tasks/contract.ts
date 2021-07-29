import { task } from "hardhat/config";
import contracts from "../../contracts.json";

task("set-x")
  .addParam("x")
  .setAction(async (args, hre) => {
    const contractAddress = contracts[hre.network.name].token;
    console.log(`network is ${hre.network.name}`);
    console.log(`contract address is ${contractAddress}`)
    const contract = (await hre.ethers.getContractFactory("Contract"))
      .attach(contractAddress);
    await(await contract.setX(args.x)).wait(1);
    const xValue = await contract.getX();
    console.log(`x value is now ${xValue.toString()}`);
  });
