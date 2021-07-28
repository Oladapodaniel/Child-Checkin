import moment from "moment";

const dateFormatter = {
    monthDayTime(date) {
        let formattedDate = " ";
        if (date) {
            const monthDay = new Date(date).toString().split(" ").slice(1, 3).join(" ");
            const time = new Date(date).toString().split(" ").slice(4, 5).join(" ").slice(0, 5);

            const isTodaysDate = new Date(Date.now()).getDate() === new Date(date).getDate() ? true : false;
            formattedDate = `${isTodaysDate ? 'Today' :  monthDay}, ${time}`;
        }
        return formattedDate;
    },

    monthDayYear(date) {
        let formattedDate = " ";
        if (date) {
            const monthDay = new Date(date).toString().split(" ").slice(1, 3).join(" ");
            const year = new Date(date).getFullYear();

            formattedDate = `${monthDay}, ${year}`;
        }
        return formattedDate;
    },

    normalDate(date) {
        return moment.parseZone(
            new Date(date).toLocaleDateString(),
            "YYYY MM DD HH ZZ"
          )._i;
    },

}

export default dateFormatter;