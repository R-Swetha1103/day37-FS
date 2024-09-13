const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const folderPath = path.join(__dirname, 'files');
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

app.post('/create-file', (req, res) => {
    const timestamp = new Date().toISOString();
    const filename = `${new Date().toISOString().replace(/:/g, '-')}.txt`; 
    const filePath = path.join(folderPath, filename);

    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            return res.status(500).send('Error creating file');
        }
        res.send(`File created: ${filename}`);
    });
});

app.get('/list-files', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading files');
        }
        const textFiles = files.filter(file => file.endsWith('.txt'));
        res.json(textFiles);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
