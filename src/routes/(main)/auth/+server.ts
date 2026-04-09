import { redirect } from "@sveltejs/kit"
import { generateCodeVerifier, generateState } from "arctic"
import { cookieRoblox, cookieRobloxVerifier } from "$lib/server/auth"
import { roblox, robloxScopes } from "$lib/server/oauth"

export async function GET({ cookies }) {
	const state = generateState()
	const codeVerifier = generateCodeVerifier()
	const url = roblox.createAuthorizationURL(state, codeVerifier, robloxScopes)

	const opts = {
		path: "/",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	} as const
	cookies.set(cookieRoblox, state, opts)
	cookies.set(cookieRobloxVerifier, codeVerifier, opts)

	redirect(302, url)
}
