module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-modules',
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-proposal-unicode-property-regex',
    ],
};
