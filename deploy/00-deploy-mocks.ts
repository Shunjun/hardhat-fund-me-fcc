import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { network } from "hardhat"
import { networkConfig, developmentChains } from "../helper-hardhat-config"

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId || 0

    console.log(chainId)

    if (developmentChains.includes(network.name)) {
        log("deploying mocks on development network")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [200000000000],
        })
        log("deployed Mocks")
        log("--------------------------------------")
    }
}

export const tags = ["mocks", "all"]

export default func
