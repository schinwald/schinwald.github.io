import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader,
} from "@supabase/ssr";

export type DBClient = ReturnType<typeof createServerClient>;

type Config = {
	request: Request;
};

export class DatabaseManagementSystem {
	private request: Request;
	private supabaseClient: DBClient;

	constructor(config: Config) {
		this.request = config.request;
	}

	public initialize() {
		const headers = this.request.headers;
		const cookies = parseCookieHeader(headers.get("Cookie") ?? "");

		const dbClient = createServerClient(
			process.env.SUPABASE_URL,
			process.env.SUPABASE_KEY,
			{
				cookies: {
					getAll() {
						return cookies;
					},
					setAll(cookiesToSet) {
						cookiesToSet.forEach(({ name, value, options }) =>
							headers.append(
								"Set-Cookie",
								serializeCookieHeader(name, value, options),
							),
						);
					},
				},
			},
		);

		this.supabaseClient = dbClient;

		return {
			headers,
			cookies,
			dbClient,
		};
	}

	public async getSession() {
		const errors = [];

		let {
			data: { session },
		} = await this.supabaseClient.auth.getSession();

		if (["development"].includes(import.meta.env.APP_ENVIRONMENT)) {
			session = {
				user: {
					id: "1234567890",
					email: "john.smith@email.com",
					app_metadata: {
						provider: "development",
					},
					user_metadata: {},
					aud: "",
					created_at: new Date().toISOString(),
				},
				access_token: "",
				refresh_token: "",
				token_type: "",
				expires_in: 1234,
			};
		}

		if (!session) {
			errors.push({});
			return {
				meta: { status: 403 },
				errors,
			} as const;
		}

		if (!session.user) {
			errors.push({});
			return {
				meta: { status: 403 },
				errors,
			} as const;
		}

		return {
			meta: { status: 200 },
			data: { session },
		} as const;
	}
}
