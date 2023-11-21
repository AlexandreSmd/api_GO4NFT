
function showButtons() {
    const actor = document.getElementById('actor').value;

    // Masquer tous les boutons et le champ de saisie
    document.getElementById('Button_GetRights').style.display = 'none';
    document.getElementById('adminButton_GetAllCreator').style.display = 'none';
    document.getElementById('Button_GetEthAdress').style.display = 'none';
    document.getElementById('Button_GetAllCreatorName').style.display = 'none';
    document.getElementById('numberLabel').style.display = 'none';
    document.getElementById('number').style.display = 'none';

    // Afficher le bouton approprié en fonction de l'acteur sélectionné
    switch (actor) {
        case 'CREATOR':
            document.getElementById('Button_GetRights').style.display = 'block';
            document.getElementById('Button_GetEthAdress').style.display = 'block';
            document.getElementById('Button_GetCreatorNameWithId').style.display = 'block';
            document.getElementById('Button_GetAllCreatorName').style.display = 'block';
            break;
        case 'ADMINISTRATOR':
            document.getElementById('Button_GetRights').style.display = 'block';
            document.getElementById('Button_GetEthAdress').style.display = 'block';
            document.getElementById('Button_GetCreatorNameWithId').style.display = 'block';
            document.getElementById('Button_GetAllCreatorName').style.display = 'block';

            document.getElementById('adminButton_GetAllCreator').style.display = 'block';

            break;
        case 'BENEFICIARY':
            document.getElementById('Button_GetRights').style.display = 'block';
            document.getElementById('Button_GetEthAdress').style.display = 'block';
            document.getElementById('Button_GetCreatorNameWithId').style.display = 'block';
            document.getElementById('Button_GetAllCreatorName').style.display = 'block';
            break;
    }

    // Afficher le champ de saisie uniquement si l'acteur est sélectionné
    if (actor !== '') {
        document.getElementById('numberLabel').style.display = 'block';
        document.getElementById('number').style.display = 'block';
    }
}

  
  // Fonction pour donner des droits selon l'ID du bénéficaire
  async function getRights() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;
    const number = document.getElementById('number').value; // Récupérer la valeur de l'input number
  
    try {
        console.log('Avant la requête axios');
        const response = await axios.get(`http://localhost:3000/api/beneficiary/GetBeneficiaryRight/${number}`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('Après la requête axios', response);
  
        document.getElementById('result').innerHTML = `<p>Résultat de la requête GET /beneficiaryright :</p>
          <pre>${JSON.stringify(response.data, null, 2)}</pre>`;
  
    } catch (error) {
        console.error(`Erreur lors de la requête GET /beneficiaryright/${number} :`, error);
        if (error.response) {
            document.getElementById('result').innerHTML = `<p>Erreur lors de la requête GET /beneficiaryright/${number} :</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result').innerHTML = `<p>Erreur inattendue lors de la requête GET /beneficiaryright/${number}</p>`;
            console.error('Erreur inattendue côté client :', error.message);
        }
    }
  }


  
  // Fonction pour donner des droits selon l'ID du bénéficaire
  async function getAllCreator() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;
  
    try {
        console.log('Avant la requête axios');
        const response = await axios.get(`http://localhost:3000/api/creator/GetAllCreator`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('Après la requête axios', response);
  
        document.getElementById('result2').innerHTML = `<p>Résultat de la requête GET /beneficiaryright :</p>
          <pre>${JSON.stringify(response.data, null, 2)}</pre>`;
  
    } catch (error) {
        console.error(`Erreur lors de la requête GET /beneficiaryright :`, error);
        if (error.response) {
            document.getElementById('result2').innerHTML = `<p>Erreur lors de la requête GET /beneficiaryright/${number} :</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result2').innerHTML = `<p>Erreur inattendue lors de la requête GET /beneficiaryright</p>`;
            console.error('Erreur inattendue côté client :', error.message);
        }
    }
  }

// Fonction pour donner des droits selon l'ID du bénéficaire
async function getEthAdress() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;
    const number = document.getElementById('number').value;
  
    try {
        console.log('Avant la requête axios');
        const response = await axios.get(`http://localhost:3000/api/beneficiary/GetEthAddressOfBeneficiary/${number}`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('Après la requête axios', response);
  
        document.getElementById('result').innerHTML = `<p>Résultat de la requête GET /beneficiaryright :</p>
          <pre>${JSON.stringify(response.data, null, 2)}</pre>`;
  
    } catch (error) {
        console.error(`Erreur lors de la requête GET /beneficiaryright :`, error);
        if (error.response) {
            document.getElementById('result').innerHTML = `<p>Erreur lors de la requête GET /beneficiaryright/${number} :</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result').innerHTML = `<p>Erreur inattendue lors de la requête GET /beneficiaryright</p>`;
            console.error('Erreur inattendue côté client :', error.message);
        }
    }
  }


  // Fonction pour donner des droits selon l'ID du bénéficaire
async function GetCreatorNameWithId() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;
    const number = document.getElementById('number').value;
  
    try {
        console.log('Avant la requête axios');
        const response = await axios.get(`http://localhost:3000/api/creator/GetCreatorNameWithId/${number}`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('Après la requête axios', response);
  
        document.getElementById('result').innerHTML = `<p>Résultat de la requête GET /beneficiaryright :</p>
          <pre>${JSON.stringify(response.data, null, 2)}</pre>`;
  
    } catch (error) {
        console.error(`Erreur lors de la requête GET /beneficiaryright :`, error);
        if (error.response) {
            document.getElementById('result').innerHTML = `<p>Erreur lors de la requête GET /beneficiaryright/${number} :</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result').innerHTML = `<p>Erreur inattendue lors de la requête GET /beneficiaryright</p>`;
            console.error('Erreur inattendue côté client :', error.message);
        }
    }
  }


  

  // Fonction pour donner des droits selon l'ID du bénéficaire
async function GetAllCreatorName() {
    const keypub = document.getElementById('keypub').value;
    const keyprv = document.getElementById('keyprv').value;
    const actor = document.getElementById('actor').value;
  
    try {
        console.log('Avant la requête axios');
        const response = await axios.get(`http://localhost:3000/api/creator/GetAllCreatorName`, {
            headers: {
                'x-actor': actor,
                'x-keypub': keypub,
                'x-keyprv': keyprv,
            },
        });
        console.log('Après la requête axios', response);
  
        document.getElementById('result2').innerHTML = `<p>Résultat de la requête GET /beneficiaryright :</p>
          <pre>${JSON.stringify(response.data, null, 2)}</pre>`;
  
    } catch (error) {
        console.error(`Erreur lors de la requête GET /beneficiaryright :`, error);
        if (error.response) {
            document.getElementById('result2').innerHTML = `<p>Erreur lors de la requête GET /beneficiaryright/${number} :</p>
            <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
        } else {
            document.getElementById('result2').innerHTML = `<p>Erreur inattendue lors de la requête GET /beneficiaryright</p>`;
            console.error('Erreur inattendue côté client :', error.message);
        }
    }
  }


async function sendEth() {
    const web3 = new Web3(ethereum);

    const creatorId = document.getElementById('creatorId').value;
    const targetAddress = '0x3e0CaBAac78d2c9Cc88A8D374E2141ae953B4B9A';
    const amountToSend = web3.utils.toWei('0.00001', 'ether');

    try {
        // Demander à MetaMask l'autorisation
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const fromAddress = accounts[0];

        // Construire la transaction
        const transactionParameters = {
            from: fromAddress,
            to: targetAddress,
            value: amountToSend,
        };

        // Envoyer la transaction
        const transactionHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        // Attendre la confirmation de la transaction
        await waitForTransactionConfirmation(transactionHash);

        // Une fois la transaction confirmée, créditer le compteur C
        await creditCounterC(creatorId);

        document.getElementById('result3').innerHTML = `<p>Transaction réussie !</p>`;
    } catch (error) {
        console.error('Erreur lors de la transaction :', error);
        document.getElementById('result3').innerHTML = `<p>Erreur lors de la transaction : ${error.message}</p>`;
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
    // Vous devez implémenter la logique pour créditer le compteur C côté serveur
    // Utilisez une requête Axios pour appeler l'API qui gère cela
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

        console.log('Réponse du serveur :', response.data);
    } catch (error) {
        console.error('Erreur lors du crédit du compteur C :', error);
    }
}
