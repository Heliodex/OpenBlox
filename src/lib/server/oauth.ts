import { Roblox, Slack } from "arctic"
import {
	ROBLOX_CLIENT_ID,
	ROBLOX_SECRET,
	SLACK_CLIENT_ID,
	SLACK_SECRET,
} from "$env/static/private"

export const slackScopes = ["openid", "email", "profile"]
export const slack = new Slack(
	SLACK_CLIENT_ID,
	SLACK_SECRET,
	"https://ysws.heliodex.cf/login/slack"
)

export const robloxScopes = ["openid", "profile"]
export const roblox = new Roblox(
	ROBLOX_CLIENT_ID,
	ROBLOX_SECRET,
	"http://localhost:5173/auth/roblox"
)
