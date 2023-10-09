interface SaveOnSessionStorageProps {
    key: string;
    value: string;
}

export function SaveOnSessionStorage({ key, value }: SaveOnSessionStorageProps) {
    if (typeof window !== "undefined" && window.sessionStorage) {
        sessionStorage.setItem(key, value);
    }
}
