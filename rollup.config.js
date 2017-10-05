import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

export default [
    // Browser-friendly UMD build.
    {
        entry: 'src/main.js',
        dest: pkg.browser,
        targets: [
            { dest: pkg.browser, format: 'umd' },
            { dest: pkg.browser.replace('dist', 'docs'), format: 'umd' }
        ],
        format: 'umd',
        moduleName: 'bubbly',
        plugins: [
            babel(),
            uglify()
        ]
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    {
        entry: 'src/main.js',
        targets: [
            { dest: pkg.main, format: 'cjs' },
            { dest: pkg.module, format: 'es' }
        ],
        plugins: [
            babel()
        ]
    }
]
