

var inputProductName = document.querySelector("#inputProductName");
var inputProductPrice = document.querySelector("#inputProductPrice");
var inputProductCategory = document.querySelector("#inputProductCategory");
var inputProductDescription = document.querySelector("#inputProductDescription");
var addProduct = document.querySelector(".add");
var updateProduct = document.querySelector(".update");
var done = document.querySelector(".Done");
var inputSearch = document.querySelector("#inputSearch");
var productContainer;


if(localStorage.getItem("myProduct") != null) {

	productContainer = JSON.parse(localStorage.getItem("myProduct"));
	displayProduct(productContainer);

} else {

	productContainer = [];

}


addProduct.addEventListener("click" , addItem);

function addItem() {


	var product = {

		Name : inputProductName.value,
		Price : inputProductPrice.value,
		Category : inputProductCategory.value,
		Description : inputProductDescription.value,

	}

	productContainer.push(product);

	console.log(productContainer);

	displayProduct(productContainer);

	clearInput();

	localStorage.setItem("myProduct" , JSON.stringify(productContainer));


	if(inputProductName.classList.contains("is-valid") == true) {

			inputProductName.classList.remove("is-valid");

	}

	if(inputProductPrice.classList.contains("is-valid") == true) {

			inputProductPrice.classList.remove("is-valid");

	}

	if(inputProductCategory.classList.contains("is-valid") == true) {

			inputProductCategory.classList.remove("is-valid");

	}


}



function displayProduct(productList){

	var cartona = ``;

	for(var x=0 ; x < productList.length ; x++) {

		cartona += `

			<tr>
					<td>${x}</td>
					<td>${productList[x].Name}</td>
					<td>${productList[x].Price}</td>
					<td>${productList[x].Category}</td>
					<td>${productList[x].Description}</td>
					<td><button class="btn btn-outline-warning" onclick="updateItem(${x})"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
					<td><button class="btn btn-outline-danger" onclick="deleteItem(${x})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
			</tr>

		`

	}

	document.querySelector("#tbody").innerHTML = cartona;

}



function clearInput() {

	inputProductName.value ="";
	inputProductPrice.value ="";
	inputProductCategory.value ="";
	inputProductDescription.value ="";

}



function deleteItem(index) {

	console.log(productContainer[index]);

	productContainer.splice(index , 1);
	localStorage.setItem("myProduct" , JSON.stringify(productContainer));
	displayProduct(productContainer);

}



function updateItem(index){

	console.log(productContainer[index]);

	inputProductName.value = productContainer[index].Name;
	inputProductPrice.value = productContainer[index].Price;
	inputProductCategory.value = productContainer[index].Category;
	inputProductDescription.value = productContainer[index].Description;

	addProduct.classList.replace("d-inline-block" , "d-none");
	updateProduct.classList.replace("d-none" , "d-inline-block");
	done.classList.replace("d-none" , "d-inline-block");




	updateProduct.addEventListener("click" , function(){


		var updateProduct = {

			Name : inputProductName.value,
			Price : inputProductPrice.value,
			Category : inputProductCategory.value,
			Description : inputProductDescription.value,

		}


		productContainer.splice(index , 1 , updateProduct);
		console.log(updateProduct)
		localStorage.setItem("myProduct" , JSON.stringify(productContainer));
		displayProduct(productContainer);
		
	})


	
	done.addEventListener("click" , function(){

			addProduct.classList.replace("d-none" , "d-inline-block");
			updateProduct.classList.replace("d-inline-block" , "d-none");
			done.classList.replace("d-inline-block" , "d-none");

			clearInput();

	})


}






function searchProduct(searchTest) {

	var searchResult = [];

	for(var i=0 ; i<productContainer.length ; i++) {

		if(productContainer[i].Name.toLowerCase().includes(searchTest.toLowerCase()) == true) {

			searchResult.push(productContainer[i]);
			displayProduct(searchResult);

		}

	}

}







function validationInput(Ex) {

	var regex1 = /^[A-Z][a-z]{3,}/;
	if(regex1.test(Ex.value) == true) {

		if(Ex.classList.contains("is-invalid") == true) {

			Ex.classList.replace("is-invalid" , "is-valid");

		} else {
			Ex.classList.add("is-valid");
		}

	} else {


		if(Ex.classList.contains("is-valid") == true) {

			Ex.classList.replace("is-valid" , "is-invalid");

		} else {
			Ex.classList.add("is-invalid");
		}

	}

}


function validationInputPrice() {


	var regex2 = /^[0-9]{1,10}$/;


	if(regex2.test(inputProductPrice.value) == true) {

		if(inputProductPrice.classList.contains("is-invalid") == true) {

				inputProductPrice.classList.replace("is-invalid" , "is-valid");

		} else {
				inputProductPrice.classList.add("is-valid");
		}

	} else {


		if(inputProductPrice.classList.contains("is-valid") == true) {

			inputProductPrice.classList.replace("is-valid" , "is-invalid");

		} else {
			inputProductPrice.classList.add("is-invalid");
		}

	}


}

