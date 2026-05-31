/* =====================================================================
   Brota - Plant SVGs (FONTE UNICA / single source of truth)
   ---------------------------------------------------------------------
   Arte padronizada dos 5 arquetipos (Lavanda, Girassol, Cacto,
   Cerejeira, Lotus), kawaii + animada, viewBox 80x80 (Lotus 4 4 72 72).
   Cor do arquetipo via placeholder __CLR__ (ver design-tokens.md).

   Carregue ANTES do script da pagina:
     <script src="../shared/plant-svgs.js"></script>

   Globais expostos: FACE_HAPPY, FACE_SAD, SPARKLES, POT, POT_DRY,
   plantSVGs, wiltedSVGs, renderPlantSVG(name, color, wilted)
   ===================================================================== */

/* ── Plant SVGs — kawaii faces on ALL, rich animation, alive ── */

var FACE_HAPPY = ''
  /* Eyes — blink */
  +'<ellipse cx="36" cy="38" rx="2.2" ry="2.5" fill="#4A3728"><animate attributeName="ry" values="2.5;0.3;2.5" dur="3.5s" begin="1.5s" repeatCount="indefinite"/></ellipse>'
  +'<ellipse cx="44" cy="38" rx="2.2" ry="2.5" fill="#4A3728"><animate attributeName="ry" values="2.5;0.3;2.5" dur="3.5s" begin="1.5s" repeatCount="indefinite"/></ellipse>'
  /* Eye shine */
  +'<circle cx="37" cy="37" r="1" fill="white" opacity="0.95"/>'
  +'<circle cx="45" cy="37" r="1" fill="white" opacity="0.95"/>'
  /* Smile — bouncy */
  +'<path d="M37 43C38.5 45.5 41.5 45.5 43 43" stroke="#4A3728" stroke-width="1.5" stroke-linecap="round" fill="none"><animate attributeName="d" values="M37 43C38.5 45.5 41.5 45.5 43 43;M37.5 43.5C38.5 45 41.5 45 42.5 43.5;M37 43C38.5 45.5 41.5 45.5 43 43" dur="4s" begin="3s" repeatCount="indefinite"/></path>'
  /* Blush — pulse */
  +'<circle cx="32.5" cy="41" r="3" fill="#F4A7B9" opacity="0.18"><animate attributeName="opacity" values="0.18;0.32;0.18" dur="3s" repeatCount="indefinite"/></circle>'
  +'<circle cx="47.5" cy="41" r="3" fill="#F4A7B9" opacity="0.18"><animate attributeName="opacity" values="0.18;0.32;0.18" dur="3s" repeatCount="indefinite"/></circle>';

var FACE_SAD = ''
  /* Eyes — big and sad, no blink */
  +'<ellipse cx="36" cy="37" rx="2.2" ry="2.8" fill="#4A3728" opacity="0.92"/>'
  +'<ellipse cx="44" cy="37" rx="2.2" ry="2.8" fill="#4A3728" opacity="0.92"/>'
  /* Eye shine */
  +'<circle cx="37" cy="36" r="0.9" fill="white" opacity="0.85"/>'
  +'<circle cx="45" cy="36" r="0.9" fill="white" opacity="0.85"/>'
  /* Tear sheen in eyes */
  +'<ellipse cx="36" cy="39" rx="1.5" ry="0.8" fill="#A8D4F0" opacity="0.3"/>'
  +'<ellipse cx="44" cy="39" rx="1.5" ry="0.8" fill="#A8D4F0" opacity="0.3"/>'
  /* Sad mouth */
  +'<path d="M37.5 44.5C38.5 43 41.5 43 42.5 44.5" stroke="#4A3728" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.9"/>'
  /* Sweat drop — animated */
  +'<path d="M49 33C49 33 50.5 29 50.5 27.5C50.5 26 49.5 25.5 49 26.5C48.5 27.5 49 29 49 29Z" fill="#A8D4F0" opacity="0.65"><animate attributeName="opacity" values="0.65;0.25;0.65" dur="2.5s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0,0;0,2;0,0" dur="2.5s" repeatCount="indefinite"/></path>';

var SPARKLES = ''
  +'<circle cx="18" cy="18" r="1.5" fill="white"><animate attributeName="opacity" values="0;0.8;0" dur="2.5s" repeatCount="indefinite"/><animate attributeName="r" values="1.5;2;1.5" dur="2.5s" repeatCount="indefinite"/></circle>'
  +'<circle cx="62" cy="15" r="1.2" fill="white"><animate attributeName="opacity" values="0;0.7;0" dur="3s" begin="0.8s" repeatCount="indefinite"/><animate attributeName="r" values="1.2;1.8;1.2" dur="3s" begin="0.8s" repeatCount="indefinite"/></circle>'
  +'<circle cx="14" cy="35" r="1" fill="white"><animate attributeName="opacity" values="0;0.6;0" dur="3.5s" begin="1.6s" repeatCount="indefinite"/></circle>'
  +'<circle cx="65" cy="40" r="1.2" fill="white"><animate attributeName="opacity" values="0;0.65;0" dur="2.8s" begin="0.4s" repeatCount="indefinite"/></circle>'
  +'<circle cx="22" cy="8" r="0.8" fill="white"><animate attributeName="opacity" values="0;0.5;0" dur="4s" begin="2.2s" repeatCount="indefinite"/></circle>'
  +'<circle cx="58" cy="42" r="0.9" fill="white"><animate attributeName="opacity" values="0;0.45;0" dur="3.2s" begin="1.2s" repeatCount="indefinite"/></circle>';

/* Shared pot */
var POT = '<path d="M28 70C28 70 26 73 27.5 75C29 76.5 51 76.5 52.5 75C54 73 52 70 52 70" fill="#E8C4A0"/>'
  +'<path d="M26 70H54" stroke="#D4A574" stroke-width="2.2" stroke-linecap="round"/>'
  +'<ellipse cx="40" cy="70" rx="13" ry="2" fill="#C49468" opacity="0.25"/>';
var POT_DRY = '<path d="M28 70C28 70 26 73 27.5 75C29 76.5 51 76.5 52.5 75C54 73 52 70 52 70" fill="#D4B89A"/>'
  +'<path d="M26 70H54" stroke="#C4A080" stroke-width="2.2" stroke-linecap="round"/>'
  +'<ellipse cx="40" cy="70" rx="13" ry="2" fill="#B09070" opacity="0.2"/>';

