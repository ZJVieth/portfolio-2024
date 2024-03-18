
const DATA_BASE = 'data/';
const DATA_EXT = '.html';

async function loadData(index = 0) {

    const res = await fetch(`${DATA_BASE}${index}${DATA_EXT}`);

    if (!res.ok)
        return;

    const body = await res.text();
    const $content = $($.parseHTML(body));

    $('.content').append($content);
    $content.each((i, oel) => {
        $(oel).find(`lang-${lang_current}`).addBack(`lang-${lang_current}`).each((i, el) => {
            showText(
                $(el)[0]?.shadowRoot,
                $(el).find('span').first(),
            );
        });
    });

    await loadData(index + 1);
}

loadData()
    .then(() => {
        $('.loader').remove();
    });