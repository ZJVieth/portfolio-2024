/**
 * 
 * Implicit Dependecy:
 * - $ = jQuery
 */

/* ------------------------------------
 * Language Select Button Click Handler
 */
$('.language-wrapper>div').click((e) => {
    const $button = $(e.currentTarget);
    const lang_selected = $button.data('lang');

    if (lang_selected === lang_current)
        return;

    hideLanguage(lang_current);
    showLanguage(lang_selected);
    updateLanguage(lang_selected);
});

/* ------------------------------------
 * Utility Functions
 */

/**
 * Updates both the localStorage and the global lang variable. 
 * @param {string} lang 
 */
function updateLanguage(lang) {
    localStorage.setItem('lang', lang);
    lang_current = lang;
}

/**
 * Initiates the hiding of all elements of the given language type.
 * @param {string} lang 
 */
function hideLanguage(lang) {
    $(`lang-${lang}`).each((i, el) => {
        hideText(
            $(el)[0]?.shadowRoot,
            $(el).find('span').last(),
            $(el).find('span').length - 1,
            null,
            true
        );
    });

}

/**
 * Initiates the showing of all elements of the given language type.
 * @param {string} lang 
 */
function showLanguage(lang) {
    $(`lang-${lang}`).each((i, el) => {
        showText(
            $(el)[0]?.shadowRoot,
            $(el).find('span').first(),
        );
    });
}

/* ------------------------------------
 * INIT
 */
var lang_current = null;
(function () {
    lang_current = localStorage.getItem('lang');
    if (!lang_current) {
        lang_current = navigator.language;
        if (lang_current.includes('de')) {
            lang_current = 'de';
        } else if (lang_current.includes('jp')) {
            lang_current = 'jp';
        } else {
            lang_current = 'en';
        }
    }

    showLanguage(lang_current);
})();