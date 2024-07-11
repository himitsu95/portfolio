const form = document.getElementById('contact-form');
const sendButton = document.querySelector('button[type="submit"]');
const submitBtn = document.getElementById('submit-btn');
const loadingIcon = document.getElementById('loading-icon');

form.addEventListener('input', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const jobTitleRadios = document.getElementsByName('jobtitle');
    let jobTitleSelected = false;
    for (const radio of jobTitleRadios) {
        if (radio.checked) {
            jobTitleSelected = true;
            break;
        }
    }
    const message = document.getElementById('message').value;

    if (name && email && phone && jobTitleSelected && message) {
        if (!(name && email && phone && jobTitleRadios && message)) {
            alert('Please fill out all fields before submitting the form.');
            return;
        }
        sendButton.disabled = false;
    } else {
        sendButton.disabled = true;
    }
});

document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    submitBtn.classList.add('loading'); // add the loading class to the button
    loadingIcon.style.display = 'inline-block'; // show the loading icon

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const jobTitleRadios = document.getElementsByName('jobtitle');
    const timestamp = new Date().toISOString();

    let jobTitle;
    for (const radio of jobTitleRadios) {
        if (radio.checked) {
            jobTitle = radio.value;
            break;
        }
    }

    const message = document.getElementById('message').value;
    if (!(name && email && jobTitle && message)) {
        alert('Please fill out all fields before submitting the form.');
        return;
    }
    // Base64 encoded
    const encode = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTI1OTg2MDE0Mzg2MTAxMDUyMi9lZ2Q4VDlPM2h1ckoyeWd4QnJaZHJnSGhvaTlYczZuMENCTXJiM1lQTHpvXzB0NVRtS1g0UjZvbTYtN1pZMllpZ1VzZA==';
    const URL = atob(encode);

    const payload = {
        content: `**New Contact Form Submission**
**Name:** ${name}
**Email:** ${email}
**Phone:** ${phone}
**What are you looking for?:** ${jobTitle}
**Message:** ${message}
**Timestamp:** ${timestamp}`
    };

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(data => {
            submitBtn.classList.remove('loading');
            loadingIcon.style.display = 'none';
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        })
        .catch(error => {
            submitBtn.classList.remove('loading');
            loadingIcon.style.display = 'none';
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error!';
        });
});


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