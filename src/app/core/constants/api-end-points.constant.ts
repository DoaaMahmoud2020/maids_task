export const COLLECTION: Record<string, string> = {
    users: 'users',
};
export const baseUrl = `https://reqres.in/api`;

export const API_URL = (key: string) => `${baseUrl}/${COLLECTION[key]}`;
