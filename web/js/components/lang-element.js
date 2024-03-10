
class BaseLangElement extends HTMLElement {
    constructor(lang = "en") {
        super();

        const templ = document.getElementById("language-element");
        const templ_fragment = templ.content;
        const new_fragment = templ_fragment.cloneNode(true);

        const p_elem = new_fragment?.children[0];
        p_elem.classList.add(lang);
        p_elem.innerHTML = this.innerHTML;

        // Initially empty the shadowroot spans.
        for (let span_el of p_elem.children)
            span_el.innerHTML = "";

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(new_fragment);
    }
}

class ENElement extends BaseLangElement {
    constructor() {
        super("en");
    }
}
class DEElement extends BaseLangElement {
    constructor() {
        super("de");
    }
}
class JPElement extends BaseLangElement {
    constructor() {
        super("jp");
    }
}

// Define the new elements
customElements.define('lang-en', ENElement)
customElements.define('lang-de', DEElement)
customElements.define('lang-jp', JPElement)