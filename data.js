// data.js
// ---------------------------------------------------------------------------
// ข้อมูล (JSON) ที่สกัดออกมาจากภาพ Invoice ต้นแบบ (assets/invoice-template-original.png)
// ส่วนที่ "เปลี่ยนแปลงได้" ของ Invoice ทุกจุดถูกดึงมาเก็บไว้ที่นี่ในรูปแบบออบเจกต์เดียว
// แล้วให้ index.js เป็นคนอ่านค่าเหล่านี้ไปแสดงผลบนหน้าเว็บ (index.html)
// ---------------------------------------------------------------------------

const invoiceData = {
  // โลโก้ / ข้อมูลบริษัทผู้ออกใบแจ้งหนี้
  company: {
    logo: "assets/logo.png",
    name: "Sripatum University",
    address: ["Jatujak Bangkhen", "Bangkok 10000"],
  },

  // ข้อมูลลูกค้าที่ถูกเรียกเก็บเงิน (BILL TO)
  billTo: {
    name: "Somchai Jaidee",
    address: ["123 Ratchadaphisek Road", "Din Daeng, Bangkok 10400"],
  },

  // ข้อมูลผู้รับสินค้า (SHIP TO)
  shipTo: {
    name: "John Smith",
    address: ["2 Court Square", "New York, NY 12210"],
  },

  // ข้อมูลอ้างอิงของใบแจ้งหนี้
  invoiceMeta: {
    invoiceNumber: "US-001",
    invoiceDate: "11/02/2019",
    poNumber: "2312/2019",
    dueDate: "26/02/2019",
  },

  // รายการสินค้า/บริการ (จำนวน x ราคาต่อหน่วย -> ยอดรวม คำนวณโดย index.js)
  items: [
    { qty: 1, description: "Front and rear brake cables", unitPrice: 100.0 },
    { qty: 2, description: "New set of brake arms", unitPrice: 15.0 },
  ],

  // ลายเซ็นผู้อนุมัติ (เดิมในต้นแบบเป็น placeholder "[signature]")
  signature: "Jane Cooper",

  // เงื่อนไข/ข้อตกลงการชำระเงิน (เดิมในต้นแบบเป็น placeholder "[conditions]")
  terms:
    "กรุณาชำระเงินภายใน 15 วันนับจากวันที่ในใบแจ้งหนี้ สินค้าที่ซื้อแล้วไม่รับเปลี่ยนหรือคืนทุกกรณี",
};
