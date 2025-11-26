import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

const STORAGE_NAMESPACE = 'auth';

export const setSecureItem = async (key: string, value: string) => {
    await SecureStoragePlugin.set({
        key: `${STORAGE_NAMESPACE}.${key}`,
        value
    });
};

export const getSecureItem = async (key: string) => {
    const { value } = await SecureStoragePlugin.get({
        key: `${STORAGE_NAMESPACE}.${key}`
    });
    return value;
};

export const removeSecureItem = async (key: string) => {
    try {
        await SecureStoragePlugin.remove({
            key: `${STORAGE_NAMESPACE}.${key}`
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const clearSecureStorage = async () => {
    await SecureStoragePlugin.clear();
};

export const hasSecureItem = async (key: string): Promise<boolean> => {
    try {
        await SecureStoragePlugin.get({
            key: `${STORAGE_NAMESPACE}.${key}`
        });
        return true;
    } catch (error) {
        return false;
    }
};