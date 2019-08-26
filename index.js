module.exports = () => {

    const path = process.argv[1];
    const cmd = process.argv[2];
  
    switch (cmd) {
        case 'setup':
            require('./cmds/setup')(path);
            break;

        case 'drive':
            require('./cmds/drive')(path);
            break;

        case 'help':
            require('./cmds/help')();
            break;
    
        default:
            console.error(`\n"${cmd}" is not a valid command. `);
            require('./cmds/help')();
            break;
    }
}