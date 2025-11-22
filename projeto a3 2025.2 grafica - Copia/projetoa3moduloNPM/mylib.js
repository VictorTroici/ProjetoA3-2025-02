import { createSVGWindow } from 'svgdom';
import { SVG, registerWindow } from '@svgdotjs/svg.js';
import keygen from "./widget/keygen.js"
import widget from "./widget/widget.js"

const lib = {

    getSVG(text) {
        keygen.getKeyParams(text)
        // Cria uma Janela e um documento SVG Fantasma (sem navegador) 
        const window = createSVGWindow();
        const document = window.document;
        registerWindow(window, document);
        // Cria um SVG canvas (biblioteca SVGJS)
        const canvas = SVG(document.documentElement).size(1000, 1000);
        // Chama sua função widget
        widget(keygen, canvas)
        // devolve String contendo SVG
        return canvas.svg();
    }

}

export default lib
