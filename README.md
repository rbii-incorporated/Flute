# Flute

A shortcut for getting started writing [Flutter integration tests](https://flutter.dev/docs/cookbook/testing/integration/introduction). These tests drive a simulator or emulator, making them useful for figuring out app behavior. 

It is necessary to download [Flutter](https://flutter.dev/docs/get-started/install) before using flute.

## Setup
From the root of a flutter project, one can setup integration testing.

```bash
flute setup
```

## Write
Inside test_driver/app_test.dart exists a scaffold for writing integration tests. Here craft a route for the driver. Add expectations to the program as fit. 

Add a key to some widget. Then it can be indexed in the tree for testing.
```dart
Text(headerText, key: Key("categoryLabel"), style: Theme.of(context).textTheme.display1)
```

Reference that widget, use the driver to query state. Finally assert state using expect. 
The order of tests is relevant to expectations, test-a will drive state into test-b and test-a,test-b into test-c.
```dart
import 'package:flutter_driver/flutter_driver.dart';
import 'package:test/test.dart';

void main() {

  FlutterDriver driver;

  setUpAll(() async => driver = await FlutterDriver.connect());

  tearDownAll(() async => driver?.close());

  group('View Submenus:', () {

    test('Open Menu', () async {
      final navLabel = find.byValueKey("leadingNav");
      final navText = await driver.getText(navLabel);
      expect(navText, "Menu");
      final titleLabel = find.byValueKey("titleLabel");
      final titleText = await driver.getText(titleLabel);
      expect(titleText, "Restaurant");
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
After running flute-setup, and writing integration tests navigate to the root of the flutter project.
There drive your tests using:
```bash
flute drive
```
