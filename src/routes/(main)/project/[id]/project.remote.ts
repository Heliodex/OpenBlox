import { error } from "@sveltejs/kit"
import { getRequestEvent, query } from "$app/server"
import { authorise } from "$lib/server/auth"
import { db, Record } from "$lib/server/db"
import { refreshToken, type Universe } from "$lib/server/roblox"
import projectQuery from "./project.surql?raw"

type Project = {
	id: string
	created: Date
	imageUpdated: Date
	name: string
	description: string
	codeUrl: string
	robloxId: string
	projectType: string
	declarations: string
	reviewerNotes: string
}

export const getData = query(async () => {
	const { locals, params, fetch: f } = getRequestEvent()
	const { id } = params
	if (!id) error(400, "Missing id in path")

	const { user } = await authorise(locals)

	const [project] = await db.query<Project[]>(projectQuery, {
		project: Record("project", id),
	})
	if (!project) error(404, "Project not found")

	if (!user.robloxData) return { project }

	const data = user.robloxData
	if (data) await refreshToken(data, user)

	const res = await f(
		`https://apis.roblox.com/cloud/v2/universes/${project.robloxId}`,
		{
			headers: {
				Authorization: `Bearer ${user.robloxData.accessToken}`,
			},
		}
	)

	const universe: Universe = await res.json()

	return {
		project,
		universe: {
			createTime: universe.createTime,
			updateTime: universe.updateTime,
			description: universe.description,
			platforms: [
				universe.desktopEnabled && "Desktop",
				universe.mobileEnabled && "Mobile",
				universe.tabletEnabled && "Tablet",
				universe.consoleEnabled && "Console",
				universe.vrEnabled && "VR",
			].filter(Boolean) as string[],
		},
	}
})
