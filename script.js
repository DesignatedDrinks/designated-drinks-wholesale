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
        <select id="categoryFilter" onchange="filterByCategory(this.value)">
            <option value="All">All Categories</option>
        </select>
    </header>
    
    <main>
        <p id="loading">Loading products...</p>
        <table id="productTable">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Variant</th>
                    <th>Size</th>
                    <th>Retail Price</th>
                    <th>Wholesale Price</th>
                    <th>Image</th>
                    <th>Quote</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
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
                const tableBody = document.querySelector("#productTable tbody");
                tableBody.innerHTML = "";

                rows.forEach(row => {
                    const productName = row[0] || "No Name";
                    const description = row[1] || "No Description";
                    const variant = row[2] || "No Variant";
                    const size = row[3] || "N/A";
                    const retailPrice = row[4] ? parseFloat(row[4]).toFixed(2) : "N/A";
                    const wholesalePrice = row[4] ? (parseFloat(row[4]) * 0.85).toFixed(2) : "N/A";
                    const imageUrl = row[5] || "";

                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${productName}</td>
                        <td>${description}</td>
                        <td>${variant}</td>
                        <td>${size}</td>
                        <td>$${retailPrice} CAD</td>
                        <td>$${wholesalePrice} CAD</td>
                        <td>${imageUrl ? `<img src="${imageUrl}" alt="${productName}" style="width: 60px; height: auto;">` : "No Image"}</td>
                        <td><button onclick="requestQuote('${productName}')">Request</button></td>
                    `;
                    tableBody.appendChild(tr);
                });
            } catch (error) {
                console.error("Error fetching data:", error);
                document.getElementById("loading").innerText = "Error loading products.";
            }
        }

        function requestQuote(productName) {
            alert(`Quote requested for: ${productName}`);
        }

        function filterProducts() {
            const search = document.getElementById("search").value.toLowerCase();
            const rows = document.querySelectorAll("#productTable tbody tr");
            rows.forEach(row => {
                const productName = row.cells[0].textContent.toLowerCase();
                row.style.display = productName.includes(search) ? "" : "none";
            });
        }

        fetchProducts();
    </script>
</body>
</html>
