document.addEventListener('DOMContentLoaded', function() {
    function saveData(event) {
        const nameElement = document.getElementById('name');
        const emailElement = document.getElementById('email');

        if (!nameElement || !emailElement) {
            console.error('Elementos não encontrados');
            return;
        }

        

        const name = nameElement.value;
        const email = emailElement.value;
        const now = new Date().toLocaleString();

        if (name && email) {
            const user = {
                name: name,
                email: email,
                date: now
            };

            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            displayUsers();  
            clearForm(); 
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    }

    function displayUsers(usersToDisplay) {
        const users = usersToDisplay || JSON.parse(localStorage.getItem('users')) || [];
        const usersDiv = document.getElementById('users');
        usersDiv.innerHTML = '';

        

        users.forEach((user, index) => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user-item';
            userDiv.innerHTML = `
                <strong>Nome:</strong> ${user.name} <br>
                <strong>Email:</strong> ${user.email} <br>
                <strong>Data e Hora:</strong> ${user.date} <br>
                <button class="delete-button" data-index="${index}">Excluir</button>
            `;
            usersDiv.appendChild(userDiv);
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', deleteUser);
        });
    }

    function deleteUser(event) {
        const index = event.target.getAttribute('data-index');
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    }

    function clearForm() {
        const nameElement = document.getElementById('name');
        const emailElement = document.getElementById('email');
        
        if (nameElement && emailElement) {
            nameElement.value = '';
            emailElement.value = '';
        } else {
            console.error('Elementos do formulário não encontrados');
        }
    }

    function clearStorage() {
        localStorage.removeItem('users');
        displayUsers(); 
    }

    displayUsers();

    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        saveButton.addEventListener('click', saveData);
    } else {
        console.error('Botão de salvar não encontrado');
    }

    const clearFormButton = document.getElementById('clearFormButton');
    if (clearFormButton) {
        clearFormButton.addEventListener('click', clearForm);
    } else {
        console.error('Botão de limpar formulário não encontrado');
    }
   
    const clearStorageButton = document.getElementById('clearStorageButton');
    if (clearStorageButton) {
        clearStorageButton.addEventListener('click', clearStorage);
    } else {
        console.error('Botão de limpar local storage não encontrado');
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm === '') {
                displayUsers(); 
            } else {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const filteredUsers = users.filter(user => {
                    return user.name.toLowerCase().includes(searchTerm) ||
                           user.email.toLowerCase().includes(searchTerm);
                });
                displayUsers(filteredUsers);
            }
        });
    } else {
        console.error('Campo de pesquisa não encontrado');
    }

});
