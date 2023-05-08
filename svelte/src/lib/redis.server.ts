import { REDIS_TOKEN } from '$env/static/private';
import { Redis } from '@upstash/redis';

export const redis = new Redis({
	url: 'https://unbiased-quetzal-33842.upstash.io',
	token: REDIS_TOKEN
});
