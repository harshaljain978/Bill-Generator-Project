### Bill Generator Project Report

Hey there! I’ve built an awesome Bill Generator tool, and I want to walk you through it in a simple way so you can see how cool and useful it is. Imagine you’re running a shop, and you need a quick way to create professional bills for your customers—well, that’s exactly what this does! Let me break it down for you.

---

#### What It Is
This is a web-based app I made using HTML, CSS, and JavaScript. It lets you create a bill for a customer by adding items, calculating totals, applying discounts, and even adding GST if you want. You can then save it as a PDF or print it out. I’ve designed it to look modern and work perfectly on any device—your phone, tablet, or computer.

---

#### How It Looks (The Design)
The design is clean and professional. Here’s what you’ll see:
- **Header**: At the top, it says “Sunrise Electronics” (a dummy shop name I made up). Below that, there’s fake contact info like phone numbers, email, and an address in Mumbai. It’s all nicely centered and looks like a real invoice header.
- **Customer Info**: There’s a section where you type the customer’s name and pick a date. It’s laid out in a neat grid so it’s easy to read.
- **Item Table**: This is where the magic happens! It’s a table with columns for serial number, item name, quantity, price per item, total amount, and a little trash button to remove items.
- **Totals Section**: At the bottom, you see the subtotal, an option to add GST (18%), a discount field, and the final amount. It’s all styled in a card with a light gray background.
- **Buttons**: There are two big buttons—one to download the bill as a PDF and another to see a print preview. They’ve got icons and hover effects to make them fun to use.

Everything has a modern look with smooth colors (blues, grays, and reds) and shadows to make it pop off the page. Plus, it’s fully responsive—if you shrink the screen, it adjusts perfectly!

---

#### How It Works (The Features)
Let me explain what you can do with it—it’s super simple to use:
1. **Add Items**: Click the “Add Item” button, and a new row appears in the table. You can type the item name (like “Laptop”), set the quantity (say, 2), and enter the price per item (like ₹50,000). The amount column instantly calculates ₹100,000 for you.
2. **Remove Items**: Don’t need an item? Hit the trash button next to it, and it’s gone. The serial numbers update automatically.
3. **Calculate Totals**: As you add items or change numbers, it updates the subtotal right away. If GST is on (there’s a checkbox for that), it adds 18% tax. You can also type a discount percentage (like 10%), and it adjusts the final amount—all in real-time!
4. **Currency Formatting**: The amounts show up with a ₹ symbol and commas (like ₹1,23,456.78), so it’s easy to read.
5. **GST Option**: You can turn GST on or off with a checkbox. If it’s off, the GST amount shows ₹0, and it’s left out of the final bill.
6. **PDF Download**: Hit “Generate PDF,” and it creates a neat invoice with the shop details, customer info, item list, and totals. It even names the file with the date (like `invoice_2025-03-04.pdf`).
7. **Print Preview**: Click “Print Preview,” and a new window pops up with the bill ready to print. It’s styled simply so it looks good on paper.

---

#### What’s New and Improved
I took my original idea and made it way better. Here’s what I upgraded:
- **Item Removal**: You can now delete rows if you make a mistake.
- **Validation**: The customer name and date fields are required, so you can’t accidentally leave them blank.
- **Fancy Design**: I added animations (things fade in when you load the page), icons (like a phone or trash can), and a gradient background to make it look pro.
- **Better PDF**: The PDF has better spacing, colors, and only shows GST if you checked it.
- **Print Option**: Added a print preview so you can see how it’ll look on paper.
- **Mobile-Friendly**: It works perfectly on small screens—tables scroll sideways, buttons stack, everything fits.

---

#### How I Built It
I split the code into three parts to keep it organized:
1. **HTML (`index.html`)**: This is the structure—like the skeleton. It has all the sections I described: header, table, totals, and buttons.
2. **CSS (`styles.css`)**: This is the style—like the clothes. It makes everything pretty with colors, shadows, and layouts that change based on screen size.
3. **JavaScript (`script.js`)**: This is the brain—it makes everything work. It adds rows, calculates totals, creates PDFs, and handles printing.

I also used two external tools:
- **jsPDF**: To make the PDF files.
- **Font Awesome**: For the cool icons.

---

#### Why It’s Awesome
This tool is perfect for a small business. It’s fast—you can make a bill in seconds. It’s flexible—you choose if you want GST or not. It’s professional—the PDFs and printouts look like something a big company would use. And it’s easy—I designed it so anyone can figure it out without a manual!

---

#### How to Use It
Just open the `index.html` file in a browser. Start typing customer details, add some items, tweak the GST and discount, and then download or print. That’s it! Try it on your phone too—it works just as well.

---
