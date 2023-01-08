
const positionSwitch = (n) => {
	switch (n){
		case 1:
			return "Top"
		case 2: 
			return "Jungle"
		case 3: 
			return "Mid"
		case 4:
			return "Bot"
		case 5:
			return "Support"
		default:
			return "None"
	}
}

module.exports = positionSwitch 