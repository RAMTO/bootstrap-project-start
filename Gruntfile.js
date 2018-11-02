const gruntTask = require('load-grunt-tasks')
const sass = require('node-sass')
const imageminPngquant = require('imagemin-pngquant')
const imageminMozjpeg = require('imagemin-mozjpeg')

module.exports = (grunt) => {
  gruntTask(grunt)

  grunt.initConfig({

    browserSync: {
      bsFiles: {
        src: [
          'dist/**/*.css',
          'dist/**/*.html',
          'dist/**/*.js'
        ]
      },
      options: {
        watchTask: true,
        port: 3333,
        reloadDebounce: 2000,
        server: {
          baseDir: 'dist'
        }
      }
    },

    copy: {
      js: {
        expand: true,
        cwd: 'src/js/',
        src: '**/*.js',
        dest: 'dist/js/'
      },
      img: {
        expand: true,
        cwd: 'src/img/',
        src: '**/*.{png,jpg,gif,ico,svg}',
        dest: 'dist/img/'
      },
      css: {
        expand: true,
        cwd: 'src/css/',
        src: '**/*.css',
        dest: 'dist/css'
      },
      fonts: {
        expand: true,
        cwd: 'src/fonts/',
        src: '**/*.{ttf,otf,woff,woff2}',
        dest: 'dist/fonts/'
      },
      fontawesome: { expand: true, cwd: 'src/', src: ['webfonts/**'], dest: 'dist' }
    },

    nunjucks: {
      options: {
        data: grunt.file.readJSON('src/data/data.json'),
        paths: 'src/templates'
      },
      render: {
        files: [
          {
            expand: true,
            cwd: 'src/templates/',
            src: '*.njk',
            dest: 'dist/',
            ext: '.html'
          }
        ]
      }
    },

    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      dist: {
        files: {
          'dist/css/style.css': 'src/scss/style.scss'
        }
      }
    },

    autoprefixer: {
      dist: {
        files: {
          'dist/css/style.css': 'dist/css/style.css'
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: '**/*.html',
          dest: 'dist/'
        }]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css'],
          dest: 'dist/css'
        }]
      }
    },

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
          use: [imageminPngquant({ quality: 80 }), imageminMozjpeg({ quality: 80 })]
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    },

    watch: {
      data: {
        files: 'src/data/data.json',
        tasks: ['nunjucks']
      },
      templates: {
        files: 'src/**/*.njk',
        tasks: ['nunjucks']
      },
      css: {
        files: 'src/**/*.scss',
        tasks: ['sass', 'autoprefixer']
      },
      javascript: {
        files: ['src/**/*.js'],
        tasks: ['copy:js']
      },
      img: {
        files: 'src/**/*.{png,jpg,gif,ico,svg}',
        tasks: ['copy:img']
      }
    }

  })

  grunt.registerTask('common_prod', ['htmlmin', 'cssmin', 'imagemin'])

  grunt.registerTask('build:prod', ['nunjucks', 'copy', 'sass', 'autoprefixer', 'common_prod'])
  grunt.registerTask('build:dev', ['nunjucks', 'copy', 'sass', 'autoprefixer'])
  grunt.registerTask('default', ['browserSync', 'watch'])
}
