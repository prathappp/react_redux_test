import 'isomorphic-unfetch';

const URL = process.env.ROOT_URL || ` https://vpic.nhtsa.dot.gov/api/vehicles/`;

export async function sendRequest(path, options = {}) {
    const headers = { ...(options.headers || {}), 'Content-type': 'application/json; charset=UTF-8' };

    const response = await fetch(`${URL}${path}`, {
        method: 'GET',
        ...options,
        headers,
    });
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data;
}
