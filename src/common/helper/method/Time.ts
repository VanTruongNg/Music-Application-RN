export const expiredTime = (expired: number) => {
    const currentTime = new Date(Date.now());
    currentTime.setSeconds(currentTime.getSeconds() + expired);
    return currentTime.valueOf();
}

export const getYear = (date: string) => {
    if (!date) return;
    return new Date(date).getFullYear();
}