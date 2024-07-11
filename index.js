const express = require('express');
const path = require('path');
const app = express();

// Redirect root URL to index.html
app.get('/', (req, res) => {
    res.redirect('/home');
});

// Middleware to remove .html extension from URLs
app.use((req, res, next) => {
    if (req.path.endsWith('/')) {
        req.url = req.url.slice(0, -1) + '.html';
    } else if (!req.path.includes('.') && req.path !== '/') {
        req.url += '.html';
    }
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Log requests
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
