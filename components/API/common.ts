export const catchError = (err : unknown) => {
    if (err instanceof Error) {
        throw new Error(err.message);
    } else {
        throw new Error("API error");
    }
}