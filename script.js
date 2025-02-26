<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wholesale Catalog - Designated Drinks</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif;
            background-color: #f5f5f7;
            color: #1d1d1f;
            text-align: center;
            padding: 20px;
        }
        h1 {
            font-size: 24px;
            font-weight: bold;
        }
        input, select {
            width: 90%;
            padding: 12px;
            margin: 10px 0;
            border: none;
            border-radius: 12px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .product-card {
            background: white;
            border-radius: 12px;
            padding: 16px;
            margin: 10px 0;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: left;
        }
        .product-info {
            display: flex;
            align-items: center;
        }
        .product-image {
            width: 60px;
            height: auto;
            border-radius: 8px;
            margin-right: 16px;
        }
        .variant-table {
            width: 100%;
            margin-top: 10px;
            border-collapse: collapse;
        }
        .variant-table th, .variant-table td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }
        .variant-table th {
            background-color: #f1f1f1;
        }
        button {
            background-color: #007aff;
            color: white;
            border: none;
            padding: 10px 16px;
            border-radius: 12px;
            cursor: pointer;
            font-weight: bold;
        }
        button:hover {
            background-color: #005ecb;
        }
    </style>
</head>
<body>
    <h1>Designated Drinks Wholesale Catalog</h1>
    <input type="text" id="search" placeholder="Search products..." onkeyup="filterProducts()">
    <select id="brandFilter" onchange="filterByBrand(this.value)">
        <option value="All">All Brands</option>
    </select>
    <div id="productContainer"></div>
    
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
                if (!data.values || data.values.length < 2) {
                    document.getElementById("productContainer").innerHTML = "No products available.";
                    return;
                }
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
                document.getElementById("productContainer").innerHTML = "Error loading products.";
            }
        }

        function renderProducts(productsByBrand) {
            const container = document.getElementById("productContainer");
            container.innerHTML = "";
            Object.keys(productsByBrand).forEach(brand => {
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
                    container.appendChild(productCard);
                });
            });
        }

        function requestQuote(productName) {
            alert(`Quote requested for: ${productName}`);
        }

        fetchProducts();
    </script>
</body>
</html>
