const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const jsonPath = path.join(__dirname, 'data', 'schreiben.json');

// Middleware für das Parsen von JSON und URL-codierten Daten
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Statische Dateien (HTML, CSS, JS, Bilder)
app.use(express.static(path.join(__dirname, 'frontend')));

// Route für das Speichern der Formulardaten
app.post('/entries', (req, res) => {
    const newData = {
        question: req.body.question,
        answer: req.body.answer
    };

    fs.readJson(jsonPath)
        .then(data => {
            data.push(newData);
            return fs.writeJson(jsonPath, data);
        })
        .then(() => {
            res.status(200).json({ message: 'Eintrag hinzugefügt' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Fehler beim Hinzufügen des Eintrags' });
        });
});

// Route für das Abrufen aller Einträge
app.get('/entries', (req, res) => {
    fs.readJson(jsonPath)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Fehler beim Abrufen der Einträge' });
        });
});

// Route für das Löschen eines bestimmten Eintrags
app.delete('/entries/:question', (req, res) => {
    const questionToDelete = req.params.question;

    fs.readJson(jsonPath)
        .then(data => {
            const updatedData = data.filter(entry => entry.question !== questionToDelete);
            return fs.writeJson(jsonPath, updatedData);
        })
        .then(() => {
            res.status(200).json({ message: 'Eintrag gelöscht' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Fehler beim Löschen des Eintrags' });
        });
});

// Route für die Wurzel-URL (schreiben.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'schreiben.html'));
});

// Starten Sie den Server
app.listen(PORT, () => {
    console.log(`Server läuft unter http://localhost:${PORT}`);
});
