const sheetUrl = "https://docs.google.com/spreadsheets/d/1m-2ap-loUD7rByaFh-mzbwlvTK0QZNp6uzLzdCVrX7s/edit?gid=0#gid=0";

document.addEventListener("DOMContentLoaded", () => {
    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1);
            const table = document.getElementById("product-table");

            rows.forEach(row => {
                const columns = row.split(",");
                if (columns.length > 4) {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${columns[0]}</td>
                        <td>${columns[1]}</td>
                        <td>${columns[2]}</td>
                        <td>$${columns[3]}</td>
                        <td><img src="${columns[4]}" alt="Product Image" width="80"></td>
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
