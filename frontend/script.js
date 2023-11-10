async function getRights() {
  const keypub = document.getElementById('keypub').value;
  const keyprv = document.getElementById('keyprv').value;
  const actor = document.getElementById('actor').value;

  try {
    console.log('Avant la requête axios');
    const response = await axios.get(`http://localhost:3000/api/beneficiaryright/2`, {
      headers: {
        'x-actor': actor,
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });
    console.log('Après la requête axios', response);

    document.getElementById('result').innerHTML = `<p>Résultat de la requête GET /beneficiaryright/2 :</p>
      <pre>${JSON.stringify(response.data, null, 2)}</pre>`;
  } catch (error) {
    console.error('Erreur lors de la requête GET /beneficiaryright/2 :', error);
    if (error.response) {
      document.getElementById('result').innerHTML = `<p>Erreur lors de la requête GET /beneficiaryright/2 :</p>
        <pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
    } else {
      document.getElementById('result').innerHTML = `<p>Erreur inattendue lors de la requête GET /beneficiaryright/2</p>`;
      console.error('Erreur inattendue côté client :', error.message);
    }
  }
}