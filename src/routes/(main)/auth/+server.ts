import { redirect } from "@sveltejs/kit"
import { generateCodeVerifier, generateState } from "arctic"
import { cookieRoblox } from "$lib/server/auth"
import { roblox, robloxScopes } from "$lib/server/oauth"

export async function GET({ cookies }) {
	const state = generateState()
	const codeVerifier = generateCodeVerifier()
	const url = roblox.createAuthorizationURL(state, codeVerifier, robloxScopes)

	cookies.set(cookieRoblox, state, {
		path: "/",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	})

	redirect(302, url)
}
