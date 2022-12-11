export default {
    verbose: true,  // 层次显示测试套件中每个测试的结果。
    bail: false, // 是否显示日志信息
    testRegex: "(/test/__tests__/.*|(\\.|/)(test|spec))\\.js?$", // 测试用例目录
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    testPathIgnorePatterns: ['/node_modules/'],
    transform: {
        '^.+\\.(js|ts|tsx)?$': 'babel-jest'
    }
};
