const SHEET_ID = "1m-2ap-loUD7rByaFh-mzbwlvTK0QZNp6uzLzdCVrX7s";
const API_KEY = "AIzaSyDQ6rhmIiJ7F8udDUEQ3K2lcpGXA-L0q90";
const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;

async function fetchProducts() {
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.json();
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
                <td>${productName}</td>
                <td>${imageUrl ? `<img src="${imageUrl}" alt="${productName}" style="width: 50px; height: auto;">` : "No Image"}</td>
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

fetchProducts();
