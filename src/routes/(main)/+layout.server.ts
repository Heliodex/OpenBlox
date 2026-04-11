import { error } from "@sveltejs/kit"
import { ArcticFetchError, OAuth2RequestError } from "arctic"
import { authorise } from "$lib/server/auth"
import { db } from "$lib/server/db.js"
import { roblox } from "$lib/server/oauth"

async function refreshToken(data: RobloxData, user: User) {
	console.log(data.accessTokenExpiresAt)
	if (data.accessTokenExpiresAt > new Date()) return

	console.log("Access token expired, refreshing...")

	const newData = {} as RobloxData
	try {
		const tokens = await roblox.refreshAccessToken(data.refreshToken)
		newData.accessToken = tokens.accessToken()
		newData.accessTokenExpiresAt = tokens.accessTokenExpiresAt()
		newData.refreshToken = tokens.refreshToken()
	} catch (e) {
		console.error(e)
		if (e instanceof OAuth2RequestError) error(400, "OAuth2 request failed")
		if (e instanceof ArcticFetchError)
			error(400, "Failed to fetch tokens from Roblox")
		error(400, "Invalid code or client credentials")
	}

	await db.update(user.id).merge({
		robloxData: newData,
	})
}

// Redirect to homepage if user is logged in
export async function load({ locals }) {
	const { user } = await authorise(locals)

	const data = user.robloxData
	if (data) await refreshToken(data, user)

	return { connectedRoblox: data !== undefined }
}
