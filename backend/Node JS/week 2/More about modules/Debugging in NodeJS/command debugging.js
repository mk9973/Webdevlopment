function calculateTotal(products) {
    let total = 0
    products.forEach((product) => {
      total += product.quantity * product.quantity
    })
    return total
  }
  
  const productsList = [
    { name: 'Shoes', price: 50, quantity: 2 },
    { name: 'Hat', price: 25, quantity: 1 },
    { name: 'Gloves', price: 30, quantity: 2 },
  ]
  // expected result = 100+25+60=185
  const grandTotal = calculateTotal(productsList)
  console.log('Grand Total:', grandTotal)

  // For Start Debugging we have to command in terminal--> "node inspect filename.js"
  //it will aready take one breakPoint on starting line of code
  // For set the breakPoint   --->  "setBreakpoint('filename.js',line number)"
  //if you want to watch the variable value in current line of code --> "watch('Variable name')"; and the enter and after --> "cont"  enter
  // to stop debugging ctrl+c

  //you can also debug through vs code without using command
  