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
                    <th>Image</th>
                    <th>Size</th>
                    <th>Retail Price</th>
                    <th>Wholesale Price</th>
                    <th>Variant</th>
                    <th>Variant Price</th>
                    <th>Wholesale Variant Price</th>
                    <th>Stock Level</th>
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
        const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?alt=json&key=${API_KEY}`;

        async function fetchProducts() {
            try {
                const response = await fetch(SHEET_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Google Sheets Data:", data);
                const rows = data.values.slice(1);

                const tableBody = document.querySelector("#productTable tbody");
                tableBody.innerHTML = "";

                rows.forEach(row => {
                    const productName = row[0] || "No Name";
                    const brand = row[1] || "No Brand";
                    const size = row[2] || "N/A";
                    const price = row[3] ? parseFloat(row[3]) : null;
                    const wholesalePrice = price ? (price * 0.85).toFixed(2) : "N/A";
                    const variant = row[4] || "No Variants";
                    const variantPrice = row[5] ? parseFloat(row[5]).toFixed(2) : "N/A";
                    const wholesaleVariantPrice = variantPrice !== "N/A" ? (variantPrice * 0.85).toFixed(2) : "N/A";
                    const imageUrl = row[6] || "";

                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${productName}<br><span style="color:gray; font-size:0.9em;">${brand}</span></td>
                        <td>${imageUrl ? `<img src="${imageUrl}" alt="${productName}" style="width: 60px; height: auto;">` : "No Image"}</td>
                        <td>${size}</td>
                        <td>$${price ? price.toFixed(2) : "N/A"} CAD</td>
                        <td>$${wholesalePrice} CAD</td>
                        <td>${variant}</td>
                        <td>$${variantPrice} CAD</td>
                        <td>$${wholesaleVariantPrice} CAD</td>
                        <td>In Stock</td>
                        <td><button onclick="requestQuote('${productName}')">Request</button></td>
                    `;
                    tableBody.appendChild(tr);
                });
            } catch (error) {
                console.error("Error fetching data:", error);
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
