/*eslint-disable*/
!(function(){"use strict";var e=function(){for(var e={},n=0;n<arguments.length;n++){var i=arguments[n];for(var o in i)t.call(i,o)&&(e[o]=i[o])}return e},t=Object.prototype.hasOwnProperty;var n=function(t,n,i){var o,a,r,l,s={},d=0,u=0,c={sensitivity:7,interval:100,timeout:0};function m(e){o=e.clientX,a=e.clientY}function v(e){return u&&(u=clearTimeout(u)),t.removeEventListener("mousemove",m,!1),1!==d&&(r=e.clientX,l=e.clientY,t.addEventListener("mousemove",m,!1),u=setTimeout((function(){!(function e(t,i){if(u&&(u=clearTimeout(u)),Math.abs(r-o)+Math.abs(l-a)<c.sensitivity)return d=1,n.call(t,i);r=o,l=a,u=setTimeout((function(){e(t,i)}),c.interval)})(t,e)}),c.interval)),this}function f(e){return u&&(u=clearTimeout(u)),t.removeEventListener("mousemove",m,!1),1===d&&(u=setTimeout((function(){var n,o;n=t,o=e,u&&(u=clearTimeout(u)),d=0,i.call(n,o)}),c.timeout)),this}return s.options=function(t){return c=e({},c,t),s},s.remove=function(){t&&(t.removeEventListener("mouseover",v,!1),t.removeEventListener("mouseout",f,!1))},t&&(t.addEventListener("mouseover",v,!1),t.addEventListener("mouseout",f,!1)),s};function i(){return!0===window.MapboxPageShellProduction||/mapbox\.com$/.test(window.location.hostname)}function o(e){"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e)}function a(){var e=document.createElement("div");e.className="shell-wrapper";var t=document.createElement("div");t.className="shell-loading shell-loading--dark shell-fixed shell-top shell-left shell-right shell-bottom shell-flex-parent shell-bg-darken50",t.style.zIndex="9999",e.appendChild(t),document.body.appendChild(e)}var r="https://www.mapbox.com",l="https://122e4e-mapbox.global.ssl.fastly.net",s="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA",d="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpZ3BqeDZlcDAwMDBzcmt1YnQ1OTM4cTEifQ.54XwgUSkvlmB7gHW4vWJ3w",u="3.17.0",c="https://581913e6cd0845d785f5b551a4986b61@sentry.io/11290",m=640;var v=void 0,f=void 0,g=[],p=[],h=void 0,y=!1;function w(){return v}function b(){return y}function E(){return f}function k(){g.forEach((function(e){e()})),g=[]}function L(e){h=e}function x(){h&&h()}function B(e){var t;t=e,g.push(t)}function S(e,t){for(var n=document.querySelectorAll(e),i=0;i<n.length;i++)if(n[i].contains(t))return!0;return!1}function I(e,t,n){for(var i=window.document.querySelectorAll(e),o="style"===t,a=0,r=i.length;a<r;a++)if(o)for(var l=Object.keys(n),s=0,d=l.length;s<d;s++){var u=l[s],c=n[u];i[a][t][u]=c}else i[a][t]=n}function _(){M("[data-display-block-authenticated]",{display:"none"}),M("[data-show-authenticated]",{visibility:"hidden"}),M("[data-display-block-unauthenticated]",{display:"block"}),M("[data-show-unauthenticated]",{visibility:"visible"}),T()}function C(e){M("[data-display-block-unauthenticated], [data-display-flex-unauthenticated]",{display:"none"}),M("[data-show-unauthenticated]",{visibility:"hidden"}),I("[data-user-name]","textContent",e.id),M("[data-user-avatar]",{background:'url("'+e.avatar+'") no-repeat center center',backgroundSize:"30px"}),M("[data-display-block-authenticated]",{display:"block"}),M("[data-show-authenticated]",{visibility:"visible"}),T(e)}function A(e){if((t=e)&&t.plan&&"staff"===t.plan.id)return M("[data-user-staff-generic]",{display:"block"}),M("[data-user-staff-specific]",{display:"block"}),void M("[data-user-staff-mobile]",{display:"block"});var t}function T(e){if(e&&/^\/(studio|account|admin)/.test(window.location.pathname))return M("[data-app-specific-navigation]",{display:"flex"}),M("[data-generic-navigation]",{display:"none"}),M("[data-app-specific-user-menu]",{display:"block"}),void M("[data-generic-user-menu]",{display:"none"});M("[data-app-specific-navigation]",{display:"none"}),M("[data-generic-navigation]",{display:"flex"}),M("[data-app-specific-user-menu]",{display:"none"}),M("[data-generic-user-menu]",{display:"block"})}function M(e,t){I(e,"style",t)}function P(e){throw _(),e}function R(){return i()?r:l}function z(){a();var e=new XMLHttpRequest;e.withCredentials=!0,e.onerror=P,e.onload=function(){if(200===e.status)return window.location.reload();throw new Error(e.statusText)},e.open("DELETE",R()+"/api/logout"),e.send()}var j=void 0,q=[];function N(e){var t=e.triggerEl,n=e.pointerEl,i=e.handleResize,o=e.onCrossMobileThreshhold,a=e.menuBodyContainerEl,r=e.menuBodyEl;i||(i=D);var l=function(){window.matchMedia("(min-width: "+m+"px)").matches?i({pointerEl:n,triggerEl:t,menuBodyContainerEl:a,menuBodyEl:r}):o&&o()};q.push(l),window.addEventListener("resize",l)}function O(){j&&(window.clearTimeout(j),j=null)}function D(e){var t=e.pointerEl,n=e.triggerEl.getBoundingClientRect();t.style.left=Math.round(n.left+n.width/2)+"px"}function W(){for(;q.length;)window.removeEventListener("resize",q.shift())}function Y(e){var t=e.pointerEl,n=e.onPointerReset;j=window.setTimeout((function(){t&&(t.style.left="auto"),n&&n()}),250)}var U=null,X=null,H=!1,F=210;function J(e){var t=e.triggerEl.getBoundingClientRect(),n=document.getElementById("user-menu-body"),i=document.getElementById("user-menu-container"),o=Math.min(document.documentElement.clientWidth,window.innerWidth||0),a=Math.max(10,o-(t.right-t.width/2+F/2));i.style.transformOrigin=t.left+t.width/2+"px 0",n.style.right=a+"px"}function Q(e){if(H&&("Escape"===e.key||"Esc"===e.key||27===e.keyCode)){Z();var t=document.getElementById("user-menu-trigger");t&&t.focus()}}function V(e){var t=document.getElementById("user-menu-container"),n=document.getElementById("user-menu-pointer"),i=document.getElementById("user-menu-trigger");t&&n&&i&&(t.contains(e.target)||n.contains(e.target)||i.contains(e.target)||Z())}function Z(){var e=document.getElementById("user-menu-container"),t=document.getElementById("user-menu-pointer"),n=document.getElementById("user-menu-trigger");e&&t&&n&&(H=!1,e.classList.remove("shell-animated-menu--visible"),t.classList.remove("shell-animated-menu__pointer--visible"),e.removeEventListener("keydown",Q),n.setAttribute("aria-expanded","false"),n.removeEventListener("keydown",Q),document.removeEventListener("focusin",V),W(),Y({pointerEl:U,onPointerReset:function(){U=null}}),X=null)}function G(e){if(S("[data-sign-out]",e.target))return e.preventDefault(),z();var t,n,i,o=H,a=document.getElementById("user-menu-trigger");if(!o&&a&&a.contains(e.target))return t=document.getElementById("user-menu-container"),n=document.getElementById("user-menu-pointer"),i=document.getElementById("user-menu-trigger"),void(t&&n&&i&&(x&&x(),O(),H=!0,D({pointerEl:n,triggerEl:i}),J({triggerEl:i}),t.classList.add("shell-animated-menu--visible"),n.classList.add("shell-animated-menu__pointer--visible"),L(Z),t.addEventListener("keydown",Q),i.setAttribute("aria-expanded","true"),i.addEventListener("keydown",Q),U=n,X=i,document.addEventListener("focusin",V),N({triggerEl:X,pointerEl:U,onCrossMobileThreshhold:Z}),N({triggerEl:X,handleResize:J})));var r=document.getElementById("user-menu-container");return o&&r&&!r.contains(e.target)?Z():void 0}var $=!1;function K(e,t){if("function"==typeof e?(t=e,e={}):e=e||{},e.cache=void 0===e.cache||e.cache,b()&&e.cache){var n=w();return n?(A(n),C(n,E())):_(),k(),void(t&&t())}if($)t&&B(t);else{$=!0;var i=new XMLHttpRequest;i.open("GET",R()+"/api/session"),i.setRequestHeader("Accept","application/json"),i.onerror=P,i.onload=function(){if(y=!0,403===i.status)_();else if(200!==i.status)_(),console.log(i.statusText);else{var e=JSON.parse(i.response);v=e,n=(function(e){if(e&&e.authorizations)for(var t=void 0,n=0,i=e.authorizations.length;n<i;n++)if("api"===(t=e.authorizations[n]).client&&"pk"===t.usage&&!0===t.default)return t.token})(e),f=n,A(e),C(e),analytics.identify(e.id,{username:e.id,email:e.email})}var n;document.addEventListener("click",G),k(),t&&t(),$=!1},i.withCredentials=!0,i.send()}}var ee="mouse",te="click",ne=300,ie=function(){};function oe(e,t,i,o){var a=!1,r=null,l=void 0,s=window.document;if(!e.hasAttribute("data-page-shell-hover-menu")){e.setAttribute("data-page-shell-hover-menu","");var d=n(e,(function(){r!==te&&(clearTimeout(l),r=ee,y())}),(function(){}));e.addEventListener("mouseleave",E),e.addEventListener("keydown",S),i.addEventListener("mouseenter",k),i.addEventListener("mouseleave",E),i.addEventListener("keydown",S),s.addEventListener("click",B);var u,c=[];if("ontouchstart"in document.documentElement)for(var m=document.body.childNodes,v=function(e,t){var n=m[e];n.addEventListener("mouseover",ie),c.push((function(){n.removeEventListener("mouseover",ie)}))},f=0,g=m.length;f<g;f++)v(f);u=function(){e.removeAttribute("data-page-shell-hover-menu"),d.remove(),e.removeEventListener("mouseleave",E),e.removeEventListener("keydown",S),i.removeEventListener("mouseenter",k),i.removeEventListener("mouseleave",E),i.removeEventListener("keydown",S),s.removeEventListener("click",B),c.forEach((function(e){e()}))},p.push(u)}function h(t){e.contains(t.target)||i.contains(t.target)||b()}function y(){x&&x(),O(),a||(a=!0,clearTimeout(l),D({pointerEl:t,triggerEl:e}),w({triggerEl:e,menuBodyContainerEl:i,menuBodyEl:o}),t.classList.add("shell-animated-menu__pointer--visible"),i.classList.add("shell-animated-menu--visible"),e.setAttribute("aria-expanded","true"),L(b),s.addEventListener("focusin",h),N({triggerEl:e,pointerEl:t,onCrossMobileThreshhold:b}),N({triggerEl:e,pointerel:t,menuBodyContainerEl:i,menuBodyEl:o,handleResize:w}))}function w(e){var t=e.triggerEl,n=e.menuBodyContainerEl,i=e.menuBodyEl,o=t.getBoundingClientRect(),a=o.left+o.width/2;n.style.transformOrigin=Math.round(a)+"px 0";var r=Math.max(10,Math.round(a-i.clientWidth/2));i.style.left=r+"px"}function b(){a&&(a=!1,clearTimeout(l),r=null,t.classList.remove("shell-animated-menu__pointer--visible"),i.classList.remove("shell-animated-menu--visible"),e.setAttribute("aria-expanded","false"),s.removeEventListener("focusin",h),W(),Y({pointerEl:t}))}function E(){r!==te&&(r=null,l=setTimeout((function(){a&&null===r&&b()}),ne))}function k(){r!==te&&(clearTimeout(l),r=ee)}function B(t){var n=t.target;return t.target.getAttribute&&t.target.getAttribute("data-nav-link")?b():i.contains(n)?void 0:e.contains(n)?(function(){if(a&&r===te)return b();r=te,a||(clearTimeout(l),y())})():void b()}function S(t){a&&("Escape"!==t.key&&"Esc"!==t.key&&27!==t.keyCode||(b(),e.focus()))}}function ae(e){console.log("Raven failed to initialize"),e&&console.log(e)}var re=!0;var le=!1;function se(){if(le){var e=document.getElementById("page-shell"),t=document.getElementById("mobile-nav-backdrop");e&&t&&(e.style.height="",e.style.overflow="",e.style.overflowX="hidden",t.classList.remove("shell-mobile-nav__backdrop--visible"),le=!1)}}var de=window.document.createElement("div"),ue=["webkit","moz","o","ms"],ce={},me=!1,ve=!1;function fe(e,t){return e+(""+(n=t).charAt(0).toUpperCase()+n.substr(1));var n}function ge(e){return e in(arguments.length>1&&void 0!==arguments[1]?arguments[1]:window)}function pe(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:de;return e in n.style||!!t&&ue.some((function(t){return pe(fe(t,e))}))}function he(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:de,o=n.allowPrefixedProp,a=n.allowPrefixedValue,r=!1;return(o||a)&&(r=ue.some((function(n){return he(o?fe(n,e):e,a?"-"+n+"-"+t:t)}))),r||(i.style[e]=t,i.style[e]===t)}function ye(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:de;(ce={flexBox:pe("flex",e,t)&&he("display","flex",{allowPrefixedProp:!1,allowPrefixedValue:e},t),viewportUnits:he("width","100vw",{allowPrefixedProp:!1,allowPrefixedValue:!1},t),visibilityState:ge("visibilityState",window.document),devicePixelRatio:ge("devicePixelRatio")}).doesCutMustard=Object.keys(ce).every((function(e){return ce[e]}))}function we(){var e=window.document.getElementById("page-shell-compatibility-dismiss"),t=window.document.getElementById("page-shell-compatibility-warning");ve=!0,me=!1,e&&e.removeEventListener("click",we),t&&(t.style.display="none"),window.localStorage&&window.localStorage.setItem("suppress-browser-compatibility-warning","true")}var be=!1;function Ee(){window.matchMedia("(min-width: "+m+"px)").matches&&Le()}function ke(){var e=document.getElementById("mobile-nav-menu"),t=document.getElementById("page-header-content");e&&(be=!0,e.classList.add("shell-animated-menu--visible"),t.classList.add("shell-mobile-nav--visible"),pe("textOrientation",!0)||(document.querySelector(".shell-mobile-nav__trigger__bar--top").setAttribute("transform","translate(6 -1) rotate(45)"),document.querySelector(".shell-mobile-nav__trigger__bar--bottom").setAttribute("transform","translate(-6.5 6) rotate(-45)")),(function(){if(!le){var e=document.getElementById("page-shell"),t=document.getElementById("mobile-nav-menu"),n=document.getElementById("mobile-nav-backdrop");if(t&&e&&n){var i=Math.max(t.getBoundingClientRect().bottom+120,window.innerHeight);e.style.height=String(i)+"px",e.style.overflow="hidden",n.classList.add("shell-mobile-nav__backdrop--visible"),n.style.height=String(i-parseInt(n.style.top))+"px",le=!0}}})(),window.addEventListener("resize",Ee))}function Le(){var e=document.getElementById("mobile-nav-menu"),t=document.getElementById("page-header-content");e&&(be=!1,e.classList.remove("shell-animated-menu--visible"),t.classList.remove("shell-mobile-nav--visible"),pe("textOrientation",!0)||(document.querySelector(".shell-mobile-nav__trigger__bar--top").setAttribute("transform",""),document.querySelector(".shell-mobile-nav__trigger__bar--bottom").setAttribute("transform","")),se(),window.removeEventListener("resize",Ee))}function xe(e){var t=document.getElementById("mobile-nav-trigger-toggle"),n=document.getElementById("mobile-nav-menu"),i=document.getElementById("page-header-content");t&&n&&(e.target.getAttribute&&e.target.getAttribute("data-nav-link")?(document.documentElement.scrollTop=0,document.body.scrollTop=0,Le()):t.contains(e.target)?be?Le():ke():!be||n.contains(e.target)||i.contains(e.target)||Le())}var Be=!1;function Se(){if(!Be){Be=!0;var e=document.querySelectorAll("[data-nav-trigger]");if(0!==e.length){var t=void 0,n=void 0,i=void 0;for(i=0;i<e.length;i++)n=(t=e[i]).getAttribute("data-nav-trigger"),oe(t,document.querySelector('[data-nav-pointer="'+n+'"]'),document.querySelector('[data-nav-menu="'+n+'"]'),document.querySelector('[data-nav-menu-body="'+n+'"]'));document.addEventListener("click",xe)}}}function Ie(){Be&&(Be=!1,p.forEach((function(e){e()})),p=[],se(),Le(),document.removeEventListener("click",xe))}var _e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!(function(){if(!(void 0===("undefined"==typeof window?"undefined":_e(window))||window.analytics&&window.analytics.invoked)){var e=!0===window.MapboxPageShellProduction||/mapbox\.com$/.test(window.location.hostname),t=window.SEGMENT_WRITE_KEY;t||(t=e?"fl0c8p240n":"0biiejpgfj"),(function(){var e=window.analytics=window.analytics||[];if(!e.initialize)if(e.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{e.invoked=!0,e.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"],e.factory=function(t){return function(){var n=Array.prototype.slice.call(arguments);return n.unshift(t),e.push(n),e}};for(var n=0;n<e.methods.length;n++){var i=e.methods[n];e[i]=e.factory(i)}e.load=function(t,n){var i=document.createElement("script");i.type="text/javascript",i.async=!0,i.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(i,o),e._loadOptions=n},e.SNIPPET_VERSION="4.1.0"}e.load(t),e.page()})(),(function(){if(void 0===("undefined"==typeof window?"undefined":_e(window)))return;if(!window.analytics||!window.history||!window.history.pushState)return;if(window.pushStateAnalyticsInitialized)return;var e;function t(t){t=t||{},setTimeout((function(){t.referrer=e,window.analytics.page(t),window._cio&&window._cio.page&&window._cio.page(window.location.href),e=window.location.href}),300)}window.pushStateAnalyticsInitialized=!0;var n=window.history.pushState;window.history.pushState=function(){e=window.location.href,t({clientSideRouting:"pushstate"}),n.apply(window.history,arguments)},window.addEventListener("popstate",(function(){t({clientSideRouting:"popstate"})}))})()}})();var Ce=!1;var Ae={isProduction:i,afterDomContentLoaded:o,hoverintent:n,appendFullscreenLoader:a,getMapboxAccessToken:function(){return i()?s:d},getUser:w,isUserChecked:b,onNextUserCheck:B,afterUserCheck:function(e){b()?e():B(e)},getUserPublicAccessToken:E,querySelectorContainsElement:S,signOut:z,checkSession:K,createHoverMenu:oe,initializeNavigation:Se,removeNavigation:Ie,initialize:function(){Ce||o((function(){if(!window.Raven){var e={shouldSendCallback:function(){return re}},t=document.createElement("script");t.type="text/javascript",t.src="https://cdn.ravenjs.com/"+u+"/raven.min.js",t.setAttribute("crossorigin","anonymous"),t.setAttribute("async",""),t.setAttribute("defer",""),t.onerror=ae,t.onload=function(){window.Raven?window.Raven.config(c,e).install():ae()},document.head.appendChild(t)}})),Ce=!0,o((function(){K(),Ie(),Se(),(function(){if(null==ce.doesCutMustard&&ye(!0),!(ve||ce.doesCutMustard||"localStorage"in window&&"true"===window.localStorage.getItem("suppress-browser-compatibility-warning"))){var e=window.document.getElementById("page-shell-compatibility-warning");if(e&&(e.style.display="block"),!me){var t=window.document.getElementById("page-shell-compatibility-dismiss");t&&t.addEventListener("click",we)}me=!0}})()}))},disableRaven:function(){re=!1},generateCompatibilitySummary:ye,getCompatibilitySummary:function(){return ce}};window.MapboxPageShell=Ae,Ae.initialize()})();