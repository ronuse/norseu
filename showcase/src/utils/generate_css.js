
const { group } = require('console');
const fs = require('fs');

const everythingIsImportant = true;
const prefix = "r-r";
let generatedCss = "/* RONMUSE 2020 - THIS CSS WAS AUTO GENERATED */\n";
generateSchemeCss()
generateMarginAndPadding()
fs.writeFileSync('build/ronuse-generated.css', generatedCss);

// TODO add generator for hover, active, focus

function buildSchemeBorders(name, colorHex, textColorHex) {
    let limit = 10;
    let groups = ['border'];
    let sides = [[''], ['top'], ['bottom'], ['left'], ['right'], ['left', 'right'], 
                    ['top', 'bottom'], ['top', 'left'], ['top', 'right'], 
                    ['bottom', 'left'], ['bottom', 'right'], 
                    ['top', 'bottom', 'left'], ['top', 'bottom', 'right'], ['top', 'left', 'right'], ['bottom', 'left', 'right']
                ];
    let units = [['px', 'px'], ['em', 'em'], ['percent', '%']];

    let schemeCss = `.${prefix}-${name}-border-color { border-color: ${colorHex}; }\n`;
    schemeCss += `.${prefix}-${name}-border-top-color { border-top-color: ${colorHex}; }\n`;
    schemeCss += `.${prefix}-${name}-border-bottom-color { border-bottom-color: ${colorHex}; }\n`;
    schemeCss += `.${prefix}-${name}-border-left-color { border-left-color: ${colorHex}; }\n`;
    schemeCss += `.${prefix}-${name}-border-right-color { border-right-color: ${colorHex}; }\n`;
    for (let group of groups) {
        for (let unit of units) {
            for (let index = 1; index <= limit; index++) {
                for (let side of sides) {
                    let flatName = "";
                    side.forEach(entry=>{
                        flatName += '-' + entry;
                    })
                    if (side[0].length > 0) {
                        flatName += '-';
                    }
                    let classCss = `.${prefix}-${name}-${group}${flatName}${index}${unit[0]} { `;
                    for (let pos of side) {
                        classCss += `${group}${pos.length > 0 ? '-' + pos : ""}: ${index}${unit[1]} solid ${colorHex} ${everythingIsImportant ? "!important" : ""}; `;
                    }
                    classCss += '}\n';
                    schemeCss += classCss;
                }
            }
        }
    }
    return schemeCss;
}

function generateSchemeCss() {
    let schemes = [['primary', '#3699FF'], ['secondary', '#3F4254'], ['success', '#1BC5BD'], ['info', '#8950FC'], ['warning', '#FFA800'], ['danger', '#F64E60']];
    let buildScheme = (name, colorHex, textColorHex) => {
        let schemeCss = `.${prefix}-${name} {\n`;
        schemeCss += `    color: ${textColorHex};\n`;
        schemeCss += `    border: 1px solid ${colorHex};\n`;
        schemeCss += `    background-color: ${colorHex};\n`;
        schemeCss += `}\n`;
        schemeCss += `.${prefix}-${name}-text { color: ${colorHex}; }`;
        return schemeCss;
    }
    for (let scheme of schemes) {
        generatedCss += (buildScheme(scheme[0], scheme[1], (scheme[0] === 'secondary' ? '#3F4254' : "white")))
        generatedCss += (buildSchemeBorders(scheme[0], scheme[1], (scheme[0] === 'secondary' ? '#3F4254' : "white")))
    }
}

function generateMarginAndPadding() {
    let limit = 20;
    let groups = ['margin', 'padding'];
    let sides = [['top'], ['bottom'], ['left'], ['right'], ['left', 'right'], 
                    ['top', 'bottom'], ['top', 'left'], ['top', 'right'], 
                    ['bottom', 'left'], ['bottom', 'right'], 
                    ['top', 'bottom', 'left'], ['top', 'bottom', 'right'], ['top', 'left', 'right'], ['bottom', 'left', 'right']
                ];
    let units = [['px', 'px'], ['em', 'em'], ['percent', '%']];


    for (let group of groups) {
        for (let unit of units) {
            for (let index = 0; index <= limit; index++) {
                for (let side of sides) {
                    let flatName = "";
                    side.forEach(entry=>{
                        flatName += '-' + entry;
                    })
                    let classCss = `.${prefix}-${group}${flatName}-${index}${unit[0]} {\n`;
                    for (let pos of side) {
                        classCss += `    ${group}-${pos}: ${index}${unit[1]}${everythingIsImportant ? " !important" : ""};\n`;
                    }
                    classCss += '}\n';
                    generatedCss += classCss;
                }
            }
        }
    }
}