var plantSVGs = {
  Lavanda: '<svg viewBox="0 0 80 80" fill="none">'
    +POT
    /* Stem — gentle sway */
    +'<path d="M40 68V32" stroke="#6BA068" stroke-width="3" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="0,40,68;0.5,40,68;0,40,68;-0.5,40,68;0,40,68" dur="6s" repeatCount="indefinite"/></path>'
    /* Soil sprout accents */
    +'<ellipse cx="40" cy="69" rx="10" ry="1.5" fill="#6BAF68" opacity="0.15"/>'
    /* Left leaves — sway */
    +'<g><animateTransform attributeName="transform" type="rotate" values="-2,40,55;4,40,55;-2,40,55" dur="3.5s" repeatCount="indefinite"/>'
    +'<path d="M40 54C35 52 30 50 26 42" stroke="#6BA068" stroke-width="2" stroke-linecap="round"/>'
    +'<path d="M33 48C28 47 23 48 20 51C24 51.5 29 50 33 48Z" fill="#7DB87A" opacity="0.85"/>'
    +'<path d="M29 43C24 42 19 43 17 46C21 46.5 25 45 29 43Z" fill="#8CC5A0" opacity="0.7"/>'
    +'<path d="M31 52C26 52 21 53 19 56C23 56 28 54 31 52Z" fill="#7DB87A" opacity="0.6"/></g>'
    /* Right leaves — sway opposite */
    +'<g><animateTransform attributeName="transform" type="rotate" values="2,40,55;-4,40,55;2,40,55" dur="4s" repeatCount="indefinite"/>'
    +'<path d="M40 50C45 48 50 46 54 39" stroke="#6BA068" stroke-width="2" stroke-linecap="round"/>'
    +'<path d="M47 44C52 43 57 44 59 47C55 47.5 51 46 47 44Z" fill="#7DB87A" opacity="0.85"/>'
    +'<path d="M51 40C56 39 61 40 63 43C59 43.5 55 42 51 40Z" fill="#8CC5A0" opacity="0.7"/>'
    +'<path d="M49 53C54 52 59 53 61 56C57 56 52 55 49 53Z" fill="#7DB87A" opacity="0.6"/></g>'
    /* Center spike — sway + pulse */
    +'<g><animateTransform attributeName="transform" type="rotate" values="-1.5,40,30;1.5,40,30;-1.5,40,30" dur="3s" repeatCount="indefinite"/>'
    +'<ellipse cx="40" cy="28" rx="5" ry="6.5" fill="__CLR__"><animate attributeName="ry" values="6.5;7;6.5" dur="3s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="40" cy="21" rx="4.5" ry="5.5" fill="__CLR__" opacity="0.95"/>'
    +'<ellipse cx="40" cy="14.5" rx="3.8" ry="4.5" fill="__CLR__" opacity="0.9"/>'
    +'<ellipse cx="40" cy="9" rx="3" ry="3.5" fill="__CLR__" opacity="0.82"/>'
    +'<ellipse cx="40" cy="5" rx="2.2" ry="2.5" fill="__CLR__" opacity="0.7"/></g>'
    /* Left spike — bigger sway */
    +'<g><animateTransform attributeName="transform" type="rotate" values="0,28,34;-6,28,34;0,28,34" dur="3.8s" repeatCount="indefinite"/>'
    +'<ellipse cx="28" cy="32" rx="4" ry="5.5" fill="__CLR__" opacity="0.9"/>'
    +'<ellipse cx="28" cy="26" rx="3.5" ry="4.5" fill="__CLR__" opacity="0.85"/>'
    +'<ellipse cx="28" cy="20.5" rx="3" ry="3.8" fill="__CLR__" opacity="0.78"/>'
    +'<ellipse cx="28" cy="15.5" rx="2.3" ry="2.8" fill="__CLR__" opacity="0.65"/></g>'
    /* Right spike — bigger sway */
    +'<g><animateTransform attributeName="transform" type="rotate" values="0,52,33;6,52,33;0,52,33" dur="3.5s" repeatCount="indefinite"/>'
    +'<ellipse cx="52" cy="31" rx="4" ry="5.5" fill="__CLR__" opacity="0.9"/>'
    +'<ellipse cx="52" cy="25" rx="3.5" ry="4.5" fill="__CLR__" opacity="0.85"/>'
    +'<ellipse cx="52" cy="19.5" rx="3" ry="3.8" fill="__CLR__" opacity="0.78"/>'
    +'<ellipse cx="52" cy="14.5" rx="2.3" ry="2.8" fill="__CLR__" opacity="0.65"/></g>'
    /* Kawaii face */
    +FACE_HAPPY
    +SPARKLES
    +'</svg>',

  Girassol: '<svg viewBox="0 0 80 80" fill="none">'
    +POT
    /* Stem — sway */
    +'<path d="M40 68C40 64 39.5 56 40 50C40.5 44 40 40 40 38" stroke="#5A9E54" stroke-width="3.5" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="0,40,68;0.6,40,68;0,40,68;-0.6,40,68;0,40,68" dur="5s" repeatCount="indefinite"/></path>'
    /* Leaves — larger sway */
    +'<g><animateTransform attributeName="transform" type="rotate" values="-1,40,56;5,40,56;-1,40,56" dur="3.5s" repeatCount="indefinite"/>'
    +'<path d="M40 56C35 55 28 54.5 23 57C26 59 32 58 40 56Z" fill="#7DB87A" opacity="0.9"/>'
    +'<path d="M38 60C33 60 26 60 22 62C25 64 32 63 38 60Z" fill="#8CC5A0" opacity="0.65"/></g>'
    +'<g><animateTransform attributeName="transform" type="rotate" values="1,40,62;-5,40,62;1,40,62" dur="4s" repeatCount="indefinite"/>'
    +'<path d="M40 62C45 61 52 60.5 57 63C54 65 48 64 40 62Z" fill="#7DB87A" opacity="0.85"/>'
    +'<path d="M42 57C47 56 54 56 58 58C55 60 48 59 42 57Z" fill="#8CC5A0" opacity="0.6"/></g>'
    /* Flower head — sway + bounce */
    +'<g><animateTransform attributeName="transform" type="rotate" values="-3,40,24;3,40,24;-3,40,24" dur="4s" repeatCount="indefinite"/>'
    /* Petals — stronger pulse */
    +'<ellipse cx="40" cy="12" rx="5.5" ry="10" fill="__CLR__"><animate attributeName="ry" values="10;11.5;10" dur="2.5s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="18" cy="24" rx="12" ry="5.5" fill="__CLR__"><animate attributeName="rx" values="12;14;12" dur="2.8s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="62" cy="24" rx="12" ry="5.5" fill="__CLR__"><animate attributeName="rx" values="12;14;12" dur="3s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="24" cy="14" rx="5" ry="11" fill="__CLR__" opacity="0.92" transform="rotate(-45 24 14)"><animate attributeName="ry" values="11;12.5;11" dur="2.6s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="56" cy="14" rx="5" ry="11" fill="__CLR__" opacity="0.92" transform="rotate(45 56 14)"><animate attributeName="ry" values="11;12.5;11" dur="2.9s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="40" cy="38" rx="5.5" ry="10" fill="__CLR__" opacity="0.85"><animate attributeName="ry" values="10;11.5;10" dur="2.8s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="24" cy="38" rx="5" ry="10" fill="__CLR__" opacity="0.82" transform="rotate(45 24 38)"/>'
    +'<ellipse cx="56" cy="38" rx="5" ry="10" fill="__CLR__" opacity="0.82" transform="rotate(-45 56 38)"/>'
    +'<ellipse cx="28" cy="8" rx="5" ry="9" fill="__CLR__" opacity="0.88" transform="rotate(-25 28 8)"/>'
    +'<ellipse cx="52" cy="8" rx="5" ry="9" fill="__CLR__" opacity="0.88" transform="rotate(25 52 8)"/>'
    +'<ellipse cx="20" cy="36" rx="4.5" ry="9" fill="__CLR__" opacity="0.75" transform="rotate(65 20 36)"/>'
    +'<ellipse cx="60" cy="36" rx="4.5" ry="9" fill="__CLR__" opacity="0.75" transform="rotate(-65 60 36)"/>'
    /* Face disc */
    +'<circle cx="40" cy="24" r="12.5" fill="#D4960A"/>'
    +'<circle cx="40" cy="24" r="10" fill="#C48A08"/>'
    /* Eyes — blink, bigger */
    +'<ellipse cx="36" cy="22" rx="2" ry="2.3" fill="#5A3800"><animate attributeName="ry" values="2.3;0.2;2.3" dur="3.5s" begin="2s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="44" cy="22" rx="2" ry="2.3" fill="#5A3800"><animate attributeName="ry" values="2.3;0.2;2.3" dur="3.5s" begin="2s" repeatCount="indefinite"/></ellipse>'
    +'<circle cx="36.8" cy="21" r="0.8" fill="white" opacity="0.9"/>'
    +'<circle cx="44.8" cy="21" r="0.8" fill="white" opacity="0.9"/>'
    /* Smile — bouncy */
    +'<path d="M37 27.5C38.5 29.5 41.5 29.5 43 27.5" stroke="#5A3800" stroke-width="1.4" stroke-linecap="round" fill="none"><animate attributeName="d" values="M37 27.5C38.5 29.5 41.5 29.5 43 27.5;M37.5 28C38.5 29 41.5 29 42.5 28;M37 27.5C38.5 29.5 41.5 29.5 43 27.5" dur="4s" begin="3s" repeatCount="indefinite"/></path>'
    /* Blush — pulse */
    +'<circle cx="33" cy="26" r="2.8" fill="#F4A7B9" opacity="0.22"><animate attributeName="opacity" values="0.22;0.38;0.22" dur="3s" repeatCount="indefinite"/></circle>'
    +'<circle cx="47" cy="26" r="2.8" fill="#F4A7B9" opacity="0.22"><animate attributeName="opacity" values="0.22;0.38;0.22" dur="3s" repeatCount="indefinite"/></circle>'
    +'</g>'
    +SPARKLES
    +'</svg>',

  Cacto: '<svg viewBox="0 0 80 80" fill="none">'
    +POT
    /* Main body — gentle side-to-side wiggle */
    +'<g><animateTransform attributeName="transform" type="rotate" values="0,40,68;-0.8,40,68;0,40,68;0.8,40,68;0,40,68" dur="5s" repeatCount="indefinite"/>'
    +'<path d="M30 68C29.5 60 28 52 28 44C28 34 29.5 24 31 18C33 12 35 8 40 8C45 8 47 12 49 18C50.5 24 52 34 52 44C52 52 51 60 50.5 68" fill="__CLR__" opacity="0.55"/>'
    +'<path d="M30 68C29.5 60 28 52 28 44C28 34 29.5 24 31 18C33 12 35 8 40 8C45 8 47 12 49 18C50.5 24 52 34 52 44C52 52 51 60 50.5 68" stroke="__CLR__" stroke-width="2.5" fill="none"/>'
    /* Body highlights */
    +'<path d="M34 16C35 12 37 9 40 8" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.2" fill="none"/>'
    +'<line x1="33" y1="25" x2="33" y2="55" stroke="white" stroke-width="0.8" opacity="0.1"/>'
    +'<line x1="47" y1="23" x2="47" y2="57" stroke="white" stroke-width="0.8" opacity="0.1"/>'
    +'<line x1="40" y1="12" x2="40" y2="65" stroke="white" stroke-width="0.6" opacity="0.06"/>'
    /* Spines — animated pop */
    +'<line x1="30" y1="24" x2="26" y2="23" stroke="__CLR__" stroke-width="1" opacity="0.45"><animate attributeName="x2" values="26;25;26" dur="2s" repeatCount="indefinite"/></line>'
    +'<line x1="50" y1="26" x2="54" y2="25" stroke="__CLR__" stroke-width="1" opacity="0.45"><animate attributeName="x2" values="54;55;54" dur="2.2s" repeatCount="indefinite"/></line>'
    +'<line x1="30" y1="38" x2="26" y2="37" stroke="__CLR__" stroke-width="1" opacity="0.45"/>'
    +'<line x1="50" y1="40" x2="54" y2="39" stroke="__CLR__" stroke-width="1" opacity="0.45"/>'
    +'<line x1="30" y1="52" x2="26" y2="51" stroke="__CLR__" stroke-width="1" opacity="0.4"/>'
    +'<line x1="50" y1="54" x2="54" y2="53" stroke="__CLR__" stroke-width="1" opacity="0.4"/>'
    /* Kawaii face on body */
    +FACE_HAPPY
    +'</g>'
    /* Left arm — big sway */
    +'<g><animateTransform attributeName="transform" type="rotate" values="0,28,42;-5,28,42;0,28,42;2,28,42;0,28,42" dur="4s" repeatCount="indefinite"/>'
    +'<path d="M28 42C28 42 23 42 19 40C15 38 12 33 12 28C12 22 15 20 17 21.5C19 23 20 27 20 32C20 37 22 40 28 42" fill="__CLR__" opacity="0.5"/>'
    +'<path d="M28 42C28 42 23 42 19 40C15 38 12 33 12 28C12 22 15 20 17 21.5C19 23 20 27 20 32C20 37 22 40 28 42" stroke="__CLR__" stroke-width="2.2" fill="none"/></g>'
    /* Right arm — big sway opposite */
    +'<g><animateTransform attributeName="transform" type="rotate" values="0,52,36;5,52,36;0,52,36;-2,52,36;0,52,36" dur="3.8s" repeatCount="indefinite"/>'
    +'<path d="M52 36C52 36 57 36 61 34C65 32 68 27 68 22C68 16 65 14 63 15.5C61 17 60 21 60 26C60 31 58 34 52 36" fill="__CLR__" opacity="0.5"/>'
    +'<path d="M52 36C52 36 57 36 61 34C65 32 68 27 68 22C68 16 65 14 63 15.5C61 17 60 21 60 26C60 31 58 34 52 36" stroke="__CLR__" stroke-width="2.2" fill="none"/></g>'
    /* Flower on top — bounce + pulse */
    +'<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-1.5;0,0" dur="2.5s" repeatCount="indefinite"/>'
    +'<ellipse cx="40" cy="6" rx="7.5" ry="6.5" fill="#F4A7B9"><animate attributeName="ry" values="6.5;7.2;6.5" dur="2s" repeatCount="indefinite"/></ellipse>'
    +'<circle cx="40" cy="6.5" r="3.8" fill="#E8889E" opacity="0.9"/>'
    +'<circle cx="40" cy="6.5" r="2" fill="#C96078" opacity="0.7"/>'
    +'<circle cx="38" cy="5" r="0.8" fill="white" opacity="0.5"/></g>'
    +SPARKLES
    +'</svg>',

  Cerejeira: '<svg viewBox="0 0 80 80" fill="none">'
    +POT
    /* Trunk */
    +'<path d="M40 68C40 64 38 58 36 54C34 50 35 46 38 44C41 42 42 38 41 35" stroke="#7A5840" stroke-width="5" stroke-linecap="round"/>'
    /* Branches */
    +'<path d="M36 54C31 52 26 50 22 49C18 48.5 14 49 13 50" stroke="#7A5840" stroke-width="3" stroke-linecap="round"/>'
    +'<path d="M38 46C42 44 47 42 52 40C55 38.5 58 38 60 39" stroke="#7A5840" stroke-width="2.8" stroke-linecap="round"/>'
    +'<path d="M41 35C43 30 47 25 49 22C51 19 52 16 51 14" stroke="#7A5840" stroke-width="2.5" stroke-linecap="round"/>'
    /* Blossom clusters — animated, bouncy */
    +'<g><animateTransform attributeName="transform" type="rotate" values="0,16,46;-5,16,46;1,16,46;0,16,46" dur="4s" repeatCount="indefinite"/>'
    +'<ellipse cx="15" cy="46" rx="7.5" ry="6.5" fill="__CLR__" opacity="0.88"><animate attributeName="ry" values="6.5;7.2;6.5" dur="3s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="21" cy="44" rx="6.5" ry="5.5" fill="__CLR__" opacity="0.85"/>'
    +'<ellipse cx="11" cy="43" rx="6" ry="5" fill="__CLR__" opacity="0.78"/>'
    +'<ellipse cx="8" cy="47" rx="4.5" ry="3.8" fill="__CLR__" opacity="0.6"/>'
    +'<circle cx="16" cy="45.5" r="2.8" fill="#C95578" opacity="0.65"><animate attributeName="r" values="2.8;3.2;2.8" dur="2.5s" repeatCount="indefinite"/></circle></g>'
    +'<g><animateTransform attributeName="transform" type="rotate" values="0,60,36;5,60,36;-1,60,36;0,60,36" dur="3.5s" repeatCount="indefinite"/>'
    +'<ellipse cx="60" cy="36" rx="7.5" ry="6.5" fill="__CLR__" opacity="0.9"><animate attributeName="ry" values="6.5;7;6.5" dur="3.2s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="65" cy="34" rx="6.5" ry="5.5" fill="__CLR__" opacity="0.87"/>'
    +'<ellipse cx="57" cy="33.5" rx="6" ry="5" fill="__CLR__" opacity="0.82"/>'
    +'<ellipse cx="68" cy="37" rx="4.5" ry="3.5" fill="__CLR__" opacity="0.55"/>'
    +'<circle cx="61" cy="36" r="2.8" fill="#C95578" opacity="0.68"><animate attributeName="r" values="2.8;3.2;2.8" dur="2.8s" repeatCount="indefinite"/></circle></g>'
    +'<g><animateTransform attributeName="transform" type="rotate" values="0,51,14;3,51,14;-1,51,14;0,51,14" dur="3.2s" repeatCount="indefinite"/>'
    +'<ellipse cx="51" cy="13" rx="7" ry="6" fill="__CLR__" opacity="0.92"><animate attributeName="ry" values="6;6.6;6" dur="2.6s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="47" cy="11" rx="6" ry="5.5" fill="__CLR__" opacity="0.88"/>'
    +'<ellipse cx="55" cy="10" rx="5.5" ry="4.8" fill="__CLR__" opacity="0.84"/>'
    +'<circle cx="50" cy="13" r="2.8" fill="#C95578" opacity="0.7"/></g>'
    /* Falling petals — 5 total, staggered */
    +'<ellipse cx="26" cy="25" rx="2.2" ry="1.4" fill="__CLR__" opacity="0"><animate attributeName="cy" values="25;68" dur="5s" repeatCount="indefinite"/><animate attributeName="cx" values="26;32" dur="5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.65;0.55;0" dur="5s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="rotate" values="0,26,25;180,29,46;360,32,68" dur="5s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="55" cy="20" rx="2" ry="1.2" fill="__CLR__" opacity="0"><animate attributeName="cy" values="20;65" dur="6s" begin="1.5s" repeatCount="indefinite"/><animate attributeName="cx" values="55;48" dur="6s" begin="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.6;0.5;0" dur="6s" begin="1.5s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="38" cy="15" rx="1.8" ry="1.1" fill="__CLR__" opacity="0"><animate attributeName="cy" values="15;62" dur="7s" begin="3s" repeatCount="indefinite"/><animate attributeName="cx" values="38;42" dur="7s" begin="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.55;0.45;0" dur="7s" begin="3s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="18" cy="35" rx="1.6" ry="1" fill="__CLR__" opacity="0"><animate attributeName="cy" values="35;68" dur="4.5s" begin="2s" repeatCount="indefinite"/><animate attributeName="cx" values="18;24" dur="4.5s" begin="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.5;0.4;0" dur="4.5s" begin="2s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="62" cy="28" rx="1.5" ry="0.9" fill="__CLR__" opacity="0"><animate attributeName="cy" values="28;66" dur="5.5s" begin="4s" repeatCount="indefinite"/><animate attributeName="cx" values="62;56" dur="5.5s" begin="4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.45;0.35;0" dur="5.5s" begin="4s" repeatCount="indefinite"/></ellipse>'
    /* Kawaii face — centered on trunk, subtle bg for readability */
    +'<ellipse cx="39" cy="52" rx="6.5" ry="5" fill="#F2E8E0" opacity="0.35"/>'
    +'<ellipse cx="37" cy="50" rx="2" ry="2.3" fill="#5A4030"><animate attributeName="ry" values="2.3;0.3;2.3" dur="3.5s" begin="1.8s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="42" cy="50" rx="2" ry="2.3" fill="#5A4030"><animate attributeName="ry" values="2.3;0.3;2.3" dur="3.5s" begin="1.8s" repeatCount="indefinite"/></ellipse>'
    +'<circle cx="37.8" cy="49.2" r="0.8" fill="white" opacity="0.9"/>'
    +'<circle cx="42.8" cy="49.2" r="0.8" fill="white" opacity="0.9"/>'
    +'<path d="M37.5 54C38.5 55.5 41 55.5 42 54" stroke="#5A4030" stroke-width="1.3" stroke-linecap="round" fill="none"><animate attributeName="d" values="M37.5 54C38.5 55.5 41 55.5 42 54;M38 54.2C38.5 55 41 55 41.5 54.2;M37.5 54C38.5 55.5 41 55.5 42 54" dur="4s" begin="3s" repeatCount="indefinite"/></path>'
    +'<circle cx="34.5" cy="52.5" r="2.5" fill="#F4A7B9" opacity="0.2"><animate attributeName="opacity" values="0.2;0.32;0.2" dur="3s" repeatCount="indefinite"/></circle>'
    +'<circle cx="44.5" cy="52.5" r="2.5" fill="#F4A7B9" opacity="0.2"><animate attributeName="opacity" values="0.2;0.32;0.2" dur="3s" repeatCount="indefinite"/></circle>'
    +SPARKLES
    +'</svg>',

  Lotus: '<svg viewBox="4 4 72 72" fill="none">'
    +POT
    /* Water surface — dual ripple */
    +'<ellipse cx="40" cy="69" rx="14" ry="3.5" fill="#D4EEF8" opacity="0.45"><animate attributeName="rx" values="14;18;14" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.45;0.2;0.45" dur="3.5s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="40" cy="68.5" rx="10" ry="2.5" fill="#B8E0F0" opacity="0.3"><animate attributeName="rx" values="10;14;10" dur="3.5s" begin="0.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.3;0.15;0.3" dur="3.5s" begin="0.4s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="40" cy="69.5" rx="6" ry="1.8" fill="#D4EEF8" opacity="0.2"><animate attributeName="rx" values="6;10;6" dur="3.5s" begin="0.8s" repeatCount="indefinite"/></ellipse>'
    /* Lily pads — floating + bob */
    +'<ellipse cx="28" cy="68" rx="6.5" ry="2.5" fill="#7EC47A" opacity="0.55"><animateTransform attributeName="transform" type="rotate" values="-2,28,68;4,28,68;-2,28,68" dur="4.5s" repeatCount="indefinite"/><animate attributeName="cy" values="68;67.5;68" dur="3s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="52" cy="67.5" rx="6" ry="2.2" fill="#7EC47A" opacity="0.45"><animateTransform attributeName="transform" type="rotate" values="2,52,67.5;-4,52,67.5;2,52,67.5" dur="5s" repeatCount="indefinite"/><animate attributeName="cy" values="67.5;67;67.5" dur="3.5s" repeatCount="indefinite"/></ellipse>'
    /* Stem — gentle sway */
    +'<path d="M40 66Q39 58 40 52" stroke="#6EAA68" stroke-width="2.2" stroke-linecap="round" opacity="0.55" fill="none"><animateTransform attributeName="transform" type="rotate" values="0,40,66;1,40,66;0,40,66;-1,40,66;0,40,66" dur="5s" repeatCount="indefinite"/></path>'
    /* Outer petals — bigger breathing */
    +'<g><animateTransform attributeName="transform" type="rotate" values="0,40,50;-5,40,50;0,40,50" dur="4s" repeatCount="indefinite"/><path d="M40 52Q26 54 16 47Q14 45 18 44Q28 45 40 49Z" fill="__CLR__" opacity="0.35"><animate attributeName="opacity" values="0.35;0.22;0.35" dur="4s" repeatCount="indefinite"/></path></g>'
    +'<g><animateTransform attributeName="transform" type="rotate" values="0,40,50;5,40,50;0,40,50" dur="4s" repeatCount="indefinite"/><path d="M40 52Q54 54 64 47Q66 45 62 44Q52 45 40 49Z" fill="__CLR__" opacity="0.35"><animate attributeName="opacity" values="0.35;0.22;0.35" dur="4s" repeatCount="indefinite"/></path></g>'
    /* Mid petals */
    +'<g><animateTransform attributeName="transform" type="rotate" values="0,40,46;-4,40,46;0,40,46" dur="3.5s" repeatCount="indefinite"/><path d="M40 46Q28 44 22 35Q21 32 25 33Q32 36 40 44Z" fill="#E8CCE8" opacity="0.55"><animate attributeName="opacity" values="0.55;0.68;0.55" dur="3.5s" repeatCount="indefinite"/></path></g>'
    +'<g><animateTransform attributeName="transform" type="rotate" values="0,40,46;4,40,46;0,40,46" dur="3.5s" repeatCount="indefinite"/><path d="M40 46Q52 44 58 35Q59 32 55 33Q48 36 40 44Z" fill="#E8CCE8" opacity="0.55"><animate attributeName="opacity" values="0.55;0.68;0.55" dur="3.5s" repeatCount="indefinite"/></path></g>'
    /* Inner petals — glow pulse */
    +'<path d="M40 42Q32 36 30 26Q29.5 20 34 23Q37 28 40 40Z" fill="#EEE0F0" opacity="0.62"><animate attributeName="opacity" values="0.62;0.82;0.62" dur="3s" repeatCount="indefinite"/></path>'
    +'<path d="M40 42Q48 36 50 26Q50.5 20 46 23Q43 28 40 40Z" fill="#EEE0F0" opacity="0.62"><animate attributeName="opacity" values="0.62;0.82;0.62" dur="3s" begin="0.3s" repeatCount="indefinite"/></path>'
    /* Core — breathing */
    +'<path d="M40 36Q38 28 38.2 18Q38.5 12 40 10Q41.5 12 41.8 18Q42 28 40 36Z" fill="__CLR__" opacity="0.85"><animate attributeName="opacity" values="0.85;0.95;0.85" dur="3s" repeatCount="indefinite"/></path>'
    /* Center glow — pulse */
    +'<ellipse cx="40" cy="46" rx="6" ry="4" fill="#FFE082" opacity="0.95"><animate attributeName="opacity" values="0.95;0.65;0.95" dur="2.5s" repeatCount="indefinite"/><animate attributeName="rx" values="6;7;6" dur="2.5s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="40" cy="46" rx="4" ry="2.8" fill="#FFC837" opacity="0.85"/>'
    /* Face on center — bigger */
    +'<ellipse cx="38" cy="44.5" rx="1.4" ry="1.6" fill="#8B6F00"><animate attributeName="ry" values="1.6;0.2;1.6" dur="3.5s" begin="1.8s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="42" cy="44.5" rx="1.4" ry="1.6" fill="#8B6F00"><animate attributeName="ry" values="1.6;0.2;1.6" dur="3.5s" begin="1.8s" repeatCount="indefinite"/></ellipse>'
    +'<circle cx="38.5" cy="43.8" r="0.55" fill="white" opacity="0.8"/>'
    +'<circle cx="42.5" cy="43.8" r="0.55" fill="white" opacity="0.8"/>'
    +'<path d="M39 47.5C39.5 48.8 40.5 48.8 41 47.5" stroke="#8B6F00" stroke-width="1" stroke-linecap="round" fill="none"/>'
    +'<circle cx="37" cy="46.5" r="1.5" fill="#F4A7B9" opacity="0.15"><animate attributeName="opacity" values="0.15;0.25;0.15" dur="3s" repeatCount="indefinite"/></circle>'
    +'<circle cx="43" cy="46.5" r="1.5" fill="#F4A7B9" opacity="0.15"><animate attributeName="opacity" values="0.15;0.25;0.15" dur="3s" repeatCount="indefinite"/></circle>'
    /* Floating particles — rising */
    +'<circle cx="18" cy="22" r="1.3" fill="white"><animate attributeName="opacity" values="0;0.6;0" dur="3.5s" repeatCount="indefinite"/><animate attributeName="cy" values="22;16" dur="3.5s" repeatCount="indefinite"/></circle>'
    +'<circle cx="62" cy="20" r="1.1" fill="white"><animate attributeName="opacity" values="0;0.5;0" dur="4s" begin="1.2s" repeatCount="indefinite"/><animate attributeName="cy" values="20;14" dur="4s" begin="1.2s" repeatCount="indefinite"/></circle>'
    +'<circle cx="28" cy="14" r="0.9" fill="white"><animate attributeName="opacity" values="0;0.4;0" dur="4.5s" begin="2.5s" repeatCount="indefinite"/><animate attributeName="cy" values="14;9" dur="4.5s" begin="2.5s" repeatCount="indefinite"/></circle>'
    +'<circle cx="52" cy="18" r="0.8" fill="white"><animate attributeName="opacity" values="0;0.35;0" dur="3.8s" begin="3.5s" repeatCount="indefinite"/><animate attributeName="cy" values="18;13" dur="3.8s" begin="3.5s" repeatCount="indefinite"/></circle>'
    +'</svg>'
};

