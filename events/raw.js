module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async run (data) {
    //What is data? Discord Gateway Data, Please check discord api docs
    try{ 
	this.client.manager.updateVoiceState(data)
	}catch{}
  }
}
  