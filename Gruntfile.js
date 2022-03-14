const jitGrunt = require('jit-grunt');
const sass = require('sass');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = (grunt) => {
  jitGrunt(grunt, {
    nunjucks: 'grunt-nunjucks-2-html',
  });

  grunt.initConfig({
    browserSync: {
      bsFiles: {
        src: ['dist/**/*.css', 'dist/**/*.html', 'dist/**/*.js'],
      },
      options: {
        watchTask: true,
        port: 3333,
        reloadDebounce: 2000,
        server: {
          baseDir: 'dist',
        },
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env'],
        plugins: [
          '@babel/plugin-transform-classes',
          'transform-class-constructor-call',
        ],
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/js',
            src: '**/*.js',
            dest: 'dist/js',
          },
        ],
      },
    },

    copy: {
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist/',
        src: 'jquery.min.js',
        dest: 'dist/js/',
      },
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/js/',
        src: 'bootstrap.bundle.min.js',
        dest: 'dist/js/',
      },
      img: {
        expand: true,
        cwd: 'src/img/',
        src: '**/*.{png,jpg,gif,ico,svg}',
        dest: 'dist/img/',
      },
      css: {
        expand: true,
        cwd: 'src/css/',
        src: '**/*.css',
        dest: 'dist/css',
      },
      fonts: {
        expand: true,
        cwd: 'src/fonts/',
        src: '**/*.{ttf,otf,woff,woff2}',
        dest: 'dist/fonts/',
      },
      fontawesome: {
        expand: true,
        cwd: 'node_modules/@fortawesome/fontawesome-free',
        src: ['webfonts/**'],
        dest: 'dist',
      },
      fontawesomeCSS: {
        expand: true,
        cwd: 'node_modules/@fortawesome/fontawesome-free',
        src: ['css/all.min.css'],
        dest: 'dist',
      },
    },

    nunjucks: {
      options: {
        data: grunt.file.readJSON('src/data/data.json'),
        paths: 'src/templates',
        configureEnvironment: function (env, nunjucks) {
          env.addGlobal('todayTimestamp', Date.now());
        },
      },
      render: {
        files: [
          {
            expand: true,
            cwd: 'src/templates/',
            src: '*.njk',
            dest: 'dist/',
            ext: '.html',
          },
        ],
      },
    },

    sass: {
      options: {
        sourceMap: true,
        implementation: sass,
        outputStyle: 'expanded',
      },
      dist: {
        files: {
          'dist/css/style.css': 'src/scss/style.scss',
        },
      },
    },

    autoprefixer: {
      dist: {
        files: {
          'dist/css/style.css': 'dist/css/style.css',
        },
      },
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: '**/*.html',
            dest: 'dist/',
          },
        ],
      },
    },

    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: 'dist/css',
            src: ['*.css'],
            dest: 'dist/css',
          },
        ],
      },
    },

    uglify: {
      options: {
        mangle: false,
      },
      my_target: {
        files: [
          {
            expand: true,
            cwd: 'dist/js',
            src: '**/*.js',
            dest: 'dist/js',
          },
        ],
      },
    },

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
          use: [
            imageminPngquant({ quality: 80 }),
            imageminMozjpeg({ quality: 80 }),
          ],
        },
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dist/',
          },
        ],
      },
    },

    watch: {
      data: {
        files: 'src/data/data.json',
        tasks: ['nunjucks'],
      },
      templates: {
        files: 'src/**/*.njk',
        tasks: ['nunjucks'],
      },
      css: {
        files: 'src/**/*.scss',
        tasks: ['sass', 'autoprefixer'],
      },
      javascript: {
        files: ['src/**/*.js'],
        tasks: ['babel'],
      },
      img: {
        files: 'src/**/*.{png,jpg,gif,ico,svg}',
        tasks: ['copy:img'],
      },
    },
  });

  grunt.registerTask('common_prod', [
    'htmlmin',
    'cssmin',
    'uglify',
    'imagemin',
  ]);

  grunt.registerTask('build:prod', [
    'nunjucks',
    'copy',
    'babel',
    'sass',
    'autoprefixer',
    'common_prod',
  ]);

  grunt.registerTask('build:dev', [
    'nunjucks',
    'copy',
    'babel',
    'sass',
    'autoprefixer',
  ]);

  grunt.registerTask('default', ['browserSync', 'watch']);
};
