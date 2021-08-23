(async function () {
  const Web3Modal = window.Web3Modal.default;
  const providerOptions = {
    /* See Provider Options Section */
  };

  const web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });

  const provider = await web3Modal.connect();
})();
