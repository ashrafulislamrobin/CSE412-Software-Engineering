// === DOM Elements ===
const regSec = document.getElementById('registerSection');
const loginSec = document.getElementById('loginSection');
const portSec = document.getElementById('portfolioSection');

// === Navigation ===
document.getElementById('goLogin').onclick = (e) => { e.preventDefault(); showLogin(); };
document.getElementById('goRegister').onclick = (e) => { e.preventDefault(); showRegister(); };
document.getElementById('logoutBtn').onclick = () => { 
    localStorage.removeItem('currentUser'); 
    showLogin(); 
};

function showRegister() { regSec.style.display = 'block'; loginSec.style.display = 'none'; portSec.style.display = 'none'; }
function showLogin() { loginSec.style.display = 'block'; regSec.style.display = 'none'; portSec.style.display = 'none'; }
function showPortfolio() { portSec.style.display = 'block'; loginSec.style.display = 'none'; regSec.style.display = 'none'; }

// === Register ===
document.getElementById('registerForm').onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPassword').value;

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        alert('This email is already registered!');
        return;
    }
    users.push({ email, pass, portfolio: {} });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered! Now login.');
    showLogin();
};

// === Login ===
document.getElementById('loginForm').onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.pass === pass);

    if (user) {
        localStorage.setItem('currentUser', email);
        loadPortfolio(user.portfolio);
        showPortfolio();
    } else {
        alert('Wrong email or password!');
    }
};

// === Auto Save on Input ===
document.getElementById('portfolioForm').addEventListener('input', savePortfolio);
document.getElementById('saveBtn').onclick = () => { savePortfolio(); alert('Saved!'); };

function savePortfolio() {
    const email = localStorage.getItem('currentUser');
    if (!email) return;

    const data = getFormData();

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    if (user) {
        user.portfolio = data;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function getFormData() {
    return {
        fullName: get('fullName'),
        contact: get('contact'),
        photo: document.getElementById('photoPreview').src || '',
        bio: get('bio'),
        softSkills: get('softSkills'),
        technicalSkills: get('technicalSkills'),
        institute: get('institute'),
        degree: get('degree'),
        year: get('year'),
        grade: get('grade'),
        company: get('company'),
        duration: get('duration'),
        responsibilities: get('responsibilities'),
        projects: get('projects')
    };
}

function get(id) { return document.getElementById(id).value; }

// === Load Saved Data ===
function loadPortfolio(data) {
    set('fullName', data.fullName || '');
    set('contact', data.contact || '');
    set('bio', data.bio || '');
    set('softSkills', data.softSkills || '');
    set('technicalSkills', data.technicalSkills || '');
    set('institute', data.institute || '');
    set('degree', data.degree || '');
    set('year', data.year || '');
    set('grade', data.grade || '');
    set('company', data.company || '');
    set('duration', data.duration || '');
    set('responsibilities', data.responsibilities || '');
    set('projects', data.projects || '');
    if (data.photo) {
        const img = document.getElementById('photoPreview');
        img.src = data.photo;
        img.style.display = 'block';
    }
}
function set(id, val) { document.getElementById(id).value = val; }

// === Photo Preview ===
function previewImage(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('photoPreview');
    const reader = new FileReader();
    reader.onload = (ev) => {
        preview.src = ev.target.result;
        preview.style.display = 'block';
        savePortfolio();
    };
    reader.readAsDataURL(file);
}

// === Start App ===
const current = localStorage.getItem('currentUser');
if (current) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === current);
    if (user) { loadPortfolio(user.portfolio); showPortfolio(); }
    else showLogin();
} else {
    showRegister();
}
