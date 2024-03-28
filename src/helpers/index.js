export const convertDateFormatString = (date) => {
    date = `${date}`;
    const dateArr = date.split(" ");
    return dateArr[2] + " " + dateArr[1] + " " + dateArr[3];
}

export const converDateStringFormat = (date) => {
    const dateArr = date.split(" ");
    return dateArr[1] + " " + dateArr[0] + " " + dateArr[2];
}

export const allMonths = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const priorityArray = ["low", "medium", "high", "urgent"];