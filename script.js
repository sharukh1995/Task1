document.addEventListener('DOMContentLoaded', function () {
    const addRowBtn = document.getElementById('addRowBtn');
    const saveDataBtn = document.getElementById('saveDataBtn');
    const addCustomColumnBtn = document.getElementById('addCustomColumnBtn');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

    // Function to add a new row
    addRowBtn.addEventListener('click', function () {
        const newRow = userTable.insertRow();
        newRow.innerHTML = `
            <td class="name"><input type="text" placeholder="Enter Name"></td>
            <td class="nickname"><input type="text" placeholder="Enter Nickname"></td>
            <td class="mobile"><input type="text" placeholder="Enter Mobile"></td>
            <td class="email"><input type="text" placeholder="Enter Email"></td>
            <td class="role"><input type="text" placeholder="Enter Role"></td>
            <td class="address"><input type="text" placeholder="Enter Address"></td>
            <td class="gender"><input type="text" placeholder="Enter Gender"></td>
            <td class="profile_image"><input type="text" placeholder="Enter Profile Image"></td>
            <td><button class="deleteRowBtn">Delete</button></td>
        `;
        newRow.querySelector('.deleteRowBtn').addEventListener('click', function () {
            this.closest('tr').remove();
        });
    });

    // Function to toggle column visibility
    document.querySelectorAll('.column-toggle').forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const columnClass = this.getAttribute('data-column');
            document.querySelectorAll('.' + columnClass).forEach(function (cell) {
                cell.style.display = checkbox.checked ? '' : 'none';
            });
        });
    });

    // Function to add custom column
    addCustomColumnBtn.addEventListener('click', function () {
        const columnName = prompt('Enter column name:');
        if (columnName) {
            const headerCell = document.createElement('th');
            headerCell.className = columnName.toLowerCase();
            headerCell.textContent = columnName;
            document.querySelector('#userTable thead tr').insertBefore(headerCell, document.querySelector('#userTable thead tr').lastChild);

            [...userTable.rows].forEach(row => {
                const td = document.createElement('td');
                td.className = columnName.toLowerCase();
                td.innerHTML = `<input type="text" placeholder="Enter ${columnName}">`;
                row.insertBefore(td, row.lastChild);
            });
        }
    });

    // Function to save data
    saveDataBtn.addEventListener('click', function () {
        const rows = [...userTable.rows];
        const data = rows.map(row => {
            const cells = [...row.cells];
            return {
                'Name': cells[0].querySelector('input').value,
                'Nickname': cells[1].querySelector('input').value,
                'Mobile': cells[2].querySelector('input').value,
                'Email': cells[3].querySelector('input').value,
                'Role': cells[4].querySelector('input').value,
                'Address': cells[5].querySelector('input').value,
                'Gender': cells[6].querySelector('input').value,
                'Profile Image': cells[7].querySelector('input').value
            };
        });

        fetch('save_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.text())
            .then(response => {
                alert('Data saved successfully!');
            });
    });

    // Attach delete event to existing row
    document.querySelectorAll('.deleteRowBtn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            this.closest('tr').remove();
        });
    });
});
