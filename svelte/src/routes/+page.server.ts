import type { CompleteDog, Dog } from '$entities/Dog';
import { redis } from '$lib/redis.server';
import { schemas, zodFormData } from './schemas.js';

export async function load() {
	const dogKeys = await redis.keys('dogs:*');
	const dogs: CompleteDog[] = await redis.mget(...dogKeys);

	for (let i = 0; i < dogKeys.length; i++) {
		dogs[i] = {
			...dogs[i],
			key: dogKeys[i],
			saved: (await redis.get<boolean>(`saved:${dogKeys[i]}`)) ?? false
		};
	}

	return {
		dogs
	};
}

export const actions = {
	add: async ({ request }) => {
		const parsed = zodFormData(await request.formData(), schemas.add);
		if (!parsed.success) return;

		console.log(parsed.data.key);
		const key = parsed.data.key ?? crypto.randomUUID();
		await redis.set<Dog>(`dogs:${key}`, {
			name: parsed.data.name,
			breed: parsed.data.breed,
			age: parsed.data.age
		});

		return { key };
	},
	delete: async ({ request }) => {
		const parsed = zodFormData(await request.formData(), schemas.delete);
		if (!parsed.success) return;

		await redis.getdel(parsed.data.key);
	},
	save: async ({ request }) => {
		const parsed = zodFormData(await request.formData(), schemas.save);
		if (!parsed.success) return;

		await redis.set<boolean>(`saved:${parsed.data.key}`, parsed.data.willSave);
	}
};
