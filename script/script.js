//first put id in DOM element
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = "create";
let temp;
// console.log(title, price, taxes, discount,total, count, category, submit);

//get total

function getTotal(){
    if (price.value !=''){
        let result = (+price.value + +taxes.value - discount.value)
        total.innerHTML = result;
        total.style.backgroundColor = 'green'
    }else {
        total.innerHTML = '';
        total.style.backgroundColor = 'red';
    }
    }

// create product (array)

let dataPro ;
if (localStorage.getItem("Product") != null){
    dataPro = JSON.parse(localStorage.getItem("Product"));
    showData();
}else {
    dataPro =[];
}


submit. onclick = function(){
    let newProduct ={
    title: title.value.toLowerCase(),
    taxes: taxes.value,
    price: price.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
}

if(title.value != '' && price.value != ''&& newProduct.count <=100){
    if (mood === "create"){
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++) {
                dataPro.push(newProduct);
            }
            }else{
            dataPro.push(newProduct);
            }
    }else{
        dataPro[temp] = newProduct;
        mood = "create";
        submit.innerHTML = 'create';
        count.style.display = 'block';
    }
clearData();

}

//save localstorage
localStorage.setItem('Product', JSON.stringify(dataPro));
// console.log(newProduct); 
showData();
}
// clear data

function clearData(){
    title.value ="";
    price.value ="";
    taxes.value ="";
    discount.value ="";
    total.innerHTML="";
    count.value ="";
    category.value ="";

}


//read
function showData(){
    getTotal();
    let table ='';
    for(let i=0;i<dataPro.length;i++){
        table +=`
        
        <tr>
               <td>${i +1}</td>
               <td>${dataPro[i].title}</td>
               <td>${dataPro[i].price}</td>
               <td>${dataPro[i].taxes}</td>
               <td>${dataPro[i].discount}</td>
               <td>${dataPro[i].total}</td>
               <td>${dataPro[i].category}</td>
               <td><button onclick ="updateData(${i})" id="update">update</button></td>
               <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
               
           </tr>

`

}
document.getElementById('tbody').innerHTML =table ;
let deleteAll = document.getElementById('deleteAll'); 
if (dataPro.length > 0) {
    deleteAll.innerHTML =   `<button onclick="deleteAllData()">Delete All(${dataPro.length})</button>`
}
else {
    deleteAll.innerHTML ="";
}

}
showData();

//delete data


function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.Product = JSON.stringify(dataPro)
    showData();
}



//delete all data


function deleteAllData() {
    localStorage.clear(); 
    dataPro.splice(0);
     
    showData(); 
    }
function  updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'update';
    mood = "update";
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })

}


let searchMood = "title";
function getSearchMood(id){
    let search = document.getElementById('search');
if (id == "searchtitle"){
    searchMood = "title";
    search.placeholder = "search by title";
}else{
    searchMood = "category";
    search.placeholder = "search by category";
}
search.focus();
search.value ="";
showData
}

function searchData(value){
    let table ='';
    if (searchMood == "title"){
        for (let i =0; i < dataPro.length; i++){
            if (dataPro[i].title.includes(value .toLowerCase())){
                table +=`
        
                 <tr>
                       <td>${i}</td>
                       <td>${dataPro[i].title}</td>
                       <td>${dataPro[i].price}</td>
                       <td>${dataPro[i].taxes}</td>
                       <td>${dataPro[i].discount}</td>
                       <td>${dataPro[i].total}</td>
                       <td>${dataPro[i].category}</td>
                       <td><button onclick ="updateData(${i})" id="update">update</button></td>
                       <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
                       
                   </tr>
        
        `
            }
        }

    }
    else{
        for (let i =0; i < dataPro.length; i++){
            if (dataPro[i].category.includes(value.toLowerCase())){
                table +=`
        
                 <tr>
                       <td>${i}</td>
                       <td>${dataPro[i].title}</td>
                       <td>${dataPro[i].price}</td>
                       <td>${dataPro[i].taxes}</td>
                       <td>${dataPro[i].discount}</td>
                       <td>${dataPro[i].total}</td>
                       <td>${dataPro[i].category}</td>
                       <td><button onclick ="updateData(${i})" id="update">update</button></td>
                       <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
                       
                   </tr>
        
        `
            }
        }

    }
document.getElementById('tbody').innerHTML =table ;
    
}