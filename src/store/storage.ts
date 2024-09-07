export function loadState<T>(key: string): T | undefined {
	try {
		const jsonState = localStorage.getItem(key);
		if (!jsonState) return undefined;

		return JSON.parse(jsonState);
	} catch (e) {
		console.error(e);
		return undefined;
	}
}

export function saveState<T>(key: string, data: T) {
	const stringState = JSON.stringify(data);
	localStorage.setItem(key, stringState);
}

export function cacheCart<T>(key: string, items: T) {
	const stringItems = JSON.stringify(items);
	localStorage.setItem(key, stringItems);
}