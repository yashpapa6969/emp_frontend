export const convertDateFormatString = (date) => {
    date = `${date}`;
    const dateArr = date.split(" ");
    return dateArr[2] + " " + dateArr[1] + " " + dateArr[3];
}

export const convertDateStringFormat = (date) => {
    const dateArr = date.split(" ");
    return dateArr[1] + " " + dateArr[0] + " " + dateArr[2];
}
