
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
