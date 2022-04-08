const cities = ["hubli", "Dharawad", "Belguam", "Bijapur", "Davanageri"];


const str = cities.reduce((pr, cu)=> pr += cu)
console.log(str);