document.addEventListener('DOMContentLoaded', function() {
    // Eventlistener für den Hinzufügen-Button
    document.querySelector('#qa-form button[type="button"]').addEventListener('click', function(event) {
        event.preventDefault(); // Standardverhalten des Buttons verhindern
        addQA(); // Funktion zum Hinzufügen der Fragen und Antworten aufrufen
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Beim Laden der Seite die Tabelle initialisieren
    updateTable();
});

// Funktion zum Hinzufügen eines Eintrags
function addQA() {
    var question = document.getElementById('question').value.trim();
    var answer = document.getElementById('answer').value.trim();

    if (question === '' || answer === '') {
        alert('Bitte füllen Sie sowohl Frage als auch Antwort aus.');
        return;
    }

    fetch('/entries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Response:', data);
        updateTable(); // Tabelle nach dem Hinzufügen aktualisieren
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    });

    document.getElementById('question').value = '';
    document.getElementById('answer').value = '';
}

// Funktion zum Aktualisieren der Tabelle mit den gespeicherten Einträgen
function updateTable() {
    fetch('/entries')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(entries => {
        var tableBody = document.getElementById('qa-body');
        tableBody.innerHTML = '';

        entries.forEach(entry => {
            var newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td class="mdl-data-table__cell--non-numeric">${entry.question}</td>
                <td class="mdl-data-table__cell--non-numeric">${entry.answer}</td>
                <td class="mdl-data-table__cell--non-numeric">
                    <button class="heart-button" onclick="deleteQA('${entry.question}')">Löschen</button>
                </td>
            `;
            tableBody.appendChild(newRow);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    });
}

// Funktion zum Löschen eines Eintrags
function deleteQA(question) {
    if (confirm('Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?')) {
        fetch(`/entries/${encodeURIComponent(question)}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response:', data);
            updateTable(); // Tabelle nach dem Löschen aktualisieren
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
        });
    }
}
