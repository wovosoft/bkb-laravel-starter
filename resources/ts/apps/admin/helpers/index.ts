/**
 * @link https://stackoverflow.com/questions/36411566/how-to-transpose-a-javascript-object-into-a-key-value-array
 * @param obj
 * @return Array
 */

type Preview = {}

export const objectToTable = (obj: object): Preview[] => {
    if (!obj) {
        return [];
    }
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
}

export function getUrl(url: string = null, appends: string[] = null) {
    let apiUrl = new URL(url, import.meta.env.VITE_API_URL);
    if (appends) {
        appends.forEach((key, value) => {
            apiUrl.searchParams.append(key, value.toString());
        });
    }
    return apiUrl.href;
}
