import fs from "node:fs"
import { error, redirect } from "@sveltejs/kit"
import { type } from "arktype"
import { form, getRequestEvent } from "$app/server"
import { authorise } from "$lib/server/auth"
import { db, type RecordId } from "$lib/server/db"
import createProjectQuery from "./createProject.surql?raw"

const schema = type({
	"image?": "Blob | undefined",
	name: "string",
	description: "string",
	"codeUrl?": "string",
	robloxUrl: "string",
	projectType: "string",
	"declarations?": "string",
	"reviewerNotes?": "string",
})

export const newProjectForm = form(
	schema,
	async ({
		image,
		name,
		description,
		codeUrl,
		robloxUrl,
		projectType,
		declarations,
		reviewerNotes,
	}) => {
		const { locals } = getRequestEvent()
		const { user } = await authorise(locals)

		console.log(
			image,
			name,
			description,
			codeUrl,
			robloxUrl,
			projectType,
			declarations,
			reviewerNotes
		)

		if (!fs.existsSync("./data/images"))
			fs.mkdirSync("./data/images", { recursive: true })

		const [, project] = await db.query<RecordId<"project">[]>(
			createProjectQuery,
			{
				user,
				name,
				description,
				codeUrl,
				robloxUrl,
				projectType,
				declarations,
				reviewerNotes,
			}
		)

		console.log("created", project)

		redirect(303, "/home")
	}
)
