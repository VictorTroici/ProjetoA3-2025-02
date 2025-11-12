import { getColorIterator } from "./utils/colors/color.js"
import blob from "./utils/blob/blob.js"
import shape from "./utils/shape/shape.js"

function widget(key, draw) {
    
    const CANVAS_SIZE = 1000;

    // --- 1. Paleta de Cores ---
    let nextColor = getColorIterator(key);
    const corFundo = nextColor();
    const corCorpo = nextColor();
    const corCabeca = nextColor();
    const corOlhos = nextColor();
    const corAcessorio = nextColor();
    const corPreto = "#111111";
    const corBranco = "#FFFFFF";

    // --- 2. Fundo ---
    draw.rect(CANVAS_SIZE, CANVAS_SIZE).fill(corFundo);

    // --- 3. Corpo (Opcional) ---
    // 50% de chance de ter um corpo
    if (key.next16() % 2 === 0) {
        draw.rect(400, 500).move(300, 500).fill(corCorpo);
    }

    // --- 4. Cabeça (Blob ou Shape) ---
    const cabecaSize = 600;
    const cabecaX = (CANVAS_SIZE - cabecaSize) / 2; // 200
    const cabecaY = (CANVAS_SIZE - cabecaSize) / 2; // 200

    let cabeca;
    if (key.next16() % 2 === 0) {
        cabeca = blob(key.next());
    } else {
        cabeca = shape(key.next());
    }
    cabeca.size(cabecaSize).move(cabecaX, cabecaY).fill(corCabeca);
    cabeca.addTo(draw);

    // --- 5. Olhos (Muitas Variações) ---
    let temDoisOlhos = false; // Flag para saber se podemos desenhar óculos
    const decisaoOlhos = key.next16() % 3;
    const olhoY = cabecaY + (cabecaSize * 0.35);

    if (decisaoOlhos === 0) {
        // Tipo 0: Visor
        draw.rect(400, 100).move(300, olhoY).fill(corOlhos);
        draw.rect(390, 90).move(305, olhoY + 5).fill(corPreto);
        draw.rect(380, 80).move(310, olhoY + 10).fill(corOlhos);

    } else if (decisaoOlhos === 1) {
        // Tipo 1: Dois Olhos
        temDoisOlhos = true;
        const olhoSize = 120;
        const olhoEsqX = 320;
        const olhoDirX = 560; // 1000 - 320 - 120

        // Sorteia formato (círculo ou quadrado)
        if (key.next16() % 2 === 0) {
            draw.circle(olhoSize).move(olhoEsqX, olhoY).fill(corBranco);
            draw.circle(olhoSize).move(olhoDirX, olhoY).fill(corBranco);
        } else {
            draw.rect(olhoSize, olhoSize).move(olhoEsqX, olhoY).fill(corBranco);
            draw.rect(olhoSize, olhoSize).move(olhoDirX, olhoY).fill(corBranco);
        }
        
        // Pupilas
        const pupilaSize = 50;
        draw.circle(pupilaSize).move(olhoEsqX + 35, olhoY + 35).fill(corPreto);
        draw.circle(pupilaSize).move(olhoDirX + 35, olhoY + 35).fill(corPreto);

    } else {
        // Tipo 2: Um Olho (Ciclope)
        const olhoSize = 180;
        draw.circle(olhoSize).move(410, olhoY - 30).fill(corBranco);
        // Pupila
        const pupilaSize = 80;
        draw.circle(pupilaSize).move(460, olhoY + 20).fill(corPreto);
    }

    // --- 6. Boca (Variações) ---
    const bocaY = cabecaY + (cabecaSize * 0.7);
    const decisaoBoca = key.next16() % 4;

    if (decisaoBoca === 0) {
        // Reta
        draw.polyline([400, bocaY, 600, bocaY])
            .fill('none').stroke({ color: corPreto, width: 15, linecap: 'round' });
    } else if (decisaoBoca === 1) {
        // Sorriso :)
        draw.polyline([400, bocaY, 500, bocaY + 50, 600, bocaY])
            .fill('none').stroke({ color: corPreto, width: 15, linecap: 'round' });
    } else if (decisaoBoca === 2) {
        // Boca 'O'
        draw.circle(80).move(460, bocaY - 20).fill(corPreto);
    }
    // else: Sem boca

    // --- 7. Acessório de Cabeça (Cabelo / Antena) ---
    const decisaoAcessorio = key.next16() % 4;
    
    if (decisaoAcessorio === 1) {
        // Cabelo (Blob)
        let cabelo = blob(key.next());
        cabelo.size(300).move(350, 150).fill(corAcessorio).opacity(0.8);
        cabelo.addTo(draw);
    } else if (decisaoAcessorio === 2) {
        // Antena
        draw.polyline([500, cabecaY, 500, cabecaY - 100])
            .fill('none').stroke({ color: corPreto, width: 10 });
        draw.circle(40).move(480, cabecaY - 140).fill(corAcessorio);
    }
    // else: Sem acessório

    // --- 8. Acessório de Rosto (Óculos) ---
    // Só desenha óculos se tiver dois olhos
    if (temDoisOlhos && (key.next16() % 3 === 0)) { // 33% de chance de óculos
        const oculosY = olhoY + 10;
        const oculosSize = 100;
        
        // Ponte
        draw.polyline([320 + (olhoSize/2), oculosY + (olhoSize/2), 560 + (olhoSize/2), oculosY + (olhoSize/2)])
            .fill('none').stroke({ color: corPreto, width: 8 });
            
        // Lentes
        draw.circle(oculosSize).move(320 + 10, oculosY).fill('none').stroke({ color: corPreto, width: 10 });
        draw.circle(oculosSize).move(560 + 10, oculosY).fill('none').stroke({ color: corPreto, width: 10 });
    }
}

export default widget;