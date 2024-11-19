
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createFormData(data: Record<string, any>): FormData {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return formData;
};