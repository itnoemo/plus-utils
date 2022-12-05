module.exports = {
    testRegex: "(/test/__tests__/.*|(\\.|/)(test|spec))\\.js?$",
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    testPathIgnorePatterns: ['/node_modules/'],
    transform: {
        '^.+\\.(js|ts|tsx)?$': 'babel-jest'
    }
};