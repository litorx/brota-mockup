/* =====================================================================
   Brota - UI Icons (FONTE UNICA / single source of truth)
   ---------------------------------------------------------------------
   Icones de interface nativos por plataforma:
     - Android (M3 / Material Symbols): tracado / outline, stroke 1.9
     - iOS    (SF Symbols):             preenchido / filled
   Acompanha plant-svgs.js (esse cuida so dos 5 mascotes-planta).

   Carregue ANTES do script da pagina:
     <script src="../shared/icons.js"></script>

   Uso em HTML estatico (auto-substituido no DOMContentLoaded):
     <span class="nav-icon"><i data-mi="home"></i></span>   (lado Android)
     <span class="nav-icon"><i data-sf="home"></i></span>   (lado iOS)
     <i data-mood="great" data-mood-style="sf"></i>          (rosto humor)

   Uso em JS:
     el.innerHTML = Icons.mi('shield');
     el.innerHTML = Icons.sf('bell');
     el.innerHTML = Icons.mood('great','sf');

   Cor: herda currentColor. Tamanho: 1em (controla via font-size do pai).
   ===================================================================== */
(function (global) {
  'use strict';

  // ---- Material (Android): outline / stroke ----
  var MI = {
    home:     '<path d="M4 11.3 12 4l8 7.3"/><path d="M6 10v9.5a.5.5 0 0 0 .5.5H10v-5h4v5h3.5a.5.5 0 0 0 .5-.5V10"/>',
    grow:     '<path d="M12 20v-7.5"/><path d="M12 12.5C12 9.5 9.6 8 7 8c0 2.7 2 4.5 5 4.5Z"/><path d="M12 11c0-2.4 2-4 4.5-4 0 2.4-2 4-4.5 4Z"/>',
    jardim:   '<circle cx="12" cy="12" r="2.3"/><circle cx="12" cy="6.6" r="2.6"/><circle cx="17" cy="9.8" r="2.6"/><circle cx="15.2" cy="15.6" r="2.6"/><circle cx="8.8" cy="15.6" r="2.6"/><circle cx="7" cy="9.8" r="2.6"/>',
    insights: '<path d="M3.5 20h17"/><path d="M6.5 20v-5"/><path d="M12 20V8"/><path d="M17.5 20v-8"/>',
    person:   '<circle cx="12" cy="8" r="3.4"/><path d="M5.5 19.2c0-3.7 2.9-6.2 6.5-6.2s6.5 2.5 6.5 6.2"/>',
    shield:   '<path d="M12 3 5 5.7v5c0 4.4 3 7.6 7 9.3 4-1.7 7-4.9 7-9.3v-5Z"/>',
    shieldCheck:'<path d="M12 3 5 5.7v5c0 4.4 3 7.6 7 9.3 4-1.7 7-4.9 7-9.3v-5Z"/><path d="m9 11.8 2 2 4-4.2"/>',
    bell:     '<path d="M6.5 16v-5a5.5 5.5 0 0 1 11 0v5l1.6 2.2a.5.5 0 0 1-.4.8H5.3a.5.5 0 0 1-.4-.8Z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    bellOff:  '<path d="M6.5 16v-5a5.5 5.5 0 0 1 9-4.2M18 14.5V11"/><path d="M5 19h14M10 20a2 2 0 0 0 4 0"/><path d="M4 4l16 16"/>',
    leaf:     '<path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14Z"/><path d="M5.5 18.5C8.5 15.5 12 12.5 16 10.5"/>',
    moon:     '<path d="M20 13.4A8 8 0 1 1 10.6 4 6.4 6.4 0 0 0 20 13.4Z"/>',
    sun:      '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
    wind:     '<path d="M3 9h10.5A2.5 2.5 0 1 0 11 6.5"/><path d="M3 13.5h13A2.5 2.5 0 1 1 13.5 16"/>',
    chat:     '<path d="M5 5h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 4V6a1 1 0 0 1 1-1Z"/>',
    clock:    '<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M4 9.5h16M8 3.5v4M16 3.5v4"/>',
    book:     '<path d="M5 4.5h9a2 2 0 0 1 2 2V20H7a2 2 0 0 1-2-2Z"/><path d="M16 6.5h3v13H7"/>',
    drop:     '<path d="M12 3.5C12 3.5 6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5Z"/>',
    brain:    '<path d="M9.5 5A2.5 2.5 0 0 0 7 7.5 2.5 2.5 0 0 0 5.5 12 2.5 2.5 0 0 0 7 16.5 2.5 2.5 0 0 0 9.5 19 2 2 0 0 0 12 17V6.5 A2 2 0 0 0 9.5 5Z"/><path d="M14.5 5A2.5 2.5 0 0 1 17 7.5 2.5 2.5 0 0 1 18.5 12 2.5 2.5 0 0 1 17 16.5 2.5 2.5 0 0 1 14.5 19 2 2 0 0 1 12 17"/>',
    eye:      '<path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.6"/>',
    trophy:   '<path d="M7 4.5h10v4a5 5 0 0 1-10 0Z"/><path d="M7 6H4.5v1.5A2.5 2.5 0 0 0 7 10M17 6h2.5v1.5A2.5 2.5 0 0 1 17 10M10 13.5h4M9 20h6M12 13.5V20"/>',
    phone:    '<path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 6a2 2 0 0 1 2-2Z"/>',
    envelope: '<rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="m4 7.5 8 5.5 8-5.5"/>',
    gift:     '<rect x="4.5" y="9" width="15" height="11" rx="1.5"/><path d="M3.5 9h17v3.5h-17ZM12 9v11"/><path d="M12 9S10.5 4.5 8 5.5 9.5 9 12 9ZM12 9s1.5-4.5 4-3.5S14.5 9 12 9Z"/>',
    lock:     '<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    speakerOff:'<path d="M4 9.5h3l4-3.5v12l-4-3.5H4Z"/><path d="m15 9.5 4 5M19 9.5l-4 5"/>',
    work:     '<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5"/>',
    crown:    '<path d="M4 8l3.5 3L12 5.5 16.5 11 20 8l-1.5 10h-13Z"/>',
    palette:  '<path d="M12 4a8 8 0 0 0 0 16c1.4 0 2-1 2-2 0-1.2 1-2 2.2-2H18a3 3 0 0 0 3-3 8.5 8.5 0 0 0-9-7Z"/><circle cx="8" cy="11" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="16" cy="11" r="1"/>',
    fire:     '<path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3s0 2 1.5 2.5C9 11 12 9 12 3Z"/>',
    pencil:   '<path d="m4 16.5 9.5-9.5 4 4L8 20.5H4Z"/><path d="m12.5 8 4 4"/>',
    gear:     '<circle cx="12" cy="12" r="3"/><path d="M12 4v2.5M12 17.5V20M4 12h2.5M17.5 12H20M6 6l1.8 1.8M16.2 16.2 18 18M18 6l-1.8 1.8M7.8 16.2 6 18"/>',
    heart:    '<path d="M12 20S4 14.5 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.5-8 11-8 11Z"/>',
    sparkle:  '<path d="M12 3.5 13.5 9 19 10.5 13.5 12 12 17.5 10.5 12 5 10.5 10.5 9Z"/>',
    play:     '<path d="M8 5.5 18 12 8 18.5Z"/>',
    pause:    '<path d="M8.5 5.5v13M15.5 5.5v13"/>',
    bolt:     '<path d="M13 3 5 13.5h5L9 21l8-11h-5Z"/>',
    globe:    '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.3 2.6 14.7 0 17M12 3.5c-2.6 2.3-2.6 14.7 0 17"/>',
    scissors: '<circle cx="7" cy="6.5" r="2.4"/><circle cx="7" cy="17.5" r="2.4"/><path d="M9 8 20 18M9 16 20 6"/>',
    sleep:    '<path d="M14 4h5l-5 6h5M4 11h4l-4 5h4"/>'
  };

  // ---- SF Symbols (iOS): filled silhouettes ----
  var SF = {
    home:     '<path d="M11.3 3.4 3.4 10a1.6 1.6 0 0 0-.6 1.2v7.3c0 .8.6 1.5 1.4 1.5H9v-5.2c0-.7.5-1.2 1.2-1.2h3.6c.7 0 1.2.5 1.2 1.2V20h4.8c.8 0 1.4-.7 1.4-1.5v-7.3a1.6 1.6 0 0 0-.6-1.2l-7.9-6.6a1.1 1.1 0 0 0-1.4 0Z"/>',
    grow:     '<path d="M11 21v-7c-2.8-.2-5-1.6-6.2-3.9C4.4 9.4 5 8.7 5.8 8.8c2.6.2 4.6 1.7 5.6 4 .9-2.6 3-4.4 5.9-4.6.8 0 1.3.7 1 1.4-1.1 2.6-3.4 4.2-6.3 4.4V21a1 1 0 0 1-2 0Z"/>',
    jardim:   '<circle cx="12" cy="12.4" r="2.4"/><path d="M12 4c1.5 0 2.7 1.2 2.7 2.7 0 .6-.2 1.1-.5 1.6 1.6-.5 3.5.2 4.4 1.7.8 1.3.4 2.9-.8 3.6.6.2 1 .8 1 1.5 0 1.5-1.2 2.7-2.7 2.7-.6 0-1.1-.2-1.6-.5.5 1.6-.2 3.5-1.7 4.4-1.3.8-2.9.4-3.6-.8-.2.6-.8 1-1.5 1-1.5 0-2.7-1.2-2.7-2.7 0-.6.2-1.1.5-1.6-1.6.5-3.5-.2-4.4-1.7-.8-1.3-.4-2.9.8-3.6-.6-.2-1-.8-1-1.5 0-1.5 1.2-2.7 2.7-2.7.6 0 1.1.2 1.6.5C8.4 7 9.1 5.1 10.6 4.2c.4-.2.9-.2 1.4-.2Z" opacity="0"/><circle cx="12" cy="6.6" r="2.7"/><circle cx="17.2" cy="9.8" r="2.7"/><circle cx="15.3" cy="15.7" r="2.7"/><circle cx="8.7" cy="15.7" r="2.7"/><circle cx="6.8" cy="9.8" r="2.7"/>',
    insights: '<rect x="4.5" y="13" width="3.4" height="7" rx="1.2"/><rect x="10.3" y="6.5" width="3.4" height="13.5" rx="1.2"/><rect x="16.1" y="10" width="3.4" height="10" rx="1.2"/>',
    person:   '<circle cx="12" cy="7.5" r="3.7"/><path d="M4.6 19.4c0-3.9 3.3-6.4 7.4-6.4s7.4 2.5 7.4 6.4c0 .9-.7 1.1-1.5 1.1H6.1c-.8 0-1.5-.2-1.5-1.1Z"/>',
    shield:   '<path d="M11.6 2.6 5 5.2a1.5 1.5 0 0 0-1 1.4v4.6c0 5 3.4 8.9 7.5 10.6.3.1.7.1 1 0C16.6 20.1 20 16.2 20 11.2V6.6a1.5 1.5 0 0 0-1-1.4l-6.6-2.6a1.2 1.2 0 0 0-.8 0Z"/>',
    shieldCheck:'<path d="M11.6 2.6 5 5.2a1.5 1.5 0 0 0-1 1.4v4.6c0 5 3.4 8.9 7.5 10.6.3.1.7.1 1 0C16.6 20.1 20 16.2 20 11.2V6.6a1.5 1.5 0 0 0-1-1.4l-6.6-2.6a1.2 1.2 0 0 0-.8 0Z"/><path d="m8.7 11.6 2.2 2.2 4.4-4.6" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    bell:     '<path d="M12 2.5A6 6 0 0 0 6 8.5c0 4.4-1.7 5.9-2.2 6.4a1 1 0 0 0 .7 1.7h15a1 1 0 0 0 .7-1.7c-.5-.5-2.2-2-2.2-6.4a6 6 0 0 0-6-6Z"/><path d="M9.8 18.5a2.3 2.3 0 0 0 4.4 0Z"/>',
    bellOff:  '<path d="M12 2.5A6 6 0 0 0 6 8.5c0 4.4-1.7 5.9-2.2 6.4a1 1 0 0 0 .7 1.7h15a1 1 0 0 0 .7-1.7c-.5-.5-2.2-2-2.2-6.4a6 6 0 0 0-6-6Z"/><path d="M9.8 18.5a2.3 2.3 0 0 0 4.4 0Z"/><path d="M3.5 3.5 20.5 20.5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M4 4 20 20" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
    leaf:     '<path d="M4.5 19.5C4.5 11 11 4.5 19.5 4.5c.4 0 .7.3.7.7C20.2 13.5 13.7 20 5.2 20a.7.7 0 0 1-.7-.5Z"/><path d="M6.5 18C9.2 15 12.6 12.2 16 10.4" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity="0.85"/>',
    moon:     '<path d="M20.5 13.6a8.3 8.3 0 1 1-9.8-9.8 1 1 0 0 1 1.1 1.4 6.4 6.4 0 0 0 7.3 8.9 1 1 0 0 1 1.4.9Z"/>',
    sun:      '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>',
    wind:     '<path d="M3 9.2h10.6A2.6 2.6 0 1 0 11 6.5a1 1 0 0 0 2 0 .6.6 0 1 1 .6.7H3a1 1 0 0 0 0 2Z"/><path d="M3 13.7h13.1a2.6 2.6 0 1 1-2.6 2.8 1 1 0 0 1 2 0 .6.6 0 1 0 .6-.8H3a1 1 0 0 0 0 2Z" opacity="0"/><path d="M3 13.7h13.1a2.6 2.6 0 1 1-2.6 2.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    chat:     '<path d="M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H9.5l-3.8 3.6A.6.6 0 0 1 4.7 19v-3.1A1.5 1.5 0 0 1 3.5 14.5V6A1.5 1.5 0 0 1 5 4.5Z"/>',
    clock:    '<path d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z"/><path d="M12 7.3V12l3 1.8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    calendar: '<rect x="3.8" y="5.2" width="16.4" height="15" rx="2.4"/><path d="M3.8 9.4h16.4" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M8 3.2v3.4M16 3.2v3.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    book:     '<path d="M11 5.5C9.5 4.6 7.5 4.2 5.4 4.4 4.6 4.5 4 5.1 4 5.9v11c0 .8.8 1.4 1.6 1.3 1.8-.2 3.6.2 5 1.1.2.2.6.2.8 0 1.4-.9 3.2-1.3 5-1.1.8.1 1.6-.5 1.6-1.3V5.9c0-.8-.6-1.4-1.4-1.5-2.1-.2-4.1.2-5.6 1.1Z"/><path d="M12 5.8V18.5" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.7"/>',
    drop:     '<path d="M12 3.2c-.3 0-.6.1-.8.4C9.6 5.7 5.5 10.6 5.5 14a6.5 6.5 0 0 0 13 0c0-3.4-4.1-8.3-5.7-10.4a1 1 0 0 0-.8-.4Z"/>',
    brain:    '<path d="M9.3 4.2a2.8 2.8 0 0 0-2.7 2 2.6 2.6 0 0 0-1.7 4.3 2.6 2.6 0 0 0 0 3.6 2.6 2.6 0 0 0 1.7 4.3 2.8 2.8 0 0 0 5.4-1V6.6a2.4 2.4 0 0 0-2.7-2.4Z"/><path d="M14.7 4.2a2.8 2.8 0 0 1 2.7 2 2.6 2.6 0 0 1 1.7 4.3 2.6 2.6 0 0 1 0 3.6 2.6 2.6 0 0 1-1.7 4.3 2.8 2.8 0 0 1-5.4-1" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
    eye:      '<path d="M12 5.5C6 5.5 2.5 11.4 2.4 11.7a.7.7 0 0 0 0 .6C2.5 12.6 6 18.5 12 18.5s9.5-5.9 9.6-6.2a.7.7 0 0 0 0-.6C21.5 11.4 18 5.5 12 5.5Z"/><circle cx="12" cy="12" r="2.6" fill="#fff"/>',
    trophy:   '<path d="M7 4.2h10c.6 0 1 .4 1 1v3.3a6 6 0 0 1-3.6 5.5c-.5.7-1.2 1.2-2 1.5v2h2.6a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2h2.6v-2c-.8-.3-1.5-.8-2-1.5A6 6 0 0 1 6 8.5V5.2c0-.6.4-1 1-1Z"/><path d="M6 6H4.4v1.6A2.6 2.6 0 0 0 6.5 10.2M18 6h1.6v1.6A2.6 2.6 0 0 1 17.5 10.2" fill="none" stroke="currentColor" stroke-width="1.7"/>',
    phone:    '<path d="M6.6 3.6c.5-.1 1 .1 1.3.6l1.4 3a1.3 1.3 0 0 1-.3 1.5l-1.2 1c.9 1.7 2.3 3.1 4 4l1-1.2a1.3 1.3 0 0 1 1.5-.3l3 1.4c.5.3.7.8.6 1.3l-.5 2.4a1.3 1.3 0 0 1-1.4 1A15.5 15.5 0 0 1 3 6.3a1.3 1.3 0 0 1 1-1.4Z"/>',
    envelope: '<rect x="3.5" y="5.8" width="17" height="12.4" rx="2.4"/><path d="m4.5 7 6.6 4.6a1.5 1.5 0 0 0 1.8 0L19.5 7" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>',
    gift:     '<path d="M5 9.5h14c.6 0 1 .4 1 1v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-8c0-.6.4-1 1-1Z"/><path d="M3.5 8h17v3h-17ZM12 8v12" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M12 8S10.6 4 8.2 5 9.6 8 12 8ZM12 8s1.4-4 3.8-3S14.4 8 12 8Z"/>',
    lock:     '<rect x="4.8" y="10.2" width="14.4" height="10" rx="2.6"/><path d="M8 10.2V8a4 4 0 0 1 8 0v2.2" fill="none" stroke="currentColor" stroke-width="1.9"/>',
    speakerOff:'<path d="M4 9.3h2.8l4-3.4c.6-.5 1.5-.1 1.5.7v11c0 .8-.9 1.2-1.5.7l-4-3.4H4a1 1 0 0 1-1-1V10.3a1 1 0 0 1 1-1Z"/><path d="m15.2 9.5 4 5M19.2 9.5l-4 5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>',
    work:     '<rect x="3.2" y="7.3" width="17.6" height="12.4" rx="2.4"/><path d="M8.3 7.3V6a2 2 0 0 1 2-2h3.4a2 2 0 0 1 2 2v1.3" fill="none" stroke="currentColor" stroke-width="1.9"/>',
    crown:    '<path d="M4 8.3c0-.7.8-1.1 1.4-.7l2.3 1.6L11 4.4a1.2 1.2 0 0 1 2 0l3.3 4.8 2.3-1.6c.6-.4 1.4 0 1.4.7l-1.4 9.4a1 1 0 0 1-1 .8H6.4a1 1 0 0 1-1-.8Z"/>',
    palette:  '<path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.6 0 2.4-1.2 2.4-2.3 0-1 .8-1.7 1.8-1.7h1.6A2.8 2.8 0 0 0 20.6 13 8.7 8.7 0 0 0 12 3.5Z"/><circle cx="7.6" cy="11" r="1.2" fill="#fff"/><circle cx="11.5" cy="7.8" r="1.2" fill="#fff"/><circle cx="15.6" cy="10.6" r="1.2" fill="#fff"/>',
    fire:     '<path d="M12 2.6c-.3 0-.5.3-.5.6.1 2.4-1 4.1-2.3 5.4C7.8 10 6.4 11.6 6.4 14a5.6 5.6 0 0 0 11.2 0c0-1.9-.8-3.1-1.6-4.2-.2.7-.6 1.3-1.2 1.6.5-2.6-.6-5.6-2.4-8.4a.5.5 0 0 0-.4-.4Z"/>',
    pencil:   '<path d="m4 16.3 9.6-9.6a1.2 1.2 0 0 1 1.7 0l2.3 2.3a1.2 1.2 0 0 1 0 1.7L8 20.3l-4.4 1a.6.6 0 0 1-.7-.7Z"/>',
    gear:     '<path d="M10.6 3.3h2.8a1 1 0 0 1 1 .8l.3 1.6a6 6 0 0 1 1.3.8l1.5-.6a1 1 0 0 1 1.2.4l1.4 2.4a1 1 0 0 1-.2 1.3l-1.2 1a6 6 0 0 1 0 1.4l1.2 1a1 1 0 0 1 .2 1.3l-1.4 2.4a1 1 0 0 1-1.2.4l-1.5-.6a6 6 0 0 1-1.3.8l-.3 1.6a1 1 0 0 1-1 .8h-2.8a1 1 0 0 1-1-.8l-.3-1.6a6 6 0 0 1-1.3-.8l-1.5.6a1 1 0 0 1-1.2-.4L3.4 16a1 1 0 0 1 .2-1.3l1.2-1a6 6 0 0 1 0-1.4l-1.2-1A1 1 0 0 1 3.4 10l1.4-2.4a1 1 0 0 1 1.2-.4l1.5.6a6 6 0 0 1 1.3-.8l.3-1.6a1 1 0 0 1 1-.8Z"/><circle cx="12" cy="12" r="2.8" fill="#fff"/>',
    heart:    '<path d="M12 20.3c-.3 0-.6-.1-.8-.3C7.5 16.7 4 13.5 4 9.4 4 7 5.8 5.2 8.1 5.2c1.5 0 2.9.8 3.9 2 1-1.2 2.4-2 3.9-2C18.2 5.2 20 7 20 9.4c0 4.1-3.5 7.3-7.2 10.6-.2.2-.5.3-.8.3Z"/>',
    sparkle:  '<path d="M12 2.8c.3 0 .5.2.6.5l1.3 4.8 4.8 1.3c.6.2.6 1 0 1.2l-4.8 1.3-1.3 4.8c-.2.6-1 .6-1.2 0l-1.3-4.8-4.8-1.3c-.6-.2-.6-1 0-1.2l4.8-1.3 1.3-4.8c.1-.3.3-.5.6-.5Z"/>',
    play:     '<path d="M7.5 5.2c0-.7.8-1.2 1.4-.8l9.4 6c.6.4.6 1.3 0 1.7l-9.4 6c-.6.4-1.4-.1-1.4-.8Z"/>',
    pause:    '<rect x="7" y="5" width="3.4" height="14" rx="1.4"/><rect x="13.6" y="5" width="3.4" height="14" rx="1.4"/>',
    bolt:     '<path d="M13.2 2.8a.5.5 0 0 1 .79.52L12.5 9h4.3a.6.6 0 0 1 .47.97l-8.3 10.6a.5.5 0 0 1-.88-.44L9.5 13.4H5.2a.6.6 0 0 1-.47-.97Z"/>',
    globe:    '<path d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z"/><path d="M3.6 12h16.8M12 3.6c2.6 2.4 2.6 14.4 0 16.8M12 3.6c-2.6 2.4-2.6 14.4 0 16.8" fill="none" stroke="#fff" stroke-width="1.3"/>',
    scissors: '<circle cx="6.8" cy="6.5" r="2.6"/><circle cx="6.8" cy="17.5" r="2.6"/><path d="M8.8 8 19.6 18M8.8 16 19.6 6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>',
    sleep:    '<path d="M14 3.6h5.2a.6.6 0 0 1 .48.96L14.7 11h4.5a.7.7 0 0 1 0 1.4H13a.6.6 0 0 1-.48-.96L17.5 5H14a.7.7 0 0 1 0-1.4ZM4 11.4h4.2a.6.6 0 0 1 .48.96L5.7 16.6H8.5a.7.7 0 0 1 0 1.4H4a.6.6 0 0 1-.48-.96L6.5 12.8H4a.7.7 0 0 1 0-1.4Z"/>'
  };

  function wrapStroke(inner) {
    return '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" ' +
      'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true" focusable="false" style="display:block">' + inner + '</svg>';
  }
  function wrapFill(inner) {
    return '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" ' +
      'aria-hidden="true" focusable="false" style="display:block">' + inner + '</svg>';
  }

  // ---- Mood faces (5 niveis): down meh ok good great ----
  var MOUTH = {
    down:  'M8 16.4q4-3.4 8 0',
    meh:   'M8.5 15.9q3.5-1.4 7 0',
    ok:    'M8.6 15.4h6.8',
    good:  'M8.5 15q3.5 1.9 7 0',
    great: 'M8 14.4q4 4 8 0'
  };
  function moodInner(level, filledFace) {
    var m = MOUTH[level] || MOUTH.ok;
    var eyeY = level === 'great' ? 9.6 : 9.8;
    var eyes;
    if (level === 'great') {
      eyes = '<path d="M7 10.4q1.6-1.8 3.2 0M13.8 10.4q1.6-1.8 3.2 0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>';
    } else {
      eyes = '<circle cx="8.6" cy="' + eyeY + '" r="1.15" fill="currentColor" stroke="none"/>' +
             '<circle cx="15.4" cy="' + eyeY + '" r="1.15" fill="currentColor" stroke="none"/>';
    }
    var mouth = '<path d="' + m + '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>';
    return eyes + mouth;
  }
  function mood(level, style) {
    // style 'sf' or 'mi' only changes nothing visually here (faces are line-art both sides);
    // kept for API symmetry / future divergence.
    return '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false" style="display:block">' +
      moodInner(level, style === 'sf') + '</svg>';
  }

  var Icons = {
    mi: function (name) { return MI[name] ? wrapStroke(MI[name]) : ''; },
    sf: function (name) { return SF[name] ? wrapFill(SF[name]) : ''; },
    mood: mood,
    _MI: MI, _SF: SF
  };

  // Resolve platform from the icon's ancestor screen.
  // .ios-screen -> SF (filled); anything else (incl. .a-screen) -> Material (outline).
  function isIos(el) {
    return !!(el.closest && el.closest('.ios-screen'));
  }
  function done(el) { return el.firstElementChild && el.firstElementChild.tagName === 'svg'; }

  // Some screens hid the original emoji on the Android side with `font-size:0`
  // on the icon container and drew a CSS `::after` dot instead. Our SVG uses
  // 1em, so under font-size:0 it would render at 0px. Detect that case and
  // size the SVG from the container box, and suppress the placeholder dot.
  var dotStyleInjected = false;
  function injectDotSuppress() {
    if (dotStyleInjected || !document.head) return;
    dotStyleInjected = true;
    var s = document.createElement('style');
    s.textContent = '.brota-has-icon::after{display:none!important;}';
    document.head.appendChild(s);
  }
  function fixZeroSize(el) {
    var svg = el.firstElementChild;
    if (!svg) return;
    var fs = parseFloat((global.getComputedStyle ? getComputedStyle(el).fontSize : '') || '16');
    if (fs && fs >= 1) return; // normal font-size path: 1em sizing is fine
    var box = el.parentElement;
    var s = box ? Math.min(box.clientWidth, box.clientHeight) : 0;
    var px = s > 4 ? Math.round(s * 0.6) : 20;
    svg.style.width = px + 'px';
    svg.style.height = px + 'px';
    if (box) { injectDotSuppress(); box.classList.add('brota-has-icon'); }
  }

  function hydrate(root) {
    root = root || document;
    // data-icon: platform-aware (preferred)
    root.querySelectorAll('[data-icon]').forEach(function (el) {
      if (done(el)) return;
      var name = el.getAttribute('data-icon');
      var html = isIos(el) ? Icons.sf(name) : Icons.mi(name);
      if (html) { el.innerHTML = html; fixZeroSize(el); }
    });
    // explicit overrides
    root.querySelectorAll('[data-mi]').forEach(function (el) {
      if (done(el)) return;
      var html = Icons.mi(el.getAttribute('data-mi'));
      if (html) el.innerHTML = html;
    });
    root.querySelectorAll('[data-sf]').forEach(function (el) {
      if (done(el)) return;
      var html = Icons.sf(el.getAttribute('data-sf'));
      if (html) el.innerHTML = html;
    });
    // data-face: Brota mood faces (distinct from the app's own data-mood logic attr)
    root.querySelectorAll('[data-face]').forEach(function (el) {
      if (done(el)) return;
      var style = el.getAttribute('data-face-style') || (isIos(el) ? 'sf' : 'mi');
      el.innerHTML = Icons.mood(el.getAttribute('data-face'), style);
      fixZeroSize(el);
    });
  }

  Icons.hydrate = hydrate;
  global.Icons = Icons;

  // Self-healing: re-hydrate when screens are (re)built via innerHTML on
  // state/theme toggles. Debounced via rAF; hydrate() is idempotent (skips
  // nodes that already contain an <svg>), so no mutation loop.
  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    (global.requestAnimationFrame || setTimeout)(function () {
      scheduled = false;
      hydrate(document);
    }, 16);
  }
  function startObserver() {
    if (!global.MutationObserver || !document.body) return;
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes && muts[i].addedNodes.length) { schedule(); return; }
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  function boot() { hydrate(); startObserver(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  global.addEventListener('load', function () { hydrate(); });
})(window);
