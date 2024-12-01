// FEU TECH - Pineda, Joshua Renniel - 202111212 - TokwaNiDahyun
const hre = require("hardhat");

async function main() {
  const initBalance = 1;
  const initColor = "#FF0000";
  const Assessment = await hre.ethers.getContractFactory("Assessment");
  const assessment = await Assessment.deploy(initBalance, initColor);
  await assessment.deployed();

  console.log(`A contract with balance of ${initBalance} eth and hex-color of ${initColor} deployed to ${assessment.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
