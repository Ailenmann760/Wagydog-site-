// --- NFT Marketplace & Wallet Functionality ---

document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const contractAddress = "0xYourContractAddressHere"; // <-- REPLACE
    const contractABI = [ /* <-- REPLACE WITH YOUR ABI */
        "function mint() public payable",
        "function ownerOf(uint256 tokenId) view returns (address)",
    ];
    const mintPrice = "0.05"; // Mint price in BNB

    // --- UI ELEMENTS ---
    const connectButtons = [
        document.getElementById('header-connect-btn'),
        document.getElementById('mobile-connect-btn'),
        document.getElementById('dashboard-connect-btn')
    ].filter(btn => btn !== null); // Filter out nulls in case any ID is missing

    const mintBtn = document.getElementById('mint-nft-btn');
    const walletConnectionDiv = document.getElementById('wallet-connection-info');
    const walletConnectedDiv = document.getElementById('wallet-connected-info');
    const walletAddressP = document.getElementById('wallet-address');
    const nftGallery = document.getElementById('nft-gallery');

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

    // Function to generate NFT card HTML
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

    // Populate gallery with dummy data
    const populateGallery = () => {
        if (!nftGallery) return;
        nftGallery.innerHTML = dummyNfts.map(createNftCard).join('');
    };

    const updateUIForConnection = (account) => {
        const shortAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
        
        // Update all connect buttons
        connectButtons.forEach(btn => {
            btn.textContent = shortAddress;
            btn.disabled = true;
        });

        // Update dashboard UI
        if (walletConnectionDiv && walletConnectedDiv && walletAddressP) {
            walletConnectionDiv.classList.add('hidden');
            walletConnectedDiv.classList.remove('hidden');
            walletAddressP.textContent = account;
        }

        // Enable mint button
        if (mintBtn) {
            mintBtn.disabled = false;
        }
    };

    const connectWallet = async () => {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask to use the marketplace.');
            return;
        }
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            connectedAccount = accounts[0];
            updateUIForConnection(connectedAccount);
        } catch (error) {
            console.error("Wallet connection failed:", error);
            alert('Failed to connect wallet. Please check the console for details.');
        }
    };

    const mintNFT = async () => {
        if (!contract) {
            alert('Please connect your wallet first.');
            return;
        }
        
        mintBtn.disabled = true;
        mintBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Minting...';

        try {
            const tx = await contract.mint({ value: ethers.utils.parseEther(mintPrice) });
            await tx.wait();
            alert('Mint successful! Your WagyDog is on its way.');
        } catch (error) {
            console.error("Minting failed:", error);
            alert('Minting failed. This could be a rejected transaction or a network issue.');
        } finally {
            mintBtn.disabled = false;
            mintBtn.innerHTML = '<i class="fas fa-star mr-2"></i> Mint Now';
        }
    };

    // --- INITIALIZATION ---

    // Add click listeners to all connect buttons
    connectButtons.forEach(btn => btn.addEventListener('click', connectWallet));

    // Add click listener to mint button
    if (mintBtn) {
        mintBtn.addEventListener('click', mintNFT);
    }
    
    // Initial population of the gallery
    populateGallery();
});
