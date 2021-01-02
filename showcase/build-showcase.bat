@echo off

set CSS_FILES=..\\src\\core\\buttons\\Buttons.css;..\\src\\core\\form\\Form.css
set CSS_FILES=%CSS_FILES%;.\\build\\ronuse-generated.css;..\\src\\core\\misc\\Misc.css;..\\src\\core\\panels\\Panels.css
set CSS_FILES=%CSS_FILES%;..\\src\\style.css

call:clean
call:generate_styles
call:copy_css
call:minify
exit /b 0

:: Clean
:clean
    if exist build\\ronuse-react-ui.css (
        del build\\ronuse-react-ui.css
    )
    if exist build\\ronuse-generated.css (
        del build\\ronuse-generated.css
    )
    exit /b 0

:generate_styles:
    node --experimental-modules ./src/utils/generate_css.js
    exit /b 0

:: Copy Css
:copy_css
    for %%a in (%CSS_FILES%) do ( 
        type %%a >> build\\ronuse-react-ui.css
    )
    exit /b 0

:: Minify
:minify
    node ./node_modules/minify/bin/minify.js build\\ronuse-react-ui.css > build\\ronuse-react-ui.min.css
    call:clean
    exit /b 0