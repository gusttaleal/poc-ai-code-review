export function CleanSessionStorage() {
    if (typeof window !== "undefined" && window.sessionStorage) {
        sessionStorage.clear();
    }
}
