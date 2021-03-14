
// TODO add generator for hover, active, focus
// TODO use options instead of parameters

export class SchemeBuilder {
    static generateSchemeHoverCss() {
        
    }

    static buildSchemeBorders(name, colorHex, everythingIsImportant) {
        let limit = 3;
        let groups = ['border'];
        let sides = [[''], ['top'], ['bottom'], ['left'], ['right'], ['left', 'right'], 
                        ['top', 'bottom'], /*['top', 'left'], ['top', 'right'], 
                        ['bottom', 'left'], ['bottom', 'right'], 
                        ['top', 'bottom', 'left'], ['top', 'bottom', 'right'], ['top', 'left', 'right'], ['bottom', 'left', 'right']*/
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

    static buildSchemeHoversAndFocuses(name, colorHex, everythingIsImportant) {
        let limit = 3;
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

    static buildAlternateColors(parameter, alternateColors) {
        let schemeCss = '';

        for (let alternateColor of alternateColors) {
            schemeCss += `\n/* ${alternateColor.name} */\n`;
            schemeCss += `.${parameter.name}-${alternateColor.name}-color { color: ${alternateColor.value}; }\n`;
            schemeCss += `.${parameter.name}-${alternateColor.name}-bg { background-color: ${alternateColor.value}; }\n`;
            if (alternateColor.generateSupplement) {
                schemeCss += this.buildSchemeBorders(alternateColor.name, alternateColor.value, parameter.everythingIsImportant);
                schemeCss += this.buildSchemeHoversAndFocuses(alternateColor.name, alternateColor.value, parameter.everythingIsImportant);
            }
        }

        return schemeCss;
    }

    static buildEssentials(parameter) {
        let schemeCss = `\n/* ${parameter.name} Scheme */\n`;
        schemeCss += `.${parameter.name} { color: ${parameter.textColor}; border: 1px solid ${parameter.baseColor}; background-color: ${parameter.baseColor}; }\n`;
        schemeCss += `.${parameter.name}-text { color: ${parameter.baseColor}; }\n`;
        schemeCss += `.${parameter.name}-bg { background-colo: ${parameter.baseColor}; }\n`;
        schemeCss += `.${parameter.name}-text-color { color: ${parameter.textColor}; }\n`;
        schemeCss += `.${parameter.name}-text-bg { background-color: ${parameter.textColor}; }\n`;
        schemeCss += this.buildSchemeBorders(parameter.name, parameter.baseColor, parameter.everythingIsImportant);
        schemeCss += this.buildSchemeHoversAndFocuses(parameter.name, parameter.baseColor, parameter.everythingIsImportant);

        return schemeCss;
    }

    static generateSchemeCss(parameter) {

        let schemeCss = `/*\n\tGenerated by Ronuse React UI Scheme Builder \n\t${parameter.embedSchemeOption}\n*/\n`;
        if (parameter.embedSchemeOption) {
            schemeCss += `\n/* Load the scheme option JSON below to edit the scheme on the Scheme Builde */`;
            schemeCss += `\n/*\n${JSON.stringify(parameter, null, "\t")}\n*/\n`;
        }
        schemeCss += this.buildEssentials(parameter);
        schemeCss += this.buildAlternateColors(parameter, parameter.altColors);
        
        return schemeCss;
        
    }

}