<script lang="ts">
	import { newProjectForm } from "./new.remote"

	const name = "OpenBlox"
</script>

<div id="main" class="mx-auto max-w-150 px-4 py-8">
	<h1 class="text-2xl">New project</h1>

	<form {...newProjectForm} enctype="multipart/form-data" class="pt-8">
		<fieldset>
			<label for="image">Project image</label>
			<input type="file" name="image" id="image" accept="image/*" />
		</fieldset>

		<fieldset>
			<label for="name">Project name</label>
			<input type="text" name="name" id="name" required />
		</fieldset>

		<fieldset>
			<label for="description">Project description</label>
			<textarea name="description" id="description" required></textarea>
		</fieldset>

		<fieldset>
			<label for="codeUrl">Code URL</label>
			<input
				type="url"
				name="codeUrl"
				id="codeUrl"
				placeholder="https://github.com/..." />
		</fieldset>

		<fieldset>
			<label for="robloxId">Roblox project ID</label>
			<input
				type="number"
				name="robloxId"
				id="robloxId"
				placeholder="123456789"
				required />
			<p class="pt-2 text-neutral-300">
				This is the number in the middle/at the end of the URL of your
				Roblox experience or asset.
			</p>
			<ul class="text-neutral-300 list-disc list-inside">
				<li>
					https://www.roblox.com/games/
					<span class="text-fuchsia-400">{"{number}"}</span>
				</li>
				<li>
					https://create.roblox.com/store/asset/
					<span class="text-fuchsia-400">{"{number}"}</span>
				</li>
			</ul>
		</fieldset>

		<fieldset>
			<label for="projectType">Project type</label>
			<select name="projectType" id="projectType" required>
				<option value="experienceNew">New experience</option>
				<option value="experienceUpdate">
					Existing experience update
				</option>
				<option value="libraryNew">New development library</option>
				<option value="libraryUpdate">
					Existing development library update
				</option>
			</select>
		</fieldset>

		<fieldset>
			<label for="declarations">Declarations</label>
			<select name="declarations" id="declarations" multiple>
				<option value="scriptingAI">
					Used generative AI for scripting
				</option>
				<option value="buildingAI">
					Used generative AI for building/modelling
				</option>
				<option value="team">Team project</option>
			</select>
			<small>Select as many as you feel apply.</small>
		</fieldset>

		<fieldset>
			<label for="reviewerNotes">Extra reviewer notes</label>
			<textarea name="reviewerNotes" id="reviewerNotes"></textarea>
		</fieldset>

		<button
			type="submit"
			class="btn bg-blue-500 hover:bg-blue-600 active:bg-blue-400 px-3 py-1.5 rounded-lg font-bold">
			Submit
		</button>
	</form>
</div>
