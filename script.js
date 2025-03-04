document.addEventListener('DOMContentLoaded', () => {
    addItem(); // Add initial row
    calculateTotal(); // Initialize totals
});

function addItem() {
    const tbody = document.querySelector('#billTable tbody');
    const rowCount = tbody.children.length + 1;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" class="item-name" placeholder="Item name" required></td>
        <td><input type="number" class="quantity" min="1" value="1" oninput="calculateTotal()"></td>
        <td><input type="number" class="unit-price" min="0" value="0" step="0.01" oninput="calculateTotal()"></td>
        <td class="amount">₹0.00</td>
        <td><button class="remove-btn" onclick="removeItem(this)"><i class="fas fa-trash"></i></button></td>
    `;
    tbody.appendChild(row);
}

function removeItem(button) {
    button.parentElement.parentElement.remove();
    updateSerialNumbers();
    calculateTotal();
}

function updateSerialNumbers() {
    const rows = document.querySelectorAll('#billTable tbody tr');
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}

function formatCurrency(amount) {
    return `₹${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function calculateTotal() {
    const quantities = document.querySelectorAll('.quantity');
    const unitPrices = document.querySelectorAll('.unit-price');
    const amounts = document.querySelectorAll('.amount');
    let subtotal = 0;

    for (let i = 0; i < quantities.length; i++) {
        const qty = parseFloat(quantities[i].value) || 0;
        const price = parseFloat(unitPrices[i].value) || 0;
        const amount = qty * price;
        amounts[i].textContent = formatCurrency(amount);
        subtotal += amount;
    }

    document.getElementById('total').textContent = formatCurrency(subtotal);
    
    const includeGST = document.getElementById('includeGST').checked;
    const gst = includeGST ? subtotal * 0.18 : 0;
    document.getElementById('gst').textContent = formatCurrency(gst);

    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const discountAmount = subtotal * (discount / 100);
    const finalAmount = subtotal + gst - discountAmount;

    document.getElementById('finalAmount').textContent = formatCurrency(finalAmount);
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(44, 62, 80);
    doc.text('Sunrise Electronics', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('+91-9876543210, +91-8765432109', 105, 30, { align: 'center' });
    doc.text('contact@sunriseelectronics.com', 105, 37, { align: 'center' });
    doc.text('123 Tech Street, Mumbai, Maharashtra - 400001', 105, 44, { align: 'center' });

    // Customer Info
    const customerName = document.getElementById('customerName').value || 'N/A';
    const date = document.getElementById('date').value || new Date().toISOString().split('T')[0];
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text(`Invoice For: ${customerName}`, 15, 60);
    doc.text(`Date: ${date}`, 15, 67);

    // Table
    const tableData = Array.from(document.querySelectorAll('#billTable tbody tr')).map((row, index) => {
        const cells = row.querySelectorAll('td');
        return [
            index + 1,
            cells[1].querySelector('input').value || 'N/A',
            cells[2].querySelector('input').value,
            cells[3].querySelector('input').value,
            cells[4].textContent
        ];
    });

    doc.autoTable({
        startY: 75,
        head: [['S.No', 'Item Name', 'Qty', 'Unit Price', 'Amount']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        styles: { fontSize: 10, cellPadding: 3 },
    });

    // Totals
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(11);
    doc.text(`Subtotal: ${document.getElementById('total').textContent}`, 150, finalY, { align: 'right' });
    if (document.getElementById('includeGST').checked) {
        doc.text(`GST (18%): ${document.getElementById('gst').textContent}`, 150, finalY + 10, { align: 'right' });
    }
    doc.text(`Discount: ${document.getElementById('discount').value}%`, 150, finalY + 20, { align: 'right' });
    doc.setFontSize(14);
    doc.setTextColor(231, 76, 60);
    doc.text(`Final Amount: ${document.getElementById('finalAmount').textContent}`, 150, finalY + 35, { align: 'right' });

    doc.save(`invoice_${date}.pdf`);
}

function printPreview() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Preview - Sunrise Electronics</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                th { background: #3498db; color: white; }
                .totals { margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Sunrise Electronics</h1>
                <p>+91-9876543210, +91-8765432109</p>
                <p>contact@sunriseelectronics.com</p>
                <p>123 Tech Street, Mumbai, Maharashtra - 400001</p>
            </div>
            <p>Customer: ${document.getElementById('customerName').value || 'N/A'}</p>
            <p>Date: ${document.getElementById('date').value || new Date().toLocaleDateString()}</p>
            ${document.querySelector('.table-container').innerHTML}
            <div class="totals">
                <p>Subtotal: ${document.getElementById('total').textContent}</p>
                ${document.getElementById('includeGST').checked ? `<p>GST (18%): ${document.getElementById('gst').textContent}</p>` : ''}
                <p>Discount: ${document.getElementById('discount').value}%</p>
                <p><strong>Final Amount: ${document.getElementById('finalAmount').textContent}</strong></p>
            </div>
            <script>window.print();</script>
        </body>
        </html>
    `);
    printWindow.document.close();
}
