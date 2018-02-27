const stringify = (obj) => {
    if (typeof obj === "object" && obj != null) {
        let result = "";
        for (let x in obj) {
            if (typeof obj[x] === "object" && obj[x] != null) {
                result += `{${stringify(obj[x])}}`;
            } else {
                result += `${x}:${obj[x]},`;
            }
        }
        return result;
    }
    return null;
};

export default stringify;