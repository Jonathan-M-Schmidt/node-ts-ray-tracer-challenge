import chapter1 from './chapter1';

const myArgs = process.argv.slice(2);

switch (myArgs[0]) {
    case '1':
        chapter1();
        break;
    default:
        console.error(`No matching chapter number found.`)
        myArgs[0] 
            ? console.error(`Number given: ${myArgs[0]}`) 
            : console.error('No chapter number given');
        break;
}