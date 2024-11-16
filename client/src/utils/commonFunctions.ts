export const capitalize = (str: string) => {
    let result = str.charAt(0).toUpperCase() + str.slice(1);
    return result;
}