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

// ค่าที่มาจาก data.js บางช่อง (ตัวอักษรสีแดง/เอียงในต้นแบบ) ถ้ายังไม่มีการเชื่อม
// ข้อมูลจริง (ค่าว่าง/ไม่มี key) ให้ตกกลับไปแสดง placeholder แบบเดียวกับในภาพ
// ต้นแบบ เช่น "[bill-to-name]" — เมื่อใส่ข้อมูลจริงลง data.js แล้วค่านี้จะถูก
// แทนที่ด้วยข้อมูลจริงโดยอัตโนมัติ
function textOrPlaceholder(value, placeholder) {
  const joined = Array.isArray(value) ? value.filter(Boolean).join("\n") : value;
  return joined && String(joined).trim() ? joined : placeholder;
}

function renderInvoice(data) {
  // Company
  setText("companyName", data.company.name);
  setText("companyAddress", data.company.address.join("\n"));

  const logoEl = document.querySelector(".invoice__logo");
  if (logoEl && data.company.logo) {
    logoEl.src = data.company.logo;
  }

  // Bill To (ช่องที่ต้นแบบทำเป็น placeholder สีแดง [bill-to-name] / [bill-to-addr])
  setText("billToName", textOrPlaceholder(data.billTo && data.billTo.name, "[bill-to-name]"));
  setText(
    "billToAddress",
    textOrPlaceholder(data.billTo && data.billTo.address, "[bill-to-addr]")
  );

  // Ship To
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

  // Signature & terms (ช่องที่ต้นแบบทำเป็น placeholder สีแดง [signature] / [conditions])
  setText("signature", textOrPlaceholder(data.signature, "[signature]"));
  setText("terms", textOrPlaceholder(data.terms, "[conditions]"));
}

document.addEventListener("DOMContentLoaded", () => {
  renderInvoice(invoiceData);
});
