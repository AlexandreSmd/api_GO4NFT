function showButtons() {
    const actor = document.getElementById('actor').value;

    // Hide all buttons and input field
    document.getElementById('Button_GetRights').style.display = 'none';
    document.getElementById('adminButton_GetAllCreator').style.display = 'none';
    document.getElementById('Button_GetEthAdress').style.display = 'none';
    document.getElementById('Button_GetAllCreatorName').style.display = 'none';
    document.getElementById('numberLabel').style.display = 'none';
    document.getElementById('number').style.display = 'none';
    document.getElementById('adminButton_GetAllBeneficiary').style.display = 'none';
    document.getElementById('adminButton_GetAllCollection').style.display = 'none';

    // Show the appropriate button based on the selected actor
    switch (actor) {
        case 'CREATOR':
            document.getElementById('Button_GetRights').style.display = 'block';
            document.getElementById('Button_GetEthAdress').style.display = 'block';
            document.getElementById('Button_GetCreatorNameWithId').style.display = 'block';
            document.getElementById('Button_GetAllCreatorName').style.display = 'block';
            document.getElementById('Button_GetAllRight').style.display = 'block';
            document.getElementById('Button_GetAllNftByCollectionID').style.display = 'block';
            document.getElementById('Button_GetCCreator').style.display = 'block';
            break;
        case 'ADMINISTRATOR':
            document.getElementById('Button_GetRights').style.display = 'block';
            document.getElementById('Button_GetEthAdress').style.display = 'block';
            document.getElementById('Button_GetCreatorNameWithId').style.display = 'block';
            document.getElementById('Button_GetAllCreatorName').style.display = 'block';
            document.getElementById('Button_GetAllRight').style.display = 'block';
            document.getElementById('Button_GetAllNftByCollectionID').style.display = 'block';
            document.getElementById('Button_GetCCreator').style.display = 'block';
            document.getElementById('adminButton_GetAllCreator').style.display = 'block';
            document.getElementById('adminButton_GetAllBeneficiary').style.display = 'block';
            document.getElementById('adminButton_GetAllCollection').style.display = 'block';
            break;
        case 'BENEFICIARY':
            document.getElementById('Button_GetRights').style.display = 'block';
            document.getElementById('Button_GetEthAdress').style.display = 'block';
            document.getElementById('Button_GetCreatorNameWithId').style.display = 'block';
            document.getElementById('Button_GetAllCreatorName').style.display = 'block';
            document.getElementById('Button_GetAllRight').style.display = 'block';
            document.getElementById('Button_GetAllNftByCollectionID').style.display = 'block';
            document.getElementById('Button_GetCCreator').style.display = 'block';
            break;
    }

    // Show the input field only if an actor is selected
    if (actor !== '') {
        document.getElementById('numberLabel').style.display = 'block';
        document.getElementById('number').style.display = 'block';
    }
}

