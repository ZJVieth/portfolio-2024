
var detail_level = 5;

$('#detail-input').change((e) => {
    const new_detail_level = parseInt($(e.currentTarget).val());
    const old_detail_level = detail_level;
    detail_level = new_detail_level;

    if (new_detail_level > old_detail_level) {
        for (let d = old_detail_level + 1; d <= new_detail_level; d++)
            showDetail(d);
        return;
    }

    // It can neber be equal, therefore...
    // If it is smaller...
    for (let d = old_detail_level; d > new_detail_level; d--)
        hideDetail(d);
});

/**
 * Initiates the showing of all elements within the current language of a specific detail level.
 * @param {int} detail Detail level of which the elements to show.
 */
function showDetail(detail) {
    $(`lang-${lang_current}`).each((i, el) => {
        showText(
            $(el)[0]?.shadowRoot,
            $(el).find('span').first(),
            0,
            detail
        );
    });
}

/**
 * Initiates the hiding of all elements within the current language of a specific detail level.
 * @param {int} detail Detail level of which the elements to hide.
 */
function hideDetail(detail) {
    $(`lang-${lang_current}`).each((i, el) => {
        hideText(
            $(el)[0]?.shadowRoot,
            $(el).find('span').last(),
            $(el).find('span').length - 1,
            detail
        );
    });
}