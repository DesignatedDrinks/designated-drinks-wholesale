function submitOrder() {
    let orderItems = [];
    document.querySelectorAll('.order-input').forEach((input, index) => {
        let quantity = input.value;
        if (quantity > 0) {
            let product = document.querySelectorAll('td:nth-child(1)')[index].innerText;
            orderItems.push({ product, quantity });
        }
    });
    if (orderItems.length > 0) {
        alert("Order submitted successfully!\n" + JSON.stringify(orderItems, null, 2));
    } else {
        alert("Please enter quantities before submitting your order.");
    }
}