// Function to grant rights based on beneficiary ID
async function getRights() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;
    const number = document.getElementById('number').value; // Retrieve the value of the number input

    try {
        console.log('Before axios request');
        const response = await axios.get(`http://localhost:3000/api/beneficiary/GetBeneficiaryRight/${number}`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('After axios request', response);

        document.getElementById('result').innerHTML = `<p>Result of GET /api/beneficiary/GetBeneficiaryRight/ :</p>
          <pre>${JSON.stringify(response.data, null, 2)}</pre>`;

    } catch (error) {
        console.error(`Error while requesting GET /beneficiaryright/${number} :`, error);
        if (error.response) {
            document.getElementById('result').innerHTML = `<p>Error while requesting GET /beneficiaryright/${number} :</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result').innerHTML = `<p>Unexpected error while requesting GET /beneficiaryright/${number}</p>`;
            console.error('Unexpected client-side error:', error.message);
        }
    }
}

// Function to grant rights based on beneficiary ID
async function getAllCreator() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;

    try {
        console.log('Before axios request');
        const response = await axios.get(`http://localhost:3000/api/creator/GetAllCreator`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('After axios request', response);

        document.getElementById('result2').innerHTML = `<p>Result of GET /beneficiaryright :</p>
          <pre>${JSON.stringify(response.data[0], null, 2)}</pre>`;

    } catch (error) {
        console.error(`Error while requesting GET /beneficiaryright :`, error);
        if (error.response) {
            document.getElementById('result2').innerHTML = `<p>Error while requesting GET /beneficiaryright/${number} :</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result2').innerHTML = `<p>Unexpected error while requesting GET /beneficiaryright</p>`;
            console.error('Unexpected client-side error:', error.message);
        }
    }
}
// Function to retrieve rights based on beneficiary ID
async function getEthAddress() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;
    const number = document.getElementById('number').value;

    try {
        console.log('Before axios request');
        const response = await axios.get(`http://localhost:3000/api/beneficiary/GetEthAddressOfBeneficiary/${number}`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('After axios request', response);

        document.getElementById('result').innerHTML = `<p>Result of GET /beneficiaryright request:</p>
          <pre>${JSON.stringify(response.data, null, 2)}</pre>`;

    } catch (error) {
        console.error(`Error during GET /beneficiaryright request:`, error);
        if (error.response) {
            document.getElementById('result').innerHTML = `<p>Error during GET /beneficiaryright/${number} request:</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result').innerHTML = `<p>Unexpected error during GET /beneficiaryright request</p>`;
            console.error('Unexpected client-side error:', error.message);
        }
    }
}
async function GetCreatorNameWithId() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;
    const number = document.getElementById('number').value;
  
    try {
        console.log('Before axios request');
        const response = await axios.get(`http://localhost:3000/api/creator/GetCreatorNameWithId/${number}`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('After axios request', response);
  
        document.getElementById('result').innerHTML = `<p>Result of the GET /beneficiaryright request:</p>
          <pre>${JSON.stringify(response.data, null, 2)}</pre>`;
  
    } catch (error) {
        console.error(`Error while requesting GET /beneficiaryright:`, error);
        if (error.response) {
            document.getElementById('result').innerHTML = `<p>Error while requesting GET /beneficiaryright/${number}:</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result').innerHTML = `<p>Unexpected error while requesting GET /beneficiaryright</p>`;
            console.error('Unexpected client-side error:', error.message);
        }
    }
  }


  

  // Function to grant rights based on the beneficiary's ID
async function GetAllCreatorName() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;
  
    try {
        console.log('Before axios request');
        const response = await axios.get(`http://localhost:3000/api/creator/GetAllCreatorName`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('After axios request', response);
  
        document.getElementById('result2').innerHTML = `<p>Result of the GET /beneficiaryright request:</p>
          <pre>${JSON.stringify(response.data[0], null, 2)}</pre>`;
  
    } catch (error) {
        console.error(`Error while requesting GET /beneficiaryright:`, error);
        if (error.response) {
            document.getElementById('result2').innerHTML = `<p>Error while requesting GET /beneficiaryright/${number}:</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result2').innerHTML = `<p>Unexpected error while requesting GET /beneficiaryright</p>`;
            console.error('Unexpected client-side error:', error.message);
        }
    }
  }

  async function sendEth() {
    const web3 = new Web3(ethereum);

    const creatorId = document.getElementById('creatorId').value;
    const targetAddress = '0x3e0CaBAac78d2c9Cc88A8D374E2141ae953B4B9A';
    const amountToSend = web3.utils.toWei('0.00001', 'ether');

    // Check the existence of the creator before proceeding with the transaction
    const creatorExists = await ifExist(creatorId);    
    console.log(creatorExists);
    if (!creatorExists) {
        console.log('Nonexistent creator.');
        document.getElementById('result3').innerHTML = `<p>Nonexistent creator</p>`;
        return;
    }
    try {
        // Request authorization from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const fromAddress = accounts[0];

        // Build the transaction
        const transactionParameters = {
            from: fromAddress,
            to: targetAddress,
            value: amountToSend,
        };

        // Send the transaction
        const transactionHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        // Wait for transaction confirmation
        await waitForTransactionConfirmation(transactionHash);

        // Once the transaction is confirmed, credit counter C
        await creditCounterC(creatorId);

        document.getElementById('result3').innerHTML = `<p>Successful transaction!</p>`;
    } catch (error) {
        console.error('Error during the transaction:', error);
        document.getElementById('result3').innerHTML = `<p>Error during the transaction: ${error.message}</p>`;
    }
}


async function waitForTransactionConfirmation(transactionHash) {
    const web3 = new Web3(ethereum);
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(async () => {
            try {
                const receipt = await web3.eth.getTransactionReceipt(transactionHash);
                if (receipt && receipt.blockNumber) {
                    clearInterval(intervalId);
                    resolve();
                }
            } catch (error) {
                clearInterval(intervalId);
                reject(error);
            }
        }, 1000);
    });
}




async function creditCounterC(creatorId) {
    const keypub = '123';
    const keyprv = '123';
    // You must implement the logic to credit counter C on the server side
    // Use an Axios request to call the API that handles this
    try {
        const updatedCreator = {
            Creator_C_add: 10,
          };

        const response = await axios.put(`http://localhost:3000/api/creator/UpdateCompteurCreator/${creatorId}`, updatedCreator , {
            headers: {
              'x-keypub': keypub,
              'x-keyprv': keyprv,
              'x-actor': "ADMINISTRATOR",
            },
          });

        console.log('Server response:', response.data);
    } catch (error) {
        console.error('Error while crediting counter C:', error);
    }
}
// Function to check the existence of the creator
async function ifExist(creatorId) {
    try {
        const response = await axios.get(`http://localhost:3000/api/creator/ifCreatorExist/${creatorId}`, {
            headers: {
                'x-actor': 'ADMINISTRATOR',
                'x-keypub': '123',
                'x-keyprv': '123',
            },
        });

        // Check if the response indicates that the creator exists
        if (response.data.exists) {
            // The creator exists, continue the program
            console.log('The creator exists.');
            return true;
        } else {
            // The creator does not exist, stop the program here
            console.log('The creator is nonexistent.');
            return false;
        }
    } catch (error) {
        // Handle Axios request errors
        if (error.response && error.response.status === 404) {
            // The creator does not exist, stop the program here
            console.log('The creator is nonexistent.');
            return false;
        } else {
            console.error('Error while checking the existence of the creator:', error.message);
            throw error; // You can choose to rethrow the error or handle it differently
        }
    }
}

function comeback() {
    // Reset input fields
    document.getElementById('keypub').value = '';
    document.getElementById('keyprv').value = '';
    document.getElementById('actor').value = '';
    document.getElementById('number').value = '';
    document.getElementById('creatorId').value = '';

    // Hide all buttons and input field
    document.getElementById('Button_GetRights').style.display = 'none';
    document.getElementById('adminButton_GetAllCreator').style.display = 'none';
    document.getElementById('Button_GetEthAdress').style.display = 'none';
    document.getElementById('Button_GetAllCreatorName').style.display = 'none';
    document.getElementById('numberLabel').style.display = 'none';
    document.getElementById('number').style.display = 'none';

    // Reset results
    document.getElementById('result').innerHTML = '';
    document.getElementById('result2').innerHTML = '';
    document.getElementById('result3').innerHTML = '';

    // Show input field only if actor is selected
    document.getElementById('numberLabel').style.display = 'block';
    document.getElementById('number').style.display = 'block';
}

function downloadPDF() {
    // Create path to your PDF file
    const pdfPath = 'pdf/pdftest.pdf';

    // Generate URL for the PDF file
    const url = pdfPath;

    // Create an <a> element for downloading
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_file.pdf'; // Name of the PDF file to download

    // Add the <a> element to the page
    document.body.appendChild(a);

    // Click on the <a> element to trigger the download
    a.click();

    // Remove the <a> element from the page
    document.body.removeChild(a);
}

function redirectToEtherscan() {
    window.location.href = "https://etherscan.io/";
}

function redirectToOpenSea() {
    window.location.href = "https://opensea.io/";
}

async function GetAllBeneficiary() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;

    try {
        console.log('Before axios request');
        const response = await axios.get(`http://localhost:3000/api/beneficiary/GetAllBeneficiary`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('After axios request', response);

        document.getElementById('result2').innerHTML = `<p>Result of GET /beneficiary/GetAllBeneficiary:</p>
          <pre>${JSON.stringify(response.data[0], null, 2)}</pre>`;

    } catch (error) {
        console.error(`Error during GET /beneficiaryright request:`, error);
        if (error.response) {
            document.getElementById('result2').innerHTML = `<p>Error during GET /beneficiaryright/${number} request:</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result2').innerHTML = `<p>Unexpected error during GET /beneficiaryright request</p>`;
            console.error('Unexpected client-side error:', error.message);
        }
    }
}

async function GetAllCollection() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;

    try {
        console.log('Before axios request');
        const response = await axios.get(`http://localhost:3000/api/collection/GetAllCollection`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('After axios request', response);

        document.getElementById('result2').innerHTML = `<p>Result of GET /beneficiary/GetAllBeneficiary:</p>
          <pre>${JSON.stringify(response.data[0], null, 2)}</pre>`;

    } catch (error) {
        console.error(`Error during GET /beneficiaryright request:`, error);
        if (error.response) {
            document.getElementById('result2').innerHTML = `<p>Error during GET /beneficiaryright/${number} request:</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result2').innerHTML = `<p>Unexpected error during GET /beneficiaryright request</p>`;
            console.error('Unexpected client-side error:', error.message);
        }
    }
}

async function GetAllRight() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;

    try {
        console.log('Before axios request');
        const response = await axios.get(`http://localhost:3000/api/right/GetAllRight`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('After axios request', response);

        document.getElementById('result2').innerHTML = `<p>Result of GET /beneficiaryright:</p>
          <pre>${JSON.stringify(response.data[0], null, 2)}</pre>`;

    } catch (error) {
        console.error(`Error during GET /beneficiaryright request:`, error);
        if (error.response) {
            document.getElementById('result2').innerHTML = `<p>Error during GET /beneficiaryright/${number} request:</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result2').innerHTML = `<p>Unexpected error during GET /beneficiaryright request</p>`;
            console.error('Unexpected client-side error:', error.message);
        }
    }
}


async function GetAllNftByCollectionID() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;
    const number = document.getElementById('number').value;

    try {
        console.log('Before axios request');
        const response = await axios.get(`http://localhost:3000/api/nft/GetAllNft/${number}`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('After axios request', response);

        document.getElementById('result').innerHTML = `<p>Result of GET /beneficiaryright:</p>
          <pre>${JSON.stringify(response.data, null, 2)}</pre>`;

    } catch (error) {
        console.error(`Error during GET /beneficiaryright request:`, error);
        if (error.response) {
            document.getElementById('result').innerHTML = `<p>Error during GET /beneficiaryright/${number} request:</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result').innerHTML = `<p>Unexpected error during GET /beneficiaryright request</p>`;
            console.error('Unexpected client-side error:', error.message);
        }
    }
}

  
  
async function GetCCreator() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;
    const number = document.getElementById('number').value;

    try {
        console.log('Before axios request');
        const response = await axios.get(`http://localhost:3000/api/creator/GetCCreator/${number}`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('After axios request', response);

        document.getElementById('result').innerHTML = `<p>Result of GET /beneficiaryright:</p>
          <pre>${JSON.stringify(response.data, null, 2)}</pre>`;

    } catch (error) {
        console.error(`Error during GET /beneficiaryright request:`, error);
        if (error.response) {
            document.getElementById('result').innerHTML = `<p>Error during GET /beneficiaryright/${number} request:</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result').innerHTML = `<p>Unexpected error during GET /beneficiaryright request</p>`;
            console.error('Unexpected client-side error:', error.message);
        }
    }
}
