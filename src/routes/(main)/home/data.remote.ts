import { getRequestEvent, query } from "$app/server"
import { authorise } from "$lib/server/auth"
import { db } from "$lib/server/db"
import homeQuery from "./home.surql?raw"

type Project = {
	id: string
	created: Date
	imageUpdated: Date
	name: string
	description: string
	codeUrl: string
	robloxUrl: string
	projectType: string
	declarations: string
	reviewerNotes: string
}

export const getProjects = query(async () => {
	// Redirect to homepage if user is logged in
	const { locals } = getRequestEvent()
	const { user } = await authorise(locals)

	const [projects] = await db.query<Project[][]>(homeQuery, { user })

	return projects
})
