const RegexStore = {
    userName: /^[a-zA-Z]{3,}(\s{1}[a-zA-Z]+){1,2}$/,
    emailRegex: /^(?!.*\.\.)(?!\.)(?!.*\.$)[A-Za-z0-9]+([._%+-]?[A-Za-z0-9]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/,
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
    mobileRegex: /^[6789][0-9]{9}$/,
}

module.exports = RegexStore;