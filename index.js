// index.js
// ---------------------------------------------------------------------------
// อ่านข้อมูลจากออบเจกต์ invoiceData (ประกาศไว้ใน data.js) แล้วนำไปแสดงผลลงใน
// โครงหน้า index.html โดยอัตโนมัติ — ถ้าต้องการเปลี่ยนข้อมูล Invoice ให้แก้ที่
// data.js เพียงไฟล์เดียว ไม่ต้องแตะ HTML/CSS
// ---------------------------------------------------------------------------

function formatCurrency(amount) {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderInvoice(data) {
  // Company
  setText("companyName", data.company.name);
  setText("companyAddress", data.company.address.join("\n"));

  const logoEl = document.querySelector(".invoice__logo");
  if (logoEl && data.company.logo) {
    logoEl.src = data.company.logo;
  }

  // Bill To / Ship To
  setText("billToName", data.billTo.name);
  setText("billToAddress", data.billTo.address.join("\n"));
  setText("shipToName", data.shipTo.name);
  setText("shipToAddress", data.shipTo.address.join("\n"));

  // Invoice meta
  setText("invoiceNumber", data.invoiceMeta.invoiceNumber);
  setText("invoiceDate", data.invoiceMeta.invoiceDate);
  setText("poNumber", data.invoiceMeta.poNumber);
  setText("dueDate", data.invoiceMeta.dueDate);

  // Items + subtotal (คำนวณ amount = qty * unitPrice ให้อัตโนมัติ)
  const tbody = document.getElementById("itemsBody");
  tbody.innerHTML = "";

  let subtotal = 0;
  data.items.forEach((item) => {
    const amount = item.qty * item.unitPrice;
    subtotal += amount;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="col-qty">${item.qty}</td>
      <td class="col-desc">${item.description}</td>
      <td class="col-price">${formatCurrency(item.unitPrice)}</td>
      <td class="col-amount">${formatCurrency(amount)}</td>
    `;
    tbody.appendChild(row);
  });

  setText("subtotal", formatCurrency(subtotal));

  // Signature & terms
  setText("signature", data.signature);
  setText("terms", data.terms);
}

document.addEventListener("DOMContentLoaded", () => {
  renderInvoice(invoiceData);
});
