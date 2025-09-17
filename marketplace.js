// --- NFT Marketplace & Wallet Functionality ---

document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const { Web3Modal } = window.Web3Modal;
    const { ethers } = window.ethers;
    
    // 1. Your Project ID is included here.
    const projectId = 'F177ccc83d51024d30957d2135be7ac0';
    
    // 2. Configure wagmi client
    const bsc = {
        chainId: 56,
        name: 'BNB Smart Chain',
        currency: 'BNB',
        explorerUrl: 'https://bscscan.com',
        rpcUrl: 'https://bsc-dataseed.binance.org/'
    };
    
    const metadata = {
        name: 'WagyDog',
        description: 'WagyDog Website',
        url: window.location.href,
        icons: [window.location.origin + '/wagydog-logo.jpg']
    };
    
    const web3Modal = new Web3Modal({
        ethersConfig: ethers.providers.getDefaultProvider(bsc.rpcUrl),
        chains: [bsc],
        projectId,
        metadata
    });

    const contractAddress = "0xYourContractAddressHere";
    const contractABI = [
        "function mint() public payable",
        "function ownerOf(uint256 tokenId) view returns (address)",
    ];
    const mintPrice = "0.05";

    // --- UI ELEMENTS ---
    const connectButtons = [
        document.getElementById('header-connect-btn'),
        document.getElementById('mobile-connect-btn'),
        document.getElementById('dashboard-connect-btn')
    ].filter(btn => btn !== null);

    const disconnectBtn = document.getElementById('disconnect-btn');
    const mintBtn = document.getElementById('mint-nft-btn');
    const walletConnectionDiv = document.getElementById('wallet-connection-info');
    const walletConnectedDiv = document.getElementById('wallet-connected-info');
    const walletAddressP = document.getElementById('wallet-address');
    const nftGallery = document.getElementById('nft-gallery');
    const swapActionButton = document.getElementById('swap-action-btn');

    // --- DUMMY NFT DATA ---
    const dummyNfts = [
        { id: 1, name: 'Cosmic Wagy', artist: 'Galaxy Paws', price: '0.1', image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 2, name: 'Nebula Pup', artist: 'Starlight Studio', price: '0.25', image: 'https://images.pexels.com/photos/1665241/pexels-photo-1665241.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 3, name: 'Star Chaser', artist: 'Andromeda Art', price: '0.5', image: 'https://images.pexels.com/photos/4587993/pexels-photo-4587993.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 4, name: 'Astro Mutt', artist: 'Galaxy Paws', price: '0.75', image: 'https://images.pexels.com/photos/257540/pexels-photo-257540.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 5, name: 'Lunar Rover', artist: 'Starlight Studio', price: '1.2', image: 'https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 6, name: 'Void Hound', artist: 'Andromeda Art', price: '2.0', image: 'https://images.pexels.com/photos/97082/weimaraner-puppy-dog-snout-97082.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ];

    // --- STATE VARIABLES ---
    let provider, signer, contract, connectedAccount;

    // --- FUNCTIONS ---
    const updateUIForConnection = (account) => {
        const shortAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
        
        connectButtons.forEach(btn => {
            btn.textContent = shortAddress;
            btn.disabled = true;
        });

        if (walletConnectionDiv && walletConnectedDiv && walletAddressP) {
            walletConnectionDiv.classList.add('hidden');
            walletConnectedDiv.classList.remove('hidden');
            walletAddressP.textContent = account;
        }

        if (mintBtn) mintBtn.disabled = false;
        if (swapActionButton) swapActionButton.textContent = "Swap";
    };

    const updateUIForDisconnection = () => {
        connectButtons.forEach(btn => {
            btn.textContent = "Connect Wallet";
            btn.disabled = false;
        });

        if (walletConnectionDiv && walletConnectedDiv) {
            walletConnectionDiv.classList.remove('hidden');
            walletConnectedDiv.classList.add('hidden');
        }

        if (mintBtn) mintBtn.disabled = true;
        if (swapActionButton) swapActionButton.textContent = "Connect Wallet";
        
        connectedAccount = null;
        provider = null;
        signer = null;
    };

    const connectWallet = async () => {
        try {
            const modalProvider = await web3Modal.open();
            provider = new ethers.providers.Web3Provider(modalProvider);
            signer = provider.getSigner();
            connectedAccount = await signer.getAddress();
            
            updateUIForConnection(connectedAccount);
            
            modalProvider.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    connectedAccount = accounts[0];
                    updateUIForConnection(connectedAccount);
                } else {
                    disconnectWallet();
                }
            });

        } catch (error) {
            console.error("Could not connect wallet:", error);
            updateUIForDisconnection();
        }
    };
    
    const disconnectWallet = async () => {
        await web3Modal.disconnect();
        updateUIForDisconnection();
    };

    const mintNFT = async () => {
        if (!signer) {
            alert('Please connect your wallet first.');
            return;
        }
        
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        mintBtn.disabled = true;
        mintBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Minting...';

        try {
            const tx = await contract.mint({ value: ethers.utils.parseEther(mintPrice) });
            await tx.wait();
            alert('Mint successful!');
        } catch (error) {
            console.error("Minting failed:", error);
            alert('Minting failed. See console for details.');
        } finally {
            mintBtn.disabled = false;
            mintBtn.innerHTML = '<i class="fas fa-star mr-2"></i> Mint Now';
        }
    };

    const createNftCard = (nft) => `
        <div class="nft-card">
            <img src="${nft.image}" alt="${nft.name}" class="nft-card-image">
            <div class="nft-card-content">
                <h4 class="nft-card-title">${nft.name} #${nft.id}</h4>
                <p class="nft-card-artist">by ${nft.artist}</p>
            </div>
            <div class="nft-card-footer">
                <span class="text-sm text-gray-400">Price</span>
                <span class="font-bold text-white">${nft.price} BNB</span>
            </div>
        </div>
    `;

    const populateGallery = () => {
        if (nftGallery) {
            nftGallery.innerHTML = dummyNfts.map(createNftCard).join('');
        }
    };

    // --- EVENT LISTENERS ---
    connectButtons.forEach(btn => btn.addEventListener('click', connectWallet));
    if(disconnectBtn) disconnectBtn.addEventListener('click', disconnectWallet);
    if(mintBtn) mintBtn.addEventListener('click', mintNFT);
    
    populateGallery();
});
