'use strict';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { merge } from 'webpack-merge';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
// import { compile } from 'sass-embedded';

/**
 * @typedef { import('@types/webpack').Configuration } Configuration
 */

/**
 * Transform parameter into string
 * @template O
 * @param {O} obj
 * @returns {string}
 */
const objToStr = (obj) => {
  try {
    return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)?.[1] || '';
  } catch {
    return '';
  }
};
/**
 * Parameter is `JSON Object`
 * @template O
 * @param {O} obj
 * @returns {obj is Record<PropertyKey, unknown>}
 */
const isObj = (obj) => /Object/.test(objToStr(obj));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
/**
 * @param {string} dir
 */
const file = (dir) => path.resolve(path.resolve(__dirname, '..'), dir);
/**
 * @param {import('node:fs').PathLike} filePath
 * @param {string} encoding
 */
const canAccess = async (filePath, encoding) => {
  if (encoding == null) encoding = 'utf-8';
  await fs.promises.access(filePath, fs.promises.constants.R_OK | fs.promises.constants.W_OK);
  const data = await fs.promises.readFile(filePath, encoding);
  return data.toString(encoding);
};
const globOptions = {
  dot: true,
  gitignore: true,
  ignore: ['**/*.txt']
};
/**
 * @template {import('@types/webpack').StatsOptions} O
 * @param {O["env"]} env
 * @param {Configuration} args
 */
const main = async (env, args) => {
  if (!isObj(env)) throw new Error('--env flag required');
  if (!('brws' in env) || typeof env.brws !== 'string')
    throw new Error('--env brws=<Web Browser> flag required');
  const { brws } = env;
  const $src = 'src';
  const $dir = `build/${brws}`;
  const $dirs = ['_locales', 'img', 'js', 'webfonts', ['html', '[name][ext]']];

  const patterns = [
    {
      from: file(`${$src}/manifest/manifest.json`),
      to: file(`${$dir}/manifest.json`),
      /**
       * @param {string} content
       */
      async transform(content) {
        const {
          version,
          author,
          homepage: homepage_url
        } = JSON.parse((await canAccess('./package.json')) ?? '{}');
        const webextManifest = JSON.parse(
          await canAccess(file(`${$src}/manifest/${brws}.json`) ?? '{}')
        );
        const Manifest = JSON.parse(content);
        if ('$scheme' in Manifest) delete Manifest.$scheme;
        for (const [key, value] of Object.entries(webextManifest)) {
          if (key === '$scheme') continue;
          if (isObj(value)) {
            if (!isObj(Manifest[key])) Manifest[key] = {};
            for (const [k, v] of Object.entries(value)) {
              Manifest[key][k] = v;
            }
          } else {
            Manifest[key] = value;
          }
        }
        Object.assign(Manifest, {
          version,
          author,
          homepage_url
        });
        return JSON.stringify(Manifest, null, ' ');
      }
    }
  ];
  for (const f of $dirs) {
    if (Array.isArray(f)) {
      patterns.push({
        from: file(`${$src}/${f[0]}`),
        to: file(`${$dir}/${f[1]}`),
        globOptions
      });
    } else if (typeof f === 'string') {
      patterns.push({
        from: file(`${$src}/${f}`),
        to: file(`${$dir}/${f}`),
        globOptions
      });
    }
  }
  /**
   * @type { Configuration }
   */
  const Config = {
    context: file($src),
    entry: {
      entry: './js/entry.js'
    },
    output: {
      path: file(`${$dir}/js`),
      clean: true,
      filename: '[name].js',
      publicPath: `/${$dir}`
    },
    resolve: {
      extensions: ['.js']
    },
    plugins: [new CopyPlugin({ patterns })],
    node: false
  };
  /**
   * @type { Configuration }
   */
  const Production = {
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false
            }
          },
          extractComments: false,
          parallel: true
        })
      ]
    }
  };
  /**
   * @type { Configuration }
   */
  const Development = {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
      minimize: false
    },
    watch: true,
    watchOptions: {
      ignored: [
        '**/node_modules',
        '**/bower_components',
        '**/build',
        '**/tools',
        '**/utils',
        '**/*.ts'
      ]
    }
  };
  if (args.mode === 'development') {
    return merge(Config, Development);
  } else if (args.mode === 'production') {
    return merge(Config, Production);
  } else {
    throw new Error('No matching configuration was found!');
  }
};

export default main;
