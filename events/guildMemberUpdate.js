module.exports = class {

	constructor (client) {
		this.client = client;
	}
  
	async run (oldMember, newMember) {
		if (oldMember.premiumSince !== newMember.premiumSince) {

			console.log(newMember)

		  }
	}
};