// Flags
let loginSectionhidden = false;
let token = null;
let user = null;
// login button
document.getElementById('login-btn').addEventListener('click', function() {
    if(loginSectionhidden){
        document.getElementById('login-section').classList.add('hidden');
        loginSectionhidden = false;
    }else{
        document.getElementById('login-section').classList.remove('hidden');
        loginSectionhidden = true;
    }
   
});


//Add Job Form
document.getElementById('addJob-btn').addEventListener('click', function() {
    document.getElementById('vehicleForm-section').classList.remove('hidden');
});
document.getElementById('cancelNewJob').addEventListener('click', function() {
    document.getElementById('vehicleForm-section').classList.add('hidden');
});

// login form 
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('userDetails', data);
            token = data['token'];
            user = data['userInfo']
            document.getElementById('login-btn').classList.add('hidden');
            document.getElementById('login-section').classList.add('hidden');
            document.getElementById('dashboard-section').classList.remove('hidden');
            document.getElementById('addJob-btn').classList.remove('hidden');
            if(user.accessProfile === 'admin') document.getElementById('addUser-btn').classList.remove('hidden');
            fetchVehicalData(token);
        } else {
            messageElement.textContent = data.message || 'Login failed';
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.textContent = 'An error occurred. Please try again.';
    }
});

// fetch vehicle data
async function fetchVehicalData(token){
    const vehicleTableBody = document.getElementById('table-body');
    const vehicleCountBody = document.getElementById('count');
    try {
        const response = await fetch('http://localhost:3000/api/vehicles', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const vehicles = await response.json();
        console.log(vehicles)
        vehicles.forEach(vehicle => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vehicle.vin}</td>
                <td>${vehicle.make}</td>
                <td>${vehicle.model}</td>
                <td>${vehicle.year}</td>
                <td>${vehicle.owner}</td>
                <td>${vehicle.estimation}</td>
                <td>${vehicle.status}</td>
                <td>
                    <button class="editButton" data-vin="${vehicle.vin}" ${user.accessProfile !== 'admin' && user.accessProfile !== 'host' ? 'style="display:none"' : ''}>Edit</button>
                    <button class="updateStatusButton" data-vin="${vehicle.vin}">Update Status</button>
                </td>
            `;
            vehicleTableBody.appendChild(row);
        });
        vehicleCountBody.innerHTML = vehicles.length;
        document.querySelectorAll('.editButton').forEach(button => {
            button.addEventListener('click', function() {
                const vin = button.dataset.vin;
                fillForm(vin, true);
            });
        });

        document.querySelectorAll('.updateStatusButton').forEach(button => {
            button.addEventListener('click', function() {
                const vin = button.dataset.vin;
                fillForm(vin, false);
            });
        });
    } catch (error) {
        console.error('Error fetching vehicles:', error);
    }
}

// polupating the Form
async function fillForm(vin, isEditMode) {
    try {
        const response = await fetch(`http://localhost:3000/api/vehicles/${vin}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const vehicle = await response.json();

        document.getElementById('vin').value = vehicle.vin;
        document.getElementById('make').value = vehicle.make;
        document.getElementById('model').value = vehicle.model;
        document.getElementById('year').value = vehicle.year;
        document.getElementById('owner').value = vehicle.owner;
        document.getElementById('estimation').value = vehicle.estimation;
        document.getElementById('status').value = vehicle.status;

        document.getElementById('make').disabled = !isEditMode;
        document.getElementById('model').disabled = !isEditMode;
        document.getElementById('year').disabled = !isEditMode;
        document.getElementById('owner').disabled = !isEditMode;
        document.getElementById('estimation').disabled = !isEditMode;
        document.getElementById('status').disabled = false;
    } catch (error) {
        console.error('Error fetching vehicle details:', error);
    }
}



// init
// fetchVehicalData();