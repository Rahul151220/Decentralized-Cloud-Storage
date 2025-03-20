import { ethers } from "ethers";

const CONTRACT_ADDRESS = "YOUR_SMART_CONTRACT_ADDRESS";
const ABI = [
  {
    inputs: [{ internalType: "string", name: "_fileHash", type: "string" }],
    name: "uploadFile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address payable", name: "_recipient", type: "address" }],
    name: "makePayment",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "files",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "string", name: "fileHash", type: "string" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "timestamp", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  }
];

let provider, signer, contract;

window.addEventListener("load", async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  }

  document.getElementById("uploadFileButton").addEventListener("click", async () => {
    const fileHash = document.getElementById("fileHash").value;
    if (contract && fileHash) {
      const tx = await contract.uploadFile(fileHash);
      await tx.wait();
      alert("File uploaded successfully!");
    }
  });

  document.getElementById("makePaymentButton").addEventListener("click", async () => {
    const recipient = document.getElementById("recipientAddress").value;
    const amount = document.getElementById("amount").value;
    if (contract && recipient && amount) {
      const tx = await contract.makePayment(recipient, { value: ethers.utils.parseEther(amount) });
      await tx.wait();
      alert("Payment sent successfully!");
    }
  });
});
