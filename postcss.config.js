import postcssENV from 'postcss-preset-env';
import rtl from 'postcss-rtl';

export default {
    plugins: [
        postcssENV(),
        rtl()
    ]
}
