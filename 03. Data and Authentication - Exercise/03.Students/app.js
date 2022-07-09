async function app() {
    const tbody = document.querySelector('tbody');
    document.querySelector('form').addEventListener('submit', onSubmit);
    tbody.innerHTML = '';

    const url = 'http://localhost:3030/jsonstore/collections/students';

    const students = await request(url, 'get');
    const studentsAsArray = Object.values(students);

    studentsAsArray.map(showStudents);

    function showStudents(student) {
        const tr = document.createElement('tr');
        const firstName = document.createElement('td');
        const lastName = document.createElement('td');
        const facultyNumber = document.createElement('td');
        const grade = document.createElement('td');

        firstName.textContent = student.firstName;
        tr.appendChild(firstName);

        lastName.textContent = student.lastName;
        tr.appendChild(lastName);

        facultyNumber.textContent = student.facultyNumber;
        tr.appendChild(facultyNumber);

        grade.textContent = student.grade;
        tr.appendChild(grade);

        tbody.appendChild(tr);
    };

    async function onSubmit(event) {
        event.preventDefault();

        request(url, 'post', event);
    }

    async function request(url, method, event) {
        try {
            if (method == 'get') {
                const response = await fetch(url);

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }

                const data = await response.json();

                return data;
            } else if (method == 'post') {
                const formData = new FormData(event.target);

                const firstName = formData.get('firstName');
                const lastName = formData.get('lastName');
                const facultyNumber = formData.get('facultyNumber');
                const grade = formData.get('grade');

                if (!firstName || !lastName || !facultyNumber || !grade) {
                    throw new Error('All fields are required!');
                }

                const student = {
                    firstName,
                    lastName,
                    facultyNumber,
                    grade
                };

                const response = await fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(student)
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }

                event.target.querySelector('input[name="firstName"]').value = '';
                event.target.querySelector('input[name="lastName"]').value = '';
                event.target.querySelector('input[name="facultyNumber"]').value = '';
                event.target.querySelector('input[name="grade"]').value = '';

                app();
            }

        } catch (error) {
            alert(error.message);
        }
    }
}

window.onload = app();