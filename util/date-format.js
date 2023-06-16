import dayjs from "dayjs";

// function that formats date to something like "Fri June 16, 2023 at 10:05 am"
export default function dateFormat(timestamp) {
    return dayjs(timestamp).format("dddd, MMMM D, YYYY [at] h:mm A");
    }
    