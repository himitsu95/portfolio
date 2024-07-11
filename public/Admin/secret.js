document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const welcomeMessage = document.getElementById('welcome-message');
    const userNameSpan = document.getElementById('user-name');
    const loginError = document.getElementById('login-error');

    const savedUser = localStorage.getItem('loggedInUser');

    if (savedUser) {
        loginForm.style.display = 'none';
        welcomeMessage.style.display = 'block';
        userNameSpan.textContent = savedUser;
    }

    window.login = function () {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('loggedInUser', username);
            loginForm.style.display = 'none';
            welcomeMessage.style.display = 'block';
            userNameSpan.textContent = username;
            loginError.textContent = '';
        } else {
            loginError.textContent = 'Invalid username or password';
        }
    };

    window.logout = function () {
        localStorage.removeItem('loggedInUser');
        loginForm.style.display = 'block';
        welcomeMessage.style.display = 'none';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    };
});