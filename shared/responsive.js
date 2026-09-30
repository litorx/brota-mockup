/* Brota · camada responsiva do estudio de mockups.
 *
 * As 76 telas foram desenhadas para revisao em tela grande: dois telefones de
 * 375-380px lado a lado, cada um com rotulo de plataforma, e em volta o texto
 * do estudio (cabecalho, decisoes, notas de handoff). Isso e material de quem
 * constroi. Num celular vira ruido: a pessoa rola tres telas de prosa antes de
 * ver o app, e ainda pega rolagem horizontal.
 *
 * Entao no celular a moldura some e sobra o app.
 *
 *   MODO APP (ate 700px, quando a tela tem exatamente 2 telefones)
 *     um telefone so, o da plataforma do aparelho de quem abriu, escalado para
 *     ocupar a tela inteira. Sem cabecalho, sem rotulo, sem notas. O fundo da
 *     pagina copia o fundo da tela do app, para a sobra em cima e embaixo nao
 *     aparecer como faixa.
 *
 *   MODO EMPILHADO (ate 1000px, o resto)
 *     galerias com varios telefones (notificacoes, celebracoes, widgets), o
 *     console de moderacao e a referencia de estados continuam mostrando tudo,
 *     so que empilhado e escalado para caber.
 *
 * Nada se perde: um botao no canto abre a gaveta com os controles de estado da
 * propria tela (que sao movidos, nao copiados, para os onclick continuarem
 * valendo), o alternador Android/iOS e o atalho para trazer as notas de volta.
 *
 * Escalar em vez de deixar o conteudo refluir e escolha: o que esta dentro do
 * .phone-screen foi desenhado em 375px e e esse layout que o handoff descreve.
 */
