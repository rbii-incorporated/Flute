module.exports = (path) => {
    require('child_process').execSync(
        'flutter drive --target=test_driver/app.dart',
        {stdio: 'inherit'}
    );
}