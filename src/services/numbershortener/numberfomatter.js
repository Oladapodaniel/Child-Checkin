const numberFormatter = {
     convertNumber (converted) {
        if (converted <= 999) {
            return `${converted}`;
        } else if (converted >= 1000 && converted < 999999) {
            converted = Math.ceil(converted / 1000);
            return `${converted}k`;
        } else if (converted >= 1000000 && converted < 999999999) {
            converted = Math.floor(converted / 1000000);
            return `${converted}M`;
        } else if (converted >= 1000000000) {
            converted = Math.floor(converted / 1000000000);
            return `${converted}B`
        }
    }
}


export default numberFormatter