import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";

const maxWei = 30000000000;

const useCalculatedGasFee = () => {
  const { library } = useWeb3React();

  const calculateGasFee = async () => {
    // console.log(await library.eth.getGasPrice());

    // const feeData = await library.getFeeData();
    // const maxPriorityFeePerGas = BigNumber.from(
    //   Math.max(maxWei, Number(feeData.maxPriorityFeePerGas))
    // );
    // const maxFeePerGas = maxPriorityFeePerGas.add(
    //   BigNumber.from(feeData.maxFeePerGas).sub(
    //     BigNumber.from(feeData.maxPriorityFeePerGas)
    //   )
    // );

    const gasPrice = await library.eth.getGasPrice();

    return {
      //   maxPriorityFeePerGas,
      //   maxFeePerGas,
      gasPrice,
    };
  };

  return { calculateGasFee };
};

export default useCalculatedGasFee;
