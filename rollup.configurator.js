import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default name => ({
  entry: `${name}.js`,

  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),

    commonjs(),

    babel({
      presets: ['es2015-rollup'],
      exclude: 'node_modules/**',
      babelrc: false,
    }),

    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],

  dest: `build/${name}.js`,
});
