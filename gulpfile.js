const { src, dest } = require('gulp');
const rename = require('gulp-rename');
const del = require('del');

function changeJSConexaHML(clean) {
  src('src/variablesConexa.ts')
    .pipe(rename('variables.ts'))
    .pipe(dest('./src'));

  src('icons/iconset-conexa-hml/**/*').pipe(dest('./android/app/src/main/res'));
  clean();
}

function changeJSConexaPROD(clean) {
  src('src/variablesConexa.ts')
    .pipe(rename('variables.ts'))
    .pipe(dest('./src'));

  src('icons/iconset-conexa-prod/**/*').pipe(
    dest('./android/app/src/main/res')
  );

  del('./ios/ConexaSaude/Images.xcassets/AppIcon.appiconset/**/*', {
    force: true,
  });

  src('icons/iconset-conexa-prod-ios/AppIcon.appiconset/**/*').pipe(
    dest('./ios/ConexaSaude/Images.xcassets/AppIcon.appiconset')
  );
  clean();
}

function changeJSDocpassHML(clean) {
  src('src/env-files/envHml.js')
    .pipe(rename('env.js'))
    .pipe(dest('./src/env-files'));

  src('src/variablesDocpass.ts')
    .pipe(rename('variables.ts'))
    .pipe(dest('./src'));

  src('android/app/google-services-docpass-hml.json')
    .pipe(rename('google-services.json'))
    .pipe(dest('./android/app'));

  src('android/app/docpass-hml-build.gradle')
    .pipe(rename('build.gradle'))
    .pipe(dest('./android/app'));

  src('ios/GoogleService-Info-docpass-hml.plist')
    .pipe(rename('GoogleService-Info.plist'))
    .pipe(dest('./ios'));

  src('icons/iconset-docpass-hml/**/*').pipe(
    dest('./android/app/src/main/res')
  );

  del('./ios/Docpass/Images.xcassets/AppIcon.appiconset/**/*', {
    force: true,
  });

  src('icons/iconset-docpass-prod-ios/AppIcon.appiconset/**/*').pipe(
    dest('./ios/Docpass/Images.xcassets/AppIcon.appiconset')
  );

  src('android/docpass.gradle.properties')
    .pipe(rename('gradle.properties'))
    .pipe(dest('./android'));

  src('./android/app/src/main/manifest-files/DocpassAndroidManifestHml.xml')
    .pipe(rename('AndroidManifest.xml'))
    .pipe(dest('./android/app/src/main'));

  src('./android/app/src/main/res/values/braze-files/docpassBrazeHml.xml')
    .pipe(rename('braze.xml'))
    .pipe(dest('./android/app/src/main/res/values'));

  src('./ios/Docpass/AppDelegate.m-files/AppDelegateHmlDocpass.m')
    .pipe(rename('AppDelegate.m'))
    .pipe(dest('./ios/Docpass'));

  src('./ios/assets/appDocpass.json')
    .pipe(rename('app.json'))
    .pipe(dest('./ios/assets'));
  clean();
}

function changeJSDocpassPROD(clean) {
  src('src/variablesDocpass.ts')
    .pipe(rename('variables.ts'))
    .pipe(dest('./src'));

  src('android/app/google-services-docpass-prod.json')
    .pipe(rename('google-services.json'))
    .pipe(dest('./android/app'));

  src('android/app/docpass-prod-build.gradle')
    .pipe(rename('build.gradle'))
    .pipe(dest('./android/app'));

  src('android/docpass.gradle.properties')
    .pipe(rename('gradle.properties'))
    .pipe(dest('./android'));

  src('ios/GoogleService-Info-docpass-prod.plist')
    .pipe(rename('GoogleService-Info.plist'))
    .pipe(dest('./ios'));

  src('icons/iconset-docpass-hml/**/*').pipe(
    dest('./android/app/src/main/res')
  );

  del('./ios/Docpass/Images.xcassets/AppIcon.appiconset/**/*', {
    force: true,
  });

  src('icons/iconset-docpass-prod-ios/AppIcon.appiconset/**/*').pipe(
    dest('./ios/Docpass/Images.xcassets/AppIcon.appiconset')
  );

  src('./android/app/src/main/manifest-files/DocpassAndroidManifestProd.xml')
    .pipe(rename('AndroidManifest.xml'))
    .pipe(dest('./android/app/src/main'));

  src('./android/app/src/main/res/values/braze-files/docpassBrazeProd.xml')
    .pipe(rename('braze.xml'))
    .pipe(dest('./android/app/src/main/res/values'));

  src('./ios/Docpass/AppDelegate.m-files/AppDelegateProdDocpass.m')
    .pipe(rename('AppDelegate.m'))
    .pipe(dest('./ios/Docpass'));

  src('./ios/assets/appDocpass.json')
    .pipe(rename('app.json'))
    .pipe(dest('./ios/assets'));
  clean();
}

function changeHmlEnv(clean) {
  src('src/env-files/envHml.js')
    .pipe(rename('env.js'))
    .pipe(dest('./src/env-files'));

  src('android/app/google-services-conexa-hml.json')
    .pipe(rename('google-services.json'))
    .pipe(dest('./android/app'));

  src('ios/GoogleService-Info-conexa-hml.plist')
    .pipe(rename('GoogleService-Info.plist'))
    .pipe(dest('./ios'));

  src('./android/app/src/main/manifest-files/AndroidManifestHml.xml')
    .pipe(rename('AndroidManifest.xml'))
    .pipe(dest('./android/app/src/main'));

  src('./android/app/src/main/res/values/braze-files/brazeHml.xml')
    .pipe(rename('braze.xml'))
    .pipe(dest('./android/app/src/main/res/values'));

  src('./ios/ConexaSaude/AppDelegate.m-files/AppDelegateHml.m')
    .pipe(rename('AppDelegate.m'))
    .pipe(dest('./ios/ConexaSaude'));
  clean();
}

function changeProdEnv(clean) {
  src('src/env-files/envProd.js')
    .pipe(rename('env.js'))
    .pipe(dest('./src/env-files'));

  src('android/app/google-services-conexa-prod.json')
    .pipe(rename('google-services.json'))
    .pipe(dest('./android/app'));

  src('ios/GoogleService-Info-conexa-prod.plist')
    .pipe(rename('GoogleService-Info.plist'))
    .pipe(dest('./ios'));

  src('ios/GoogleService-Info-conexa-prod.plist')
    .pipe(rename('GoogleService-Info.plist'))
    .pipe(dest('./ios/ConexaSaude'));

  src('./android/app/src/main/manifest-files/AndroidManifestProd.xml')
    .pipe(rename('AndroidManifest.xml'))
    .pipe(dest('./android/app/src/main'));

  src('./android/app/src/main/res/values/braze-files/brazeProd.xml')
    .pipe(rename('braze.xml'))
    .pipe(dest('./android/app/src/main/res/values'));

  src('./ios/ConexaSaude/AppDelegate.m-files/AppDelegateProd.m')
    .pipe(rename('AppDelegate.m'))
    .pipe(dest('./ios/ConexaSaude'));
  clean();
}

function changeProdEnvDocpass(clean) {
  src('src/env-files/envProd.js')
    .pipe(rename('env.js'))
    .pipe(dest('./src/env-files'));

  clean();
}

exports.conexahml = changeJSConexaHML;
exports.conexaprod = changeJSConexaPROD;
exports.docpasshml = changeJSDocpassHML;
exports.docpassprod = changeJSDocpassPROD;
exports.hml = changeHmlEnv;
exports.prod = changeProdEnv;
exports.docpassenvprod = changeProdEnvDocpass;
