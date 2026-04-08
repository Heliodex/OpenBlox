import { error, redirect } from "@sveltejs/kit"
import { decodeIdToken, type OAuth2Tokens } from "arctic"
import {
	cookieName,
	cookieOptions,
	cookieSlack,
	createSession,
} from "$lib/server/auth"
import { db, find, Record, User } from "$lib/server/db"
import { slack } from "$lib/server/oauth"

type Claims = {
	sub: string
	name: string
	email: string
}

export async function GET({ cookies, url }) {
	const code = url.searchParams.get("code")
	if (!code) error(400, "Missing code")
	const state = url.searchParams.get("state")
	if (!state) error(400, "Missing state")
	const storedState = cookies.get(cookieSlack)
	if (!storedState) error(400, "Missing cookie")
	if (state !== storedState) error(400, "Invalid state")

	let tokens: OAuth2Tokens
	try {
		tokens = await slack.validateAuthorizationCode(code)
	} catch {
		error(400, "Invalid code or client credentials")
	}

	let claims: Claims
	try {
		claims = decodeIdToken(tokens.idToken()) as Claims
	} catch {
		error(400, "Failed to decode ID token")
	}
	if (!claims.sub || !claims.name || !claims.email)
		error(400, "Invalid ID token claims")

	const id = claims.sub
	const { name, email } = claims

	const rid = Record("user", id)
	if (!(await find("user", id)))
		await db.create(User).content({
			id: rid,
			name,
			email,
		})

	cookies.set(cookieName, await createSession(rid), cookieOptions)
	redirect(302, "/")
}
