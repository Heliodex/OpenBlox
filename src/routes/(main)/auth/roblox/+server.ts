import { error, redirect } from "@sveltejs/kit"
import {
	ArcticFetchError,
	decodeIdToken,
	generateCodeVerifier,
	OAuth2RequestError,
} from "arctic"
import { authorise, cookieRoblox } from "$lib/server/auth"
import { db } from "$lib/server/db"
import { roblox } from "$lib/server/oauth"

type Claims = object

export async function GET({ cookies, locals, url }) {
	const { user } = await authorise(locals)

	const code = url.searchParams.get("code")
	if (!code) error(400, "Missing code")
	const state = url.searchParams.get("state")
	if (!state) error(400, "Missing state")
	const storedState = cookies.get(cookieRoblox)
	if (!storedState) error(400, "Missing cookie")
	if (state !== storedState) error(400, "Invalid state")

	let accessToken: string
	let accessTokenExpiresAt: Date
	let refreshToken: string
	try {
		const codeVerifier = generateCodeVerifier()
		const tokens = await roblox.validateAuthorizationCode(
			code,
			codeVerifier
		)
		console.log("Retrieved tokens:", tokens)
		accessToken = tokens.accessToken()
		accessTokenExpiresAt = tokens.accessTokenExpiresAt()
		refreshToken = tokens.refreshToken()
	} catch (e) {
		console.error(e)
		if (e instanceof OAuth2RequestError) error(400, "OAuth2 request failed")
		if (e instanceof ArcticFetchError)
			error(400, "Failed to fetch tokens from Roblox")
		error(400, "Invalid code or client credentials")
	}

	let claims: Claims
	try {
		claims = decodeIdToken(accessToken) as Claims
	} catch {
		error(400, "Failed to decode ID token")
	}
	// if (!claims.sub || !claims.name || !claims.email)
	// 	error(400, "Invalid ID token claims")

	await db.update(user.id).merge({
		robloxData: claims,
	})

	redirect(302, "/home")
}
