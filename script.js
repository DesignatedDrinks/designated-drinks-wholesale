const SHEET_ID = "1m-2ap-loUD7rByaFh-mzbwlvTK0QZNp6uzLzdCVrX7s";
const API_KEY = "AIzaSyDQ6rhmIiJ7F8udDUEQ3K2lcpGXA-L0q90"; // Replace with your API key
const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;

async function fetchProducts() {
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.json();
        const rows = data.values.slice(1); // Skip headers

        const tableBody = document.querySelector("#productTable tbody");
        tableBody.innerHTML = "";

        rows.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row[0] || "No Name"}</td>
                <td>${row[1] || "No Brand"}</td>
                <td>${row[2] || "N/A"}</td>
                <td>${row[3] ? `$${row[3]} CAD` : "N/A"}</td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Fetch products on page load
fetchProducts();

// Search Filter
function filterProducts() {
    const search = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#productTable tbody tr");

    rows.forEach(row => {
        const productName = row.cells[0].textContent.toLowerCase();
        row.style.display = productName.includes(search) ? "" : "none";
    });
}
