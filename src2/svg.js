const svg = {
  imgList: {
    blank: {
      class: "grass",
      paths: [{ c: "", d: "m 50,50 -3,-5 m 8,6 0,-8 m 5,8 2,5" }],
      shift: { x: 30, y: 30 },
      scale: 90,
      rotate: 40,
    },
    title: `<svg id="d" viewBox="0 0 100 66">
    <defs>
     <linearGradient id="a" x1="47.927" x2="46.257" y1="43.946" y2="14.584" gradientTransform="matrix(1.2227 0 0 1.4112 -14.695 -38.822)" gradientUnits="userSpaceOnUse">
      <stop style="stop-color:#cfab65" offset="0"/>
      <stop style="stop-color:#fff" offset="1"/>
     </linearGradient>
     <linearGradient id="c" x1="50.531" x2="51.177" y1="38.413" y2="71.913" gradientTransform="translate(-1.1621 -2.6038)" gradientUnits="userSpaceOnUse">
      <stop style="stop-color:#d3b272" offset="0"/>
      <stop style="stop-color:#715522" offset="1"/>
     </linearGradient>
    </defs>
    <path id="b" d="m10.033 36.24s9.9249-18.995 40.187-19.019c26.482-0.02109 36.405 18 36.405 18" style="fill:none;paint-order:stroke fill markers"/>
    <g transform="matrix(1.0634 0 0 1.0806 -2.5377 -8.1549)">
     <path d="m16.516 31.868c-4.2426 5.1265-9.197 15.62-6.8943 21.92 2.1937 6.0022 3.8625 8.8335 10.96 10.783 6.7368 1.8507 8.2562-0.6838 17.678-1.0607 8.8388-0.35355 6.6804 1.8764 19.445 2.2981 21.542 0.7116 25.956-5.5154 29.875-19.445 1.923-6.8341-5.7603-10.352-10.663-14.912-6.842-6.3643-18.507-5.1855-21.864-5.417-10.253-0.70711-22.451-0.70711-26.163 0-3.7123 0.70711-8.1317 1.2374-12.374 5.8336z" style="fill:url(#c);paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.8;stroke:#000"/>
     <ellipse transform="rotate(33.958)" cx="95.59" cy="4.8248" rx=".7955" ry="1.7678" style="fill:#473716;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.10954;stroke-width:2.8;stroke:#c1943c"/>
     <ellipse transform="rotate(34.077)" cx="83.635" cy="6.4376" rx=".7955" ry="1.7678" style="fill:#6b5222;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.095406;stroke-width:2.8;stroke:#c1943c"/>
     <ellipse transform="rotate(-22.028)" cx="60.155" cy="68.807" rx=".7955" ry="1.7678" style="fill:#806228;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.19081;stroke-width:2.8;stroke:#c1943c"/>
    </g>
    <g transform="matrix(1.0634 0 0 1.0806 -.41097 -5.1833)">
     <text transform="translate(-1.1551 3.1796)" style="fill:#000000;font-family:sans-serif;font-size:15.763px;font-weight:bold;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:3.678;stroke:#000000" xml:space="preserve"><textPath style="stroke-width:3.678" xlink:href="#b"><tspan style="fill:#000000;font-family:'Comic Sans MS';font-weight:normal;paint-order:stroke fill markers;stroke-width:3.678">SPUD LIFE</tspan></textPath></text>
     <text transform="translate(-.21614 1.7463)" style="fill:url(#a);font-family:sans-serif;font-size:15.763px;font-weight:bold;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:3.678;stroke:#000000" xml:space="preserve"><textPath style="fill:url(#a);stroke-width:3.678" xlink:href="#b"><tspan style="fill:url(#a);font-family:'Comic Sans MS';font-weight:normal;paint-order:stroke fill markers;stroke-width:3.678">SPUD LIFE</tspan></textPath></text>
    </g>
    <text x="17.75" y="57.75" style="fill:#3c2f12;font-family:Tahoma;font-size:5.3333px;font-weight:bold;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.095406;stroke-width:2.8" xml:space="preserve"><tspan x="17.75" y="57.75" style="fill:#3c2f12;font-size:5.3333px">A chip shop simulator</tspan></text>
   </svg>`,
    home: `<svg viewBox="0 0 100 100">
      <rect x="13.125" y="55.375" width="70.75" height="43.75" style="fill:#aa6c2c"/>
      <rect id="house-door" x="40.375" y="69.625" width="16.625" height="29.625"/>
      <g transform="rotate(89.312 -5.5718 57.246)">
      <rect x="8.125" y="17.625" width="17.125" height="16.25" style="fill:#aae1e4;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:1.7764;stroke:#001700"/>
      <path d="m7.875 25.25 17.25 0.25" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:1.7764;stroke:#001700"/>
      <path d="m15.625 18 0.125 15.5" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:1.7764;stroke:#001700"/>
      </g>
      <g transform="translate(53.438 53.25)">
      <rect x="8.125" y="17.625" width="17.125" height="16.25" style="fill:#aae1e4;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:1.7764;stroke:#001700"/>
      <path d="m7.875 25.25 17.25 0.25" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:1.7764;stroke:#001700"/>
      <path d="m15.625 18 0.125 15.5" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:1.7764;stroke:#001700"/>
      </g>
      <use xlink:href="#rect6440"/>
      <rect id="rect6440" x="20.25" y="33.125" width="11.375" height="15.875" style="fill:#aa6c2c"/>
      <g transform="translate(33.375,1)">
      <path transform="translate(-33.375,-1)" d="m13.625 55.5 33.875-26.25 36.25 26.5" style="fill:#aa6c2c;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:2.9102;stroke:#621700"/>
      <ellipse cx="16" cy="51.75" rx="7.875" ry="7.5" style="fill:#aae1e4;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:1.7764;stroke:#001700"/>
      <path d="M 16.125,44.125 15.75,58.5" style="fill:#aae1e4;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:1.7764;stroke:#001700"/>
      <path d="m8.25 51.75h15.5" style="fill:#aae1e4;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:1.7764;stroke:#001700"/>
      </g>
    </svg>`,
    hardware: `<svg viewBox="0 0 100 100">
      <rect x="21.625" y="14.625" width="54.5" height="11.375" style="fill:#fffafa;stroke-width:.96918"/>
      <text x="25" y="23.25" style="fill:#800000;font-family:'Comic Sans MS';font-size:8px;font-weight:bold">HARDWARE</text>
      <rect x="13.125" y="55.375" width="70.75" height="43.75" style="fill:#542b16"/>
      <path d="m18.875 30.25-13.5 29h84.75l-10.125-29.125z" style="fill:#e62b2e;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:2.9102;stroke:#e62b2e"/>
      <path d="m23.375 31.75-9.25 28.75 11 0.375 6.125-29.375" style="fill:#fff"/>
      <path d="m37.5 31.875-3.75 28.75 9.75-0.125 2-28.5" style="fill:#fff"/>
      <path d="m53 32.125 0.75 28.25 10.5 0.25-3.5-28.375" style="fill:#fff"/>
      <path d="m68.125 32.25 4.5 28.375h10.125l-7-28.375" style="fill:#fff"/>
      <rect x="40.375" y="69.625" width="16.625" height="29.625"/>
    </svg>`,
    cart: `<svg viewBox="0 0 100 100">
      <defs>
      <radialGradient id="radialGradient38744" cx="38.305" cy="36.087" r="15.233" gradientTransform="matrix(1.8761 -.0041976 .0020613 .90458 -28.747 19.661)" gradientUnits="userSpaceOnUse">
        <stop style="stop-color:#efe9e7" offset=".086817"/>
        <stop style="stop-color:#e48b43" offset="1"/>
      </radialGradient>
      <radialGradient id="radialGradient38880" cx="30.099" cy="-3.4178" r="37.813" gradientTransform="matrix(1.6825 -.37731 .12962 .58866 -19.731 43.033)" gradientUnits="userSpaceOnUse">
        <stop style="stop-color:#5c9fac" offset="0"/>
        <stop style="stop-color:#3e1eac" offset="1"/>
      </radialGradient>
      <radialGradient id="radialGradient1713" cx="44.877" cy="58.661" r="15.459" gradientTransform="matrix(1.7708 .0051031 .0014204 1.4341 -29.763 -16.504)" gradientUnits="userSpaceOnUse">
        <stop style="stop-color:#614c32;stop-opacity:0" offset=".20955"/>
        <stop style="stop-opacity:.49682" offset=".78572"/>
      </radialGradient>
      </defs>
      <path d="m12.223 86.805c-1.1211-15.839-2.2422-33.942 0-44.124 3.3632-11.314 10.09-16.971 20.179-19.234 10.09-2.2628 24.664-2.2628 35.875 0 11.132 3.2879 19.058 10.182 23.543 20.365 4.4843 10.182 4.4843 24.891 3.3632 33.942-1.1211 7.9197-4.4843 9.0511-15.695 10.182-11.211 0-31.39 1.1314-50.449 0" style="fill:url(#radialGradient38880);stroke-width:1.1262"/>
      <rect x="33.523" y="50.6" width="33.768" height="18.961" style="fill:url(#radialGradient38744);stroke-width:1.1204"/>
      <rect x="30.16" y="69.834" width="41.48" height="2.2628" style="fill:#2d0000;stroke-width:1.1262"/>
      <rect x="6.6172" y="84.825" width="67.265" height="3.3942" style="fill:#c0c0c0;stroke-width:1.1262"/>
      <rect x="6.6172" y="85.673" width="2.2422" height="11.314" style="fill:#c0c0c0;stroke-width:1.1262"/>
      <ellipse cx="7.7382" cy="95.856" rx="3.3632" ry="3.3942" style="stroke-width:1.1262"/>
      <ellipse cx="78.366" cy="87.936" rx="11.211" ry="11.314" style="stroke-width:1.1262"/>
      <ellipse cx="78.366" cy="87.936" rx="6.7265" ry="6.7883" style="fill:#c0c0c0;stroke-width:1.1262"/>
      <rect x="17.828" y="35.892" width="67.265" height="12.445" style="fill:#fffafa;stroke-width:1.1262"/>
      <text transform="scale(.99544 1.0046)" x="19.035959" y="44.738308" style="fill:#800000;font-family:'Comic Sans MS';font-size:9.0098px;font-weight:bold;stroke-width:1.1262">FISH &amp; CHIPS</text>
      <rect x="32.402" y="49.469" width="35.875" height="20.365" style="fill:url(#radialGradient1713);stroke-width:.44824"/>
      <path d="m17.828 46.075c10.09-3.3942 21.301-5.6569 33.632-7.9197" style="stroke-linecap:round;stroke-width:2.2524;stroke:#2f4f4f"/>
      <path d="m19.229 37.553c10.609 3.8741 22.344 4.0826 33.808 7.6427" style="stroke-linecap:round;stroke-width:2.2524;stroke:#2f4f4f"/>
    </svg>`,
    pick: `<svg viewBox="0 0 100 100">
    <rect x="46.321" y="2.4125" width="7.7201" height="76.236" style="fill:#693f1d;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:2.5323;stroke:#000"/>
    <path d="m90.591 21.351s-10.433-15.456-40.652-15.44c-30.22 0.015776-39.685 16.164-39.685 16.164s26.713-7.2747 40.169-7.367c13.455-0.09226 40.169 6.6432 40.169 6.6432z" style="fill:#929292;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:2.1543;stroke:#000"/>
    <path d="m52.543 8.359s7.5656 0.095383 14.671 2.0471c7.1054 1.9517 9.8944 3.9236 9.8944 3.9236" style="fill:#929292;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-opacity:.67925;stroke-width:2.1543;stroke:#fff"/>
    <path d="m51.69 17.742 0.17059 57.66" style="fill:#929292;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-opacity:.47642;stroke-width:2.1543;stroke:#fff"/>
   </svg>
   `,
    spade: `<svg viewBox="0 0 100 100">
    <rect x="47.174" y="12.307" width="7.7201" height="76.236" style="fill:#693f1d;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:2.5323;stroke:#000"/>
    <path d="m37.707 15.38s0.34797 11.595 0.9585 19.647c0.33027 4.3558 0.73737 7.6747 1.2078 7.5605 0 0 19.406 0.54822 21.323 0.39623 2.0259-0.16058 1.812 3.6801 3.7034-9.55 1.478-10.338 1.8194-18.524 1.8194-18.524s-5.3581-3.0099-14.08-2.9315c-8.7216 0.07833-14.932 3.4019-14.932 3.4019z" style="fill:#929292;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:2.1543;stroke:#000"/>
    <path d="m40.601 17.742s7.0538-2.8047 13.306-2.5589 10.065 2.2177 10.065 2.2177" style="fill:#929292;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-opacity:.67924;stroke-width:2.1543;stroke:#fff"/>
    <path d="m52.543 46.06-0.34118 39.407" style="fill:#929292;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-opacity:.47642;stroke-width:2.1543;stroke:#fff"/>
    <rect x="36.336" y="82.396" width="28.66" height="6.1413" style="fill:#693f1d;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-opacity:.99642;stroke-width:2.1543;stroke:#000"/>
    <path d="m39.066 84.443h23.542v0.17059" style="fill:#693f1d;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-opacity:.48746;stroke-width:2.1543;stroke:#fff"/>
    <path d="m48.448 39.919 2.7295-10.236" style="fill:#693f1d;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-opacity:.48746;stroke-width:2.1543;stroke:#000"/>
    <path d="m52.713 29.171 1.8765 10.747v0.17059" style="fill:#693f1d;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-opacity:.48746;stroke-width:2.1543;stroke:#fff"/>
   </svg>`,
    axe: `<svg viewBox="0 0 100 100">
        <rect x="46.321" y="2.4125" width="7.7201" height="76.236" style="fill:#693f1d;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:2.5323;stroke:#000"/>
        <path d="m75.92 2.5858s-27.492 1.7738-33.317 1.619c-2.1577-0.057349-2.2597 14.878-0.34224 14.726 9.5515-0.75711 26.335 13.721 26.335 13.721s9.654 4.4962 13.215-12.826c3.5611-17.322-5.8911-17.24-5.8911-17.24z" style="fill:#929292;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-width:2.1543;stroke:#000"/>
        <path d="m74.549 5.6296s3.8125 0.77775 4.0942 6.4825c0.28171 5.7048-2.7295 13.306-2.7295 13.306" style="fill:#929292;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-opacity:.67924;stroke-width:2.1543;stroke:#fff"/>
        <path d="m52.031 30.195-0.17059 45.207" style="fill:#929292;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-opacity:.47642;stroke-width:2.1543;stroke:#fff"/>
      </svg>`,
    basket: `<svg viewBox="0 0 100 100">
      <defs>
        <linearGradient id="linearGradient9688" x1="38.573" x2="36.244" y1="72.154" y2="34.795" gradientUnits="userSpaceOnUse">
        <stop style="stop-color:#1e1612" offset="0"/>
        <stop style="stop-color:#4b3d2c;stop-opacity:0" offset="1"/>
        </linearGradient>
      </defs>
      <path d="m4.4354 55.443c-1.8765 3.2413-2.5589 9.8944-1.0236 21.324 1.6195 12.057 7.9765 16.083 14.671 17.571 9.212 2.0471 59.196-1.5353 59.196-1.5353s13.306-3.9236 15.524-15.865c2.2177-11.941 2.7295-20.13 1.0236-23.542-1.7059-3.4119-15.353-6.6531-21.153-6.3119-56.369 3.3158-64.996 5.2884-68.237 8.359z" style="fill:#4b3d2c;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m4.9472 55.613s-0.34119 2.9001 0.68237 4.0942c1.0236 1.1941 4.6217 7.8185 18.253 7.1649 24.907-1.1941 58.275-3.6186 66.531-6.1413 6.1413-1.8765 3.2413-7.5061 1.7059-8.8708-1.5353-1.3647-12.283-5.9707-27.124-4.2648-14.842 1.7059-46.742 3.753-52.031 5.1178-5.2884 1.3647-8.0179 2.9001-8.0179 2.9001z" style="fill:url(#linearGradient9688);stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m57.149 64.484 2.2177-24.907s1e-6 -5.459-4.4354-12.453c-4.1666-6.5705-13.136-3.4119-15.012 3.9236-1.8765 7.3355-1.3647 17.571-1.3647 17.571l6.8237-0.34118s-1.6774-10.172 0.34118-16.889c2.8269-9.4054 8.7672-8.9921 13.477-6.3119 2.4698 1.4055 5.8002 5.6296 6.8237 10.065l0.51178 7.3355-1.5353 21.153" style="fill:#4b3d2c;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m56.978 26.271s2.3835 0.22338 4.9472 5.1178c1.8765 3.5824 2.0471 9.0414 2.0471 9.0414" style="fill:none;stroke-linecap:round;stroke-opacity:.43404;stroke-width:2.5;stroke:#fff"/>
      </svg>`,
    wallet: `<svg viewBox="0 0 100 100">
      <path d="m82.396 23.712 0.17059-8.1884s1.8765-8.1885-4.9472-5.2884c-6.8237 2.9001-54.248 12.112-60.049 16.036-6.8237 1.0236-15.012 16.206 3.753 13.136 18.765-3.0707 65.337-15.695 65.337-15.695s5.1178-2.0471 4.9472 7.6767c-0.16203 9.2358-2.0471 44.013-2.0471 44.013s1.7059 7.5061-6.6531 10.236c-8.4886 2.7718-58.684 11.941-58.684 11.941s-16.889 4.0942-15.865-7.8473c1.0236-11.941 0-52.713 0-52.713" style="fill:#4b3d2c;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m13.647 33.948 66.361-16.078" style="fill:none;stroke-linecap:round;stroke-width:2.5;stroke:#e9e8e1"/>
      <path d="m15.609 35.91 65.252-15.737" style="fill:none;stroke-linecap:round;stroke-width:2.5;stroke:#fbfbfb"/>
      <path d="m17.486 38.127 63.802-15.524" style="fill:none;stroke-linecap:round;stroke-opacity:.9447;stroke-width:2.5;stroke:#c2e1bf"/>
      <path d="m92.461 41.283s4.7766-0.85296 4.4354 4.9472c-0.34118 5.8002-0.85296 15.695-0.85296 15.695s-0.51178 4.2648-3.4119 4.606c-2.9001 0.34118-19.959 4.2648-20.471 4.0942-12.283-7.5061-4.0942-18.253-1.8765-20.983 2.2177-2.7295 21.495-5.9707 21.495-5.9707" style="fill:#4b3d2c;stroke-linecap:round;stroke-opacity:.6129;stroke-width:2.5;stroke:#000"/>
      <path d="m86.832 27.807-65.166 15.865s-4.0942 1.5353-4.2648 8.1884c-0.17059 6.6531-0.68237 41.454-0.68237 41.454v0" style="fill:#4b3d2c;stroke-linecap:round;stroke-opacity:.38249;stroke-width:2.5;stroke:#fff"/>
      <path d="m93.338 47.023s-18.031 2.2981-20.153 5.1265c-5.6133 6.1229-4.5169 11.492-0.53033 13.612" style="fill:#4b3d2c;stroke-linecap:round;stroke-opacity:.38249;stroke-width:2.5;stroke:#fff"/>
      </svg>`,
    up: `<svg viewBox="0 0 100 100">s
    <path d="m25.248 50.495 25.077-38.042 23.542 37.701" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:9.1;stroke:#060d41"/>
    <path d="m50.495 16.889-0.34118 68.578" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:9.1;stroke:#060d41"/>
    <path d="m51.86 11.771 23.712 36.848" style="fill:#797a94;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.36742;stroke-width:2.3;stroke:#fff"/>
    <path d="m42.648 27.807-16.718 23.712" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#626687"/>
    <path d="m51.178 27.977v54.931" style="fill-opacity:.011765;fill:#11184a;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#626687"/>
   </svg>
   `,
   down: `<svg viewBox="0 0 100 100">
   <path d="m25.248 47.425 25.077 38.042 23.542-37.701" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:9.1;stroke:#060d41"/>
   <path d="m50.495 81.032-0.34118-68.578" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:9.1;stroke:#060d41"/>
   <path d="m56.637 73.696 17.571-27.636" style="fill:#797a94;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.36742;stroke-width:2.3;stroke:#fff"/>
   <path d="m42.819 70.796-16.889-24.395" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#626687"/>
   <path d="m51.519 65.849v-54.931" style="fill-opacity:.066667;fill:#192050;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#626687"/>
  </svg>`,
  left: `<svg viewBox="0 0 100 100">
  <path d="m51.092 24.651-38.042 25.077 37.701 23.542" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:9.1;stroke:#060d41"/>
  <path d="m17.486 49.899 68.578-0.34118" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:9.1;stroke:#060d41"/>
  <path d="m21.58 53.31 30.366 18.595" style="fill:#797a94;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.36742;stroke-width:2.3;stroke:#fff"/>
  <path d="m21.068 43.416 30.707-20.13" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#626687"/>
  <path d="m18.509 48.193 67.555-0.34118" style="fill-opacity:.066667;fill:#192050;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#626687"/>
 </svg>
 `,
  right: `<svg viewBox="0 0 100 100">
  <path d="m48.022 24.651 38.042 25.077-37.701 23.542" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:9.1;stroke:#060d41"/>
  <path d="m81.629 49.899-68.578-0.34118" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:9.1;stroke:#060d41"/>
  <path d="m75.829 55.699-27.636 17.23" style="fill:#797a94;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.36742;stroke-width:2.3;stroke:#fff"/>
  <path d="m85.894 47.681-36.166-23.542" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#626687"/>
  <path d="m70.029 48.704-55.272-0.51178" style="fill-opacity:.066667;fill:#192050;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#626687"/>
 </svg>`,

    "control-icon--up": {
      class: "thick control-icon",
      paths: [{ c: "", d: "m 20,80 30,-60 30,60" }],
    },
    "control-icon--right": {
      class: "thick control-icon",
      paths: [{ c: "", d: "m 20,20 60,30 -60,30" }],
    },
    "control-icon--down": {
      class: "thick control-icon",
      paths: [{ c: "", d: "m 20,20 30,60 30,-60" }],
    },
    "control-icon--left": {
      class: "thick control-icon",
      paths: [{ c: "", d: "m 80,20 -60,30 60,30" }],
    },
    "control-field--left": `<svg viewBox="0 0 100 100">
      <path d="m11.5 17.75c0.70711-1.591 74.631-6.6062 75.25-4.75 0.7955 1.149 1.3107 44.674 0.25 46-1.9507 1.256-70.571 2.0026-72.25 0.5s-3.1616-38.303-3.25-41.75z" style="fill:#4b3d2c;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m12.75 31.5 9-1" style="fill:#0f0c09;stroke-linecap:round;stroke-opacity:.51915;stroke-width:2.5;stroke:#000"/>
      <path d="m86 41-10.5 1.25" style="fill:#140f0b;stroke-linecap:round;stroke-opacity:.53617;stroke-width:2.5;stroke:#000"/>
      <path d="m70.858 33.341c0.88388 1.591 1.7374 12.013 0.5 13.25-1.2374 1.4142-19.75-2.25-19.75-2.25s0.21967 6.227 0.75 11c-1.4142 2.8284-22.53-16.732-22-18.5-0.53033-2.1213 18.172-18.298 21-16 0 5.1265 0.25 12.75 0.25 12.75s19.25-2.0178 19.25-0.25z" style="fill:#dee14c;stroke-linecap:round;stroke-width:2.5;stroke:#dee14c"/>
      <path d="M 42.75,61.5 54,61.25 53.25,98 H 42 Z" style="fill:#4b3d2c;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m51 65.5-0.25 27.75-0.25-0.75" style="fill:#4b3d2c;stroke-linecap:round;stroke-opacity:.26267;stroke-width:2.5;stroke:#fff"/>
      <path d="m15.026 19.092s67.175-4.773 69.473-2.4749c1.591 2.1213 0.53033 20.86 0.53033 20.86" style="fill:none;stroke-linecap:round;stroke-opacity:.28511;stroke-width:2.5;stroke:#fff"/>
      <path d="m85.206 43.487-0.17678 13.081" style="fill:none;stroke-linecap:round;stroke-opacity:.28511;stroke-width:2.5;stroke:#fff"/>
      </svg>`,
    "control-field--right": `<svg viewBox="0 0 100 100">
      <path d="m11.5 17.75c0.70711-1.591 74.631-6.6062 75.25-4.75 0.7955 1.149 1.3107 44.674 0.25 46-1.9507 1.256-70.571 2.0026-72.25 0.5s-3.1616-38.303-3.25-41.75z" style="fill:#4b3d2c;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m12.75 31.5 9-1" style="fill:#0f0c09;stroke-linecap:round;stroke-opacity:.51915;stroke-width:2.5;stroke:#000"/>
      <path d="m86 41-10.5 1.25" style="fill:#140f0b;stroke-linecap:round;stroke-opacity:.53617;stroke-width:2.5;stroke:#000"/>
      <path d="m31.439 33.341c-0.88388 1.591-1.7374 12.013-0.5 13.25 1.2374 1.4142 19.75-2.25 19.75-2.25s-0.21967 6.227-0.75 11c1.4142 2.8284 22.53-16.732 22-18.5 0.53033-2.1213-18.172-18.298-21-16 0 5.1265-0.25 12.75-0.25 12.75s-19.25-2.0178-19.25-0.25z" style="fill:#dee14c;stroke-linecap:round;stroke-width:2.5;stroke:#dee14c"/>
      <path d="M 42.75,61.5 54,61.25 53.25,98 H 42 Z" style="fill:#4b3d2c;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m51 65.5-0.25 27.75-0.25-0.75" style="fill:#4b3d2c;stroke-linecap:round;stroke-opacity:.26267;stroke-width:2.5;stroke:#fff"/>
      <path d="m15.026 19.092s67.175-4.773 69.473-2.4749c1.591 2.1213 0.53033 20.86 0.53033 20.86" style="fill:none;stroke-linecap:round;stroke-opacity:.28511;stroke-width:2.5;stroke:#fff"/>
      <path d="m85.206 43.487-0.17678 13.081" style="fill:none;stroke-linecap:round;stroke-opacity:.28511;stroke-width:2.5;stroke:#fff"/>
      </svg>`,
    bone: `<svg viewBox="0 0 100 100">
      <path d="m23.335 41.189 48.437-12.374s-1.3465-4.7873 4.4194-9.0156c2.6517-1.9445 16.794 0.17678 13.081 7.6014-3.7123 7.4246-7.4246 3.7123-1.7678 7.7782 5.6569 4.0659 1.2924 9.2949-5.4801 13.258-6.6768 0.36558-11.501-1.9087-10.783-9.7227l-44.725 11.49s6.7109 2.463-3.0052 11.844c-5.1265 4.9497-12.162-1.2001-10.96-5.3033 3.045-10.394 0.54355 0.31744-4.4194-9.3692-3.04-5.9334 3.3588-11.314 6.0104-12.905 5.5603-1.2481 8.954-3.9928 9.1924 6.7175z" style="fill:#eaddb9;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m22.981 44.194 48.437-12.374" style="fill:#eaddb9;stroke-linecap:round;stroke-opacity:.65899;stroke-width:2.5;stroke:#fff"/>
      <path d="m75.13 24.042s3.3438-5.034 8.3085-1.2374l3.0052 2.2981" style="fill:#eaddb9;stroke-linecap:round;stroke-opacity:.75115;stroke-width:2.5;stroke:#fff"/>
      <path d="m12.021 40.128s4.097-4.7659 6.5407-3.3588c2.6607 1.5321 0.96008 3.0641 1.4142 4.5962" style="fill:#eaddb9;stroke-linecap:round;stroke-opacity:.6129;stroke-width:2.5;stroke:#fff"/>
      </svg>`,
    gold: `<svg viewBox="0 0 100 100">
      <ellipse cx="26.605" cy="50.205" rx="17.766" ry="4.9497" style="fill:#e9ec6d;stroke-linecap:round;stroke-width:2.5;stroke:#4e3e10"/>
      <ellipse cx="26.87" cy="45.962" rx="17.766" ry="4.9497" style="fill:#e9ec6d;stroke-linecap:round;stroke-width:2.5;stroke:#4e3e10"/>
      <path d="m9.1094 48.031c1.8971 0.12704 1.6698 1.324 2.2473 2.4019 0.48792 0.91074 1.8349 1.2045 2.7527 1.3794l1.6406 0.3125" style="fill:none;stroke-linecap:square;stroke-width:2.5;stroke:#4e3e10"/>
      <path d="m44.5 47.875c-2.875 0.0625-0.9375 2.5-5.8125 4.1875" style="fill:none;stroke-linecap:square;stroke-width:2.5;stroke:#4e3e10"/>
      <g transform="rotate(18.795 50.955 117.83)">
      <ellipse cx="26.605" cy="50.205" rx="17.766" ry="4.9497" style="fill:#e9ec6d;stroke-linecap:round;stroke-width:2.5;stroke:#4e3e10"/>
      <ellipse cx="26.87" cy="45.962" rx="17.766" ry="4.9497" style="fill:#e9ec6d;stroke-linecap:round;stroke-width:2.5;stroke:#4e3e10"/>
      <path d="m9.1094 48.031c1.8971 0.12704 1.6698 1.324 2.2473 2.4019 0.48792 0.91074 1.8349 1.2045 2.7527 1.3794l1.6406 0.3125" style="fill:none;stroke-linecap:square;stroke-width:2.5;stroke:#4e3e10"/>
      <path d="m44.5 47.875c-2.875 0.0625-0.9375 2.5-5.8125 4.1875" style="fill:none;stroke-linecap:square;stroke-width:2.5;stroke:#4e3e10"/>
      </g>
      <g transform="matrix(1.0734 .0076744 -.058265 1.0025 43.101 3.5896)">
      <ellipse cx="26.605" cy="50.205" rx="17.766" ry="4.9497" style="fill:#e9ec6d;stroke-linecap:round;stroke-width:2.5;stroke:#4e3e10"/>
      <ellipse cx="26.87" cy="45.962" rx="17.766" ry="4.9497" style="fill:#e9ec6d;stroke-linecap:round;stroke-width:2.5;stroke:#4e3e10"/>
      <path d="m9.1094 48.031c1.8971 0.12704 1.6698 1.324 2.2473 2.4019 0.48792 0.91074 1.8349 1.2045 2.7527 1.3794l1.6406 0.3125" style="fill:none;stroke-linecap:square;stroke-width:2.5;stroke:#4e3e10"/>
      <path d="m44.5 47.875c-2.875 0.0625-0.9375 2.5-5.8125 4.1875" style="fill:none;stroke-linecap:square;stroke-width:2.5;stroke:#4e3e10"/>
      </g>
    </svg>
    `,
    diamond: `<svg viewBox="0 0 100 100">
      <path d="m25.25 30.25 12.305-5.1342 14.771-3.403 15.924-0.96284 17 15.25-28.25 44.5-43.75-29z" style="fill:#c9f0e4;stroke-linecap:square;stroke-width:2.5;stroke:#000"/>
      <path d="m14.25 51.25 19 1 22.75-4 15-4.25 13.25-8.5" style="fill:none;stroke-linecap:square;stroke-width:2.5;stroke:#000"/>
      <path d="m28.5 34 7 0.75 10-1.5 11.5-3.25 7-4.25" style="fill:none;stroke-linecap:square;stroke-width:2.5;stroke:#000"/>
      <path d="m35.5 34.5-2.5 17.25 22.75 27.5" style="fill:none;stroke-linecap:square;stroke-width:2.5;stroke:#000"/>
      <path d="m45.5 33 7.25 15.75 3.75 30" style="fill:none;stroke-linecap:square;stroke-width:2.5;stroke:#000"/>
      <path d="M 58.25,30 70,44.5 57.5,79.25" style="fill:none;stroke-linecap:square;stroke-width:2.5;stroke:#000"/>
      <path d="m47.75 34.25 9.75-3.5 10 13-14 3.75" style="fill:#fbfefd"/>
      <path d="m17.75 52.75 15.5 0.75 17.25 21.25" style="fill:#93cfe4"/>
      </svg>`,
    tin: `<svg viewBox="0 0 100 100">
      <path d="m48.25 37.75c5.867-3.9673 3.2423-2.1522 12-7l8.25-7s2.9634-3.7874 11.375 0.125c5.375 2.5 8.2818 3.7428 12.375 14.25 5.5492 14.245-4 28.25-4 28.25s-1.25 1.875-19.75 13.625-40.25 10.25-40.25 10.25-10-6.25-11.75-18.25-2.2329-15.386-0.5-23.75c1.5433-7.4486 5.25-18.5 14.875-12.75 6.6349 1.0223 10.455 1.9967 16 2.25" style="fill:#5e3226;stroke-linecap:square;stroke-width:2.5;stroke:#000"/>
      <path d="m26.5 34.875s8.3428 4.4364 10.125 14.875c1.75 10.25 0.5 9.875-1.25 20.375s-7.125 19.75-7.125 19.75-8.375-3.75-11.875-18.125c-3.3593-13.797-2.125-18.25 0.125-26s1.25-6.75 4.875-9.875 5.125-1 5.125-1z" style="fill:#321b15;stroke-linecap:square;stroke-width:2.5;stroke:#000"/>
      <path d="m47.625 38.125 6.875 2.375s5.1966 3.0906 11.25 2.5l5.125-0.5" style="fill:none;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m36.375 40.375 7.375 1.375s5.0352 1.0901 11.125 3.125" style="fill:none;stroke-linecap:round;stroke-opacity:.35751;stroke-width:2.5;stroke:#fff"/>
      <path d="m74.375 26.25s7.5 1 10.375 7.5 4.125 6.25 3.875 12-0.75 8.5-0.75 8.5" style="fill:none;stroke-linecap:round;stroke-opacity:.28497;stroke-width:2.5;stroke:#fff"/>
    </svg>`,
    pottery: `<svg viewBox="0 0 100 100">
      <path d="m9.75 69.25s5.75-7.5 16.25-7.75 18.921 5.1711 24.5 11.25c6.275 6.8374 3.75 11.5 3.75 11.5s5.75 4.25 9 0 1.5-3.5 1.5-3.5 2 1.25 10.75-3.25 10-9.25 13-15c2.2454-4.3036 0-10.25 0-10.25s-3.75-14.25-17-16-30-3.25-41.5 4.5-9.75 10.5-9.75 10.5-7.25-0.25-10.5 4.75 0 13.25 0 13.25z" style="fill:#934e3b;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m16 52s5.2381-1.6457 14.25 0.5c5.25 1.25 12 4.5 12 4.5" style="fill:#934e3b;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m63.75 83.5s1.5-4.25-0.5-8.5c-0.5-6.25-5.25-7.75-5.25-7.75" style="fill:#934e3b;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      </svg>`,
    bottle: `<svg viewBox="0 0 55 94">
    <path d="m21.729 5.7877s3.4969-4.4239 8.75-4.25c3.1287 0.10355 5.9046 0.87164 8.3358 3.0429 1.1866 1.0597 3.7678 2.8232 3.7678 2.8232l0.39645 9.3839-2.5 2.25s-1.25 3.909 0.75 8.909 6 4.4497 8.5 12.457c3.7261 11.934 4.75 21.634 1.25 34.134s-6 15.5-6 15.5-9 3.25-16.25 2.5-13-2.5-13-2.5-10.116-15.427-9.1464-32.177c0.97192-16.789 4.2932-19.072 7.9697-23.598 3.5858-4.4142 3.4268-2.2249 5.1768-6.4749s2.75-10.25 2.75-10.25l-2.0126-1.9268z" style="fill:#adffdb;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
    <path d="m25.424 8.6287s1.3661 1.9822 5.3661 1.9822 5.9519-1.5429 5.9519-1.5429" style="fill:none;stroke-linecap:round;stroke-width:2.5;stroke:#2b512b"/>
    <path d="m21.229 17.038 5.25 2.5h0.25" style="fill:#fff;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
    <path d="m40.479 18.538-5.25 2.25" style="fill:#fff;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
    <path d="m18.729 85.038s2.5-4.75 8.25-4.5 11 1.75 12.25 3.5 1.25 2 1.25 2" style="fill:none;stroke-linecap:round;stroke-width:2.5;stroke:#276240"/>
    <path d="m47.376 63.598s4.3691-7.9131-2.8536-23.854c-1.7976-3.9674-3.2966-3.2044-5.2929-5.9571-2.2197-3.0607-3-5.75-3-5.75" style="fill:none;stroke-linecap:round;stroke-width:2.5;stroke:#fff"/>
    <path d="m39.57 8.636-0.60355 6.9016" style="fill:none;stroke-linecap:round;stroke-width:2.5;stroke:#fff"/>
    <path d="m34.729 5.5377-3.2929-0.79289s-2.2071-0.70711-3.2071-0.45711-2 1.75-2 1.75" style="fill:none;stroke-linecap:round;stroke-width:2.5;stroke:#fff"/>
   </svg>`,
    marble: `<svg viewBox="0 0 100 100">
      <defs>
      <radialGradient id="radialGradient31709" cx="46.05" cy="53.121" r="37.047" gradientUnits="userSpaceOnUse">
        <stop style="stop-color:#1b1835;stop-opacity:.98742" offset="0"/>
        <stop style="stop-color:#fff" offset="1"/>
      </radialGradient>
      <radialGradient id="radialGradient37584" cx="55.154" cy="34.295" r="10.253" gradientTransform="matrix(1 0 0 .98276 0 .59129)" gradientUnits="userSpaceOnUse">
        <stop style="stop-color:#fff" offset="0"/>
        <stop style="stop-color:#fff;stop-opacity:0" offset="1"/>
      </radialGradient>
      </defs>
      <circle cx="46.05" cy="53.121" r="35.797" style="fill:url(#radialGradient31709);stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <ellipse cx="55.154" cy="34.295" rx="10.253" ry="10.076" style="fill:url(#radialGradient37584)"/>
    </svg>`,
    caps: `<svg viewBox="0 0 100 100">
      <g transform="translate(5.5)">
      <path d="m6.0988 49.851s4.2426-4.8614 13.7-6.364c9.0415-1.4365 13.081-0.17678 17.678 1.591 4.5962 1.7678 8.3085 4.9497 9.0156 6.8943l0.70711 1.9445 1.2374 6.2756-2.2981 2.3865c-5.5941-0.58995-0.25094 2.6692-5.1265 1.9445-4.2426 0-0.61872 3.3588-5.922 2.2981-5.3033-1.0607-3.1663 3.0932-7.6898 1.2374-1.4006-0.57459-4.6476 2.3406-5.5821 0.2197-1.0338-2.3461-5.2972 1.384-6.7922-0.48486-2.4749-3.0936-6.1318 0.30211-6.8059-2.9168-1.0383-4.9576-7.1595-1.2374-5.3033-7.8666 1.0077-4.9067-0.60504-3.5893 3.182-7.1595z" style="fill:#8f3432;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m10.694 54.945s1.8642 1.362 8.3093 2.5078c3.9775 0.70711 7.0711 0.97227 12.64 0.08839 6.5431-1.0386 10.361-5.0551 10.361-5.0551" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m11.756 58.513-1.216 4.3185" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m17.589 60.104-0.87316 4.2452" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m40.305 57.364 0.94638 2.1328" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m34.825 59.662 0.97671 3.4605" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m28.681 59.807 0.82138 6.006" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m23.397 59.654-0.15089 6.5489" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      </g>
      <g transform="translate(38.449 13.529)">
      <path d="m6.0988 49.851s4.2426-4.8614 13.7-6.364c9.0415-1.4365 13.081-0.17678 17.678 1.591 4.5962 1.7678 8.3085 4.9497 9.0156 6.8943l0.70711 1.9445 1.2374 6.2756-2.2981 2.3865c-5.5941-0.58995-0.25094 2.6692-5.1265 1.9445-4.2426 0-0.61872 3.3588-5.922 2.2981-5.3033-1.0607-3.1663 3.0932-7.6898 1.2374-1.4006-0.57459-4.6476 2.3406-5.5821 0.2197-1.0338-2.3461-5.2972 1.384-6.7922-0.48486-2.4749-3.0936-6.1318 0.30211-6.8059-2.9168-1.0383-4.9576-7.1595-1.2374-5.3033-7.8666 1.0077-4.9067-0.60504-3.5893 3.182-7.1595z" style="fill:#8f3432;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m10.694 54.945s1.8642 1.362 8.3093 2.5078c3.9775 0.70711 7.0711 0.97227 12.64 0.08839 6.5431-1.0386 10.361-5.0551 10.361-5.0551" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m11.756 58.513-1.216 4.3185" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m17.589 60.104-0.87316 4.2452" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m40.305 57.364 0.94638 2.1328" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m34.825 59.662 0.97671 3.4605" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m28.681 59.807 0.82138 6.006" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m23.397 59.654-0.15089 6.5489" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      </g>
      <g transform="rotate(21.154 78.839 152.56)">
      <path d="m6.0988 49.851s4.2426-4.8614 13.7-6.364c9.0415-1.4365 13.081-0.17678 17.678 1.591 4.5962 1.7678 8.3085 4.9497 9.0156 6.8943l0.70711 1.9445 1.2374 6.2756-2.2981 2.3865c-5.5941-0.58995-0.25094 2.6692-5.1265 1.9445-4.2426 0-0.61872 3.3588-5.922 2.2981-5.3033-1.0607-3.1663 3.0932-7.6898 1.2374-1.4006-0.57459-4.6476 2.3406-5.5821 0.2197-1.0338-2.3461-5.2972 1.384-6.7922-0.48486-2.4749-3.0936-6.1318 0.30211-6.8059-2.9168-1.0383-4.9576-7.1595-1.2374-5.3033-7.8666 1.0077-4.9067-0.60504-3.5893 3.182-7.1595z" style="fill:#8f3432;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m10.694 54.945s1.8642 1.362 8.3093 2.5078c3.9775 0.70711 7.0711 0.97227 12.64 0.08839 6.5431-1.0386 10.361-5.0551 10.361-5.0551" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m11.756 58.513-1.216 4.3185" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m17.589 60.104-0.87316 4.2452" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m40.305 57.364 0.94638 2.1328" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m34.825 59.662 0.97671 3.4605" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m28.681 59.807 0.82138 6.006" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      <path d="m23.397 59.654-0.15089 6.5489" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.49362;stroke-width:2.5;stroke:#fff"/>
      </g>
    </svg>`,
    chipper: `<svg viewBox="0 0 90 93">
    <g transform="translate(-3.0052 -1.7678)">
     <path d="m18.75 8.5 44.25-0.5s-1.75 9.5-8.25 14.5c-13.424 10.326-18.009 5.0148-26.25-0.25-9-5.75-9.75-13.75-9.75-13.75z" style="fill:#b0b0a9;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
     <path d="m52 11.25s0.39175 5.7877-1.75 8.25c-4.3347 4.9835-5.5 5.25-5.5 5.25" style="fill:none;stroke-linecap:round;stroke-opacity:.6;stroke-width:2.5;stroke:#fff"/>
    </g>
    <path d="m1.4948 91.732 0.14638-8.755 6.1036 5e-3 0.25-53.75s0.25-4.5 6-4.75c5.75-0.25 60 0 60 0s7.5-1.75 7.25 6.75-0.5 51-0.5 51h6s1.75 0.5 1.75 3.25-0.25 6.5-0.25 6.5z" style="fill:#8f3432;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
    <path d="m43.245 61.982c9.6283-0.25 19.424-0.5 28.75-0.75 0 0 2 0.875 2 2.5s-0.75 2.625-0.75 2.625l-1.375 2.375-21.125 0.875" style="fill:#612703;stroke-linecap:round;stroke-width:2.5;stroke:#020202"/>
    <path d="m34.495 28.982s4.25 0.75 4 5.75-0.5 51-0.5 51v0" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.46667;stroke-width:2.5;stroke:#fff"/>
    <path d="m38.995 31.982 37.75-0.5v0" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.54667;stroke-width:2.5;stroke:#fff"/>
    <path d="m47.245 67.232c4 2.875 3.875 2.375 3.875 2.375l20.625-0.875 2.375-2.625s1.125 10.625-6.375 11.875-24.5 0.25-24.5 0.25l0.27506-17.245s0.97494 3.6198 3.7249 6.2448z" style="fill:#b0b0a9;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
    <path d="m50.12 71.732s-0.25 2.75-2.125 3.875l-1.875 1.125" style="fill:none;stroke-linecap:round;stroke-opacity:.61277;stroke-width:2.5;stroke:#fdfdfd"/>
    <ellipse cx="23.495" cy="56.232" rx="7.25" ry="11.375" style="fill:#76766c;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
    <ellipse cx="19.37" cy="56.232" rx="7.25" ry="11.375" style="fill:#b0b0a9;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
    <circle cx="51.929" cy="44.868" r="2.9375" style="fill:#97dd06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
    <circle cx="61.967" cy="44.659" r="2.9375" style="fill:#dd3d06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
    <ellipse cx="38.057" cy="5.7947" rx="22.043" ry="3.7927" style="fill:#76766c;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5396;stroke:#000"/>
   </svg>
   `,
    chipper2000: `<svg viewBox="0 0 100 100">
      <path d="m18.75 8.5 44.25-0.5s-1.75 9.5-8.25 14.5c-13.424 10.326-18.009 5.0148-26.25-0.25-9-5.75-9.75-13.75-9.75-13.75z" style="fill:#ddad06;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m52 11.25s0.39175 5.7877-1.75 8.25c-4.3347 4.9835-5.5 5.25-5.5 5.25" style="fill:none;stroke-linecap:round;stroke-opacity:.6;stroke-width:2.5;stroke:#fff"/>
      <path d="m4.5 93.5 0.14638-8.755 6.1036 0.005048 0.25-53.75s0.25-4.5 6-4.75 60 0 60 0 7.5-1.75 7.25 6.75-0.5 51-0.5 51h6s1.75 0.5 1.75 3.25-0.25 6.5-0.25 6.5z" style="fill:#8f3432;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m46.25 63.75c9.6283-0.25 19.424-0.5 28.75-0.75 0 0 2 0.875 2 2.5s-0.75 2.625-0.75 2.625l-1.375 2.375-21.125 0.875" style="fill:#612703;stroke-linecap:round;stroke-width:2.5;stroke:#020202"/>
      <path d="m37.5 30.75s4.25 0.75 4 5.75-0.5 51-0.5 51v0" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.46667;stroke-width:2.5;stroke:#fff"/>
      <path d="m42 33.75 37.75-0.5v0" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.54667;stroke-width:2.5;stroke:#fff"/>
      <path d="m50.25 69c4 2.875 3.875 2.375 3.875 2.375l20.625-0.875 2.375-2.625s1.125 10.625-6.375 11.875-24.5 0.25-24.5 0.25l0.27506-17.245s0.97494 3.6198 3.7249 6.2448z" style="fill:#ddad06;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m53.125 73.5s-0.25 2.75-2.125 3.875l-1.875 1.125" style="fill:none;stroke-linecap:round;stroke-opacity:.61277;stroke-width:2.5;stroke:#fdfdfd"/>
      <ellipse cx="26.5" cy="58" rx="7.25" ry="11.375" style="fill:#dd7f06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <ellipse cx="22.375" cy="58" rx="7.25" ry="11.375" style="fill:#ddad06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <circle cx="52.812" cy="46.812" r="2.9375" style="fill:#97dd06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <circle cx="62.75" cy="46.375" r="2.9375" style="fill:#dd7f06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <circle cx="72.75" cy="46.25" r="2.9375" style="fill:#dd3d06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <ellipse cx="41.062" cy="7.5625" rx="22.043" ry="3.7927" style="fill:#dd7f06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5396;stroke:#000"/>
    </svg>`,
    curly: `<svg viewBox="0 0 100 100">
      <path d="m18.75 8.5 44.25-0.5s2.3159 11.621-4.1841 16.621c-13.424 10.326-26.141 6.429-34.382 1.1642-9-5.75-5.6841-17.286-5.6841-17.286z" style="fill:#b0b0a9;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m52 11.25s0.39175 5.7877-1.75 8.25c-4.3347 4.9835-5.5 5.25-5.5 5.25" style="fill:none;stroke-linecap:round;stroke-opacity:.6;stroke-width:2.5;stroke:#fff"/>
      <path d="m4.5 93.5 0.14638-8.755 6.1036 0.005048 0.25-53.75s0.25-4.5 6-4.75 60 0 60 0 7.5-1.75 7.25 6.75-0.5 51-0.5 51h6s1.75 0.5 1.75 3.25-0.25 6.5-0.25 6.5z" style="fill:#4e734f;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m46.25 63.75c9.6283-0.25 19.424-0.5 28.75-0.75 0 0 2 0.875 2 2.5s-0.75 2.625-0.75 2.625l-1.375 2.375-21.125 0.875" style="fill:#2a3d27;stroke-linecap:round;stroke-width:2.5;stroke:#020202"/>
      <path d="m37.5 30.75s4.25 0.75 4 5.75-0.5 51-0.5 51v0" style="fill:none;stroke-linecap:round;stroke-opacity:.46667;stroke-width:2.5;stroke:#fff"/>
      <path d="m42 33.75 37.75-0.5v0" style="fill:#8f3432;stroke-linecap:round;stroke-opacity:.54667;stroke-width:2.5;stroke:#fff"/>
      <path d="m50.25 69c4 2.875 3.875 2.375 3.875 2.375l20.625-0.875 2.375-2.625s1.125 10.625-6.375 11.875-24.5 0.25-24.5 0.25l0.27506-17.245s0.97494 3.6198 3.7249 6.2448z" style="fill:#b0b0a9;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m53.125 73.5s-0.25 2.75-2.125 3.875l-1.875 1.125" style="fill:none;stroke-linecap:round;stroke-opacity:.61277;stroke-width:2.5;stroke:#fdfdfd"/>
      <g transform="matrix(.77487 0 0 .7613 2.5849 -.29725)">
      <ellipse cx="26.5" cy="58" rx="7.25" ry="11.375" style="fill:#76766c;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <ellipse cx="22.375" cy="58" rx="7.25" ry="11.375" style="fill:#b0b0a9;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      </g>
      <g transform="matrix(.77487 0 0 .7613 10.056 21.783)">
      <ellipse cx="26.5" cy="58" rx="7.25" ry="11.375" style="fill:#76766c;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <ellipse cx="22.375" cy="58" rx="7.25" ry="11.375" style="fill:#b0b0a9;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      </g>
      <circle cx="76.324" cy="43.1" r="2.9375" style="fill:#97dd06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <circle cx="76.639" cy="52.614" r="2.9375" style="fill:#dd3d06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <ellipse cx="41.062" cy="7.5625" rx="22.043" ry="3.7927" style="fill:#76766c;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5396;stroke:#000"/>
    </svg>`,
    soup: `<svg viewBox="0 0 100 100">
      <path d="m23.893 69.698 35.355 1.0607 2.2981 3.182v17.501l-5.3033 0.70711s0.70711-12.905-8.8388-12.905c-9.5459 0-14.319 0.17678-14.319 0.17678s-6.5407 1.0607-6.7175 6.8943c-0.17678 5.8336-1.0607 5.1265-1.0607 5.1265l-4.0659 0.53033-0.63596-18.215z" style="fill:#3b3655;stroke-linecap:round;stroke-opacity:.99149;stroke-width:2.5;stroke:#010101"/>
      <path d="m25.861 24.178-0.22376 38.355s1.1188 12.316 15.887 12.492c14.768 0.17594 16.334-12.14 16.334-12.14l-0.22376-39.059s1.8816-13.196-15.663-13.196c-18.124 0-16.11 13.547-16.11 13.547z" style="fill:#3b3655;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.806;stroke:#000"/>
      <path d="m30.081 21.084s4.0702 2.8441 10.607 3.0052c5.8559 0.14432 11.137-2.6517 11.137-2.6517" style="fill:none;stroke-linecap:round;stroke-opacity:.52766;stroke-width:2.5;stroke:#fff"/>
      <path d="m50.764 63.334-0.17678-39.775" style="fill:none;stroke-linecap:round;stroke-opacity:.52766;stroke-width:2.5;stroke:#fff"/>
      <path d="m55.713 54.672c10.687-0.40078 18.457 0.69399 21.92 0.17678 0 0 6.0104 1.2374 5.4801 7.6014l-0.53033 6.364-6.0476-0.17086 0.23768-4.6021s0.41445-4.0109-2.9443-3.8341c-3.3588 0.17678-18.293 0.8289-18.293 0.8289s-2.1213-3.3588 0.17678-6.364z" style="fill:#bf9315;stroke-linecap:round;stroke-opacity:.99149;stroke-width:2.5;stroke:#010101"/>
      <path d="m63.845 54.495-0.53033-9.0156 11.667-1.7678s5.4801-0.53033 4.773 3.0052-3.8891 3.8891-3.8891 3.8891l-7.4246-0.53033 0.17678 4.773" style="fill:#bf9315;stroke-linecap:round;stroke-opacity:.99149;stroke-width:2.5;stroke:#010101"/>
      <circle cx="31.943" cy="35.161" r="2.9375" style="fill:#dd3d06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <circle cx="31.982" cy="44.209" r="2.9375" style="fill:#97dd06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <path d="m58.835 56.865 18.071 0.29964s3.285-0.39284 3.7973 3.837c0.34764 2.8703 0.06788 4.6249 0.06788 4.6249" style="fill:none;stroke-linecap:round;stroke-opacity:.66383;stroke-width:2.5;stroke:#fff"/>
      <path d="m69.411 46.815 6.8368-0.69527" style="fill:none;stroke-linecap:round;stroke-opacity:.65957;stroke-width:2.5;stroke:#fff"/>
      <path d="m54.447 74.423 2.6517-0.35355s2.1977 0.53136 2.1213 3.3588l-0.17678 6.5407" style="fill:none;stroke-linecap:round;stroke-opacity:.53617;stroke-width:2.5;stroke:#fff"/>
    </svg>
    `,
    bake: `<svg viewBox="0 0 100 100">
    <defs>
     <radialGradient id="radialGradient8309" cx="48.083" cy="60.844" r="16.63" gradientTransform="matrix(1 0 0 .65726 0 17.166)" gradientUnits="userSpaceOnUse">
      <stop style="stop-color:#f7b643" offset="0"/>
      <stop style="stop-color:#202020;stop-opacity:.98113" offset="1"/>
     </radialGradient>
    </defs>
    <path d="m4.5 93.5 0.49993-31.206 6.7072-1.2423s-1.0902-24.924 6.1768-32.504c14.96-17.108 39.806-21.38 61.947-2.0888 5.7086 5.6651 4.1694 23.546 4.0756 35.235l7.417 2.2209-0.073223 29.835z" style="fill:#89705b;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
    <path d="m32.527 59.751 30.759-0.35355v-14.319l-1.0607-0.70711c-13.328-8.8857-29.698 0-29.698 0z" style="fill:url(#radialGradient8309);stroke-linecap:round;stroke-opacity:.65957;stroke-width:2.5;stroke:#000"/>
    <rect x="6.0104" y="63.286" width="84.853" height="30.936" style="fill:#663020;stroke-linecap:round;stroke-opacity:.65957;stroke-width:2.5;stroke:#000"/>
    <path d="m58.69 18.208s4.9572 1.2977 11.49 4.9497c5.731 3.2036 7.7673 6.7958 8.9097 7.8888 1.6976 1.6242 1.5201 21.103 1.5201 21.103" style="fill:none;stroke-linecap:round;stroke-opacity:.42222;stroke-width:2.5;stroke:#fff"/>
    <path d="m34.118 40.482s8.0882-3.8891 15.203-3.5355c8.2501 0.40998 15.949 5.3703 15.949 5.3703l0.3147 11.423" style="fill:none;stroke-linecap:round;stroke-opacity:.42222;stroke-width:2.5;stroke:#fff"/>
    <path d="m10.076 65.231s76.192-0.72028 78.49-0.36673c1.0607 2.6516-8.03e-4 25.999-8.03e-4 25.999" style="fill:none;stroke-linecap:round;stroke-opacity:.42222;stroke-width:2.5;stroke:#fff"/>
    <circle cx="16.396" cy="72.445" r="2.9375" style="fill:#97dd06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
    <circle cx="26.081" cy="72.413" r="2.9375" style="fill:#dd3d06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
   </svg>
    `,
    rosti: `<svg viewBox="0 0 100 100">
      <path d="m15.91 25.102 55.263-0.70711 20.349 8.8085-0.67678 38.525-62.208 0.75-13.612-16.971z" style="fill:#ffe7ae;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5;stroke:#000"/>
      <path d="m89.858 53.137-59.099 0.95711-14.672-13.612" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5;stroke:#000"/>
      <circle cx="56.171" cy="62.546" r="2.9375" style="fill:#97dd06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <circle cx="68.861" cy="62.69" r="2.9375" style="fill:#dd3d06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <g transform="translate(1.4142 2.6517)">
      <path d="m37.83 42.25 3.4926 3.3159 44.798-0.78033-5.1997-4.023" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:5.1;stroke:#000"/>
      <path d="m38.361 40.646 3.6694 3.2123 45.06-0.48744-4.7123-3.5355" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.45583;stroke-width:1.8;stroke:#fefefe"/>
      <path d="m16.263 24.042 56.038-0.88388 14.142 7.7782-56.038 1.4142" style="fill-opacity:.4947;fill:#fff"/>
      <path d="m15.733 23.688 13.081 9.8995-1.0607 35.532-12.905-16.971" style="fill-opacity:.43816;fill:#090909"/>
      </g>
      <path d="m30.406 56.038-0.35355 14.319" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.85778;stroke-width:2.5;stroke:#fefefe"/>
      <path d="m31.113 50.558 0.17678-13.965" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.85778;stroke-width:2.5;stroke:#fefefe"/>
      <path d="m18.385 27.047 12.551 8.8388 55.861-1.7678" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.85778;stroke-width:2.5;stroke:#fefefe"/>
    </svg>`,
      croquette: `<svg viewBox="0 0 100 100">
      <ellipse cx="23" cy="44" rx="8" ry="18.5" style="fill-opacity:.98039;fill:#28543a"/>
      <ellipse cx="67.75" cy="44.75" rx="8" ry="18.5" style="fill-opacity:.98039;fill:#28543a;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;stroke:#000"/>
      <rect x="23.25" y="26.25" width="46.25" height="37.25" ry="4" style="fill-opacity:.98039;fill:#28543a"/>
      <path d="m25.75 63.5 0.25 17.75 4.75 9h5s-1.25-21.5 8.5-20.25 9 19.75 9 19.75l8-0.25-0.25-26.75" style="fill-opacity:.98039;fill:#28543a;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;stroke:#000"/>
      <path d="m49.755 85.672c0.254-0.1793 0.42016-12.595-4.6054-14.927-0.55889-0.25931 5.8501 3.012 6.3502 3.7547 1.509 2.241 1.1161 15.53 1.1161 15.53" style="fill:#090909"/>
      <ellipse cx="22.5" cy="44" rx="8" ry="18.5" style="fill-opacity:.24382;fill:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;stroke:#000"/>
      <path d="M 31.75,89 32,64 27.25,65.5 27.5,81" style="fill-opacity:.24382;fill:#fff"/>
      <path d="m32.25 34.5 40.25 0.25" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.29329;stroke-width:1.8;stroke:#fefefe"/>
      <path d="m26.25 62.5h43.5" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.41343;stroke-width:1.8;stroke:#000"/>
      <g transform="translate(24.5,16.25)">
       <g transform="translate(-31.981 -28.743)">
        <path d="m46.25 63.75c9.6283-0.25 19.424-0.5 28.75-0.75 0 0 2 0.875 2 2.5s-0.75 2.625-0.75 2.625l-8.875 4.625-13.625-1.375" style="fill:#612703;stroke-linecap:round;stroke-width:2.5;stroke:#020202"/>
        <path d="m50.25 69c4 2.875 14.125 3.625 14.125 3.625l7.625-1.625 4.625-2.625s0.66974 10.432-6.875 11.375c-22 2.75-23.75-7.25-23.75-7.25l0.52506-9.745s0.97494 3.6198 3.7249 6.2448z" style="fill:#ddad06;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
        <path d="m54.5 73.875 1.375 3.875" style="fill:none;stroke-linecap:round;stroke-opacity:.61277;stroke-width:2.5;stroke:#fdfdfd"/>
       </g>
      </g>
      <circle cx="47.611" cy="42.19" r="2.9375" style="fill:#dd3d06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <circle cx="58.421" cy="42.296" r="2.9375" style="fill:#97dd06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
      <path d="m24.646 25.616 42.104 0.63388" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;stroke:#000"/>
      <ellipse cx="22.25" cy="44.375" rx="2.5" ry="8.625" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.41343;stroke-width:1.8;stroke:#000"/>
     </svg>
     `,
     masher: `<svg viewBox="0 0 100 100">
     <defs>
      <linearGradient id="linearGradient8" x1="61.502" x2="61.358" y1="24.837" y2="41.277" gradientUnits="userSpaceOnUse">
       <stop style="stop-color:#1c3341;stop-opacity:.99216" offset="0"/>
       <stop style="stop-color:#1b1b1b" offset="1"/>
      </linearGradient>
     </defs>
     <path d="m42.681 26.51-27.218 8.327" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:7.7;stroke:#000"/>
     <path d="m39.775 26.693-24.395 7.2478" style="fill-opacity:.99216;fill:#1c3341;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.21763;stroke-width:2;stroke:#fff"/>
     <rect x="22.274" y="25.809" width="9.5459" height="45.078" style="fill-opacity:.99216;fill:#1c3341;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;stroke:#000"/>
     <ellipse cx="59.734" cy="71.136" rx="28.638" ry="3.2704" style="fill-opacity:.99216;fill:#1c3341;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;stroke:#000"/>
     <rect x="31.643" y="37.83" width="57.452" height="33.411" style="fill-opacity:.98898;fill:#1d3441"/>
     <ellipse cx="61.165" cy="37.565" rx="28.638" ry="3.2704" style="fill-opacity:.99216;fill:url(#linearGradient8);stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;stroke:#000"/>
     <path d="m31.82 38.714 0.35355 33.411" style="fill-opacity:.99216;fill:#1c3341;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;stroke:#000"/>
     <path d="m89.272 38.361-0.53033 33.057" style="fill-opacity:.99216;fill:#1c3341;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;stroke:#000"/>
     <ellipse transform="rotate(-16.299)" cx="49.635" cy="50.75" rx="15.026" ry="3.2704" style="fill-opacity:.99216;fill:#0f1e24;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;stroke:#000"/>
     <rect transform="rotate(-16.299)" x="34.101" y="27.581" width="30.369" height="23.533" ry="0" style="fill-opacity:.99216;fill:#101f25"/>
     <ellipse transform="rotate(-16.299)" cx="48.887" cy="26.523" rx="15.026" ry="3.2704" style="fill-opacity:.99216;fill:#1a343e;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;stroke:#000"/>
     <path d="m47.199 39.421-7.2478-22.627" style="fill-opacity:.99216;fill:#0f1e24;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;stroke:#000"/>
     <path d="m76.014 31.289-6.5407-22.981" style="fill-opacity:.99216;fill:#0f1e24;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.8;stroke:#000"/>
     <path d="m60.458 15.38 5.1265 15.733" style="fill-opacity:.99216;fill:#0f1e24;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.47107;stroke-width:6;stroke:#fff"/>
     <path d="m71.064 44.371-0.17678 25.809" style="fill:none;stroke-linecap:square;stroke-linejoin:round;stroke-opacity:.36088;stroke-width:7.1;stroke:#fff"/>
     <circle cx="27.142" cy="44.129" r="2.9375" style="fill:#dd3d06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
     <path d="m41.189 17.324s7.1645 0.41284 15.733-2.6516c7.3481-2.628 11.449-5.5632 10.96-6.5407" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.53444;stroke-width:2;stroke:#fff"/>
     <path d="m24.218 28.107h6.1872l0.17678 9.3692" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.48485;stroke-width:2;stroke:#fff"/>
     <circle cx="27.003" cy="32.847" r="2.9375" style="fill:#97dd06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5;stroke:#000"/>
     <path d="m35.532 42.426-0.35355 28.107" style="fill:none;stroke-linecap:square;stroke-linejoin:round;stroke-opacity:.4022;stroke-width:5.2;stroke:#000"/>
     <path d="m36.062 40.128s15.372 2.5297 28.461 2.1213c15.906-0.4963 22.451-2.6516 22.451-2.6516" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.53444;stroke-width:2;stroke:#fff"/>
    </svg>    
     `,
    "pet-standing": `
    <svg viewBox="0 0 100 100">
    <path d="m25.456 66.645s2.8259-2.0175 18.562-2.8284c7.9982-0.41219 12.021 0.35355 12.905 6.364-1.229 9.6071-2.2598 8.3601-14.672 8.1317-13.608-0.4735-18.829 3.0873-19.799-6.5407-0.62056-6.1585 1.591-5.3033 1.591-5.3033" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:4.8;stroke:#000"/>
    <path d="m24.749 77.251-1.2374 20.506" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:4.8;stroke:#000"/>
    <path d="m56.038 75.837 3.3588 21.92" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:4.8;stroke:#000"/>
    <path d="m49.144 64.877 5.6569-18.562s5.1265-4.773 10.607-0.17678c5.4801 4.5962 10.43 7.7782 9.0156 12.198-1.4142 4.4194-6.5407 3.3588-10.43 1.9445-3.8891-1.4142-7.2478 10.607-7.2478 10.607" style="stroke-width:0"/>
    <path d="m27.4 77.782s-8.1317-6.7175-8.1317-13.258c0-6.5407 0.35355-7.2478 1.7678-12.551 1.1921-4.4705-0.17678 6.7175 1.2374 10.783 1.4142 4.0659 9.3692 9.5459 9.3692 9.5459" style="stroke-width:0"/>
    <ellipse cx="63.551" cy="51.442" rx="1.149" ry="1.0607" style="fill:#fff;stroke-width:0"/>
    </svg>
    `,    
    "pet-sitting": `<svg viewBox="0 0 100 100">
    <path d="m47.525 94.782s-8.1317-6.7175-8.1317-13.258c0-6.5407 0.35355-7.2478 1.7678-12.551 1.1921-4.4705-0.17678 6.7175 1.2374 10.783 1.4142 4.0659 9.3692 9.5459 9.3692 9.5459" style="stroke-width:0"/>
    <ellipse cx="53.026" cy="53.262" rx="6.0104" ry="10.076" style="stroke-width:0"/>
    <ellipse cx="45.875" cy="89.534" rx="6.0104" ry="10.076" style="stroke-width:0"/>
    <ellipse cx="58.724" cy="89.36" rx="6.0104" ry="10.076" style="stroke-width:0"/>
    <ellipse cx="55.353" cy="51.494" rx="1.149" ry="1.0607" style="fill-opacity:.5427;fill:#fff;stroke-width:0"/>
    <ellipse cx="50.551" cy="51.405" rx="1.149" ry="1.0607" style="fill:#8a8a8a;stroke-width:0"/>
    <ellipse cx="52.761" cy="77.48" rx="8.3969" ry="21.567" style="stroke-width:0"/>
    <path d="m56.208 46.721s0.97227-5.3917 3.2704-2.5633 2.1213 4.9497 2.1213 4.9497h-3.9775" style="fill-opacity:.95041;stroke-linecap:round;stroke-linejoin:round;stroke:#000"/>
    <path d="m50.007 46.713s-0.97227-5.3917-3.2704-2.5633-2.1213 4.9497-2.1213 4.9497h3.9775" style="fill-opacity:.95041;stroke-linecap:round;stroke-linejoin:round;stroke:#000"/>
    <path transform="translate(-14.503 13.222)" d="m67.711 43.289-0.67839-1.1564 1.3407-0.0093z" style="fill:#8a8a8a;stroke-linecap:round;stroke-linejoin:round;stroke:#8a8a8a"/>
    <path d="M 39.25,97.75 65,98.125" style="fill-opacity:.15152;stroke-linecap:round;stroke-linejoin:round;stroke-width:3.5;stroke:#010101"/>
   </svg>`, 
    scanner: `<svg viewBox="0 0 100 100">
      <path d="m55.508 24.926-36.239 7.7782 27.577 48.967 37.83-10.607z" style="fill:#a9a8a6;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m18.915 32.704 0.35355 22.804 23.158 42.957 3.8891-16.087" style="fill:#4d4c4b;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m43.31 99.879 38.007-10.607 3.5355-17.147-37.83 10.253" style="fill:#646361;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path id="scanner-screen" d="m26.34 35.886 27.224-6.0104 12.728 20.153-27.577 7.7782z" style="stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <ellipse transform="rotate(-29.243)" cx="12.971" cy="85.122" rx="3.4252" ry="4.0803" style="fill:#97dd06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.5124;stroke:#000"/>
      <ellipse transform="rotate(-31.219)" cx="24.122" cy="89.475" rx="3.0962" ry="4.1676" style="fill:#dd3d06;stroke-linecap:round;stroke-opacity:.99574;stroke-width:2.6915;stroke:#000"/>
      <path d="m45.785 52.679s-2.1666-3.3645 2.4749-4.4194c3.8891-0.88388 5.1265 1.591 5.1265 1.591" style="fill:none;stroke-linecap:round;stroke-width:2.5;stroke:#479438"/>
      <path d="m40.128 53.563s-1.0616-7.8851 5.8336-9.7227c6.371-1.6979 12.198 3.8891 12.198 3.8891m-22.564-0.27492s-0.03582-6.2971 7.0711-9.0156c8.8373-3.3804 14.496 2.1213 14.496 2.1213" style="fill:none;stroke-linecap:round;stroke-width:2.5;stroke:#479438"/>
      <path d="m36.946 28.638-9.0156-14.319s-2.5116-2.9404-5.3033-0.70711c-2.6516 2.1213-0.35355 5.1265-0.35355 5.1265l6.5407 11.49" style="fill:#a9a8a6;stroke-linecap:round;stroke-width:2.5;stroke:#000"/>
      <path d="m23.688 17.324 6.8943 11.667v0" style="fill:#a9a8a6;stroke-linecap:round;stroke-opacity:.58222;stroke-width:2.5;stroke:#000"/>
      <path d="m24.572 33.941 30.229-6.5407 25.809 41.719" style="fill:none;stroke-linecap:round;stroke-opacity:.85778;stroke-width:2.5;stroke:#fff"/>
    </svg>`,
    arrow: `<svg width="49.183" height="56.179" viewBox="0 0 49.183 56.179" xml:space="preserve">
    <path d="m1.1293 2.6975 5.187 29.554 7.5995-5.3076 20.024 27.986 14.113-10.615-21.954-24.367 10.374-7.7201z" style="fill:yellow"/>
    <path d="m33.337 54.929-19.059-28.589-7.7201 7.2376-5.3076-32.328 34.258 11.701-10.615 5.9107 23.04 25.09" style="fill:yellow;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.85778;stroke-width:2.5;stroke:#000"/>
    </svg>
    `,

    hole: {
      class: "thick",
      paths: [
        {
          c: "",
          d: "m 30,50 5,-10 6,-18 13,-2 9,8 5,2 12,10 -8,12 -2,15 -11,8 -3,-5 -7,2 z",
        },
      ],
      shift: { x: 10, y: 10 },
      scale: 50,
      rotate: 360,
    },
    rockX: {
      class: "thick",
      paths: [
        { c: "", d: "m 30,55 10,-10 15,0 5,3 10,15 0,10 -15,4 -6,0 -13,-9 z" },
        {
          c: "lo",
          d: "m 30,55 10,-10 15,0 5,3 10,15 0,10 -15,4 -6,0 -13,-9 z",
        },
        { c: "hi", d: "m 34,55 6,-6 11,0 7,8 4,11 -10,3 -5,-2 z" },
      ],
      shift: { x: 10, y: 10 },
      scale: 70,
      rotate: 360,
    },
    log: `<svg viewBox="0 0 97 64">
    <defs>
     <linearGradient id="a" x1="49.189" x2="45.981" y1="49.438" y2="35.066" gradientTransform="translate(2.1213 -1.0607)" gradientUnits="userSpaceOnUse">
      <stop style="stop-color:#161616" offset="0"/>
      <stop style="stop-color:#3c2f12" offset="1"/>
     </linearGradient>
    </defs>
    <path d="m77.251 22.981s3.3438-5.034 8.3085-1.2374l3.0052 2.2981" style="fill:#eaddb9;stroke-linecap:round;stroke-opacity:.75115;stroke-width:2.5;stroke:#fff"/>
    <path d="m14.142 39.068s4.097-4.7659 6.5407-3.3588c2.6607 1.5321 0.96008 3.0641 1.4142 4.5962" style="fill:#eaddb9;stroke-linecap:round;stroke-opacity:.6129;stroke-width:2.5;stroke:#fff"/>
    <path d="m6.364 24.749s-6.5407 12.021-3.182 19.092c3.3588 7.0711 4.9497 17.678 9.3692 16.794 4.4194-0.88388 19.976-9.0156 33.588-12.374 13.612-3.3588 43.134-7.7782 43.134-7.7782s1.591 1.2374 3.7123-7.2478c2.1213-8.4853 1.591-16.263-1.0607-17.147-2.6516-0.88388-20.86-1.4142-28.638-0.70711s-10.253 1.591-10.253 1.591-0.17678-6.8943-2.4749-9.5459c-2.2981-2.6517-3.5355-3.182-3.5355-3.182s-12.728-2.6517-18.915 0.70711c-6.1872 3.3588-6.1872 6.364-6.1872 6.364l3.8891 9.5459z" style="fill:url(#a);paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:4.6;stroke:#000"/>
    <path d="m6.8943 24.926s2.8136 2.3597 4.5536 6.3001c0.41617 0.94249 19.077-0.72973 19.077-0.72973 0.16348 0.12737-16.509 2.2345-16.382 5.213 0.14166 3.329 1.9789 3.1687 0.88048 11.709-0.7899 6.1416-3.7089 12.863-3.7089 12.863s-3.061-1.9327-5.2847-6.1248c-2.5603-4.8266-4.2985-12.245-3.7309-16.503 1.0607-7.955 4.5962-12.728 4.5962-12.728z" style="fill:#d5b36c;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:4.6;stroke:#000"/>
    <path d="m22.097 10.783s4.5169 4.3853 12.551 2.2981c7.0138-1.8221 9.5644-1.6243 11.314-4.773l1.7678-3.182s-9.5459-4.0659-16.794-1.2374c-7.2478 2.8284-8.8388 6.8943-8.8388 6.8943z" style="fill:#e4cfa3;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:4.6;stroke:#000"/>
    <path d="m53.205 22.054c10.546-1.9673 27.826-1.2577 38.366-0.13388" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.2383;stroke-width:3.2;stroke:#fff"/>
    <path d="m47.553 12.198s1.7678 2.1213 1.7678 5.3033v1.3033" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.21277;stroke-width:3.2;stroke:#fff"/>
    <path d="m11.314 24.572 2.6528 2.8593 15.025-0.38445" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.24255;stroke-width:3.2;stroke:#fff"/>
    <path d="m8.3085 39.775-0.53033-7.0711" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.38723;stroke-width:1.5;stroke:#000"/>
    <path d="m8.1317 39.598 2.6517-3.5355" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.38723;stroke-width:1.5;stroke:#000"/>
    <path d="m10.96 47.73-2.1213-8.3085-2.2981 3.7123" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.38723;stroke-width:1.5;stroke:#000"/>
    <path d="m8.1317 39.598-2.4749-0.88388" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.38723;stroke-width:1.5;stroke:#000"/>
    <path d="m38.184 6.5407-5.3033 1.2374 2.2981 1.7678" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.38723;stroke-width:1.5;stroke:#000"/>
    <path d="m28.461 10.96 3.3588-3.182 0.53033-2.4749" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.38723;stroke-width:1.5;stroke:#000"/>
   </svg>`,
   rock: `<svg viewBox="0 0 97 64">
   <path d="m19.208 62.032-14.8-14.485-2.5191-9.7614 5.9828-23.931 11.651-7.2423 38.416-4.0935 22.357 0.62977 12.595 10.391 2.5191 23.301-2.2042 15.744-32.118 8.8167z" style="fill-opacity:.79275;fill:#d0bfbf;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.6;stroke:#000"/>
   <path d="m19.05 61.875-3.6212-24.718 2.2042-10.706-1.2595-10.076-8.5018 0.31488-6.1402 21.097 2.8339 10.076z" style="fill-opacity:.60104;fill:#192050;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#050505"/>
   <path d="m18.578 26.765 42.824 5.0381 8.187 15.429-6.9274 13.225" style="fill-opacity:.39378;fill:#313238;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#000"/>
   <path d="m93.048 14.17-31.016 17.319 32.433 5.6679-23.931 9.7614-7.8721 14.012 30.544-8.187 2.2042-17.476" style="fill-opacity:.57513;fill:#080a18;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#000"/>
   <path d="m19.68 24.718 41.722 5.5105 29.442-17.319" style="fill:none;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#fff"/>
   <path d="m62.977 32.748 7.2423 13.54 21.727-8.9742z" style="fill:#fff;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#000"/>
   <path d="m2.6765 38.258 12.123-0.62977 3.1488 22.042-12.753-11.808z" style="fill-opacity:.70466;fill:#2e2e2e;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3;stroke:#000"/>
  </svg>
  `,
    logX: {
      class: "thick",
      paths: [
        { c: "", d: "m 30,35 -5,5 0,12 5,5 45,0 5,-5 0,-12 -5,-5 z" },
        { c: "lo", d: "m 40,55 30,0 z" },
        { c: "hi", d: "m 31,38 -3,3 0,10 3,3 3,-3 0,-10 z" },
      ],
      shift: { x: 10, y: 10 },
      scale: 70,
      rotate: 10,
    },
    spud: {
      class: "thick",
      paths: [
        {
          c: "",
          d: "m 20,65 t -5,-10 5,-20 22,-14 25,4, 15,20 -1,20 -20,12 -40,-11 z",
        },
        // { "c": "lo", "d": "m 30,70 t 22,5 30,-25 " },
        { c: "hi thin", d: "m 50,30 1,1 m 10,-5 1,1 m 6,11 1,1 " },
      ],
    },
    spud1: `<svg width="82.142" height="43.52" viewBox="0 0 28 12">
    <defs>
     <linearGradient id="a" x1="50.531" x2="51.177" y1="38.413" y2="71.913" gradientTransform="matrix(.26458 0 0 .26458 -2.2084 -6.9635)" gradientUnits="userSpaceOnUse">
      <stop style="stop-color:#d8af73" offset="0"/>
      <stop style="stop-color:#715522" offset="1"/>
     </linearGradient>
    </defs>
    <path d="m2.4688 2.1571c-1.1225 1.3564-2.4334 4.1327-1.8241 5.7997 0.58041 1.5881 1.022 2.3372 2.8999 2.8531 1.7824 0.48967 2.1845-0.18092 4.6772-0.28063 2.3386-0.09354 1.7675 0.49647 5.1449 0.60804 5.6995 0.18828 6.8674-1.4593 7.9045-5.1449 0.5088-1.8082-1.5241-2.7389-2.8213-3.9456-1.8103-1.6839-4.8966-1.372-5.7848-1.4332-2.7128-0.18709-5.9401-0.18709-6.9223 0-0.98222 0.18709-2.1515 0.3274-3.2741 1.5435z" style="fill:url(#a);paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:.74083;stroke:#000"/>
    <ellipse transform="rotate(33.958)" cx="20.21" cy="-2.8661" rx=".21047" ry=".46772" style="fill:#473716;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.10954;stroke-width:.74083;stroke:#c1943c"/>
    <ellipse transform="rotate(34.077)" cx="17.038" cy="-2.4288" rx=".21047" ry=".46772" style="fill:#6b5222;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.095406;stroke-width:.74083;stroke:#c1943c"/>
    <ellipse transform="rotate(-22.028)" cx="16.507" cy="11.676" rx=".21047" ry=".46772" style="fill:#806228;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.19081;stroke-width:.74083;stroke:#c1943c"/>
   </svg>`,
    "body-one": {
      paths: [
        {
          c: " ",
          d: "m 51.371875,29.92517 c -2.9,0 -3.9,0 -7,1.454359 -2.4,1.057715 -4.1,4.230862 -6.6,14.01473 -2.4,9.651653 -5.6,24.45967 -6.9,35.301253 -1.2,10.709369 -0.2,15.072445 6.4,17.187876 6.6,2.115431 19.1,2.247642 26.5,0.396644 7.4,-1.718788 9.7,-5.553007 9.2,-16.791233 -0.5,-11.238227 -4.2,-28.690532 -6.7,-38.738829 -2.4,-10.048297 -3.8,-11.502655 -5.8,-12.163728 -1.9,-0.661072 -4.3,-0.661072 -7.3,-0.661072 z",
        },
      ],
    },
    "body-two": {
      paths: [
        {
          c: " ",
          d: "m 49.481655,31.153584 c -4.844544,1.237436 -4.783877,0.707107 -8.414214,3.044544 -4.351651,3.567766 -6.312309,3.485786 -9.356851,10.137436 -2.944544,9.180077 -3.776777,21.408505 -5.066448,39.231223 -0.73934,8.883884 -1.316116,15.598097 8.312311,15.944544 7.5,0.699999 19.156852,1.230339 26.356852,0.23033 7.4,-1 11.64455,-2.785787 11.75876,-7.92703 -0.49289,-8.83033 -2.74645,-35.773863 -5.57677,-45.004193 -2,-7.8 -3.60529,-11.597306 -7.13033,-13.758757 -2.78689,-1.708842 -6.23935,-3.005205 -6.23935,-3.005205 z",
        },
      ],
    },
    "body-three": {
      paths: [
        {
          c: " ",
          d: "m 47.290512,29.620791 c -0.4625,0 -1.968013,0.901966 -3.984073,3.358884 -1.825,1.7375 -2.589274,3.098222 -3.512496,8.86599 -1.665763,12.846409 -4.808948,32.672276 -6.098618,50.671771 0.68842,4.581264 2.953491,5.761104 7.190991,6.398604 3.9375,0.325 15.303613,0.10532 19.503614,-0.20717 6.525,-0.6875 9.92856,2.86066 8.75356,-11.639342 -0.94333,-10.041474 -2.53707,-25.436756 -4.3948,-45.998989 -1.25,-5.9875 -2.82868,-9.010724 -4.6769,-11.081981 l -3.562567,-0.444544 z",
        },
      ],
    },

    "head-head": {
      paths: [{ c: "", cx: 51, cy: 21.2, r: 13 }],
    },

    "eye-eye": {
      paths: [{ c: "", cx: 44, cy: 20, r: 1.5 }],
    },

    "nose-triangle": {
      paths: [{ c: "", d: "m 37.5,20 -3,6 6,0 z" }],
    },
    "nose-round": {
      paths: [{ c: "", cx: 37, cy: 22, r: 3 }],
    },

    "brows-arch": {
      paths: [
        {
          c: " brows ",
          d: "m 42,15 c 1.668255,-0.468869 1.668239,-0.468865 2.591623,-0.435498 0.923384,0.03337 1.935773,0.333893 2.59038,0.814829 0.654608,0.480936 0.952055,1.141411 1.248968,1.800702",
        },
      ],
    },
    "brows-straight": {
      paths: [
        {
          c: " brows ",
          d: "m 42,16 c 1.668589,-0.467682 1.668573,-0.467677 2.501384,-0.703023 0.87902,-0.09136 1.757003,-0.183709 2.634006,-0.277063 0.525913,0.113513 1.050816,0.226023 1.574737,0.337538",
        },
      ],
    },
    "brows-wave": {
      paths: [
        {
          c: " brows ",
          d: "m 42,15 c 0.820722,0.917813 0.820714,0.917804 1.583482,1.027839 0.762768,0.110035 1.878545,-0.127062 2.766277,0.02312 0.887731,0.150181 1.54704,0.686588 2.205281,1.222126",
        },
      ],
    },

    "facial-none": {
      paths: [{ c: "", d: "" }],
    },
    "facial-mustache": {
      paths: [
        {
          c: "",
          d: "m 39,27 c 1.133512,0.485778 0.472139,-0.917576 2.249454,-0.856917 1.468355,0.05011 4.056531,0.221841 4.096475,0.704027 0.03995,0.482187 -1.407554,0.844062 -2.915463,1.286355 -1.507909,0.442293 -3.888319,1.673473 -4.17379,0.945265 -0.302261,-0.771038 -0.401733,-2.569456 0.433957,-2.211312 z",
        },
      ],
    },
    "facial-goatee": {
      paths: [
        {
          c: "",
          d: "m 43.743099,26.829341 c -0.808013,0.772376 -1.763586,2.604062 -2.467501,2.255527 -1.242804,-0.615359 -0.732105,-0.626923 -1.942012,-1.272717 -0.685581,-0.365932 1.024418,3.023721 1.620141,4.402148 0.542431,1.255114 1.319823,3.560234 2.123332,2.856763 0.803509,-0.703472 2.394849,-3.939016 2.395249,-5.205359 3.99e-4,-1.266342 0.309409,-3.127182 -0.133517,-3.972768",
        },
      ],
    },
    "facial-jazz": {
      paths: [
        {
          c: "",
          d: "m 38.75764,25.9748 c 0,0 0.743188,-0.797524 2.772859,-0.804647 1.157931,-0.0041 2.032707,1.194093 3.49161,1.106424 0.768583,-0.04619 0.184236,4.577029 -1.347923,5.976286 -0.951973,0.869397 -1.852364,2.55568 -1.852364,2.55568 0,0 -2.122476,-2.071392 -2.802808,-3.99042 -0.508733,-1.434995 0.09218,-3.80476 0.09218,-3.80476 l 0.624209,-0.402665 c 0,0 0.02196,1.676073 0.613228,1.573811 0.399252,-0.06905 0.110489,-0.90598 0.110489,-0.90598 l 0.795496,0.04419 c 0,0 -0.06995,1.045363 0.331457,1.193243 0.704033,0.259368 1.237437,-1.347922 1.237437,-1.347922 0,0 -1.072544,-0.410356 -1.568893,-0.552428 -0.876398,-0.250855 -2.187612,0.441942 -2.187612,0.441942",
        },
      ],
    },
    "facial-beard": {
      paths: [
        {
          c: "",
          d: "m 38.5,27 c 0.495881,-1.246151 2.803201,-0.547551 5.448309,-0.76204 1.403975,-0.113847 2.091736,0.336469 3.04631,1.512898 0.954575,1.176429 1.605879,2.624102 1.655852,4.53383 0.04997,1.909727 -0.412421,4.06087 -1.518144,6.161483 -1.105723,2.100613 -2.854783,4.151235 -4.532953,5.106205 -1.67817,0.954969 -3.286501,0.814239 -4.292203,-0.864015 -1.005702,-1.678255 -1.407785,-4.894918 -1.237053,-7.770122 0.170731,-2.875204 0.605226,-5.408326 1.349285,-7.942148",
        },
      ],
    },
    "facial-handlebars": {
      paths: [
        {
          c: "",
          d: "m 38.78732,25.522525 c 0.616637,-0.291935 1.023243,0.112874 1.237166,-0.370857 0.562739,-1.272489 2.173795,-1.136289 3.905252,-0.23806 1.512239,0.784505 2.62679,1.525247 3.838066,0.815313 0.633742,-0.371438 0.01511,-2.301922 0.01511,-2.301922 0,0 1.357569,1.490734 0.472328,3.190799 -0.947813,1.820234 -2.446785,1.425286 -3.958632,1.109578 -2.365585,-0.493987 -3.335661,0.220864 -4.584367,0.628133 -0.676767,0.22073 -1.056898,-0.369775 -1.249448,-2.355728",
        },
      ],
    },

    "hair-none": {
      paths: [{ c: "", d: "" }],
    },
    "hair-top": {
      paths: [
        {
          c: "",
          d: "m 42,10 c 4.504623,1.649014 9.00804,3.297586 11.702027,4.202176 2.693988,0.90459 3.57857,1.065423 5.08597,0.421884 1.5074,-0.643538 3.638439,-2.091036 4.040876,-3.558081 0.402438,-1.467046 -0.924435,-2.954752 -3.035318,-4.101081 -2.110883,-1.146329 -5.005879,-1.950495 -7.861051,-1.870333 -2.855173,0.08016 -5.669753,1.045161 -7.19809,1.749101 -1.528338,0.703939 -1.769587,1.14623 -2.010651,1.58818",
        },
      ],
    },
    "hair-ponytail": {
      paths: [
        {
          c: "",
          d: "m 42,10 c 3.016741,2.654732 13.352521,2.579002 16.589431,4.227222 3.23691,1.64822 1.95989,4.980844 2.877084,6.818321 1.020971,2.04538 1.440558,4.594791 3.267186,2.94459 3.933903,-3.553945 0.919239,-10.162714 3.986424,-7.08501 5.25255,5.270562 0.01356,5.908107 4.666287,5.560122 2.165739,-0.161979 4.901355,-1.281643 1.58873,-7.041653 -4.066314,-7.07053 -8.115263,1.116865 -9.131017,-2.140195 -1.015754,-3.257059 -1.106511,-3.193856 -3.377732,-5.948462 -2.271221,-2.754605 -7.096118,-2.867176 -11.057298,-2.696584 -3.961179,0.170592 -6.685008,1.989734 -9.409095,5.421962",
        },
      ],
    },
    "hair-bun": {
      paths: [
        {
          c: " fill-orange",
          d: "m 42,10 c 3.016741,2.654732 13.352521,2.579002 16.589431,4.227222 3.23691,1.64822 1.95989,4.980844 2.877084,6.818321 1.020971,2.04538 1.140375,4.184109 3.267186,2.94459 4.182042,-2.43732 2.869799,-7.581288 2.869799,-7.581288 0,0 5.876363,5.150965 5.410704,-2.628464 -0.203558,-3.400682 -0.354446,-2.545084 -1.513007,-5.18061 -3.388029,-7.707181 -9.036198,-1.100489 -6.525558,1.209681 0.100871,0.09282 -0.238025,0.280089 -2.509246,-2.474517 -2.271221,-2.754605 -7.096118,-2.867176 -11.057298,-2.696584 -3.961179,0.170592 -6.685008,1.989734 -9.409095,5.421962",
        },
      ],
    },
    "hair-curly": {
      paths: [
        {
          c: " fill-yellow",
          d: "m 42,11 c -1.563682,1.336238 -3.127448,2.672547 -4.392244,2.829464 -1.264796,0.156916 -2.231468,-0.86662 -2.7153,-2.075012 -0.483831,-1.208393 -0.483831,-2.601539 0.270062,-3.398197 0.753893,-0.796659 2.260764,-0.99568 3.284335,-0.753393 1.023572,0.242287 1.563771,0.924645 1.364793,0.782432 -0.198978,-0.142214 -1.137218,-1.108887 -1.308401,-2.317522 -0.171183,-1.208636 0.42588,-2.658645 1.393166,-3.412369 0.967287,-0.753723 2.30357,-0.810586 2.971247,-0.838998 0.667677,-0.02841 2.4589,1.762811 2.544106,1.45039 0.08521,-0.312421 0.255795,-0.937915 0.924395,-1.407478 0.668601,-0.469563 1.834294,-0.78231 2.744366,-0.724972 0.910073,0.05734 1.563998,0.483811 1.663236,0.256566 0.09924,-0.227245 -0.355668,-1.108623 0.298378,-1.70637 0.654046,-0.597747 2.416803,-0.910494 4.009183,-0.554604 1.592381,0.355891 3.013958,1.379426 3.539349,2.10408 0.525391,0.724653 0.155781,1.151127 0.212593,0.95221 0.05681,-0.198918 0.540149,-1.023433 1.692361,-1.037531 1.152212,-0.0141 2.971832,0.781986 3.994857,2.075955 1.023025,1.29397 1.250478,3.085158 0.881124,4.108071 -0.369354,1.022914 -1.336027,1.278798 -1.03741,1.27882 0.298616,2.1e-5 1.862351,-0.255863 2.985254,0.498276 1.122902,0.754139 1.805258,2.516895 1.861806,3.824293 0.05655,1.307399 -0.512082,2.160345 -1.250819,2.643523 -0.738737,0.483178 -1.648529,0.596902 -1.378249,0.895699 0.27028,0.298797 1.72029,0.782133 2.330917,1.805924 0.610628,1.02379 0.383175,2.587525 -0.184862,3.312194 -0.568036,0.724669 -1.477828,0.610945 -1.719778,1.009535 -0.241949,0.39859 0.184524,1.3084 0.312112,2.218028 0.127587,0.909627 -0.043,1.819436 -0.938125,2.373419 -0.895122,0.553983 -2.515721,0.753004 -4.150416,0.440595 -1.634695,-0.312408 -3.283725,-1.136923 -4.17988,-2.21711 -0.896155,-1.080187 -1.038313,-2.41647 -0.682661,-3.227435 0.355652,-0.810965 1.208598,-1.095281 1.080643,-1.052629 -0.127956,0.04265 -1.236786,0.412262 -1.976025,0.228146 -0.739239,-0.184116 -1.108849,-0.923336 -1.464425,-2.060654 -0.355575,-1.137318 -0.696754,-2.672621 -0.298501,-3.611564 0.398253,-0.938942 1.535515,-1.28012 1.435807,-1.038428 -0.09971,0.241692 -1.435992,1.066207 -2.615694,0.697238 -1.179702,-0.368968 -2.203239,-1.932704 -2.8147,-2.998892 -0.611461,-1.066187 -0.810482,-1.634818 -0.881737,-1.49272 -0.07126,0.142099 -0.01439,0.995046 -1.009108,1.492046 -0.994717,0.497 -3.041789,0.639158 -4.207641,0.454971 -1.165853,-0.184187 -1.450168,-0.695955 -1.507149,-0.710159 -0.05698,-0.0142 0.113609,0.469132 -0.341313,0.965996 -0.454922,0.496864 -1.535321,1.008632 -1.777301,0.326653 -0.241981,-0.681978 0.355082,-2.55846 0.952353,-4.435599",
        },
      ],
    },
    "hair-straight": {
      paths: [
        {
          c: "",
          d: "m 38,10 c 1.770199,-1.9290362 6.212304,-6.3329312 6.212304,-6.3329312 l 7.599517,-2.291918 c 0,0 6.674709,0.743868 8.986731,1.779252 2.312023,1.035384 5.548854,5.7599522 5.548854,5.7599522 l 2.472859,16.465621 -10.735826,-2.050663 0.180941,-6.574186 -2.050664,6.031363 -5.367913,0.06031 5.066345,-14.1737042 -3.015682,4.1616412 c 0,0 -4.061117,-1.527945 -6.091676,-2.291918 l 1.99035,-3.3775642 -4.764777,4.7044642 -4.101328,-0.120627",
        },
      ],
    },
    "hair-short": {
      paths: [
        {
          c: "",
          d: "m 42,10 c 1.943827,-1.6956793 3.887583,-3.3912959 6.596893,-4.3631772 2.709311,-0.9718812 6.183118,-1.22001 9.202302,-0.392414 3.019183,0.827596 5.583184,2.7299184 7.340536,4.9427202 1.757351,2.212803 2.708513,4.735451 3.266649,7.113428 0.558135,2.377977 0.723555,4.611138 0.640726,6.596146 -0.08283,1.985008 -0.413667,3.721911 -1.674564,4.734718 -1.260897,1.012807 -3.452703,1.302291 -5.582487,1.343759 -2.129785,0.04147 -5.6245,-0.308002 -5.91347,-0.98052 -0.28897,-0.672518 0.0605,-7.662031 -0.249247,-10.308765 -0.309753,-2.646733 -1.136866,-3.804692 -1.964807,-4.96381",
        },
      ],
    },
    "hair-bob": {
      paths: [
        {
          c: "",
          d: "m 42,10 c 1.943827,-1.695679 3.887582,-3.391296 6.596892,-4.363177 2.709311,-0.971882 6.183118,-1.22001 9.202302,-0.392414 3.019183,0.827596 5.583184,2.729918 7.444012,4.797965 1.860828,2.068048 3.018763,4.30121 3.80434,6.617191 0.785577,2.315982 1.199125,4.714562 1.488569,6.989181 0.289445,2.274619 0.454865,4.42507 -2.460526,6.3062 -2.915391,1.881131 -8.911844,3.49397 -12.944082,3.019 -4.032238,-0.47497 -7.526953,-4.808416 -7.270709,-5.373044 0.256243,-0.564628 6.546731,-2.38188 7.663309,-4.655834 1.116578,-2.273954 -0.372226,-5.74783 -1.861577,-9.222983",
        },
      ],
    },
    "hair-crop": {
      paths: [
        {
          c: "",
          d: "m 42,10 c 1.943827,-1.695679 3.887583,-3.391296 6.596893,-4.363177 2.709311,-0.971882 6.183118,-1.22001 9.202302,-0.392414 3.019183,0.827596 5.583184,2.729918 7.175138,4.405076 1.591953,1.675158 2.212276,3.122577 2.460122,4.569934 0.247846,1.447357 0.123782,2.894777 -0.165765,4.590336 -0.289547,1.695559 -0.74445,3.639236 -1.509546,5.37598 -0.765095,1.736743 -1.840321,3.266872 -2.770518,3.163982 -0.930198,-0.102889 -2.258189,-3.038449 -2.361026,-3.737148 -0.102837,-0.6987 0.106846,-5.381619 -1.029873,-7.056925 -1.136718,-1.675306 -3.535346,-2.254286 -5.935196,-2.83356",
        },
      ],
    },
    "hair-long": {
      paths: [
        {
          c: "",
          d: "m 42,10 c 1.943827,-1.695679 3.887583,-3.391296 6.803712,-4.259756 2.91613,-0.868461 6.803563,-0.909816 9.926003,0.269377 3.122439,1.179194 5.479713,3.577822 6.968155,6.576269 1.488443,2.998446 2.108778,6.596389 2.667038,11.683269 0.558259,5.08688 1.054517,11.6623 1.054373,15.549604 -1.44e-4,3.887304 -0.496411,5.086617 -1.963936,5.54135 -1.467525,0.454734 -3.90746,0.16525 -6.2442,0.02043 -2.336741,-0.144816 -6.111033,-0.144815 -6.367919,-1.592765 -0.256886,-1.447951 0.721645,-17.244251 0.598002,-22.496436 -0.123643,-5.252186 -0.950756,-6.410145 -1.778697,-7.569262",
        },
      ],
    },
    "hair-mohawk": {
      class: "fill-red",
      paths: [
        {
          c: "",
          d: "m 40,13 c 2.316426,-1.034119 4.632389,-2.068031 7.039753,-2.464523 2.407364,-0.396492 4.905353,-0.155889 7.011012,0.732458 2.105658,0.888347 3.818766,2.423494 4.906039,3.957603 1.087272,1.534109 1.54928,3.066777 1.759929,3.83253 0.210649,0.765753 0.169299,0.765753 1.480405,0.769303 1.311106,0.0035 3.973566,0.01064 6.637082,0.01774 -0.235596,-1.798829 -0.471042,-3.59651 -1.059283,-5.766468 -0.588242,-2.169959 -1.529368,-4.710951 -3.586837,-6.957426 -2.057468,-2.246475 -5.231757,-4.197679 -8.354525,-5.20648 -3.122768,-1.008801 -6.19349,-1.074381 -8.906534,-0.806698 -2.713045,0.267684 -5.067761,0.868798 -7.0103,1.646027 -1.942539,0.777229 -3.472236,1.730467 -4.60833,2.981912 -1.1360946,1.251445 -1.8777848,2.799958 -2.619693,4.348927 -0.00294,0.0205 -0.006,0.04184 -0.00882,0.0615",
        },
      ],
    },
  },
  inline: function (itemName) {
    let style = `style="width: 3rem;"`;
    return svg.render(itemName, 1, style);
  },

  render: (svgName, repeat = 1, style = "", svgInfo = null) => {
    let svgHtml = "";
    svgInfo = svgInfo ?? svg.imgList[svgName];
    if(!svgInfo) {
      console.trace('could not find ', svgName);
      svgInfo = svg.imgList['blank'];
    }
    
    let svgClass = svgInfo.class ?? "";

    let thisScale = "";
    let thisShift = "";
    let thisRotate = "";

    if (svgInfo.paths) {
      let paths = "";

      // add the images name into the class list
      svgClass = svg.setClass(svgClass, svgName);
      while (repeat> 0) {
        if (svgInfo.shift) {
          let shiftX = svgInfo.shift.x
            ? halfRnd(svgInfo.shift.x) + svgInfo.shift.x / 2
            : 0;
          let shiftY = svgInfo.shift.y
            ? halfRnd(svgInfo.shift.y) + svgInfo.shift.y / 2
            : 0;
          thisShift = `translate(${shiftX} ${shiftY})`;
        }
        // random between 50 and 100
        if (svgInfo.scale) {
          let scale = svgInfo.scale
            ? (svgInfo.scale + rnd(100 - svgInfo.scale)) / 100
            : 1;
          thisScale = `scale(${scale}, ${scale})`;
        }
        if (svgInfo.rotate) {
          let rotate = halfRnd(svgInfo.rotate);
          thisRotate = `rotate(${rotate}, 50, 50)`;
        }

        paths += `<g transform="${thisShift} ${thisScale} ${thisRotate}">`;

        svgInfo.paths.forEach((path) => {
          let svgCls = path.c ? `${svgClass}-${path.c}` : svgClass;
          let pathStyle = path.s ?? "";
          // path
          if (path.d) {
            let onePath = svgName == "spud" ? svg.jiggle(path.d, 1) : path.d;
            paths += `<path class="${svgCls}" style="${pathStyle}" d="${onePath}" />`;
          }
          // circle
          if (path.r) {
            paths += `<circle class="${svgCls}" style="${pathStyle}" cx="${path.cx}" cy="${path.cy}" r="${path.r}" />`;
          }
        });
        repeat--;
        paths += "</g>";
      }
      let highlight = svgName == "spud" ? svg.highlight() : "";

      svgHtml = svg.wrap(svgClass, style, `${paths}${highlight}`);
    } else {
      svgHtml = svg.imgList[svgName];
      if (style != "") {
        // inject our style
        svgHtml = svgHtml.replace(`<svg `, `<svg ${style} `); 
      }
    }

    return svgHtml;
  },

  wrap: (svgClass, style, guts) => {
    return `<svg class="${svgClass}" ${style}
    viewBox="0 0 100 100" 
   >
      ${guts}
    </svg>`;
  },

  wrapPlayer: (guts) => {
    return `<svg
    viewBox="0 0 50 100" 
   >
      ${guts}
    </svg>`;
  },


  // adds a highlight to the spuds to make them a bit 3D
  highlight: () => {
    return `
    <defs>
      <radialGradient id="spudHi">
        <stop offset="0%" stop-color="white" />
        <stop offset="100%" stop-color="transparent" />
      </radialGradient>
    </defs>
    <g>
      <circle cx="40", cy="40" r="30" 
        fill="url('#spudHi')" 
        stroke="none"
        opacity="50%" />
    </g>
    `;
  },

  setClass: (svgClass, svgName) => {
    if (svgClass && svgClass != svgName) {
      svgClass = `${svgClass} ${svgName}`;
    }
    return svgClass;
  },

  // slightly move the path points +/- the amp(litude)
  jiggle: (path, amp) => {
    let bits = path.split(/( |,)/);
    let res = "";
    bits.forEach((bit) => {
      if (parseInt(bit)> 0) {
        bit = parseInt(bit) + halfRnd(amp);
      }
      res += bit;
    });

    return res;
  },

  // remember to wrap functions in functions before passing them as onEnd
  animate: (element, type, duration, onEnd) => {
    if (element && element.style) {
      element.style.animation = `${type} ${duration}s ease-in-out 0s 1 normal forwards`;
      element.addEventListener("animationstart", function handler() {
        this.removeEventListener("animationstart", handler);
      });
      
      element.addEventListener("animationend", function handler() {
        element.style.animation = "";
        if (typeof onEnd == "function") {
          onEnd();
        }
        this.removeEventListener("animationend", handler);
      });
    }
  },

  renderPerson: (person) => {
    if (!person) {
      return '';
    }
    let paths = svg.assemblePerson(person);
    // separate the first element of paths so we can wrap in <g>
    let body = paths.pop();
    let head = ``;

    paths.forEach((path) => {
      // path
      if (path.d) {
        head += `<path d="${path.d}" style="${path.s}" />`;
      }
      // circle
      if (path.r) {
        head += `<circle cx="${path.cx}" cy="${path.cy}" r="${path.r}" style="${path.s}" />`;
      }
    });

    let guts = `<g class="playerBody"><path style="${body.s}" d="${body.d}"></g><g class="playerHead">${head}</g>`;

    return svg.wrapPlayer(guts);
  },

  // puts the bits of a human together
  assemblePerson(body) {
    // group everything but the body
    // then wrap in another group
    let paths = [];
    Object.entries(body).forEach(([key, part]) => {
      if (key != "body") {
        paths.push(svg.buildPath(part.type, part.colour));
      }
    });
    // add the body last so it is put in a separate svg group
    paths.push(svg.buildPath(body.body.type, body.body.colour));

    return paths;
  },

  buildPath(partName, colour) {
    let path = svg.imgList[partName].paths[0];
    let bits = partName.split("-");
    path.c = ` ${bits[0]}`;
    path.s = `fill: ${colour}; stroke: ${colour}`;

    return path;
  },

  hideElement(elementQuery) {
    let thisElement = document.querySelector(elementQuery);
    thisElement.style.display = "none";
  },

  showElement(elementQuery) {
    let thisElement = document.querySelector(elementQuery);
    thisElement.style.display = "flex";
  },

  colourOptions(selectedColour = "") {
    let options = "";
    Object.entries(CSS_COLOR_NAMES).forEach(([key, part]) => {
      let selected = key == selectedColour ? 'selected="selected"' : "";
      options += `<option value="${key}" ${selected} style="background: ${key};">&nbsp;</option>`;
    });
    return options;
  },

  // TODO: returns different types of body parts
  bodyPartOptions(type, currentType) {
    let options = "";

    Object.entries(svg.imgList).forEach(([key, part]) => {
      let selected = currentType == key ? 'selected="selected"' : '';
      if (`${key}-`.indexOf(type)> -1) {
        let bits = key.split("-");
        options += `<option value="${key}" ${selected}>${bits[1]}</option>`;
      }
    });

    return options;
  },

  orientation(svgSrc) {
    // return width and height from viewbox to decide if its a wide or high image
    // NOTE: for simplicity viewbox should be integers!!!
    let bits = svgSrc.match(/viewBox=\"(\d+) (\d+) (\d+) (\d+)\"/);
    return (parseInt(bits[3]) > parseInt(bits[4])) ? 'wide' : 'height';
  },

  addOrientationClass: function(svgSrc) {
    let orientation = svg.orientation(svgSrc);
    return svgSrc.replace(/ viewBox=\"/, ` class=\"${orientation}\" viewBox=\"`);
  },

};

const CSS_COLOR_NAMES = {
  AliceBlue: "#F0F8FF",
  AntiqueWhite: "#FAEBD7",
  Aqua: "#00FFFF",
  Aquamarine: "#7FFFD4",
  Azure: "#F0FFFF",
  Beige: "#F5F5DC",
  Bisque: "#FFE4C4",
  Black: "#000000",
  BlanchedAlmond: "#FFEBCD",
  Blue: "#0000FF",
  BlueViolet: "#8A2BE2",
  Brown: "#A52A2A",
  BurlyWood: "#DEB887",
  CadetBlue: "#5F9EA0",
  Chartreuse: "#7FFF00",
  Chocolate: "#D2691E",
  Coral: "#FF7F50",
  CornflowerBlue: "#6495ED",
  Cornsilk: "#FFF8DC",
  Crimson: "#DC143C",
  Cyan: "#00FFFF",
  DarkBlue: "#00008B",
  DarkCyan: "#008B8B",
  DarkGoldenRod: "#B8860B",
  DarkGray: "#A9A9A9",
  DarkGrey: "#A9A9A9",
  DarkGreen: "#006400",
  DarkKhaki: "#BDB76B",
  DarkMagenta: "#8B008B",
  DarkOliveGreen: "#556B2F",
  DarkOrange: "#FF8C00",
  DarkOrchid: "#9932CC",
  DarkRed: "#8B0000",
  DarkSalmon: "#E9967A",
  DarkSeaGreen: "#8FBC8F",
  DarkSlateBlue: "#483D8B",
  DarkSlateGray: "#2F4F4F",
  DarkSlateGrey: "#2F4F4F",
  DarkTurquoise: "#00CED1",
  DarkViolet: "#9400D3",
  DeepPink: "#FF1493",
  DeepSkyBlue: "#00BFFF",
  DimGray: "#696969",
  DimGrey: "#696969",
  DodgerBlue: "#1E90FF",
  FireBrick: "#B22222",
  FloralWhite: "#FFFAF0",
  ForestGreen: "#228B22",
  Fuchsia: "#FF00FF",
  Gainsboro: "#DCDCDC",
  GhostWhite: "#F8F8FF",
  Gold: "#FFD700",
  GoldenRod: "#DAA520",
  Gray: "#808080",
  Grey: "#808080",
  Green: "#008000",
  GreenYellow: "#ADFF2F",
  HoneyDew: "#F0FFF0",
  HotPink: "#FF69B4",
  IndianRed: "#CD5C5C",
  Indigo: "#4B0082",
  Ivory: "#FFFFF0",
  Khaki: "#F0E68C",
  Lavender: "#E6E6FA",
  LavenderBlush: "#FFF0F5",
  LawnGreen: "#7CFC00",
  LemonChiffon: "#FFFACD",
  LightBlue: "#ADD8E6",
  LightCoral: "#F08080",
  LightCyan: "#E0FFFF",
  LightGoldenRodYellow: "#FAFAD2",
  LightGray: "#D3D3D3",
  LightGrey: "#D3D3D3",
  LightGreen: "#90EE90",
  LightPink: "#FFB6C1",
  LightSalmon: "#FFA07A",
  LightSeaGreen: "#20B2AA",
  LightSkyBlue: "#87CEFA",
  LightSlateGray: "#778899",
  LightSlateGrey: "#778899",
  LightSteelBlue: "#B0C4DE",
  LightYellow: "#FFFFE0",
  Lime: "#00FF00",
  LimeGreen: "#32CD32",
  Linen: "#FAF0E6",
  Magenta: "#FF00FF",
  Maroon: "#800000",
  MediumAquaMarine: "#66CDAA",
  MediumBlue: "#0000CD",
  MediumOrchid: "#BA55D3",
  MediumPurple: "#9370DB",
  MediumSeaGreen: "#3CB371",
  MediumSlateBlue: "#7B68EE",
  MediumSpringGreen: "#00FA9A",
  MediumTurquoise: "#48D1CC",
  MediumVioletRed: "#C71585",
  MidnightBlue: "#191970",
  MintCream: "#F5FFFA",
  MistyRose: "#FFE4E1",
  Moccasin: "#FFE4B5",
  NavajoWhite: "#FFDEAD",
  Navy: "#000080",
  OldLace: "#FDF5E6",
  Olive: "#808000",
  OliveDrab: "#6B8E23",
  Orange: "#FFA500",
  OrangeRed: "#FF4500",
  Orchid: "#DA70D6",
  PaleGoldenRod: "#EEE8AA",
  PaleGreen: "#98FB98",
  PaleTurquoise: "#AFEEEE",
  PaleVioletRed: "#DB7093",
  PapayaWhip: "#FFEFD5",
  PeachPuff: "#FFDAB9",
  Peru: "#CD853F",
  Pink: "#FFC0CB",
  Plum: "#DDA0DD",
  PowderBlue: "#B0E0E6",
  Purple: "#800080",
  RebeccaPurple: "#663399",
  Red: "#FF0000",
  RosyBrown: "#BC8F8F",
  RoyalBlue: "#4169E1",
  SaddleBrown: "#8B4513",
  Salmon: "#FA8072",
  SandyBrown: "#F4A460",
  SeaGreen: "#2E8B57",
  SeaShell: "#FFF5EE",
  Sienna: "#A0522D",
  Silver: "#C0C0C0",
  SkyBlue: "#87CEEB",
  SlateBlue: "#6A5ACD",
  SlateGray: "#708090",
  SlateGrey: "#708090",
  Snow: "#FFFAFA",
  SpringGreen: "#00FF7F",
  SteelBlue: "#4682B4",
  Tan: "#D2B48C",
  Teal: "#008080",
  Thistle: "#D8BFD8",
  Tomato: "#FF6347",
  Turquoise: "#40E0D0",
  Violet: "#EE82EE",
  Wheat: "#F5DEB3",
  White: "#FFFFFF",
  WhiteSmoke: "#F5F5F5",
  Yellow: "#FFFF00",
  YellowGreen: "#9ACD32",
};
// groups based on https://www.dofactory.com/css/color-names
const CSS_COLOR_GROUPS = {
  red: [
    'LightSalmon',
    'DarkSalmon',
    'Salmon',
    'Lightcoral',
    'Indianred',
    'Red'	,
    'Crimson',
    'FireBrick',
    'DarkRed',
        'Pink',
    'LightPink',
    'HotPink',
    'DeepPink',
    'PaleVioletRed',
    'MediumVioletRed',
        'Gold',
    'Orange',
    'DarkOrange',
    'LightSalmon',
    'Coral',
    'Tomato',
    'OrangeRed',
  ],
  green: [
    'GreenYellow',
    'Chartreuse',
    'LawnGreen',
    'Lime',
    'PaleGreen',
    'LightGreen',
    'SpringGreen',
    'MediumSpringGreen',
    'LimeGreen',
    'MediumSeaGreen',
    'SeaGreen',
    'ForestGreen',
    'Green',
    'DarkGreen',
    'YellowGreen',
    'OliveDrab',
    'Olive',
    'DarkOliveGreen',
    'MediumAquamarine',
    'DarkSeaGreen',
    'LightSeaGreen',
    'DarkCyan',
    'Teal',
  ],
  blue: [
    'LightCyan',
    'Aqua',
    'Aquamarine',
    'PaleTurquoise',
    'Turquoise',
    'MediumTurquoise',
    'DarkTurquoise',
    'CadetBlue',
    'SteelBlue',
    'LightSteelBlue',
    'PowderBlue',
    'LightBlue',
    'SkyBlue',
    'LightSkyBlue',
    'DeepSkyBlue',
    'DodgerBlue',
    'CornflowerBlue',
    'MediumSlateBlue',
    'RoyalBlue',
    'Blue',
    'MediumBlue',
    'DarkBlue',
    'Navy',
    'MidnightBlue',
  ],
  brown: [
    'Cornsilk',
    'BlanchedAlmond',
    'Bisque',
    'NavajoWhite',
    'Wheat',
    'BurlyWood',
    'Tan',
    'Goldenrod',
    'DarkGoldenrod',
    'RosyBrown',
    'SandyBrown',
    'Peru',
    'Chocolate',
    'Sienna',
    'SaddleBrown',
    'Brown',
    'Maroon',
  ],
  purple: [
    'Lavender',
    'Thistle',
    'Plum',
    'Violet',
    'Orchid',
    'Fuchsia',
    'MediumOrchid',
    'MediumPurple',
    'RebeccaPurple',
    'BlueViolet',
    'DarkViolet',
    'DarkOrchid',
    'DarkMagenta'	,
    'Purple',
    'Indigo',
    'MediumSlateBlue',
    'SlateBlue'	,
    'DarkSlateBlue',
    
  ],

  grey: [
    'LightYellow',
    'LemonChiffon',
    'LightGoldenrodYellow',
    'Yellow',
    'PapayaWhip',
    'Moccasin',
    'PeachPuff',
    'PaleGoldenrod',
    'Khaki',
    'DarkKhaki',
    'Gainsboro',
    'LightGray',
    'Silver',
    'DarkGray',
    'DimGray',
    'Gray',
    'LightSlateGray',
    'SlateGray',
    'DarkSlateGray',
    'Black' ,
  ]

};