(function () {
  'use strict';

  var LIMITE_APP = 700;       // acima disso, tela grande: nada muda
  var LIMITE_EMPILHA = 1000;  // onde os dois telefones deixam de caber lado a lado

  /* ─────────────────────────────────────────────────────────────────────
     estilo
     ───────────────────────────────────────────────────────────────────── */
  var CSS = [
    /* ── empilhado ────────────────────────────────────────────────────── */
    '@media (max-width:' + LIMITE_EMPILHA + 'px){',
    '  .studio{padding:26px 14px 56px;}',
    '  .stage{flex-direction:column;align-items:center;gap:40px;}',
    '  .annotations{grid-template-columns:minmax(0,1fr);padding-left:14px;padding-right:14px;}',
    '  .brand-sub,.phone-label .desc{max-width:100%;}',
    '}',
    '@media (max-width:460px){',
    '  html,body{overflow-x:clip;}',
    '  .studio{padding:18px 10px 44px;}',
    '  .stage{gap:26px;}',
    '  .phone-wrapper{max-width:100%;}',
    '  .phone{transform:scale(var(--ph-escala,1));transform-origin:top center;',
    '         margin-bottom:var(--ph-folga,0px);}',
    '}',

    /* ── modo app: so o aplicativo ────────────────────────────────────── */
    'body.brota-app{margin:0;background:var(--brota-fundo,#FFF8F2);}',
    'body.brota-app .studio-header,',
    'body.brota-app .annotations,',
    'body.brota-app .phone-label,',
    'body.brota-app .controls{display:none;}',
    'body.brota-app .studio{padding:0;max-width:none;}',
    '.brota-oculto{display:none!important;}',
    'body.brota-app .stage{display:flex;flex-direction:column;gap:0;padding:0;',
    '  min-height:100dvh;justify-content:center;align-items:center;}',
    'body.brota-app .phone-wrapper{gap:0;}',
    /* o segundo telefone e o da outra plataforma; um de cada vez */
    'body.brota-app .stage>.phone-wrapper{display:none;}',
    'body.brota-app.ver-1 .phone-wrapper[data-brota="1"],',
    'body.brota-app.ver-2 .phone-wrapper[data-brota="2"]{display:flex;}',
    'body.brota-app .phone{box-shadow:none;transform:scale(var(--ph-escala,1));',
    '  transform-origin:top center;margin-bottom:var(--ph-folga,0px);}',

    /* ── gaveta ───────────────────────────────────────────────────────── */
    '.brota-bt{position:fixed;right:10px;bottom:76px;z-index:2147483000;width:34px;height:34px;',
    '  border-radius:50%;border:1px solid rgba(61,44,46,.14);background:rgba(255,248,242,.82);',
    '  -webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);color:#3D2C2E;cursor:pointer;',
    '  display:none;align-items:center;justify-content:center;padding:0;',
    '  box-shadow:0 6px 18px -6px rgba(61,44,46,.3);font:700 14px/1 system-ui;opacity:.62;}',
    'body.brota-movel .brota-bt{display:flex;}',
    '.brota-fundo-gaveta{position:fixed;inset:0;z-index:2147483000;background:rgba(20,12,14,.34);',
    '  opacity:0;pointer-events:none;transition:opacity .22s ease;}',
    'body.gaveta-aberta .brota-fundo-gaveta{opacity:1;pointer-events:auto;}',
    '.brota-gaveta{position:fixed;left:0;right:0;bottom:0;z-index:2147483001;',
    '  background:#FFF8F2;color:#3D2C2E;border-radius:20px 20px 0 0;padding:14px 14px calc(16px + env(safe-area-inset-bottom));',
    '  box-shadow:0 -12px 40px -12px rgba(61,44,46,.35);transform:translateY(102%);',
    '  transition:transform .26s cubic-bezier(.32,.72,0,1);max-height:74dvh;overflow-y:auto;',
    '  font-family:Nunito,system-ui,sans-serif;}',
    'body.gaveta-aberta .brota-gaveta{transform:translateY(0);}',
    '.brota-gaveta h4{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;opacity:.5;',
    '  margin:2px 0 8px;font-weight:800;}',
    '.brota-gaveta .controls{display:flex!important;flex-wrap:wrap;gap:7px;justify-content:flex-start;',
    '  margin:0 0 14px;padding:0;border:none;background:none;}',
    '.brota-plat{display:flex;gap:7px;margin-bottom:14px;}',
    '.brota-plat button{flex:1;padding:10px;border-radius:12px;border:1.5px solid rgba(61,44,46,.14);',
    '  background:transparent;color:inherit;font:700 13px Nunito,system-ui,sans-serif;cursor:pointer;}',
    '.brota-plat button.on{background:#F4A7B9;border-color:#F4A7B9;color:#fff;}',
    '.brota-notas{width:100%;padding:11px;border-radius:12px;border:1.5px solid rgba(61,44,46,.14);',
    '  background:transparent;color:inherit;font:600 12.5px Nunito,system-ui,sans-serif;cursor:pointer;}'
  ].join('\n');

  var style = document.createElement('style');
  style.setAttribute('data-brota', 'responsivo');
  style.textContent = CSS;
  (document.head || document.documentElement).appendChild(style);

  /* ─────────────────────────────────────────────────────────────────────
     estado
     ───────────────────────────────────────────────────────────────────── */
  var raiz = document.documentElement;
  var ehIos = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) ||
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  /* Cada tela e um documento novo. Sem guardar a escolha, quem esta no Android
     e quer ver o iOS teria que trocar de novo em cada uma das 76. */
  var CHAVE = 'brota-plataforma';
  function lembrada() {
    try { var v = localStorage.getItem(CHAVE); return (v === '1' || v === '2') ? +v : null; }
    catch (e) { return null; }
  }
  function lembrar(n) { try { localStorage.setItem(CHAVE, String(n)); } catch (e) {} }

  var plataforma = lembrada() || (ehIos ? 2 : 1);   // 1 = primeiro telefone, 2 = segundo
  var querNotas = false;
  var gaveta = null, botao = null;

  function telefones() {
    var st = document.querySelector('.stage');
    return st ? st.querySelectorAll(':scope>.phone-wrapper') : [];
  }

  /* Na maioria das telas o primeiro telefone e o Android. Em vez de confiar
     nisso, le o rotulo: se o primeiro falar de iOS, a ordem esta invertida. */
  function ordemInvertida(lista) {
    if (!lista.length) return false;
    var rotulo = lista[0].querySelector('.phone-label');
    return !!rotulo && /\bios\b|liquid glass|\bhig\b/i.test(rotulo.textContent);
  }

  function modoApp() {
    return !querNotas &&
           raiz.clientWidth <= LIMITE_APP &&
           telefones().length === 2;
  }

  /* A caixa de layout do .phone nao encolhe com o scale; a sobra de altura sai
     na margem, senao a pagina rola sem ter o que mostrar. */
  function medir() {
    var lista = telefones();
    var app = modoApp();
    var visivel = null;
    if (raiz.clientWidth <= LIMITE_APP) montarGaveta();
    document.body.classList.toggle('brota-movel', raiz.clientWidth <= LIMITE_APP);
    document.body.classList.toggle('brota-app', app);

    if (app) {
      /* a marca vai no elemento porque o palco e remontado pelo JS da tela, e
         :nth-of-type conta irmaos por tag, nao por classe */
      var invertida = ordemInvertida(lista);
      lista.forEach(function (w, i) {
        var pos = invertida ? (i === 0 ? 2 : 1) : i + 1;
        w.dataset.brota = String(pos);
        if (pos === plataforma) visivel = w;
      });
      document.body.classList.toggle('ver-1', plataforma === 1);
      document.body.classList.toggle('ver-2', plataforma === 2);
    } else {
      document.body.classList.remove('ver-1', 'ver-2');
    }

    var tel = app
      ? ((visivel || lista[0]) && (visivel || lista[0]).querySelector('.phone'))
      : document.querySelector('.phone');
    if (!tel) return;

    var larg = raiz.clientWidth, alt = raiz.clientHeight;
    var natL = tel.offsetWidth, natA = tel.offsetHeight;
    if (!natL || !natA) return;

    var escala;
    if (app) {
      /* cabe inteiro: nada do app pode ficar cortado */
      escala = Math.min(larg / natL, alt / natA);
    } else if (larg <= 460) {
      escala = Math.min(1, (larg - 20) / natL);
    } else {
      raiz.style.removeProperty('--ph-escala');
      raiz.style.removeProperty('--ph-folga');
      soltarPalco();
      return;
    }
    raiz.style.setProperty('--ph-escala', String(escala));
    raiz.style.setProperty('--ph-folga', (natA * (escala - 1)) + 'px');

    if (app) { isolarPalco(); pintarFundo(tel); } else { soltarPalco(); }
  }

  /* Esconder por nome de classe nao da conta: cada tela tem secao propria
     (lista de exemplos, segunda fileira de controles, notas soltas). Entao
     sobe do palco ate o body escondendo todo irmao pelo caminho. */
  var ocultos = [];
  function isolarPalco() {
    soltarPalco();
    var no = document.querySelector('.stage');
    if (!no) return;
    while (no.parentElement && no.parentElement !== document.documentElement) {
      var pai = no.parentElement, irmao = no;
      [].forEach.call(pai.children, function (f) {
        if (f === irmao) return;
        if (f.tagName === 'SCRIPT' || f.tagName === 'STYLE' || f.tagName === 'LINK') return;
        if (f.classList && (f.classList.contains('brota-gaveta') ||
                            f.classList.contains('brota-bt') ||
                            f.classList.contains('brota-fundo-gaveta'))) return;
        f.classList.add('brota-oculto');
        ocultos.push(f);
      });
      no = pai;
    }
  }
  function soltarPalco() {
    ocultos.forEach(function (f) { f.classList.remove('brota-oculto'); });
    ocultos = [];
  }

  /* A faixa que sobra em cima e embaixo some se a pagina tiver a cor da tela. */
  function pintarFundo(tel) {
    var dentro = tel.querySelector('.phone-screen') || tel;
    var cor = getComputedStyle(dentro).backgroundColor;
    if (!cor || cor === 'rgba(0, 0, 0, 0)' || cor === 'transparent') {
      cor = getComputedStyle(tel).backgroundColor;
    }
    if (cor && cor !== 'rgba(0, 0, 0, 0)') raiz.style.setProperty('--brota-fundo', cor);
  }

  /* ─────────────────────────────────────────────────────────────────────
     gaveta: o que sumiu da tela continua a um toque
     ───────────────────────────────────────────────────────────────────── */
  function montarGaveta() {
    if (gaveta || !document.body) return;

    botao = document.createElement('button');
    botao.className = 'brota-bt';
    botao.type = 'button';
    botao.setAttribute('aria-label', 'Opções da tela');
    botao.textContent = '≡';
    botao.onclick = function () { document.body.classList.toggle('gaveta-aberta'); };

    var fundo = document.createElement('div');
    fundo.className = 'brota-fundo-gaveta';
    fundo.onclick = function () { document.body.classList.remove('gaveta-aberta'); };

    gaveta = document.createElement('div');
    gaveta.className = 'brota-gaveta';

    var plat = document.createElement('div');
    plat.className = 'brota-plat';
    plat.innerHTML = '<button type="button" data-p="1">Android</button>' +
                     '<button type="button" data-p="2">iOS</button>';
    plat.querySelectorAll('button').forEach(function (b) {
      b.onclick = function () { trocarPlataforma(+b.dataset.p); };
    });

    var notas = document.createElement('button');
    notas.className = 'brota-notas';
    notas.type = 'button';
    notas.textContent = 'Ver as notas do handoff';
    notas.onclick = function () {
      querNotas = !querNotas;
      notas.textContent = querNotas ? 'Voltar para o app' : 'Ver as notas do handoff';
      document.body.classList.remove('gaveta-aberta');
      medir();
      if (querNotas) scrollTo(0, 0);
    };

    var tituloPlat = document.createElement('h4');
    tituloPlat.textContent = 'Plataforma';
    gaveta.appendChild(tituloPlat);
    gaveta.appendChild(plat);

    /* Mover, nao clonar: os onclick inline apontam para funcoes da propria
       tela. E o container nem sempre se chama .controls (tem tela com segunda
       fileira, tem tela sem nome nenhum), entao o que vale e quem e pai de um
       botao de estado. */
    var caixas = [];
    var SELETOR = '.state-btn,.plant-btn,.controls>button,.controls-row>button,.controls-row2>button';
    document.querySelectorAll(SELETOR).forEach(function (b) {
      var pai = b.parentElement;
      if (pai && caixas.indexOf(pai) < 0 && !gaveta.contains(pai)) caixas.push(pai);
    });
    var achouControls = document.querySelector('.controls');
    if (achouControls && caixas.indexOf(achouControls) < 0) caixas.push(achouControls);
    if (caixas.length) {
      var tituloEst = document.createElement('h4');
      tituloEst.textContent = 'Estados desta tela';
      gaveta.appendChild(tituloEst);
      caixas.forEach(function (c) { c.classList.add('controls'); gaveta.appendChild(c); });
    }
    gaveta.appendChild(notas);

    document.body.appendChild(botao);
    document.body.appendChild(fundo);
    document.body.appendChild(gaveta);
    marcarPlataforma();
  }

  function trocarPlataforma(n) {
    if (n !== 1 && n !== 2) return;
    plataforma = n;
    lembrar(n);
    marcarPlataforma();
    medir();
  }
  /* o index chama isso direto no iframe; mesma origem, sem postMessage */
  window.brotaPlataforma = trocarPlataforma;

  /* o evento de storage nao dispara no documento que escreveu, so nos outros:
     e exatamente o caso do index mandando no quadro de dentro */
  addEventListener('storage', function (e) {
    if (e.key === CHAVE) trocarPlataforma(+e.newValue);
  });

  function marcarPlataforma() {
    if (!gaveta) return;
    gaveta.querySelectorAll('.brota-plat button').forEach(function (b) {
      b.classList.toggle('on', +b.dataset.p === plataforma);
    });
  }

  /* ─────────────────────────────────────────────────────────────────────
     ciclo de vida
     ───────────────────────────────────────────────────────────────────── */
  var pendente = null;
  function agendar() {
    if (pendente) return;
    pendente = requestAnimationFrame(function () { pendente = null; medir(); });
  }

  function comecar() {
    if (raiz.clientWidth <= LIMITE_APP) montarGaveta();
    medir();
    /* varias telas remontam o palco inteiro quando muda de cena ou de planta */
    var palco = document.querySelector('.stage');
    if (palco && window.MutationObserver) {
      new MutationObserver(agendar).observe(palco, { childList: true, subtree: false });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', comecar, { once: true });
  } else {
    comecar();
  }
  addEventListener('resize', agendar);
  addEventListener('orientationchange', agendar);
  addEventListener('load', agendar);
})();
