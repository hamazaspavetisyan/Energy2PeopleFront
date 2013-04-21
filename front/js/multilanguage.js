SUPPORTED_LANGUAGE : ["en", "es"];

var loadLocalizedString;
(loadLocalizedString = function(langParam){
    var language = window.navigator.language, lang; 
    console.log('loadLocalizedString with Navigator Language: ' + language);
    if (!langParam) {
        //Try to guess the best suited language
        if(language) {
             lang = language.substring(0,2);
        } else {
             lang = 'en';
        }
        if(lang != 'en' && lang != 'es') {

            lang = 'en';//If the language is not available : english by default
        }
    } else {
        lang = langParam;
    }

    console.log('language: ' + lang);

    filename = 'lib/string-'+lang+'.js';

    console.log("filename= "+ filename)
    try {
        $.ajaxSetup({async: false});
        $.getScript(filename);//We don't use the async callback, because we need the translation in the next method
        $.ajaxSetup({async: true});

    } catch (e) {
        console.log("error");
    }

})();