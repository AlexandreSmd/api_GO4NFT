document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('collection-form');
    const response = document.getElementById('response');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const symbol = document.getElementById('symbol').value;
        const numberOfNFT = parseInt(document.getElementById('numberOfNFT').value);

        // Remplacez ces valeurs par celles que vous avez réellement
        const keypub = '123';
        const keyprv = '123';

        const requestBody = {
            Collection_Name: name,
            Collection_Symbol: symbol,
            Collection_NumberOfNFT: numberOfNFT,
            // Ajoutez d'autres données nécessaires ici
        };

        try {
            const response = await fetch('http://localhost:3000/api/collection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-actor': 'CREATOR',
                    'x-keypub': keypub,
                    'x-keyprv': keyprv,
                },
                body: JSON.stringify(requestBody),
            });

            if (response.status === 201) {
                const data = await response.json();
                showMessage(`Collection créée avec succès : ${data.message}`);
            } else {
                const data = await response.json();
                showMessage(`Erreur : ${data.error}`);
            }
        } catch (error) {
            showMessage(`Erreur lors de la requête : ${error.message}`);
        }
    });

    function showMessage(message) {
        response.innerHTML = message;
    }
});
