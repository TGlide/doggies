import type { CompleteDog } from '$entities/Dog';
import { writable } from 'svelte/store';

export const dogs = writable<CompleteDog[]>([]);
