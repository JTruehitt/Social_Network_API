import dayjs from "dayjs";

const dateFormat = (timestamp) => {
    return dayjs(timestamp).format("dddd, MMMM D, YYYY [at] h:mm A");
    }
    
    export default dateFormat;