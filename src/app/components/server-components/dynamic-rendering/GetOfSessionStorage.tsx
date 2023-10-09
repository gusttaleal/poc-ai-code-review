interface GetOfSessionStorageProps {
    key: string;
}

export function GetOfSessionStorage({ key }: GetOfSessionStorageProps): string {
    if (typeof window !== "undefined" && window.sessionStorage) {
        return sessionStorage.getItem(key) ?? "";
    }
    return ""

}
