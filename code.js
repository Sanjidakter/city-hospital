function convertToPascalCase(alias){
    return alias.split('-').map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join('');

}

const alias = 'about-us';
const pascalCaseName = convertToPascalCase(alias);
console.log(pascalCaseName);