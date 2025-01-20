type Config = {};

class OAuthAPI {
	private request: Request;

	constructor(request: Request) {
		this.request = request;
	}

	public begin() {}

	public callback() {}
}