/* ── Wilted SVGs — drooping, sad face, muted but still colored ── */
var wiltedSVGs = {
  Lavanda: '<svg viewBox="0 0 80 80" fill="none">'
    +POT_DRY
    +'<path d="M40 68C40 64 39 56 38 48C37 42 38 36 39 30" stroke="#8CA888" stroke-width="2.8" stroke-linecap="round" opacity="0.6"/>'
    +'<path d="M38 52C33 53 28 55 24 58C28 58.5 33 56 38 52Z" fill="#9DB89A" opacity="0.4"/>'
    +'<path d="M39 56C43 57 48 59 52 62C48 61.5 43 60 39 56Z" fill="#9DB89A" opacity="0.35"/>'
    +'<g transform="rotate(18,39,30)"><ellipse cx="39" cy="28" rx="4.5" ry="5.5" fill="__CLR__" opacity="0.4"/><ellipse cx="39" cy="22" rx="3.8" ry="4.5" fill="__CLR__" opacity="0.35"/><ellipse cx="39" cy="16.5" rx="3" ry="3.5" fill="__CLR__" opacity="0.28"/></g>'
    +'<g transform="rotate(-28,28,34)"><ellipse cx="28" cy="32" rx="3.5" ry="4.8" fill="__CLR__" opacity="0.32"/><ellipse cx="28" cy="27" rx="2.8" ry="3.5" fill="__CLR__" opacity="0.25"/></g>'
    +'<g transform="rotate(28,52,33)"><ellipse cx="52" cy="31" rx="3.5" ry="4.8" fill="__CLR__" opacity="0.32"/><ellipse cx="52" cy="26" rx="2.8" ry="3.5" fill="__CLR__" opacity="0.25"/></g>'
    +FACE_SAD
    +'</svg>',

  Girassol: '<svg viewBox="0 0 80 80" fill="none">'
    +POT_DRY
    +'<path d="M40 68C40 64 41 56 42 50C43 44 44 40 46 36" stroke="#8CA888" stroke-width="3" stroke-linecap="round" opacity="0.6"/>'
    +'<path d="M41 56C36 57 30 58.5 25 61C29 62 35 60 41 56Z" fill="#9DB89A" opacity="0.4"/>'
    +'<g transform="rotate(40,46,36)">'
    +'<ellipse cx="46" cy="22" rx="4" ry="9" fill="__CLR__" opacity="0.35"/>'
    +'<ellipse cx="32" cy="30" rx="9" ry="4" fill="__CLR__" opacity="0.3"/>'
    +'<ellipse cx="60" cy="30" rx="9" ry="4" fill="__CLR__" opacity="0.3"/>'
    +'<ellipse cx="35" cy="22" rx="4" ry="9" fill="__CLR__" opacity="0.3" transform="rotate(-35 35 22)"/>'
    +'<ellipse cx="57" cy="22" rx="4" ry="9" fill="__CLR__" opacity="0.3" transform="rotate(35 57 22)"/>'
    +'<ellipse cx="28" cy="8" rx="5" ry="9" fill="__CLR__" opacity="0.88" transform="rotate(-25 28 8)"/>'
    +'<ellipse cx="52" cy="8" rx="5" ry="9" fill="__CLR__" opacity="0.88" transform="rotate(25 52 8)"/>'
    +'<ellipse cx="46" cy="42" rx="5" ry="9" fill="__CLR__" opacity="0.4"/>'
    +'<ellipse cx="34" cy="40" rx="4.5" ry="8" fill="__CLR__" opacity="0.35" transform="rotate(40 34 40)"/>'
    +'<ellipse cx="58" cy="40" rx="4.5" ry="8" fill="__CLR__" opacity="0.35" transform="rotate(-40 58 40)"/>'
    +'<ellipse cx="20" cy="36" rx="4.5" ry="9" fill="__CLR__" opacity="0.3" transform="rotate(65 20 36)"/>'
    +'<ellipse cx="60" cy="36" rx="4.5" ry="9" fill="__CLR__" opacity="0.3" transform="rotate(-65 60 36)"/>'
    +'<circle cx="46" cy="30" r="10.5" fill="#C4960A" opacity="0.7"/>'
    +'<circle cx="46" cy="30" r="8.5" fill="#B08808" opacity="0.65"/>'
    /* Sad eyes — big, teary */
    +'<ellipse cx="43" cy="28" rx="1.8" ry="2.4" fill="#5A3800" opacity="0.9"/>'
    +'<ellipse cx="49" cy="28" rx="1.8" ry="2.4" fill="#5A3800" opacity="0.9"/>'
    +'<circle cx="43.7" cy="27" r="0.7" fill="white" opacity="0.8"/>'
    +'<circle cx="49.7" cy="27" r="0.7" fill="white" opacity="0.8"/>'
    +'<ellipse cx="43" cy="29.5" rx="1.2" ry="0.6" fill="#A8D4F0" opacity="0.35"/>'
    +'<ellipse cx="49" cy="29.5" rx="1.2" ry="0.6" fill="#A8D4F0" opacity="0.35"/>'
    /* Sad mouth */
    +'<path d="M44.5 33.5C45.3 32.2 47.7 32.2 48.5 33.5" stroke="#5A3800" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.85"/>'
    +'</g>'
    /* Sweat drop */
    +'<path d="M53 28C53 28 54.5 24 54.5 22.5C54.5 21 53.5 20.5 53 21.5C52.5 22.5 53 24 53 24Z" fill="#A8D4F0" opacity="0.7"><animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0,0;0,2;0,0" dur="2.5s" repeatCount="indefinite"/></path>'
    +'</svg>',

  Cacto: '<svg viewBox="0 0 80 80" fill="none">'
    +POT_DRY
    +'<path d="M30 68C29.5 60 28 52 28 44C28 34 29.5 24 31 18C33 12 35 8 40 8C45 8 47 12 49 18C50.5 24 52 34 52 44C52 52 51 60 50.5 68" fill="__CLR__" opacity="0.3"/>'
    +'<path d="M30 68C29.5 60 28 52 28 44C28 34 29.5 24 31 18C33 12 35 8 40 8C45 8 47 12 49 18C50.5 24 52 34 52 44C52 52 51 60 50.5 68" stroke="__CLR__" stroke-width="2.2" fill="none" opacity="0.5"/>'
    +'<g transform="rotate(15,28,42)"><path d="M28 42C28 42 23 42 19 40C15 38 12 33 12 28C12 22 15 20 17 21.5C19 23 20 27 20 32C20 37 22 40 28 42" fill="__CLR__" opacity="0.25"/><path d="M28 42C28 42 23 42 19 40C15 38 12 33 12 28C12 22 15 20 17 21.5C19 23 20 27 20 32C20 37 22 40 28 42" stroke="__CLR__" stroke-width="2" fill="none" opacity="0.4"/></g>'
    +'<g transform="rotate(-15,52,36)"><path d="M52 36C52 36 57 36 61 34C65 32 68 27 68 22C68 16 65 14 63 15.5C61 17 60 21 60 26C60 31 58 34 52 36" fill="__CLR__" opacity="0.25"/><path d="M52 36C52 36 57 36 61 34C65 32 68 27 68 22C68 16 65 14 63 15.5C61 17 60 21 60 26C60 31 58 34 52 36" stroke="__CLR__" stroke-width="2" fill="none" opacity="0.4"/></g>'
    +'<ellipse cx="40" cy="6" rx="5.5" ry="4.5" fill="#D4A0A8" opacity="0.4"/>'
    +'<circle cx="40" cy="6.5" r="2.5" fill="#C4909A" opacity="0.35"/>'
    +FACE_SAD
    +'</svg>',

  Cerejeira: '<svg viewBox="0 0 80 80" fill="none">'
    +POT_DRY
    +'<path d="M40 68C40 64 38 58 36 54C34 50 35 46 38 44C41 42 42 38 41 35" stroke="#8B7B68" stroke-width="4.5" stroke-linecap="round" opacity="0.6"/>'
    +'<path d="M36 54C31 52 26 50 22 49C18 48.5 14 49 13 50" stroke="#8B7B68" stroke-width="2.8" stroke-linecap="round" opacity="0.5"/>'
    +'<path d="M38 46C42 44 47 42 52 40C55 38.5 58 38 60 39" stroke="#8B7B68" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>'
    +'<path d="M41 35C43 30 47 25 49 22C51 19 52 16 51 14" stroke="#8B7B68" stroke-width="2.2" stroke-linecap="round" opacity="0.5"/>'
    +'<ellipse cx="16" cy="46" rx="4.5" ry="4" fill="__CLR__" opacity="0.3"/>'
    +'<ellipse cx="60" cy="36" rx="4.5" ry="4" fill="__CLR__" opacity="0.25"/>'
    +'<ellipse cx="51" cy="14" rx="4" ry="3.5" fill="__CLR__" opacity="0.22"/>'
    +'<ellipse cx="28" cy="69" rx="2.2" ry="0.9" fill="__CLR__" opacity="0.35" transform="rotate(-15 28 69)"/>'
    +'<ellipse cx="46" cy="68.5" rx="2" ry="0.8" fill="__CLR__" opacity="0.3" transform="rotate(10 46 68.5)"/>'
    +'<ellipse cx="35" cy="69.5" rx="1.8" ry="0.7" fill="__CLR__" opacity="0.25" transform="rotate(-25 35 69.5)"/>'
    +'<ellipse cx="52" cy="69" rx="1.7" ry="0.7" fill="__CLR__" opacity="0.2" transform="rotate(20 52 69)"/>'
    +'<ellipse cx="40" cy="38" rx="2" ry="1.3" fill="__CLR__" opacity="0"><animate attributeName="cy" values="38;70" dur="10s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.4;0.3;0" dur="10s" repeatCount="indefinite"/></ellipse>'
    /* Sad face on trunk — bg for readability */
    +'<ellipse cx="39" cy="52" rx="6.5" ry="5" fill="#E8DCD4" opacity="0.45"/>'
    /* Sad eyes — big */
    +'<ellipse cx="37" cy="50" rx="2" ry="2.6" fill="#5A4030" opacity="0.9"/>'
    +'<ellipse cx="42" cy="50" rx="2" ry="2.6" fill="#5A4030" opacity="0.9"/>'
    +'<circle cx="37.7" cy="49.2" r="0.8" fill="white" opacity="0.8"/>'
    +'<circle cx="42.7" cy="49.2" r="0.8" fill="white" opacity="0.8"/>'
    +'<ellipse cx="37" cy="51.5" rx="1.3" ry="0.6" fill="#A8D4F0" opacity="0.3"/>'
    +'<ellipse cx="42" cy="51.5" rx="1.3" ry="0.6" fill="#A8D4F0" opacity="0.3"/>'
    /* Sad mouth */
    +'<path d="M37.5 55C38.5 53.5 41.5 53.5 42.5 55" stroke="#5A4030" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.85"/>'
    /* Sweat drop */
    +'<path d="M46 46C46 46 47.5 42 47.5 40.5C47.5 39 46.5 38.5 46 39.5C45.5 40.5 46 42 46 42Z" fill="#A8D4F0" opacity="0.65"><animate attributeName="opacity" values="0.65;0.25;0.65" dur="2.5s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0,0;0,2;0,0" dur="2.5s" repeatCount="indefinite"/></path>'
    +'</svg>',

  Lotus: '<svg viewBox="4 4 72 72" fill="none">'
    +POT_DRY
    +'<ellipse cx="40" cy="69" rx="13" ry="3" fill="#C8D8E0" opacity="0.25"/>'
    +'<ellipse cx="30" cy="68" rx="5.5" ry="2" fill="#9DB89A" opacity="0.3"/>'
    +'<ellipse cx="50" cy="67.5" rx="5" ry="1.8" fill="#9DB89A" opacity="0.25"/>'
    +'<path d="M40 66Q41 58 42 52" stroke="#8CA888" stroke-width="2" stroke-linecap="round" opacity="0.35" fill="none"/>'
    +'<path d="M42 52Q30 52 24 47Q22 45 26 45Q33 46 42 50Z" fill="__CLR__" opacity="0.18"/>'
    +'<path d="M42 52Q54 52 60 47Q62 45 58 45Q51 46 42 50Z" fill="__CLR__" opacity="0.18"/>'
    +'<path d="M42 47Q33 44 30 37Q29 35 32 36Q36 38 42 45Z" fill="#D8C0D8" opacity="0.25"/>'
    +'<path d="M42 47Q51 44 54 37Q55 35 52 36Q48 38 42 45Z" fill="#D8C0D8" opacity="0.25"/>'
    +'<path d="M42 42Q37 36 36 28Q36 23 38 26Q40 31 42 40Z" fill="#E0D4E0" opacity="0.28"/>'
    +'<path d="M42 42Q47 36 48 28Q48 23 46 26Q44 31 42 40Z" fill="#E0D4E0" opacity="0.28"/>'
    +'<path d="M42 34Q41 26 41.2 18Q41.5 13 42 11Q42.5 13 42.8 18Q43 26 42 34Z" fill="__CLR__" opacity="0.4"/>'
    +'<ellipse cx="42" cy="48" rx="5" ry="3.5" fill="#D4C880" opacity="0.45"/>'
    +'<ellipse cx="42" cy="48" rx="3" ry="2" fill="#C4B860" opacity="0.35"/>'
    /* Sad face — larger, visible */
    +'<ellipse cx="39" cy="45.5" rx="1.5" ry="2" fill="#8B6F00" opacity="0.85"/>'
    +'<ellipse cx="43" cy="45.5" rx="1.5" ry="2" fill="#8B6F00" opacity="0.85"/>'
    +'<circle cx="39.6" cy="44.8" r="0.6" fill="white" opacity="0.7"/>'
    +'<circle cx="43.6" cy="44.8" r="0.6" fill="white" opacity="0.7"/>'
    +'<ellipse cx="39" cy="46.8" rx="1" ry="0.5" fill="#A8D4F0" opacity="0.3"/>'
    +'<ellipse cx="43" cy="46.8" rx="1" ry="0.5" fill="#A8D4F0" opacity="0.3"/>'
    +'<path d="M39.5 49.5C40 48.5 42 48.5 42.5 49.5" stroke="#8B6F00" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.8"/>'
    +'<path d="M46 41C46 41 47.5 37 47.5 35.5C47.5 34 46.5 33.5 46 34.5C45.5 35.5 46 37 46 37Z" fill="#A8D4F0" opacity="0.6"><animate attributeName="opacity" values="0.6;0.25;0.6" dur="2.5s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0,0;0,1.5;0,0" dur="2.5s" repeatCount="indefinite"/></path>'
    +'</svg>'
};

/* Helper de render - aceita chave capitalizada ou minuscula (lavanda -> Lavanda) */
function renderPlantSVG(name, color, wilted){
  if(!name) return '';
  var key = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  var source = wilted ? wiltedSVGs : plantSVGs;
  var svg = source[key] || source[name];
  return svg ? svg.replace(/__CLR__/g, color || '#C4B0E0') : '';
}
