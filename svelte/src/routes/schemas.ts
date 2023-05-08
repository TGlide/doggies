import { z } from 'zod';

export function zodFormData<Schema extends z.ZodRawShape>(
	formData: FormData,
	schema: z.ZodObject<Schema>
) {
	const data: Record<string, unknown> = {};
	for (const [key, value] of Array.from(formData.entries())) {
		data[key] = value;
	}
	return schema.safeParse(data);
}

export const schemas = {
	add: z.object({
		name: z.string().nonempty(),
		breed: z.string().nonempty(),
		age: z.coerce.number().int().positive(),
		key: z.string().optional()
	}),
	delete: z.object({
		key: z.string().nonempty()
	}),
	save: z.object({
		key: z.string().nonempty(),
		willSave: z.enum(['true', 'false']).transform((value) => value === 'true')
	})
};
