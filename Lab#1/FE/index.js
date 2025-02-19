function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee/')
    .then((response) => {
      if(!response.ok){
        throw new Error(response.message);
      }
      return response.json();
    })
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      const id = document.getElementById('id');
      const name = document.getElementById('name');  
      id.value = '';
      name.value = '';
      list.forEach(item => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);



        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.id = item.id;
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', (event) => {

          deleteEmployee(event.target.id);
        });
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      })
    })
    .catch((error) => {
      console.error(error.message);
      alert(error.message);
    })
}



// TODO
// add event listener to delete button


// TODO
function createEmployee (){
  const id = document.getElementById('id');
  const name = document.getElementById('name');  
  fetch('http://localhost:3000/api/v1/employee/', {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({id : id.value, name : name.value }) 
  }).then((response) => {
    if(!response.ok){
      throw new Error(response.message);
    }
    return response.json();
  })
  .then((data) => {
    fetchEmployees();
    alert(data.message);
  }).catch((error) => {
    alert(error.message);
    id.value = '';
    name.value = '';
  });
}

// TODO
function deleteEmployee(id){
  fetch("http://localhost:3000/api/v1/employee/" + id, {
    method : "DELETE",
    headers : {
      "Content-Type" : "application/json"
    }
  })
  .then((response) =>  {return response.json(); })
  .then((data) => {
    fetchEmployees();
    alert(data.message);
  }).catch((error) => {
    alert(error.message);
    console.error(error.message);
  })  
}

// TODO
// add event listener to submit button
const submitButton = document.querySelector(".btn.btn-primary.mt-3");
submitButton.addEventListener('click',(event) => {
  event.preventDefault();
  createEmployee();
});

fetchEmployees();
