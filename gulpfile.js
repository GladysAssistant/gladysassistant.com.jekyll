var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var axios = require('axios');
const URL = require('url').URL;
const fs = require('fs');
const download = require('download');
const path = require('path');
const slug = require('slug');

require('dotenv').config();

gulp.task('build', ['minify-css', 'get-products-airtable'], function() {
    console.log('DONE !');
});

gulp.task('concat-scripts', function() {
    return gulp.src(['./web/assets/js/prism.js','./web/assets/js/sweetalert.min.js','./web/assets/js/rrssb.min.js','./web/assets/js/app.js'])
        .pipe(concat('production.js'))
        .pipe(gulp.dest('./web/assets/js/production/'));
});

gulp.task('concat-css', function() {
    return gulp.src(['./assets/css/fontawesome-all.min.css', './assets/css/bootstrap.min.css', './assets/css/font-awesome.min.css' , './assets/css/timeline.css','./assets/css/rrssb.css', './assets/css/new-age.css', './assets/css/main.css' ])
        .pipe(concat('production.css'))
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('uglify-js', ['concat-scripts'] , function() {
    return gulp.src('./web/assets/js/production/production.js')
        .pipe(uglify())
        .pipe(rename('production.min.js'))
        .pipe(gulp.dest('./web/assets/js/production/'));
});

gulp.task('minify-css', ['concat-css'], () => {
  return gulp.src('./assets/css/production.css')
    .pipe(cleanCSS())
    .pipe(rename('production.min.css'))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('compress-images', function () {
    return gulp.src('./web/assets/images/products/*.jpg')
        .pipe(imageminJpegRecompress({loops: 6, quality:'medium', target:0.60})())
        .pipe(gulp.dest('./web/assets/images/products/compressed'));
});


gulp.task('get-products-airtable', function () {

  var products = [];
  
  // retrieving AirTable Spreadsheet
  return axios({
    method: 'get',
    url: 'https://api.airtable.com/v0/appTl6H2qEPMTU98o/Produits',
    headers: {
      authorization: 'Bearer ' + process.env.AIRTABLE_API_KEY
    }
  })
  .then((result) => {
    data = result.data;
    
    data.records.forEach((record) => {
      var tempProduct = {
        name: record.fields['Nom du produit'],
        description: record.fields['Description'],
        img: record.fields['Image du produit (1000x647)'],
        price: record.fields['Prix normal'],
        discount_price: record.fields['Prix en promotion'],
        amazon_link: record.fields['Lien Amazon'],
        other_store_link: record.fields['Lien autre magasin'],
        gladys_tutorial: record.fields['Lien vers tutoriel Gladys']
      };

      record.fields['Catégorie'] = record.fields['Catégorie'] || [];

      if(tempProduct.discount_price) {
        record.fields['Catégorie'].push('Promotion');
      }

      if(record.fields['Catégorie']) {
        tempProduct.categories = record.fields['Catégorie'];
        tempProduct.categoriesFlatten = flattenArray(tempProduct.categories);
      }

      if(tempProduct.name && tempProduct.description && tempProduct.img && tempProduct.price && tempProduct.amazon_link) {
        products.push(tempProduct);
      }
    });

    products.forEach((product) => {
      if(product.amazon_link && product.amazon_link.indexOf('www.amazon.fr') !== -1) {
        var amazonUrl = new URL(product.amazon_link);
        amazonUrl.searchParams.set('tag', 'gladproj-21');
        product.amazon_link = amazonUrl.toString();
      }

      product.img_file = slug(product.name) + path.parse(product.img).ext;
    });
  })
  .then(() => {
    
    // downloading all product images so it's served under gladysproject domain
    return Promise.all(products.map(product => download(product.img, 'assets/images/products-crowdsourced', {filename: product.img_file}))).then(() => {
        console.log('files downloaded!');
    });
  })
  .then(() => {
    
    products.forEach((product) => {
      product.img = path.parse(product.img).base;
    });

    return fs.writeFileSync('./_data/hardware-crowdsourced/fr.json', JSON.stringify(products, null, 4));
  });
});

function flattenArray(array) {
  var text = '';
  array.forEach((item) => {
    if(text.length) text += ',';
    text += item;
  });
  return text;
}