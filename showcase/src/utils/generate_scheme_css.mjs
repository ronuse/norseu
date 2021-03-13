
// TODO add generator for hover, active, focus
// TODO use options instead of parameters

export class SchemeBuilder {
    static generateSchemeHoverCss() {
        
    }

    static buildSchemeBorders(name, colorHex, textColorHex, everythingIsImportant) {
        let limit = 20;
        let groups = ['border'];
        let sides = [[''], ['top'], ['bottom'], ['left'], ['right'], ['left', 'right'], 
                        ['top', 'bottom'], ['top', 'left'], ['top', 'right'], 
                        ['bottom', 'left'], ['bottom', 'right'], 
                        ['top', 'bottom', 'left'], ['top', 'bottom', 'right'], ['top', 'left', 'right'], ['bottom', 'left', 'right']
                    ];
        let units = [['px', 'px']/*, ['em', 'em'], ['percent', '%']*/];

        let schemeCss = `.${name}-border-color { border-color: ${colorHex}; }\n`;
        schemeCss += `.${name}-border-top-color { border-top-color: ${colorHex}; }\n`;
        schemeCss += `.${name}-border-bottom-color { border-bottom-color: ${colorHex}; }\n`;
        schemeCss += `.${name}-border-left-color { border-left-color: ${colorHex}; }\n`;
        schemeCss += `.${name}-border-right-color { border-right-color: ${colorHex}; }\n`;
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
                        let classCss = `.${name}-${group}${flatName}${index}${unit[0]} { `;
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

    static buildSchemeHoversAndFocuses(name, colorHex, textColorHex, everythingIsImportant) {
        let limit = 20;
        let groups = [['border', 'hover:hover'], ['border', 'focus:focus']];
        let sides = [[''], ['top'], ['bottom'], ['left'], ['right'], ['left', 'right'], 
                        ['top', 'bottom'], ['top', 'left'], ['top', 'right'], 
                        ['bottom', 'left'], ['bottom', 'right'], 
                        ['top', 'bottom', 'left'], ['top', 'bottom', 'right'], ['top', 'left', 'right'], ['bottom', 'left', 'right']
                    ];
        let units = [['px', 'px']/*, ['em', 'em'], ['percent', '%']*/];

        let schemeCss = `.${name}-border-hover:hover { z-index: 99; border-color: ${colorHex}  ${everythingIsImportant ? "!important" : ""}; }\n`;
        schemeCss += `.${name}-border-focus:focus { z-index: 99; border-color: ${colorHex}  ${everythingIsImportant ? "!important" : ""}; }\n`;
        for (let group of groups) {
            for (let unit of units) {
                for (let index = 1; index <= limit; index++) {
                    for (let side of sides) {
                        let flatName = "";
                        let divider = "-";
                        side.forEach(entry=>{
                            flatName += entry + '-';
                        })
                        if (flatName !== "") {
                            if (flatName != "-") {
                                flatName = '-' + flatName;
                            }
                        }
                        let classCss = `.${name}-${group[0]}${divider}${index}${unit[0]}${flatName}${group[1]} { `;
                        for (let pos of side) {
                            classCss += `${group[0]}${pos.length > 0 ? '-' + pos : ""}: ${index}${unit[1]} solid ${colorHex} ${everythingIsImportant ? "!important" : ""}; `;
                        }
                        classCss += '}\n';
                        schemeCss += classCss;
                    }
                }
            }
        }
        
        return schemeCss;
    }

    static generateSchemeCss(parameter) {
        let name = parameter.name;
        let colorHex = parameter.baseColor;
        let textColorHex = parameter.textColor;
        let everythingIsImportant = parameter.everythingIsImportant;

        let schemeCss = `.${name} {\n`;
        schemeCss += `    color: ${textColorHex};\n`;
        schemeCss += `    border: 1px solid ${colorHex};\n`;
        schemeCss += `    background-color: ${colorHex};\n`;
        schemeCss += `}\n`;
        schemeCss += `.${name}-text { color: ${colorHex}; }\n`;
        schemeCss += `.${name}-base-color { color: ${colorHex}; }\n`;
        schemeCss += `.${name}-text-color { color: ${textColorHex}; }\n`;
        schemeCss += `.${name}-background-color { background-color: ${textColorHex}; }\n`;
        schemeCss += `.${name}-background-color-base { background-color: ${colorHex}; }\n`;
        schemeCss += `.${name}-alt-1-color-bg { background-color: ${parameter.altColor1}; }\n`;
        schemeCss += `.${name}-alt-1-color-bg { background-color: ${parameter.altColor1}; }\n`;
        schemeCss += this.buildSchemeBorders(name, colorHex, textColorHex, everythingIsImportant);
        schemeCss += this.buildSchemeHoversAndFocuses(name, colorHex, textColorHex, everythingIsImportant);
        return schemeCss;
        
    }

}