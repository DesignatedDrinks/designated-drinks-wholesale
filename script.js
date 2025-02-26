const sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/Sheet1?key=YOUR_API_KEY";

document.addEventListener("DOMContentLoaded", () => {
    fetch(sheetUrl)
        .then(response => response.json())
        .then(data => {
            const rows = data.values.slice(1); // Remove header row
            const table = document.getElementById("product-table");

            rows.forEach(row => {
                if (row.length > 4) {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${row[0]}</td>
                        <td>${row[1]}</td>
                        <td>${row[2]}</td>
                        <td>$${row[3]}</td>
                        <td><img src="${row[4]}" alt="Product Image" width="80"></td>
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
