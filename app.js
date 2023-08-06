function resetInput(){
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('address').value = '';
    document.getElementById('hobbies').value = '';
}
function newInfo(){
    document.getElementById('save').style.display ='inline-block';
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('update').style.display = 'none';

}
function validateInput(){
    let formElement = document.querySelector('.form');
    let inputElement = formElement.querySelectorAll('.form-input');
    for (let i = 0; i < inputElement.length; i++) {
        if(inputElement[i].value === '')
            inputElement[i].parentElement.querySelector('.error-message').innerText = `Please enter your ${inputElement[i].id}`;
        else
        inputElement[i].parentElement.querySelector('.error-message').innerText = ``;
    }
}
function addNew(){
    validateInput();
    let formElement = document.querySelector('.form');
    let errorElement = formElement.querySelectorAll('.error-message');
    let arrErrorElement = [];
    for (let i = 0; i < errorElement.length; i++) {
        arrErrorElement.push(errorElement[i].innerText);
    }
    let checkElement = arrErrorElement.every((value)=>{
        return value === '';
    })
    if(checkElement){
        let name = document.getElementById('name').value;
        let age = document.getElementById('age').value;
        let address = document.getElementById('address').value;
        let hobbies = document.getElementById('hobbies').value;
        // kiểm tra xem có trong localStorage chưa
        let listInfor = localStorage.getItem('list-infor') ? JSON.parse(localStorage.getItem('list-infor')):[];
        listInfor.push({
            name:name,
            age:age,
            address:address,
            hobbies:hobbies
        })
        localStorage.setItem('list-infor',JSON.stringify(listInfor));
        document.getElementById('modal').style.display = 'none';
        renderInfo();
        resetInput();
    }
}

function renderInfo(){
    let listInfor = localStorage.getItem('list-infor') ? JSON.parse(localStorage.getItem('list-infor')):[];
    let infor = `<tr> 
        <th>Tên</th> 
        <th>Tuổi</th> 
        <th>Địa chỉ</th> 
        <th>Sở thích</th>
    </tr>`
    listInfor.map((value,index)=>{
        infor += `<tr> 
            <td>${value.name}</td> 
            <td>${value.age}</td> 
            <td>${value.address}</td> 
            <td>${value.hobbies}</td>
            <td>
                <button onclick="editInfor(${index})">Edit</button>
                <button onclick="deleteInfo(${index})">X</button>
            </td>
        </tr>`
    })
    document.getElementById('tableContent').innerHTML = infor;
}

function editInfor(index){
    let listInfor = localStorage.getItem('list-infor') ? JSON.parse(localStorage.getItem('list-infor')):[];
    document.getElementById('name').value = listInfor[index].name;
    document.getElementById('age').value = listInfor[index].age;
    document.getElementById('address').value = listInfor[index].address;
    document.getElementById('hobbies').value = listInfor[index].hobbies;
    document.getElementById('index').value = index;
    
    document.getElementById('save').style.display ='none';
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('update').style.display = 'inline-block';
}

function changeStudent(){
    let listInfor = localStorage.getItem('list-infor') ? JSON.parse(localStorage.getItem('list-infor')):[];
    let index = document.getElementById('index').value;
    listInfor[index] = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        address: document.getElementById('address').value,
        hobbies: document.getElementById('hobbies').value
    }
    localStorage.setItem('list-infor',JSON.stringify(listInfor));
    document.getElementById('save').style.display ='inline-block';
    document.getElementById('modal').style.display = 'none';
    renderInfo();
    resetInput();
}

function deleteInfo(){
    let listInfor = localStorage.getItem('list-infor') ? JSON.parse(localStorage.getItem('list-infor')):[];
    if(confirm('Are you sure?'))
        listInfor.splice(index,1);
    localStorage.setItem('list-infor',JSON.stringify(listInfor));
    renderInfo();
}

function closeModal(){
    let formElement = document.querySelector('.form');
    let inputElement = formElement.querySelectorAll('.form-input');
    document.getElementById('save').style.display ='inline-block';
    document.getElementById('modal').style.display = 'none';
    for (let i = 0; i < inputElement.length; i++) {
        inputElement[i].parentElement.querySelector('.error-message').innerText = ``;
    }
    resetInput();
}

