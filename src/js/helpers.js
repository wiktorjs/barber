const wait = (s) => new Promise((resolve) => setInterval(resolve, s * 1000));

export {wait};
