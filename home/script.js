let selectedCard = null;
let selectedImage = null;

function openModal(button) {
    selectedCard = button.closest(".product-card");

    // Get current product values
    const productIdText = selectedCard.querySelector(".product-id").textContent;
    const productId = productIdText.replace("Product ID: ", "");
    const productName = selectedCard.querySelector("h2").textContent;
    const productBrand = selectedCard.querySelector(".brand").textContent;
    const productPrice = selectedCard.querySelector(".price").textContent.replace("Price: P ", "");
    const productDescription = selectedCard.querySelector(".description").textContent;
    const isAvailable = selectedCard.querySelector(".status").classList.contains("available") ? "available" : "out-of-stock";
    const productImage = selectedCard.querySelector(".image-container img").src;

    // Set values in the modal
    document.getElementById("productId").value = productId;
    document.getElementById("productName").value = productName;
    document.getElementById("productBrand").value = productBrand;
    document.getElementById("productPrice").value = productPrice;
    document.getElementById("productDescription").value = productDescription;
    document.getElementById("productAvailability").value = isAvailable;
    document.getElementById("previewImg").src = productImage;

    // Reset file input
    document.getElementById("imageUpload").value = "";
    selectedImage = null;

    // Show modal
    document.getElementById("editModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

function confirmChanges() {
    if (!selectedCard) return;

    // Update product information
    const newProductId = document.getElementById("productId").value;
    const newProductName = document.getElementById("productName").value;
    const newProductBrand = document.getElementById("productBrand").value;
    const newProductPrice = document.getElementById("productPrice").value;
    const newProductDescription = document.getElementById("productDescription").value;
    const newStatus = document.getElementById("productAvailability").value;

    // Update card elements
    selectedCard.querySelector(".product-id").textContent = `Product ID: ${newProductId}`;
    selectedCard.querySelector("h2").textContent = newProductName;
    selectedCard.querySelector(".brand").textContent = newProductBrand;
    selectedCard.querySelector(".price").textContent = `Price: P ${newProductPrice}`;
    selectedCard.querySelector(".description").textContent = newProductDescription;

    // Update status
    const statusDiv = selectedCard.querySelector(".status");
    statusDiv.textContent = newStatus === "available" ? "Available" : "Out of Stock";
    statusDiv.className = `status ${newStatus}`;

    // Update image if a new one was selected
    if (selectedImage) {
        selectedCard.querySelector(".image-container img").src = selectedImage;
    }

    // Close modal
    closeModal();
}

#
function removeAllProducts() {
    document.querySelector(".product-grid").innerHTML = "";
}


// Handle image preview
document.addEventListener("DOMContentLoaded", function () {
    const imageUpload = document.getElementById("imageUpload");
    const previewImg = document.getElementById("previewImg");

    imageUpload.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                previewImg.src = this.result;
                selectedImage = this.result;
            });

            reader.readAsDataURL(file);
        }
    });
});

function addNewProduct() {
    const productGrid = document.querySelector(".product-grid");

    // create new product card
    const newProduct = document.createElement("div");
    newProduct.classList.add("product-card");
    newProduct.innerHTML = `
        <div class="product-id">Product ID: 00${productGrid.children.length + 1}</div>
        <div class="status available">Available</div>
        <h2>New Product</h2>
        <p class="brand">New Brand</p>
        <div class="image-container">
            <img src="https://i1.sndcdn.com/artworks-HSyITlQwovK4dbY8-iAauZg-t500x500.jpg" alt="Product Image">
        </div>
        <p class="price">Price: P 00.00</p>
        <p class="description">New Product Description</p>
        <div class="button-container">
            <button class="edit-button" onclick="openModal(this)">✏️ Edit Details</button>
        </div>
    `;

    // append to grid
    productGrid.appendChild(newProduct);
}
