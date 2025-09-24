// --- WagyDog Swap Interface Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    // --- UI ELEMENTS ---
    const fromAmountInput = document.getElementById('from-amount');
    const toAmountInput = document.getElementById('to-amount');
    const fromTokenSelect = document.getElementById('from-token-select');
    const toTokenSelect = document.getElementById('to-token-select');
    const swapDirectionBtn = document.getElementById('swap-direction-btn');
    const swapActionButton = document.getElementById('swap-action-btn');

    // --- STATE VARIABLES ---
    let fromToken = { name: 'BNB', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png' };
    let toToken = { name: 'WAGY', logo: 'wagydog-logo.jpg' };

    // --- FUNCTIONS ---
    const updateTokenDisplay = (buttonElement, token) => {
        if (!buttonElement) return;
        buttonElement.querySelector('.token-logo').src = token.logo;
        buttonElement.querySelector('.token-logo').alt = token.name;
        buttonElement.querySelector('.token-name').textContent = token.name;
    };

    const handleSwapDirection = () => {
        [fromToken, toToken] = [toToken, fromToken];
        if (fromAmountInput && toAmountInput) {
            [fromAmountInput.value, toAmountInput.value] = [toAmountInput.value, fromAmountInput.value];
        }
        updateTokenDisplay(fromTokenSelect, fromToken);
        updateTokenDisplay(toTokenSelect, toToken);
    };

    const handleAmountChange = (e) => {
        const inputAmount = parseFloat(e.target.value);
        if (isNaN(inputAmount) || inputAmount <= 0) {
            if (toAmountInput) toAmountInput.value = '';
            if (e.target.id === 'to-amount' && fromAmountInput) {
                fromAmountInput.value = '';
            }
            return;
        }

        if (e.target.id === 'from-amount') {
            if (toAmountInput) toAmountInput.value = (inputAmount * 1500000).toString();
        } else {
            if (fromAmountInput) fromAmountInput.value = (inputAmount / 1500000).toString();
        }
    };

    // --- EVENT LISTENERS ---
    if (swapDirectionBtn) swapDirectionBtn.addEventListener('click', handleSwapDirection);
    if (fromAmountInput) fromAmountInput.addEventListener('input', handleAmountChange);
    if (toAmountInput) toAmountInput.addEventListener('input', handleAmountChange);

    if (swapActionButton) {
        swapActionButton.addEventListener('click', () => {
            console.log('Swap action button clicked, text:', swapActionButton.textContent.trim());
            if (swapActionButton.textContent.trim() === "Swap") {
                alert("Swap functionality will be implemented soon!");
            } else {
                if (window.Web3Modal && window.ethers) {
                    const { Web3Modal } = window.Web3Modal;
                    const projectId = 'F177ccc83d51024d30957d2135be7ac0'; // Your WalletConnect Project ID
                    const web3ModalInstance = new Web3Modal({
                        projectId,
                        metadata: {
                            name: 'WagyDog',
                            description: 'WagyDog Website',
                            url: window.location.href,
                            icons: [window.location.origin + '/wagydog-logo.jpg']
                        },
                        chains: [bsc],
                        enableAnalytics: false,
                    });
                    web3ModalInstance.open().then(modalProvider => {
                        console.log('Web3Modal opened from swap.js');
                    }).catch(error => {
                        console.error('Web3Modal failed in swap.js:', error);
                    });
                } else {
                    console.error('Web3Modal or Ethers.js not available in swap.js');
                }
            }
        });
    }

    // Initialize token displays
    updateTokenDisplay(fromTokenSelect, fromToken);
    updateTokenDisplay(toTokenSelect, toToken);
});
