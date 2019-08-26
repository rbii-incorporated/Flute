module.exports = async (path) => {

    fs = require('fs');

    const readline = require('readline');

    var filePath = process.cwd();

    var yamlPath = filePath + "/pubspec.yaml";

    console.log("\nSetting up dependencies...\n")
    var contents = fs.readFileSync(yamlPath, 'utf8').split("\n");

    var pubspecString = "";
    var next = false;
    var grandparent = "";
    var prev = "";

    function isPrevPrefix(temp) {
        return isPrefix(prev, temp);
    }

    function isGrandparentPrefix(temp) {
        return isPrefix(grandparent, temp);
    }

    function isPrefix(pref, temp) {
        return pref.indexOf(temp) > -1;
    }

    var arrayLength = contents.length;
    for (var i = 0; i < arrayLength; i++) {
        var line = contents[i];
        if (next && !isPrefix(line, "flutter_driver")) {
            pubspecString += "  flutter_driver:\n    sdk: flutter\n  test: any\n\n";
        } else {
            pubspecString += line + "\n";
        }
        if (isPrevPrefix("flutter_test:") && isGrandparentPrefix("dev_dependencies:") && isPrefix(line, "sdk: flutter")) {
            next = true;
        } else {
            next = false;
        }
        grandparent = prev;
        prev = line;
    }


    if (pubspecString.length > 1) {

        var path = require("path");

        fs.writeFile(yamlPath, pubspecString, function (err) {
            if (err) {
                return console.log(err);
            } else {
                const { execSync } = require('child_process');
                execSync('source $HOME/.bash_profile');
                execSync('flutter pub get', {stdio: 'inherit'} );
                console.log('\nFinished, open test_driver/app_test.dart and write integration tests. Then run flute drive.\n');
            }
        });

        var driverDir = filePath + "/test_driver";

        if (!fs.existsSync(driverDir)){
            fs.mkdirSync(driverDir);
        }

        var name = path.basename(filePath);

        var appContent = "import 'package:flutter_driver/driver_extension.dart';\nimport 'package:{name}/main.dart' as app;\n\nvoid main() {\n    enableFlutterDriverExtension();\n    app.main();\n}".replace(/{name}/g    , name);

        fs.writeFile(driverDir + "/app.dart", appContent, function (err) {
            if (err) {
                return console.log(err);
            }
        });


        var driverContent = "import 'package:flutter_driver/flutter_driver.dart';\nimport 'package:test/test.dart';\n\nvoid main() {\n\n    FlutterDriver driver;\n\n    setUpAll(() async => driver = await FlutterDriver.connect());\n\n    tearDownAll(() async => driver?.close());\n\n   group('Welcome:', () {\n\n      test('Open Menu', () async {\n         // This is an example that uses a widget key to figure out if the menu has opened.\n         //final navLabel = find.byValueKey('leadingNav');\n         //final navText = await driver.getText(navLabel);\n         //expect(navText, 'Menu');\n      });\n\n\n   });\n\n}";

        fs.writeFile(driverDir + "/app_test.dart", driverContent, function (err) {
            if (err) {
                return console.log(err);
            }
        });




    }

}