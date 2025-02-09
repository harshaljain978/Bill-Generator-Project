function addItem() {
    let table = document.getElementById("billTable").getElementsByTagName('tbody')[0];
    let rowCount = table.rows.length + 1;
    let row = table.insertRow();
    row.innerHTML = `
        <td>\${rowCount}</td>
        <td><input type="text" class="item-name"></td>
        <td><input type="number" class="quantity" oninput="calculateTotal()"></td>
        <td><input type="number" class="per-item-cost" oninput="calculateTotal()"></td>
        <td class="amount">0</td>
    `;
}

function calculateTotal() {
    let quantities = document.querySelectorAll(".quantity");
    let perItemCosts = document.querySelectorAll(".per-item-cost");
    let amounts = document.querySelectorAll(".amount");
    let total = 0;
    for (let i = 0; i < quantities.length; i++) {
        let quantity = quantities[i].value || 0;
        let perItemCost = perItemCosts[i].value || 0;
        let amount = quantity * perItemCost;
        amounts[i].innerText = amount.toFixed(2);
        total += amount;
    }
    document.getElementById("total").innerText = total.toFixed(2);
    let gst = total * 0.18;
    document.getElementById("gst").innerText = gst.toFixed(2);
    let discount = document.getElementById("discount").value;
    let finalAmount = total + gst - (total * (discount / 100));
    document.getElementById("finalAmount").innerText = finalAmount.toFixed(2);
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Fetch customer details
    let customerName = document.getElementById("customerName").value || "N/A";
    let billDate = document.getElementById("date").value || new Date().toISOString().split('T')[0];

    // Add bill header
    doc.setFontSize(14);
    doc.text("Meenakshi Enterprises", 70, 10);
    doc.setFontSize(10);
    doc.text("Phone: +91-9828920482, +91-9783786028", 10, 20);
    doc.text("Address:  9 Bhram Pole Marg Jada Ganesh Ji Ka Chouk Out Side Chand Pole, Udaipur City, Udaipur-Rajasthan - 313001", 10, 30);
    doc.text("Customer Name: " + customerName, 10, 40);
    doc.text("Date: " + billDate, 10, 50);

    // Prepare table data
    let tableData = [];
    let rows = document.querySelectorAll("#billTable tbody tr");
    
    rows.forEach((row, index) => {
        let cells = row.querySelectorAll("td");
        let itemName = cells[1].querySelector("input").value || "N/A";
        let quantity = cells[2].querySelector("input").value || "0";
        let perItemCost = cells[3].querySelector("input").value || "0";
        let amount = cells[4].innerText || "0";

        tableData.push([index + 1, itemName, quantity, perItemCost, amount]);
    });

    // Add table to PDF
    doc.autoTable({
        head: [["S.No", "Item Name", "Quantity", "Per Item Cost", "Amount"]],
        body: tableData,
        startY: 60
    });

    // Add totals
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.text("Total: " + document.getElementById("total").innerText + " INR", 10, finalY);
    doc.text("GST (18%): " + document.getElementById("gst").innerText + " INR", 10, finalY + 10);
    doc.text("Final Amount: " + document.getElementById("finalAmount").innerText + " INR", 10, finalY + 20);

    // Save PDF
    doc.save("Bill.pdf");
}

