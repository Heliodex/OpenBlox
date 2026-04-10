<script lang="ts">
	import Navbar from "$components/Navbar.svelte"

	let { children } = $props()
</script>

<div class="flex flex-row h-screen">
	<Navbar />

	<main class="overflow-auto w-full">
		{@render children()}
	</main>
</div>
