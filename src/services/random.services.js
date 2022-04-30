import { Random } from '../database/models';

export default class RandomServices {
	async getWhitelistToken() {
		const list = await Random.findAll({ where: { name: 'whitelist_token' } });
		return list;
	}

	async saveWhitelistToken(token) {
		const newEntry = await Random.create({
			name: 'whitelist_token',
			value: token,
		});
		return newEntry;
	}
}
