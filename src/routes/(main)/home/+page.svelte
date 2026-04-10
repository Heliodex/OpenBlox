<script lang="ts">
	import { enhance } from "$app/forms"

	const { data } = $props()

	const name = "OpenBlox"
	const tix = 0
</script>

<div id="main" class="mx-auto max-w-200 px-4 py-8">
	<h1 class="text-2xl">Dashboard</h1>

	<p class="pb-4">
		Welcome to your {name} dashboard! This page is under construction...
	</p>

	{#if data.connectedRoblox}
		<p>You have successfully connected your Roblox account!</p>
	{:else}
		<a
			href="/auth"
			class="btn bg-blue-500 hover:bg-blue-600 active:bg-blue-400 px-3 py-1.5 rounded-lg font-bold">
			Connect Roblox account
		</a>
	{/if}

	<p class="pt-4 pb-8">
		You have <b>{tix}</b>
		<span class="tix">Tickets.</span>
	</p>

	<h2>Projects</h2>

	<div class="grid gap-4 grid-cols-3 pt-4 pb-8">
		{#each data.projects as project}
			<a
				href="project/{project.id}"
				class="btn bg-neutral-700/50 hover:bg-neutral-800/50 active:bg-neutral-600/50 border border-neutral-500 rounded-lg">
				<img
					src="https://placehold.co/300x150"
					alt="Screenshot"
					class="rounded-t-lg" />
				<div class="p-4">
					<h3 class="text-xl font-bold">{project.name}</h3>
					<p class="text-sm">{project.description}</p>
				</div>
			</a>
		{/each}

		<a
			href="/new"
			class="btn bg-neutral-700/50 hover:bg-neutral-800/50 active:bg-neutral-600/50 border-2 border-neutral-500 rounded-lg border-dashed grid place-items-center">
			<div class="p-4 text-center">
				<h3 class="text-xl font-bold">New Project</h3>
				<p class="text-sm">Click to create a new project!</p>
			</div>
		</a>
	</div>

	<h2>Featured projects</h2>

	<div class="grid gap-4 grid-cols-3 pt-4 pb-8">
		<div class="bg-neutral-700/50 border border-neutral-500 rounded-lg">
			<img
				src="https://placehold.co/300x150"
				alt="Screenshot"
				class="rounded-t-lg" />
			<div class="p-4">
				<h3 class="text-xl font-bold">Placeholder 3</h3>
				<p class="text-sm">4 million lines of Luau!</p>
			</div>
		</div>

		<div class="bg-neutral-700/50 border border-neutral-500 rounded-lg">
			<img
				src="https://placehold.co/300x150"
				alt="Screenshot"
				class="rounded-t-lg" />
			<div class="p-4">
				<h3 class="text-xl font-bold">Placeholder 4</h3>
				<p class="text-sm">Now with more Microtransactions.</p>
			</div>
		</div>
	</div>

	<form use:enhance method="post" action="/api?/logout" class="pt-4">
		<button
			class="btn bg-red-500 hover:bg-red-600 active:bg-red-400 px-3 py-1.5 rounded-lg">
			<b>Log out</b>
		</button>
	</form>
</div>
