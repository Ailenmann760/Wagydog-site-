document.addEventListener('DOMContentLoaded', () => {
    console.log("WagyDog script.js loaded and running!"); // You should see this in the console

    try {
        // --- Mobile menu toggle ---
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                console.log('Mobile menu toggled'); // Debug log
                mobileMenu.classList.toggle('hidden');
            });
        }

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });

        // --- Scroll-in animations ---
        const fadeInSections = document.querySelectorAll('.fade-in-section');
        if (fadeInSections.length > 0) {
            console.log(`Found ${fadeInSections.length} sections to animate.`); // You should see this
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            fadeInSections.forEach(section => {
                observer.observe(section);
            });
        } else {
            console.log("No sections with '.fade-in-section' found to observe.");
        }

        // --- Starfield Animation ---
        function createStarfield(canvasId) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) {
                console.warn(`Canvas ${canvasId} not found`);
                return;
            }
            const ctx = canvas.getContext('2d');
            let stars = [];
            let numStars = 250;

            function resizeCanvas() {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
                stars = [];
                for (let i = 0; i < numStars; i++) {
                    stars.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        radius: Math.random() * 1.5 + 0.5,
                        vx: (Math.random() - 0.5) * 0.3,
                        vy: (Math.random() - 0.5) * 0.3
                    });
                }
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#fff";
                for (let i = 0, x = stars.length; i < x; i++) {
                    let s = stars[i];
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
                    ctx.fill();
                    s.x += s.vx;
                    s.y += s.vy;
                    if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
                    if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
                }
                requestAnimationFrame(animate);
            }
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();
            animate();
            console.log(`Starfield ${canvasId} initialized`);
        }

        createStarfield('starfield');
        createStarfield('starfield2');

        // --- Wallet Connection Logic ---
        let web3Modal;
        try {
            web3Modal = new window.Web3Modal.Standalone({
                projectId: 'f177ccc83d51024d30957d2135be7ac0',
                walletConnectVersion: 2,
                chains: [
                    {
                        id: 97,
                        name: 'Binance Smart Chain Testnet',
                        nativeCurrency: {
                            name: 'Binance Coin',
                            symbol: 'BNB',
                            decimals: 18
                        },
                        rpcUrls: {
                            default: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545'] },
                            public: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545'] }
                        },
                        blockExplorers: {
                            default: {
                                name: 'BSCScan',
                                url: 'https://testnet.bscscan.com'
                            }
                        }
                    }
                ],
            });
            console.log('Web3Modal initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Web3Modal:', error);
        }

        window.wagyDog = {
            provider: null,
            signer: null,
            address: null,
            getWalletState: function() {
                return {
                    provider: this.provider,
                    signer: this.signer,
                    address: this.address
                };
            }
        };

        function updateUi(address) {
            console.log('Updating UI for address:', address); // Debug
            const allConnectButtons = document.querySelectorAll('#header-connect-btn, #mobile-connect-btn, #dashboard-connect-btn, #swap-action-btn');
            const connectedInfo = document.getElementById('wallet-connected-info');
            const walletAddressSpan = document.getElementById('wallet-address');
            const disconnectBtn = document.getElementById('disconnect-btn');
            const mintBtn = document.getElementById('mint-nft-btn');
            const connectionPrompt = document.getElementById('wallet-connection-info');
            const swapActionButton = document.getElementById('swap-action-btn');

            if (address) {
                const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
                allConnectButtons.forEach(btn => btn.textContent = shortAddress);
                if (swapActionButton) swapActionButton.textContent = 'Swap';
                if (walletAddressSpan) walletAddressSpan.textContent = shortAddress;
                if (connectedInfo) connectedInfo.classList.remove('hidden');
                if (disconnectBtn) disconnectBtn.classList.remove('hidden');
                if (connectionPrompt) connectionPrompt.classList.add('hidden');
                if (mintBtn) mintBtn.disabled = false;
            } else {
                allConnectButtons.forEach(btn => btn.textContent = 'Connect Wallet');
                if (swapActionButton) swapActionButton.textContent = 'Connect Wallet';
                if (connectedInfo) connectedInfo.classList.add('hidden');
                if (disconnectBtn) disconnectBtn.classList.add('hidden');
                if (connectionPrompt) connectionPrompt.classList.remove('hidden');
                if (mintBtn) mintBtn.disabled = true;
            }
        }

        async function connectWallet() {
            if (!web3Modal) {
                console.error('Web3Modal not available');
                alert('Wallet connection not available. Check console.');
                return;
            }
            try {
                console.log('Attempting to connect wallet...');
                const provider = await web3Modal.connect();
                window.wagyDog.provider = new ethers.providers.Web3Provider(provider);
                window.wagyDog.signer = window.wagyDog.provider.getSigner();
                window.wagyDog.address = await window.wagyDog.signer.getAddress();
                console.log("Wallet connected:", window.wagyDog.address);
                updateUi(window.wagyDog.address);
                provider.on("accountsChanged", (accounts) => {
                    if (accounts.length > 0) {
                        connectWallet();
                    } else {
                        disconnectWallet();
                    }
                });
                provider.on("chainChanged", () => window.location.reload());
            } catch (error) {
                console.error("Could not connect to wallet:", error);
                alert(`Connection failed: ${error.message}`);
                disconnectWallet();
            }
        }

        function disconnectWallet() {
            window.wagyDog.provider = null;
            window.wagyDog.signer = null;
            window.wagyDog.address = null;
            console.log("Wallet disconnected.");
            updateUi(null);
        }

        // Attach event listeners with debugging
        const connectButtons = document.querySelectorAll('#header-connect-btn, #mobile-connect-btn, #dashboard-connect-btn, #swap-action-btn');
        connectButtons.forEach((btn, index) => {
            console.log(`Attaching listener to button ${index}:`, btn.id || btn.className);
            btn.addEventListener('click', (e) => {
                console.log('Button clicked:', btn.id || 'unnamed', 'Text:', btn.textContent.trim());
                e.preventDefault();
                e.stopPropagation();
                if (btn.textContent.trim().includes('Connect Wallet') || btn.textContent.trim() === 'Connect Wallet') {
                    connectWallet();
                }
            });
        });

        const disconnectBtn = document.getElementById('disconnect-btn');
        if (disconnectBtn) {
            disconnectBtn.addEventListener('click', (e) => {
                console.log('Disconnect clicked');
                e.preventDefault();
                disconnectWallet();
            });
        }

        // --- NFT Marketplace Logic ---
        const mintBtn = document.getElementById('mint-nft-btn');
        const nftGallery = document.getElementById('nft-gallery');
        const marketplaceContractAddress = "0x236237354Cef68d1EC34674dBD43e429AdA0d969";
        const marketplaceContractABI = [ /* Full ABI unchanged */ 
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
        
        async function mintNFT() {
            const { signer, address } = window.wagyDog.getWalletState();
            if (!signer) return alert('Please connect your wallet first.');
            try {
                const contract = new ethers.Contract(marketplaceContractAddress, marketplaceContractABI, signer);
                let mintPrice;
                mintPrice = await contract.MINT_PRICE();
                mintBtn.disabled = true;
                mintBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
                const tx = await contract.mint(address, { value: mintPrice });
                await tx.wait();
                alert('Mint successful!');
            } catch (error) {
                console.error("Minting failed:", error);
                alert('Minting failed. Check console for details.');
            } finally {
                mintBtn.disabled = false;
                mintBtn.innerHTML = '<i class="fas fa-star mr-2"></i> Mint Now';
            }
        }

        // Populate NFTs unconditionally with error handling
        const dummyNfts = [
            { id: 1, name: 'Cosmic Wagy', artist: 'Galaxy Paws', price: '0.1', image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600' },
            { id: 2, name: 'Nebula Pup', artist: 'Starlight Studio', price: '0.25', image: 'https://images.pexels.com/photos/1665241/pexels-photo-1665241.jpeg?auto=compress&cs=tinysrgb&w=600' },
            { id: 3, name: 'Star Chaser', artist: 'Andromeda Art', price: '0.5', image: 'https://images.pexels.com/photos/4587993/pexels-photo-4587993.jpeg?auto=compress&cs=tinysrgb&w=600' },
        ];
        const createNftCard = (nft) => `<div class="nft-card"><img src="${nft.image}" alt="${nft.name}" class="nft-card-image" onerror="this.src='https://via.placeholder.com/250x250?text=NFT+${nft.id}'"><div class="nft-card-content"><h4 class="nft-card-title">${nft.name} #${nft.id}</h4><p class="nft-card-artist">by ${nft.artist}</p></div><div class="nft-card-footer"><span class="text-sm text-gray-400">Price</span><span class="font-bold text-white">${nft.price} BNB</span></div></div>`;
        if (nftGallery) {
            nftGallery.innerHTML = dummyNfts.map(createNftCard).join('');
            console.log('NFT gallery populated with 3 dummies');
        } else {
            console.warn('NFT gallery element not found');
        }
        if (mintBtn) mintBtn.addEventListener('click', mintNFT);

        // --- Swap Logic ---
        const fromAmountInput = document.getElementById('from-amount');
        const toAmountInput = document.getElementById('to-amount');
        const fromTokenSelect = document.getElementById('from-token-select');
        const toTokenSelect = document.getElementById('to-token-select');
        const swapDirectionBtn = document.getElementById('swap-direction-btn');
        const swapActionButton = document.getElementById('swap-action-btn');

        let fromToken = { name: 'BNB', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png' };
        let toToken = { name: 'WAGY', logo: 'https://img.icons8.com/color/48/shiba.png' }; // External dog icon as fallback
        const BNB_TO_WAGY_RATE = 1500000;

        function updateTokenDisplay(buttonElement, token) {
            if (!buttonElement) {
                console.warn('Token select element not found');
                return;
            }
            const logoImg = buttonElement.querySelector('.token-logo');
            const nameSpan = buttonElement.querySelector('.token-name');
            if (logoImg) {
                logoImg.src = token.logo;
                logoImg.alt = token.name;
                logoImg.onerror = () => { logoImg.src = 'https://via.placeholder.com/48x48?text=' + token.name; }; // Fallback
            }
            if (nameSpan) nameSpan.textContent = token.name;
            console.log(`Updated token display for ${token.name}`);
        }

        function handleSwapDirection() {
            [fromToken, toToken] = [toToken, fromToken];
            [fromAmountInput ? fromAmountInput.value : '', toAmountInput ? toAmountInput.value : ''] = [toAmountInput ? toAmountInput.value : '', fromAmountInput ? fromAmountInput.value : ''];
            if (fromTokenSelect) updateTokenDisplay(fromTokenSelect, fromToken);
            if (toTokenSelect) updateTokenDisplay(toTokenSelect, toToken);
            console.log('Swap direction toggled');
        }

        function handleAmountChange(e) {
            const inputAmount = parseFloat(e.target.value);
            if (isNaN(inputAmount) || inputAmount <= 0) {
                if (toAmountInput) toAmountInput.value = '';
                if (e.target.id === 'to-amount' && fromAmountInput) fromAmountInput.value = '';
                return;
            }
            const rate = (fromToken.name === 'BNB') ? BNB_TO_WAGY_RATE : 1 / BNB_TO_WAGY_RATE;
            if (e.target.id === 'from-amount' && toAmountInput) {
                toAmountInput.value = (inputAmount * rate).toFixed(2);
            } else if (fromAmountInput) {
                fromAmountInput.value = (inputAmount / rate).toFixed(6);
            }
        }
        
        async function performSwap() {
            const { signer } = window.wagyDog.getWalletState();
            if (!signer) return alert('Please connect your wallet to perform a swap.');
            const fromAmount = fromAmountInput ? fromAmountInput.value : '';
            if (!fromAmount || parseFloat(fromAmount) <= 0) return alert('Please enter a valid amount to swap.');
            alert("Swap functionality is a simulation.");
            // Actual swap logic with a router contract would go here.
        }

        if (swapDirectionBtn) {
            swapDirectionBtn.addEventListener('click', handleSwapDirection);
        }
        if (fromAmountInput) {
            fromAmountInput.addEventListener('input', handleAmountChange);
        }
        if (toAmountInput) {
            toAmountInput.addEventListener('input', handleAmountChange);
        }
        if (swapActionButton) {
            // Listener already attached above in connectButtons
        }

        // Initialize displays
        if (fromTokenSelect) updateTokenDisplay(fromTokenSelect, fromToken);
        if (toTokenSelect) updateTokenDisplay(toTokenSelect, toToken);
        console.log('Swap UI initialized');

        console.log('Script fully loaded - check console for any warnings/errors');
    } catch (globalError) {
        console.error('Global script error:', globalError);
    }
});
