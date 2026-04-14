import { ArcticFetchError, OAuth2RequestError } from "arctic"
import { roblox } from "./oauth"
import { error } from "@sveltejs/kit"
import { db } from "./db"

type Visibility = "VISIBILITY_UNSPECIFIED" | "PUBLIC" | "PRIVATE"

type AgeRating =
	| "AGE_RATING_UNSPECIFIED"
	| "AGE_RATING_ALL"
	| "AGE_RATING_9_PLUS"
	| "AGE_RATING_13_PLUS"
	| "AGE_RATING_17_PLUS"

type SocialLink = {
	title: string
	uri: string
}

export type Universe = {
	path: `universe/${number}`
	createTime: string
	updateTime: string
	displayName: string
	description: string
	user?: string
	group?: string
	visibility: Visibility
	facebookSocialLink: SocialLink
	twitterSocialLink?: SocialLink
	youtubeSocialLink?: SocialLink
	twitchSocialLink?: SocialLink
	discordSocialLink?: SocialLink
	robloxGroupSocialLink?: SocialLink
	guildedSocialLink?: SocialLink
	voiceChatEnabled: boolean
	ageRating: AgeRating
	privateServerPriceRobux: number
	desktopEnabled: boolean
	mobileEnabled: boolean
	tabletEnabled: boolean
	consoleEnabled: boolean
	vrEnabled: boolean
	rootPlace: `universe/${number}/places/${number}`
	templateRootPlace?: string
}

export async function refreshToken(data: RobloxData, user: User) {
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