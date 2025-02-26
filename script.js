const sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/1m-2ap-loUD7rByaFh-mzbwlvTK0QZNp6uzLzdCVrX7s/values/Sheet1?key=AIzaSyDQ6rhmIiJ7F8udDUEQ3K2lcpGXA-L0q90"; 
// Replace 'YOUR_API_KEY' with your actual Google API Key (found in Google Cloud Console under Credentials)

document.addEventListener("DOMContentLoaded", () => {
    fetch(sheetUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.values) {
                console.error("No data found in Google Sheet.");
                return;
            }

            const rows = data.values.slice(1); // Skip header row
            const table = document.getElementById("product-table");

            rows.forEach((row, index) => {
                if (row.length > 0 && row.some(cell => cell.trim() !== "")) { // Ensure non-empty rows are displayed
                    while (row.length < 5) row.push(""); // Fill missing columns

                    const [product, description, size, price, imageUrl] = row;

                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${product || "N/A"}</td>
                        <td>${description || "No description available"}</td>
                        <td>${size || "N/A"}</td>
                        <td>$${price || "0.00"}</td>
                        <td><img src="${imageUrl || "https://via.placeholder.com/80"}" alt="Product Image" width="80"></td>
                        <td><input type="number" class="order-input" min="0"></td>
                    `;
                    table.appendChild(tr);
                }
            });
        })
        .catch(error => console.error("Error loading data:", error));
});

function submitOrder() {
    let orderItems = [];
    document.querySelectorAll(".order-input").forEach((input, index) => {
        let quantity = input.value;
        if (quantity > 0) {
            let product = document.querySelectorAll("td:first-child")[index].innerText;
            orderItems.push({ product, quantity });
        }
    });
    if (orderItems.length > 0) {
        alert("Order submitted successfully!\n" + JSON.stringify(orderItems, null, 2));
    } else {
        alert("Please enter quantities before submitting your order.");
    }
}
