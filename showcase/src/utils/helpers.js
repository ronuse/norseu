
export const getTextBetweenLine = (source, from, to) => {
    if (!source || source.length === 0) {
        return "";
    }
    const lines = source.split('\n');
    if (from <= 0) { from = 1; }
    from -= 1;
    if (to > lines.length) {
        to = lines.length-1;
    }
    let result = "";
    while (from <= to) {
        result += lines[from] + "\n";
        from++;
    }
    return result;
};
