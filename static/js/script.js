const buttonVcod = document.getElementById('vcod');

// Функция для показа/скрытия пароля
function show_hide_password(target) {
    const input = document.getElementById('password-input');
    if (input.getAttribute('type') === 'password') {
        target.classList.add('view');
        input.setAttribute('type', 'text');
    } else {
        target.classList.remove('view');
        input.setAttribute('type', 'password');
    }
    return false;
}

// Обработчик кнопки "Войти"
buttonVcod.addEventListener('click', function() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password-input').value;
    console.log('Логин:', login, 'Пароль:', password);
    
    Proverca(login, password);
});

function Proverca(login, password) {
    if (!login || !password) {
        alert('Логин и пароль не могут быть пустыми!');
        return false;
    }
    console.log('Проверка прошла');
    return true;
}