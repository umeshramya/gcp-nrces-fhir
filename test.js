const console = require("console")

const withLabId =`<div xmlns="http://www.w3.org/1999/xhtml"><p>Lab Id: 2</p><p><tr><td style="width: 40%; border: 0em; margin-bottom: 2.5px; margin-top: 2.5px;">Total Cholestrol</tb><td style="width: 20%; border: 0em; margin-bottom: 2.5px; margin-top: 2.5px;">200</td ><td style="width: 20%;border: 0em; margin-bottom: 2.5px; margin-top: 2.5px;">mg/dl<td style="width: 20%;border: 0em; margin-bottom: 2.5px; margin-top: 2.5px;"></td></tr></p><p></p></div>`;



const withOutLabId = `<div xmlns="http://www.w3.org/1999/xhtml"><p><tr><td style="width: 40%; border: 0em; margin-bottom: 2.5px; margin-top: 2.5px;">Total Cholestrol</th><td style="width: 20%; border: 0em; margin-bottom: 2.5px; margin-top: 2.5px;">200</td ><td style="width: 20%;border: 0em; margin-bottom: 2.5px; margin-top: 2.5px;">mg/dl</td><td style="width: 20%;border: 0em; margin-bottom: 2.5px; margin-top: 2.5px;"></td></tr></p><p></p></div>`;

const labidstr =`<p><tr><td style="width: 40%; border: 0em; margin-bottom: 2.5px; margin-top: 2.5px;">`;

const index= withLabId.indexOf(labidstr)
const labIdOnly = withLabId.substring(0, index)
const rest = withLabId.substring(index)
console.log(labIdOnly)
console.log(rest)
