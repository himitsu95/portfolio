document.addEventListener('DOMContentLoaded', () => {
    const navList = document.getElementById('nav-list');
    const savedUser = localStorage.getItem('loggedInUser');

    if (savedUser) {
        const logoutItem = document.createElement('li');
        logoutItem.innerHTML = '<a href="#" onclick="logout()">Logout</a>';
        navList.appendChild(logoutItem);
    }
});

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.reload();
}