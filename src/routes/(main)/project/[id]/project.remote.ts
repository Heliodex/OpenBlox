import { error } from "@sveltejs/kit"
import { getRequestEvent, query } from "$app/server"
import { authorise } from "$lib/server/auth"
import { db, Record } from "$lib/server/db"
import projectQuery from "./project.surql?raw"

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

export const getData = query(async () => {
	const { locals, params } = getRequestEvent()
	const { id } = params
	if (!id) error(400, "Missing id in path")

	const { user } = await authorise(locals)

	const [project] = await db.query<Project[]>(projectQuery, {
		project: Record("project", id),
	})

	return project
})
