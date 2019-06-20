import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/AkaiMPD218.mjs',
    plugins: [
        terser()
    ],
    output: {
        file: 'dist/AkaiMPD218.min.js',
        format: 'umd',
        name: 'AkaiMPD218'
    }
};