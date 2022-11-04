import * as importMapLoader from '@node-loader/import-maps';
import * as babelLoader from '@node-loader/babel';

const config = {
	loaders: [importMapLoader, babelLoader],
};

export default config;
