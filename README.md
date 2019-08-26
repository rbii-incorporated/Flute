# Flute

A shortcut for getting started writing [Flutter integration tests](https://flutter.dev/docs/cookbook/testing/integration/introduction). These tests drive a simulator or emulator, making them useful for figuring out app behavior. 

It is necessary to download [Flutter](https://flutter.dev/docs/get-started/install) before using flute.

## Setup
From the root of a flutter project, one can setup integration testing.

```bash
flute setup
```

## Write
Inside test_driver/app_test.dart exists a scaffold for writing integration tests. There one can add functionality to the session.

First add a key to some widget.
```dart
Text(headerText, key: Key("categoryLabel"), style: Theme.of(context).textTheme.display1)
```

Then reference that widget, use the driver to query state. Finally assert tests using expect. 
```dart
import 'package:flutter_driver/flutter_driver.dart';
import 'package:test/test.dart';

void main() {

  group('View Submenus:', () {

    FlutterDriver driver;

    setUpAll(() async => driver = await FlutterDriver.connect());

    tearDownAll(() async => driver?.close());

    test('Open Menu', () async {
      final navLabel = find.byValueKey("leadingNav");
      final navText = await driver.getText(navLabel);
      expect(navText, "Menu");
      final titleLabel = find.byValueKey("titleLabel");
      final titleText = await driver.getText(titleLabel);
      expect(titleText, "Jacob's Restaurant");
    });

    test('Show Appetizers', () async {
      Future<dynamic> _label() async => await driver.getText(find.byValueKey("categoryLabel"));

      final appetizers = find.text("Appetizer");
      await driver.tap(appetizers);
      expect(await _label(), "Appetizer");
      var sandwich = find.text("Sandwich");
      await driver.tap(sandwich);
      expect(await _label(), "Appetizer, Sandwich");
      sandwich = find.text("Sandwich");
      await driver.tap(sandwich);
      expect(await _label(), "Appetizer");
    });
    
  });
}
```

## Test
From the root of a flutter project, one can drive integration testing.

```bash
flute drive
```
