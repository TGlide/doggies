<script lang="ts">
	import { enhance } from '$app/forms';
	import type { CompleteDog } from '$entities/Dog';
	import { dogs } from './state';

	export let dog: CompleteDog;
	let saved = dog.saved;
</script>

<div class="bg-zinc-900 rounded-md p-4 shadow-sm mt-4 w-64 h-64 flex flex-col">
	<h2 class="font-semibold">{dog.name}</h2>
	<p class="text-sm text-zinc-400">{dog.breed}</p>
	<p class="text-sm text-zinc-400">{dog.age} years old</p>

	<div class="flex gap-2 mt-auto ml-auto">
		<form
			action="?/delete"
			method="POST"
			use:enhance={() => {
				dogs.update((prev) => prev.filter((d) => d.key !== dog.key));
			}}
		>
			<input type="hidden" name="key" value={dog.key} />
			<button class="btn bg-red-200" type="submit"> Delete Entry </button>
		</form>
		<form
			action="?/save"
			method="POST"
			use:enhance={() => {
				saved = !saved;
			}}
		>
			<input type="hidden" name="key" value={dog.key} />
			<input type="hidden" name="willSave" value={`${saved !== true}`} />
			<button class="btn" type="submit">
				{saved ? 'Unsave' : 'Save'}
			</button>
		</form>
	</div>
</div>
