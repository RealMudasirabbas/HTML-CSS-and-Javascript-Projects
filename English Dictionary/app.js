document.addEventListener('DOMContentLoaded', () => {
    const inputWord = document.querySelector('#search');
    const searchForm = document.querySelector('#searchForm');
    const wordsList = document.querySelector('#words');

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const searchWord = inputWord.value;
        const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`;

        try {
            const response = await fetch(apiUrl);

            if (response.ok) {
                const data = await response.json();

                // Clear previous results
                wordsList.innerHTML = '';

                if (data && data.length > 0) {
                    const meaning = data[0].meanings[0].definitions[0].definition;

                    // Update the DOM with the word meaning
                    const listItem = document.createElement('li');
                    listItem.textContent = meaning;
                    wordsList.appendChild(listItem);
                } else {
                    // No definitions found
                    const listItem = document.createElement('li');
                    listItem.textContent = 'No definitions found.';
                    wordsList.appendChild(listItem);
                }
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    });
});
