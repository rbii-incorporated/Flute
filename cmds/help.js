const menu = `
---------------------------------------------------------------------------------

  flute [command]

    setup ................... Add test_driver directory, dependencies, and scaffold.
    drive ................... Open simulator or emulator and run tests.

  Steps:

    1. Create flutter app, and cd into the root of the project.
    2. Run flute setup.
    3. In your flutter project, get all dependencies.
    4. Create integrations tests by editing test_driver/app_test.dart.
    5. Run flute drive.


---------------------------------------------------------------------------------
    `

module.exports = () => {
    console.log(menu)
}