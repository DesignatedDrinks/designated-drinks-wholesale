<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wholesale Catalog - Designated Drinks</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Designated Drinks Wholesale Catalog</h1>
        <input type="text" id="search" placeholder="Search products..." onkeyup="filterProducts()">
        <select id="brandFilter" onchange="filterByBrand(this.value)">
            <option value="All">All Brands</option>
        </select>
    </header>
    
    <main>
        <p id="loading">Loading products...</p>
        <div id="productContainer"></div>
    </main>
    
    <footer>
        <button onclick="sendQuoteRequest()">Request Quote</button>
    </footer>
    
    <script>
        const SHEET_ID = "1m-2ap-loUD7rByaFh-mzbwlvTK0QZNp6uzLzdCVrX7s";
        const API_KEY = "AIzaSyDQ6rhmIiJ7F8udDUEQ3K2lcpGXA-L0q90";
        const SHEET_NAME = "Sheet1";
        const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

        async function fetchProducts() {
            try {
                const response = await fetch(SHEET_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Google Sheets API Response:", data);

                if (!data.values || data.values.length < 2) {
                    console.error("No valid product data found.");
                    document.getElementById("loading").innerText = "No products available.";
                    return;
                }
                
                document.getElementById("loading").style.display = "none";
                
                const rows = data.values.slice(1);
                const productsByBrand = {};

                rows.forEach(row => {
                    const productName = row[0] || "No Name";
                    const description = row[1] || "No Description";
                    const brand = row[2] || "Unknown Brand";
                    const variant = row[3] || "No Variant";
                    const size = row[4] || "N/A";
                    const retailPrice = row[5] ? parseFloat(row[5]).toFixed(2) : "N/A";
                    const wholesalePrice = row[5] ? (parseFloat(row[5]) * 0.85).toFixed(2) : "N/A";
                    const imageUrl = row[6] || "";

                    if (!productsByBrand[brand]) {
                        productsByBrand[brand] = {};
                    }
                    if (!productsByBrand[brand][productName]) {
                        productsByBrand[brand][productName] = { description, imageUrl, variants: [] };
                    }
                    productsByBrand[brand][productName].variants.push({ variant, size, retailPrice, wholesalePrice });
                });

                renderProducts(productsByBrand);
            } catch (error) {
                console.error("Error fetching data:", error);
                document.getElementById("loading").innerText = "Error loading products.";
            }
        }

        function renderProducts(productsByBrand) {
            const container = document.getElementById("productContainer");
            container.innerHTML = "";
            
            Object.keys(productsByBrand).forEach(brand => {
                const brandSection = document.createElement("div");
                brandSection.innerHTML = `<h2>${brand}</h2>`;
                
                Object.keys(productsByBrand[brand]).forEach(productName => {
                    const product = productsByBrand[brand][productName];
                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");
                    
                    productCard.innerHTML = `
                        <div class="product-info">
                            <img src="${product.imageUrl}" alt="${productName}" class="product-image">
                            <div>
                                <h3>${productName}</h3>
                                <p>${product.description}</p>
                            </div>
                        </div>
                        <table class="variant-table">
                            <thead>
                                <tr>
                                    <th>Variant</th>
                                    <th>Size</th>
                                    <th>Retail Price</th>
                                    <th>Wholesale Price</th>
                                    <th>Quote</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${product.variants.map(variant => `
                                    <tr>
                                        <td>${variant.variant}</td>
                                        <td>${variant.size}</td>
                                        <td>$${variant.retailPrice} CAD</td>
                                        <td>$${variant.wholesalePrice} CAD</td>
                                        <td><button onclick="requestQuote('${productName}')">Request</button></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `;
                    brandSection.appendChild(productCard);
                });
                
                container.appendChild(brandSection);
            });
        }

        function requestQuote(productName) {
            alert(`Quote requested for: ${productName}`);
        }

        fetchProducts();
    </script>
</body>
</html>
