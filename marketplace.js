// --- NFT Marketplace & Wallet Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    if (!window.Web3Modal || !window.ethers) {
        console.error('Web3Modal or Ethers.js not loaded');
        return;
    }
    const { Web3Modal } = window.Web3Modal;
    const { ethers } = window.ethers;

    const projectId = 'F177ccc83d51024d30957d2135be7ac0'; // Your WalletConnect Project ID

    const bsc = {
        chainId: 97,
        name: 'BNB Testnet',
        currency: 'tBNB',
        explorerUrl: 'https://testnet.bscscan.com',
        rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    };

    const metadata = {
        name: 'WagyDog',
        description: 'WagyDog Website',
        url: window.location.href,
        icons: [window.location.origin + '/wagydog-logo.jpg']
    };

    const web3Modal = new Web3Modal({
        projectId,
        metadata,
        chains: [bsc],
        enableAnalytics: false,
    });

    // --- SMART CONTRACT DETAILS ---
    const contractAddress = "0x236237354Cef68d1EC34674dBD43e429AdA0d969";
    const contractABI = [
        {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
        {"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},
        {"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},
        {"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},
        {"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},
        {"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},
        {"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},
        {"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},
        {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},
        {"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},
        {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},
        {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},
        {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},
        {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},
        {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},
        {"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
        {"inputs":[],"name":"MINT_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},
        {"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
        {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
        {"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
        {"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}
    ];
    const mintPrice = "0.05";

    // --- UI ELEMENTS & STATE VARIABLES ---
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
    let provider, signer, contract, connectedAccount;

    // --- CORE FUNCTIONS ---
    const updateUIForConnection = (account) => {
        const shortAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
        connectButtons.forEach(btn => {
            btn.textContent = shortAddress;
            btn.disabled = false; // Allow reconnecting
        });
        if (walletConnectionDiv) walletConnectionDiv.classList.add('hidden');
        if (walletConnectedDiv) walletConnectedDiv.classList.remove('hidden');
        if (walletAddressP) walletAddressP.textContent = account;
        if (mintBtn) mintBtn.disabled = false;
        if (swapActionButton) swapActionButton.textContent = "Swap";
    };

    const updateUIForDisconnection = () => {
        connectButtons.forEach(btn => {
            btn.textContent = "Connect Wallet";
            btn.disabled = false;
        });
        if (walletConnectionDiv) walletConnectionDiv.classList.remove('hidden');
        if (walletConnectedDiv) walletConnectedDiv.classList.add('hidden');
        if (mintBtn) mintBtn.disabled = true;
        if (swapActionButton) swapActionButton.textContent = "Connect Wallet";
        connectedAccount = null;
        provider = null;
        signer = null;
        contract = null;
    };

    const connectWallet = async () => {
        try {
            console.log('Connect Wallet clicked');
            if (connectedAccount) {
                await web3Modal.disconnect();
                updateUIForDisconnection();
            }
            const modalProvider = await web3Modal.open();
            provider = new ethers.providers.Web3Provider(modalProvider);
            const network = await provider.getNetwork();
            if (network.chainId !== bsc.chainId) {
                try {
                    await provider.send('wallet_switchEthereumChain', [{ chainId: `0x${bsc.chainId.toString(16)}` }]);
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        await provider.send('wallet_addEthereumChain', [{
                            chainId: `0x${bsc.chainId.toString(16)}`,
                            chainName: bsc.name,
                            nativeCurrency: { name: bsc.currency, symbol: bsc.currency, decimals: 18 },
                            rpcUrls: [bsc.rpcUrl],
                            blockExplorerUrls: [bsc.explorerUrl],
                        }]);
                    } else {
                        throw switchError;
                    }
                }
            }
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
        if (!signer) { alert('Please connect your wallet first.'); return; }
        const network = await provider.getNetwork();
        if (network.chainId !== bsc.chainId) { alert(`Please switch your wallet to the ${bsc.name} to mint.`); return; }
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        mintBtn.disabled = true;
        mintBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
        try {
            const tx = await contract.mint(connectedAccount, { value: ethers.utils.parseEther(mintPrice) });
            mintBtn.innerHTML = 'Waiting for confirmation...';
            await tx.wait();
            alert('Mint successful! Your WagyDog NFT is in your wallet.');
        } catch (error) {
            console.error("Minting failed:", error);
            if (error.code === 'INSUFFICIENT_FUNDS') {
                alert('Minting failed: You do not have enough tBNB for the mint price + gas.');
            } else if (error.data && error.data.message) {
                alert(`Minting failed: ${error.data.message}`);
            } else {
                alert('Minting failed. The transaction may have been rejected or failed. Check the console.');
            }
        } finally {
            mintBtn.disabled = false;
            mintBtn.innerHTML = '<i class="fas fa-star mr-2"></i> Mint Now';
        }
    };

    // --- DUMMY GALLERY FUNCTIONS ---
    const dummyNfts = [
        { id: 1, name: 'Cosmic Wagy', artist: 'Galaxy Paws', price: '0.1', image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 2, name: 'Nebula Pup', artist: 'Starlight Studio', price: '0.25', image: 'https://images.pexels.com/photos/1665241/pexels-photo-1665241.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 3, name: 'Star Chaser', artist: 'Andromeda Art', price: '0.5', image: 'https://images.pexels.com/photos/4587993/pexels-photo-4587993.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 4, name: 'Astro Mutt', artist: 'Galaxy Paws', price: '0.75', image: 'https://images.pexels.com/photos/257540/pexels-photo-257540.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 5, name: 'Lunar Rover', artist: 'Starlight Studio', price: '1.2', image: 'https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 6, name: 'Void Hound', artist: 'Andromeda Art', price: '2.0', image: 'https://images.pexels.com/photos/97082/weimaraner-puppy-dog-snout-97082.jpeg?auto=compress&cs=tinysrgb&w=600' }
    ];
    const createNftCard = (nft) => `<div class="nft-card"><img src="${nft.image}" alt="${nft.name}" class="nft-card-image"><div class="nft-card-content"><h4 class="nft-card-title">${nft.name} #${nft.id}</h4><p class="nft-card-artist">by ${nft.artist}</p></div><div class="nft-card-footer"><span class="text-sm text-gray-400">Price</span><span class="font-bold text-white">${nft.price} BNB</span></div></div>`;
    const populateGallery = () => { if (nftGallery) nftGallery.innerHTML = dummyNfts.map(createNftCard).join(''); };

    // --- EVENT LISTENERS ---
    connectButtons.forEach(btn => {
        console.log('Button found:', btn.id);
        btn.addEventListener('click', connectWallet);
    });
    if (disconnectBtn) disconnectBtn.addEventListener('click', disconnectWallet);
    if (mintBtn) mintBtn.addEventListener('click', mintNFT);

    // Check for cached connection
    const checkCachedConnection = async () => {
        if (web3Modal.getIsConnected()) {
            try {
                const modalProvider = await web3Modal.getProvider();
                provider = new ethers.providers.Web3Provider(modalProvider);
                signer = provider.getSigner();
                connectedAccount = await signer.getAddress();
                updateUIForConnection(connectedAccount);
            } catch (error) {
                console.error('Error checking cached connection:', error);
            }
        }
    };
    checkCachedConnection();

    populateGallery();
});
