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
