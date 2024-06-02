document.addEventListener('DOMContentLoaded', async function() {
    const userDetails = localStorage.getItem('userDetails');
    const userInfoElement = document.getElementById('user-info');
    const vehicleTableBody = document.querySelector('#vehicleTable tbody');
    const vehicleForm = document.getElementById('vehicleForm');
    const submitButton = document.getElementById('submitButton');
    const user = userDetails?.userInfo;
    
    if (!userDetails.check) {
        window.location.href = 'index.html';
        return;
    }

    userInfoElement.textContent = `Logged in as: ${user.userId} (${user.accessProfile})`;

    // Fetch and display vehicles
    try {
        const response = await fetch('http://localhost:3000/api/vehicles', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const vehicles = await response.json();
        
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

    vehicleForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const vin = document.getElementById('vin').value;
        const make = document.getElementById('make').value;
        const model = document.getElementById('model').value;
        const year = document.getElementById('year').value;
        const owner = document.getElementById('owner').value;
        const estimation = document.getElementById('estimation').value;
        const status = document.getElementById('status').value;

        const vehicleData = { vin, make, model, year, owner, estimation, status };
        console.log(vehicalData)
        try {
            await fetch(`http://localhost:3000/api/vehicles/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehicleData)
            });
            alert('Vehicle added successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error updating vehicle:', error);
        }
    });

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

});
