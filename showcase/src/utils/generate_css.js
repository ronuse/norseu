
import { group } from 'console';
import fs from 'fs';
import { SchemeBuilder } from './generate_scheme_css.mjs';

const everythingIsImportant = true;
const prefix = "r-r";
let generatedCss = "/* RONUSE 2022 - THIS CSS WAS AUTO GENERATED */\n";

let schemes = [['primary', '#3699FF'], ['secondary', '#3F4254'], ['success', '#1BC5BD'], ['info', '#8950FC'], ['warning', '#FFA800'], ['danger', '#F64E60']];
for (let scheme of schemes) {
    generatedCss += SchemeBuilder.generateSchemeCss(prefix + '-' + scheme[0], scheme[1], (scheme[0] === 'secondary' ? '#3F4254' : "white"), everythingIsImportant);
}

generatedCss += generateMarginAndPadding()
fs.writeFileSync('build/ronuse-generated.css', generatedCss);

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