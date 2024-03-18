
const LETTER_INTERVAL = 5; //() milliseconds

/**
 * Recursively iterates over the span elements of a language element to trigger the showing animation.
 * @param {*} sr 
 * @param {jQuery} el 
 * @param {int} el_index 
 * @param {int|null} spec_detail Specific detail setting to be shown. ALl other detail settings will be ignored.
 * @returns {void}
 */
function showText(sr, el, el_index = 0, spec_detail = null) {
    if ($(el).length === 0)
        return;

    const el_detail = parseInt($(el).attr('detail'));

    if ((spec_detail !== null && el_detail !== spec_detail) || // Guards levels other than the specified one
        el_detail > detail_level // guards against levels higher than the currently set one
    ) {
        showText(sr, $(el).next(), el_index + 1, spec_detail);
        return;
    }

    animateShow(
        sr,
        el,
        el_index,
        () => showText(sr, $(el).next(), el_index + 1, spec_detail)
    );
}

/**
 * Recursively iterates over the html of a span element to progressively append it to the shadowroot span element of the language element.
 * @todo Add detail thrashold handling.
 * @param {*} sr 
 * @param {jQuery} temp_el 
 * @param {int} el_index 
 * @param {function} onFinish 
 * @param {int} letter_index 
 * @returns {void}
 */
function animateShow(sr, temp_el, el_index, onFinish, letter_index = 0) {
    const span_el = $(sr).find('.lang-paragraph').find('span')[el_index];
    const text = $(temp_el).html().trim();

    if (letter_index >= text.length) {
        onFinish();
        return;
    }

    $(span_el).append(text[letter_index++])
    setTimeout(
        () => animateShow(sr, temp_el, el_index, onFinish, letter_index),
        LETTER_INTERVAL
    );
}

/**
 * Recursively iterates over the span elements of a language element to trigger the hiding animation.
 * @param {} sr ShadowRoot of the current Lang element
 * @param {jQuery} el The first detail span element.
 * @param {int} el_index Index of the current element within the lang element.
 * @param {int|null} spec_detail A specified detail setting to be hidden. All other detail settings will be ignored.
 * @param {boolean} hideFully Boolean state defining if all detail settings in this element chain should be hidden.
 * @returns {void}
 */
function hideText(sr, el, el_index, spec_detail = null, hideFully = false) {
    if ($(el).length === 0)
        return;

    const el_detail = parseInt($(el).attr('detail'));

    if ((spec_detail !== null && el_detail !== spec_detail) || // Guards levels other than the specified one
        (!hideFully && el_detail <= detail_level) // guards against levels higher than the currently set one
    ) {
        hideText(sr, $(el).prev(), el_index - 1, spec_detail, hideFully);
        return;
    }

    animateHide(
        sr,
        el_index,
        () => hideText(sr, $(el).prev(), el_index - 1, spec_detail, hideFully)
    );
}

/**
 * Recursively iterates over the html of a span element to progressively hide it.
 * @todo Add detail thrashold handling.
 * @param {*} sr ShadowRoot of the current Lang element 
 * @param {int} el_index Index of the current span element within the lang element.
 * @param {function} onFinish Callback to trigger the hiding of the next span element.
 * @returns {void}
 */
function animateHide(sr, el_index, onFinish) {
    const span_el = $(sr).find('.lang-paragraph').find('span')[el_index];

    if ($(span_el).html().length <= 0) {
        onFinish();
        return;
    }

    $(span_el).html($(span_el).html().trim().slice(0, -1));
    setTimeout(() => animateHide(sr, el_index, onFinish), LETTER_INTERVAL);
}


/*

    On any switch, get the correct language containers, then work through the detail components in order (forward/backward).
    Check their current state

    On a language switch, immediately started hiding all components from the unselected language container.

    => Same function call but without a provided detail threshold
*/