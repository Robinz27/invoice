document.addEventListener("DOMContentLoaded", () => {

  //render company name
  document.getElementById("com-name").innerText = data.companyName
  document.getElementById("com-name").classList.remove("undefined")

  document.getElementById("com-addr").innerHTML = data.companyAddress.join('<br>')
  document.getElementById("com-addr").classList.remove("undefined")

  document.getElementById("com-logo").innerHTML = `<img src="assets/${data.companyLogo}" alt="logo" height="70px">`
  document.getElementById("com-logo").classList.remove("undefined")

  document.getElementById("bill-to-name").innerText = data.billToName
  document.getElementById("bill-to-name").classList.remove("undefined")

  document.getElementById("bill-to-addr").innerHTML = data.billToAddress.join('<br>')
  document.getElementById("bill-to-addr").classList.remove("undefined")

  document.getElementById("ship-to-name").innerText = data.shipToName
  document.getElementById("ship-to-name").classList.remove("undefined")

  document.getElementById("ship-to-addr").innerHTML = data.shipToAddress.join('<br>')
  document.getElementById("ship-to-addr").classList.remove("undefined")

  //render invoice meta
  document.getElementById("invoice-no").innerText = data.invoiceNo
  document.getElementById("invoice-no").classList.remove("undefined")

  document.getElementById("invoice-date").innerText = data.invoiceDate
  document.getElementById("invoice-date").classList.remove("undefined")

  document.getElementById("po-number").innerText = data.poNumber
  document.getElementById("po-number").classList.remove("undefined")

  document.getElementById("due-date").innerText = data.dueDate
  document.getElementById("due-date").classList.remove("undefined")

  //render signature
  document.getElementById("signature").innerHTML = `<img src="assets/${data.signature}" alt="signature" width="150px">`
  document.getElementById("signature").classList.remove("undefined")

  //render terms & conditions
  document.getElementById("conditions").innerHTML = data.conditions.join('<br>')
  document.getElementById("conditions").classList.remove("undefined")

  //render table
  let tableString = ""
  let subTotal = 0
  data.table.forEach((e) => {
    const amount = e.qty * e.unit
    tableString += '<tr>'
    tableString += '<td align="center">' + e.qty + '</td>'
    tableString += '<td>' + e.desc + '</td>'
    tableString += '<td align="right">' + e.unit.toFixed(2) + '</td>'
    tableString += '<td align="right">' + amount.toFixed(2) + '</td>'
    tableString += '</tr>'
    subTotal += amount
  })

  tableString += '<tr align="right">'
  tableString += '<td colspan="3">Subtotal</td>'
  tableString += '<td>' + subTotal.toFixed(2) + '</td>'
  tableString += '</tr>'

  const taxAmount = subTotal * data.tax / 100

  tableString += '<tr align="right">'
  tableString += '<td colspan="3">Sales Tax: ' + data.tax + '%</td>'
  tableString += '<td>' + taxAmount.toFixed(2) + '</td>'
  tableString += '</tr>'

  tableString += '<tr align="right">'
  tableString += '<td colspan="3"><b>Total</b></td>'
  tableString += '<td><b>' + (subTotal + taxAmount).toFixed(2) + '</b></td>'
  tableString += '</tr>'

  document.getElementById("table").innerHTML = tableString
  document.getElementById("table").classList.remove("undefined")
})