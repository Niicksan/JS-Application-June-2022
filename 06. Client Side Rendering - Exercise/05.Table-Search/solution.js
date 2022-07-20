import { html, render } from './node_modules/lit-html/lit-html.js';
import { repeat } from './node_modules/lit-html/directives/repeat.js';
import { get } from './api.js';

const tbody = document.querySelector('tbody');

const studentsTemplate = (students) => html`
   ${repeat(students, s => s._id, studentList)}
`;

const studentList = (student) => html`
<tr>
   <td>${student.firstName} ${student.lastName}</td>
   <td>${student.email}</td>
   <td>${student.course}</td>
</tr>
`;

async function getAllStudents() {
   const students = Object.values(await get());

   render(studentsTemplate(students), tbody);
}

function solve() {
   getAllStudents()
   document.getElementById('searchBtn').addEventListener('click', onClick);

   function onClick() {
      let input = document.getElementById('searchField');
      let rows = document.querySelectorAll('tbody tr');

      for (let row of rows) {
         row.classList.remove('select');

         if (input.value !== '' && row.innerHTML.toLowerCase().includes(input.value.toLowerCase())) {
            row.classList.add('select');
         }
      }

      input.value = '';
   }
}

document.onload = solve();