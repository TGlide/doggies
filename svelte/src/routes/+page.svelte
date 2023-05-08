<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { flip } from 'svelte/animate';
	import DogCard from './DogCard.svelte';
	import { schemas, zodFormData } from './schemas';
	import { dogs } from './state';
	import { fade, scale } from 'svelte/transition';

	export let data;
	$: dogs.set(data.dogs);
	$: sortedDogs = $dogs.sort((a, b) => a.name.localeCompare(b.name));

	let open = $page.url.searchParams.get('open') === 'true';

	function clickOutside(node: HTMLElement, callback: () => void) {
		node.addEventListener('click', (e) => {
			if (e.target === e.currentTarget) {
				callback();
			}
		});
	}
</script>

<main class="min-h-screen p-4">
	<h1 class="text-4xl font-bold">Doggies are so cool!</h1>
	<a class="btn inline-block mt-8" href="/?open=true" on:click|preventDefault={() => (open = true)}>
		Add dog
	</a>

	<div class="flex flex-wrap gap-4">
		{#each sortedDogs as dog (dog.key)}
			<div animate:flip={{ duration: 500 }} in:scale out:fade>
				<DogCard {dog} />
			</div>
		{/each}
	</div>

	<dialog
		class={`bg-black/50 w-screen h-screen p-0 fixed inset-0 place-items-center ${
			open ? 'grid' : 'hidden'
		}`}
		use:clickOutside={() => (open = false)}
	>
		<form
			class="text-white bg-zinc-900 rounded-lg p-6 shadow-sm mt-4 min-w-[400px] flex flex-col"
			method="POST"
			action="?/add"
			use:enhance={({ data }) => {
				const parsed = zodFormData(data, schemas.add);
				if (!parsed.success) return;

				const key = crypto.randomUUID();
				data.set('key', key);
				dogs.update((prev) => [
					...prev,
					{
						...parsed.data,
						saved: false,
						key: `dogs:${key}`
					}
				]);
				open = false;

				return async ({ update }) => {
					await update();
				};
			}}
		>
			<div class="flex items-center justify-between">
				<h2 class="font-semibold text-2xl">Add Dog</h2>
				<a href="/" class="btn inline-block" on:click|preventDefault={() => (open = false)}>
					Close
				</a>
			</div>
			<label class="block mt-4" for="name"> Name </label>
			<input
				class="block bg-transparent border border-zinc-600 rounded-sm px-2 py-1 mt-1"
				type="text"
				name="name"
				id="name"
				required
			/>
			<label class="block mt-4" for="breed"> Breed </label>
			<input
				class="block bg-transparent border border-zinc-600 rounded-sm px-2 py-1 mt-1"
				type="text"
				name="breed"
				id="breed"
				required
			/>
			<label class="block mt-4" for="age"> Age </label>
			<input
				class="block bg-transparent border border-zinc-600 rounded-sm px-2 py-1 mt-1"
				type="number"
				name="age"
				id="age"
				required
			/>

			<button class="btn ml-auto mt-8" type="submit"> Add Dog </button>
		</form>
	</dialog>
</main>
