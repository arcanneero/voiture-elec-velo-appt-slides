'use strict';

/** Imports Gulp */
const gulp = require('gulp');
const del = require('del');
const path = require('path');
const fs = require('fs');
const browserSync = require('browser-sync').create();
const $ = require('gulp-load-plugins')();
var exec = require('gulp-exec');

/** Imports Reveal */
const map = require('map-stream');
const asciidoctor = require('asciidoctor')();
var asciidoctorRevealjs = require('asciidoctor-reveal.js');
asciidoctorRevealjs.register();

/** Définition des constantes */

// Dossier des sources à builder
const srcDir = 'prez';
// Dossier de sortie du build
const outDir = 'docs';
// Dossier racine des presentations au runtime (=path d'accès dans l'url. ex: http://..../prez)
let runtimePrezDir = '/voiture-elec-velo-appt-slides/';
let cdn = 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.7.0';
// Dossier de sortie du build des présentations
const prezOutDir = `${outDir}`;

// Constantes des extensions à prendre en compte pour les différents items du build
const adocIndexFiles = [`${srcDir}/**/index.adoc`, `${srcDir}/**/index-*.adoc`];
const adocWatchExtensions = [`${srcDir}/**/*.adoc`];
const mediasExtensions = [`${srcDir}/**/*.{svg,png,jpg,gif,webm}`];
const mermaidWatchExtensions = [`${srcDir}/**/*.mmd`];
const cssExtensions = [`${srcDir}/**/*.css`];
const jsExtensions = [`${srcDir}/**/*.js`];
const themesExtensions = [`themes/**/*.*`];
const pagesExtensions = [`pages/**/*.*`];

gulp.task('convert', () =>
  gulp.src(adocIndexFiles)
    .pipe(convertAdocToHtml())
    .pipe($.extReplace('.html'))
    .pipe(
      $.tap((file) => {
        // Utilisé pour ajouter un js custom au besoin 
        const customJsPath = path.join(path.dirname(file.path), 'js', 'custom.js');
        const hasCustomJs = fs.existsSync(customJsPath);
        if (hasCustomJs) {
          console.log('Ajout du fichier js custom');
          const newFile = file.contents.toString();
          const newContents = newFile.replace('</body>', '<script src="./js/custom.js"></script></body>');
          file.contents = new Buffer(newContents);
        }

        return file;
      }))
    .pipe(gulp.dest(prezOutDir))
);

gulp.task('copy-and-generate-mermaid-png', () =>
  gulp.src(mermaidWatchExtensions)
    .pipe(gulp.dest(prezOutDir))
    .pipe(exec('mmdc -i <%= file.path %> -o <%= file.path.replace("mmd", options.ext) %>', { ext: 'png' }))
);

gulp.task('dependencies', () =>
  gulp.src('node_modules/reveal.js/{css,js,lib,plugin}/**/*.*')
    .pipe(gulp.dest(`${prezOutDir}/node_modules/reveal.js`))
);

gulp.task('copy-medias', () =>
  gulp.src(mediasExtensions).pipe(gulp.dest(prezOutDir))
);

gulp.task('copy-css', () =>
  gulp.src(cssExtensions).pipe(gulp.dest(prezOutDir))
);

gulp.task('copy-js', () =>
  gulp.src(jsExtensions).pipe(gulp.dest(prezOutDir))
);

gulp.task('copy-themes', () =>
    gulp.src(themesExtensions).pipe(gulp.dest(`${outDir}/themes/`))
);

gulp.task('copy-pages', () =>
    gulp.src(pagesExtensions).pipe(gulp.dest(`${outDir}/`))
);

gulp.task('serveAndWatch', () => {
  browserSync.init({
    server: {
      baseDir: `./${outDir}/`
    },
    directory: true,
    notify: false,
    port: 3000
  });

  gulp.watch(adocWatchExtensions, () => $.sequence('convert', browserSync.reload));
  gulp.watch(mediasExtensions, () => $.sequence('copy-medias', browserSync.reload));
  gulp.watch(cssExtensions, () => $.sequence('copy-css', browserSync.reload));
gulp.watch(themesExtensions, () => $.sequence('copy-themes', browserSync.reload));
gulp.watch(jsExtensions, () => $.sequence('copy-js', browserSync.reload));
  gulp.watch(mermaidWatchExtensions, () => $.sequence('copy-and-generate-mermaid-png', browserSync.reload));
});


gulp.task('clean', () => del(outDir, { dot: true }));


// Build production files, the default task
gulp.task('default', cb =>
  $.sequence(
    'clean',
    'convert',
    ['dependencies', 'copy-css', 'copy-js', 'copy-medias', 'copy-themes', 'copy-pages', 'copy-and-generate-mermaid-png'],
    cb
  )
);

// Build dev files
gulp.task('serve', cb => {
        runtimePrezDir = '/';
        cdn = '/node_modules/reveal.js';
        $.sequence('default', 'serveAndWatch', cb)
    }
);


function convertAdocToHtml() {

    console.log(`convertAdocToHtml`);
  const attributes = {
      'revealjsdir': `${cdn}@`,
      'runtimePrezDir': `${runtimePrezDir}`,
      revealjsDefaultTiming : 30,
      revealjs_defaultTiming : 30,
      defaultTiming : 30
  };
  const options = {
    safe: 'safe',
    backend: 'revealjs',
    attributes: attributes,
    to_file: false,
    header_footer: true,
      revealjsDefaultTiming : 30,
      revealjs_defaultTiming : 30,
      defaultTiming : 30
  };

  return map((file, next) => {
    console.log(`Compilation en html de ${file.path}`);
    const newContent = asciidoctor.convertFile(file.path, options);
    file.contents = new Buffer(newContent);
    next(null, file);
  });
};
