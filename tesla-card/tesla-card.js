var f="tesla-card",ut="3.1.0",mt=["charging","on","true","active","yes"];var j=globalThis,V=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),gt=new WeakMap,M=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(V&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=gt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&gt.set(e,t))}return t}toString(){return this.cssText}},ft=s=>new M(typeof s=="string"?s:s+"",void 0,J),L=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((i,r,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[n+1],s[0]);return new M(e,s,J)},_t=(s,t)=>{if(V)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=j.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},Z=V?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return ft(e)})(s):s;var{is:te,defineProperty:ee,getOwnPropertyDescriptor:ie,getOwnPropertyNames:se,getOwnPropertySymbols:re,getPrototypeOf:ne}=Object,W=globalThis,bt=W.trustedTypes,oe=bt?bt.emptyScript:"",ae=W.reactiveElementPolyfillSupport,U=(s,t)=>s,Q={toAttribute(s,t){switch(t){case Boolean:s=s?oe:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},vt=(s,t)=>!te(s,t),yt={attribute:!0,type:String,converter:Q,reflect:!1,useDefault:!1,hasChanged:vt};Symbol.metadata??=Symbol("metadata"),W.litPropertyMetadata??=new WeakMap;var _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=yt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&ee(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:n}=ie(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let a=r?.call(this);n?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??yt}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;let t=ne(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){let e=this.properties,i=[...se(e),...re(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(Z(r))}else t!==void 0&&e.push(Z(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _t(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:Q).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let n=i.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Q;this._$Em=r;let a=o.fromAttribute(e,n.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(t,e,i,r=!1,n){if(t!==void 0){let o=this.constructor;if(r===!1&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??vt)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,n]of i){let{wrapped:o}=n,a=this[r];o!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,n,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[U("elementProperties")]=new Map,_[U("finalized")]=new Map,ae?.({ReactiveElement:_}),(W.reactiveElementVersions??=[]).push("2.1.2");var ot=globalThis,$t=s=>s,F=ot.trustedTypes,xt=F?F.createPolicy("lit-html",{createHTML:s=>s}):void 0,kt="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,Pt="?"+v,le=`<${Pt}>`,w=document,I=()=>w.createComment(""),z=s=>s===null||typeof s!="object"&&typeof s!="function",at=Array.isArray,ce=s=>at(s)||typeof s?.[Symbol.iterator]=="function",tt=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wt=/-->/g,At=/>/g,$=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),St=/'/g,Et=/"/g,Rt=/^(?:script|style|textarea|title)$/i,lt=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),c=lt(1),Te=lt(2),Me=lt(3),A=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Ct=new WeakMap,x=w.createTreeWalker(w,129);function Tt(s,t){if(!at(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return xt!==void 0?xt.createHTML(t):t}var he=(s,t)=>{let e=s.length-1,i=[],r,n=t===2?"<svg>":t===3?"<math>":"",o=O;for(let a=0;a<e;a++){let l=s[a],d,u,h=-1,g=0;for(;g<l.length&&(o.lastIndex=g,u=o.exec(l),u!==null);)g=o.lastIndex,o===O?u[1]==="!--"?o=wt:u[1]!==void 0?o=At:u[2]!==void 0?(Rt.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=$):u[3]!==void 0&&(o=$):o===$?u[0]===">"?(o=r??O,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?$:u[3]==='"'?Et:St):o===Et||o===St?o=$:o===wt||o===At?o=O:(o=$,r=void 0);let y=o===$&&s[a+1].startsWith("/>")?" ":"";n+=o===O?l+le:h>=0?(i.push(d),l.slice(0,h)+kt+l.slice(h)+v+y):l+v+(h===-2?a:y)}return[Tt(s,n+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},D=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,o=0,a=t.length-1,l=this.parts,[d,u]=he(t,e);if(this.el=s.createElement(d,i),x.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=x.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(kt)){let g=u[o++],y=r.getAttribute(h).split(v),B=/([.?@])?(.*)/.exec(g);l.push({type:1,index:n,name:B[2],strings:y,ctor:B[1]==="."?it:B[1]==="?"?st:B[1]==="@"?rt:P}),r.removeAttribute(h)}else h.startsWith(v)&&(l.push({type:6,index:n}),r.removeAttribute(h));if(Rt.test(r.tagName)){let h=r.textContent.split(v),g=h.length-1;if(g>0){r.textContent=F?F.emptyScript:"";for(let y=0;y<g;y++)r.append(h[y],I()),x.nextNode(),l.push({type:2,index:++n});r.append(h[g],I())}}}else if(r.nodeType===8)if(r.data===Pt)l.push({type:2,index:n});else{let h=-1;for(;(h=r.data.indexOf(v,h+1))!==-1;)l.push({type:7,index:n}),h+=v.length-1}n++}}static createElement(t,e){let i=w.createElement("template");return i.innerHTML=t,i}};function k(s,t,e=s,i){if(t===A)return t;let r=i!==void 0?e._$Co?.[i]:e._$Cl,n=z(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,e,i)),i!==void 0?(e._$Co??=[])[i]=r:e._$Cl=r),r!==void 0&&(t=k(s,r._$AS(s,t.values),r,i)),t}var et=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??w).importNode(e,!0);x.currentNode=r;let n=x.nextNode(),o=0,a=0,l=i[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new N(n,n.nextSibling,this,t):l.type===1?d=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(d=new nt(n,this,t)),this._$AV.push(d),l=i[++a]}o!==l?.index&&(n=x.nextNode(),o++)}return x.currentNode=w,r}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},N=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=k(this,t,e),z(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ce(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(w.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=D.createElement(Tt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{let n=new et(r,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=Ct.get(t.strings);return e===void 0&&Ct.set(t.strings,e=new D(t)),e}k(t){at(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let n of t)r===e.length?e.push(i=new s(this.O(I()),this.O(I()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=$t(t).nextSibling;$t(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(t,e=this,i,r){let n=this.strings,o=!1;if(n===void 0)t=k(this,t,e,0),o=!z(t)||t!==this._$AH&&t!==A,o&&(this._$AH=t);else{let a=t,l,d;for(t=n[0],l=0;l<n.length-1;l++)d=k(this,a[i+l],e,l),d===A&&(d=this._$AH[l]),o||=!z(d)||d!==this._$AH[l],d===p?t=p:t!==p&&(t+=(d??"")+n[l+1]),this._$AH[l]=d}o&&!r&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},it=class extends P{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},st=class extends P{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},rt=class extends P{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){if((t=k(this,t,e,0)??p)===A)return;let i=this._$AH,r=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==p&&(i===p||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},nt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){k(this,t)}};var de=ot.litHtmlPolyfillSupport;de?.(D,N),(ot.litHtmlVersions??=[]).push("3.3.3");var Mt=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let n=e?.renderBefore??null;i._$litPart$=r=new N(t.insertBefore(I(),n),n,void 0,e??{})}return r._$AI(s),r};var ct=globalThis,m=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};m._$litElement$=!0,m.finalized=!0,ct.litElementHydrateSupport?.({LitElement:m});var pe=ct.litElementPolyfillSupport;pe?.({LitElement:m});(ct.litElementVersions??=[]).push("4.2.2");var R=new URL("./models",import.meta.url).href,S={model3:{label:"Model 3",years:"2017\u20132023",glb:`${R}/model-3/model-3.glb`,compositor:"m3",paintMaterials:["Paint_Color","metal_white"]},model3_highland:{label:"Model 3 Highland",years:"2024\u2013",glb:`${R}/model-3-highland/model-3-highland.glb`,compositor:"m3",paintMaterials:["Geohoodsub00021Mtl","Geohoodsub00031Mtl","Geodoorl2sub11Mtl","Geodoorl2sub31Mtl","Geodoorr2sub31Mtl"]},modely:{label:"Model Y",years:"2020\u20132024",glb:`${R}/model-y/model-y.glb`,compositor:"my",paintMaterials:["visionarq.mx_car_carpaint"]},modely_juniper:{label:"Model Y Juniper",years:"2025\u2013",glb:`${R}/model-y-juniper/model-y-juniper.glb`,compositor:"my",paintMaterials:["black_base","black_reflection"]},models:{label:"Model S",years:"2016\u20132020",glb:`${R}/model-s/model-s.glb`,compositor:"ms",paintMaterials:[]},modelx:{label:"Model X",years:"2016\u20132021",glb:`${R}/model-x/model-x.glb`,compositor:"mx",paintMaterials:[]}},ue="model3_highland",Lt={m3:"model3_highland",my:"modely_juniper",ms:"models",mx:"modelx"};function Ut(s){return s.variant&&S[s.variant]?s.variant:s.model&&Lt[s.model]?Lt[s.model]:ue}var E={white:{label:"Pearl White",hex:"#e9e9ec",code:"$PPSW"},black:{label:"Solid Black",hex:"#16181c",code:"$PBSB"},grey:{label:"Stealth Grey",hex:"#55585d",code:"$PN01"},blue:{label:"Deep Blue",hex:"#1e3a63",code:"$PPSB"},red:{label:"Red Multi-Coat",hex:"#8c1c1c",code:"$PR01"}};function Ot(s){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s||"");if(!t)return null;let e=i=>{let r=parseInt(i,16)/255;return r<=.04045?r/12.92:Math.pow((r+.055)/1.055,2.4)};return[e(t[1]),e(t[2]),e(t[3]),1]}function It(s){return s?E[s]?E[s].hex:/^#?[a-f\d]{6}$/i.test(s)?s.startsWith("#")?s:`#${s}`:null:null}var me={m3:"$W38B",my:"$WY19B",ms:"$WS90",mx:"$WX00"};function zt(s,t,e){let i=me[s]||"$W38B",r=E[t]&&E[t].code||"$PPSW";return`https://static-assets.tesla.com/configurator/compositor?${new URLSearchParams({context:"design_studio_2",options:e||`${r},${i}`,view:"STUD_3QTR",model:s,size:"1400",bkba_opt:"1",crop:"0,0,0,0"}).toString()}`}var ge=new URL("./vendor/model-viewer.min.js",import.meta.url).href,fe="https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js",G=null;function Dt(s){return new Promise((t,e)=>{let i=document.createElement("script");i.type="module",i.src=s,i.onload=()=>t(),i.onerror=()=>e(new Error(`failed to load ${s}`)),document.head.appendChild(i)})}function Nt(s){return customElements.get("model-viewer")?Promise.resolve():G||(G=Dt(s||ge).catch(()=>Dt(fe)).then(()=>customElements.whenDefined("model-viewer")),G)}var _e="tesla-card-cache",T="models";var ht=new Map;function be(){return new Promise((s,t)=>{if(!("indexedDB"in window)){t(new Error("no indexedDB"));return}let e=indexedDB.open(_e,1);e.onupgradeneeded=()=>{let i=e.result;i.objectStoreNames.contains(T)||i.createObjectStore(T)},e.onsuccess=()=>s(e.result),e.onerror=()=>t(e.error)})}function ye(s,t){return new Promise(e=>{try{let i=s.transaction(T,"readonly").objectStore(T).get(t);i.onsuccess=()=>e(i.result),i.onerror=()=>e(void 0)}catch{e(void 0)}})}function ve(s,t,e){return new Promise(i=>{try{let r=s.transaction(T,"readwrite");r.objectStore(T).put(e,t),r.oncomplete=()=>i(),r.onerror=()=>i()}catch{i()}})}async function Ht(s){if(!s)return s;if(ht.has(s))return ht.get(s);try{let t=await be(),e=await ye(t,s);if(!(e instanceof Blob)){let r=await fetch(s,{credentials:"same-origin"});if(!r.ok)return s;e=await r.blob(),await ve(t,s,e)}let i=URL.createObjectURL(e);return ht.set(s,i),i}catch{return s}}function dt(s){return s?typeof s=="string"?{entity:s}:s:null}function b(s,t,e){let i=dt(s);if(i){if(i.template)return e?e.get(i.template):void 0;if(i.entity){let r=t&&t.states&&t.states[i.entity];return r?i.attribute?r.attributes[i.attribute]:r.state:void 0}if(i.value!=null)return i.value}}function C(s,t){let e=dt(s);if(e&&e.entity&&t&&t.states)return t.states[e.entity]}function Bt(...s){let t=[];for(let e of s){let i=dt(e);i&&i.template&&t.push(i.template)}return t}var q=class{constructor(t){this._host=t,this._subs=new Map,this.results={}}sync(t,e){let i=new Set(e);for(let[r,n]of this._subs)i.has(r)||(n.then(o=>typeof o=="function"&&o()).catch(()=>{}),this._subs.delete(r),delete this.results[r]);if(!(!t||!t.connection))for(let r of i){if(this._subs.has(r))continue;let n=t.connection.subscribeMessage(o=>{this.results[r]=o.error?`\u26A0 ${o.error}`:o.result,this._host.requestUpdate()},{type:"render_template",template:r,report_errors:!0}).catch(()=>null);this._subs.set(r,n)}}get(t){return this.results[t]}disconnect(){for(let[,t]of this._subs)t.then(e=>typeof e=="function"&&e()).catch(()=>{});this._subs.clear(),this.results={}}};var K=[{icon:"mdi:lock",name:"Lock",tap_action:{action:"none"}},{icon:"mdi:fan",name:"Climate",tap_action:{action:"none"}},{icon:"mdi:ev-station",name:"Charge",tap_action:{action:"none"}},{icon:"mdi:crosshairs-gps",name:"Locate",tap_action:{action:"none"}},{icon:"mdi:car-back",name:"Trunk",tap_action:{action:"none"}}],jt=new Set(["on","open","unlocked","heat","cool","heat_cool","charging","home","playing"]);function $e(s){if(s.tap_action&&s.tap_action.entity)return s.tap_action.entity;if(s.value&&s.value.entity)return s.value.entity;if(s.entity)return s.entity}function Vt(s,t,e){let i=s.value?b(s.value,t,e):void 0;if(i!=null&&jt.has(String(i).toLowerCase()))return!0;let r=C(s.value,t);return!!(r&&jt.has(String(r.state).toLowerCase()))}function Wt(s,t,e){let i=s.hass;if(!i)return;let r=t||{action:"more-info"},n=r.entity||$e(e||{});switch(r.action){case"none":return;case"toggle":n&&i.callService(n.split(".")[0],"toggle",{entity_id:n});return;case"more-info":s.openMoreInfo(n);return;case"call-service":case"perform-action":{let o=r.service||r.perform_action;if(!o)return;let[a,l]=o.split(".");i.callService(a,l,r.service_data||r.data||(n?{entity_id:n}:{}),r.target);return}case"navigate":if(!r.navigation_path)return;history.pushState(null,"",r.navigation_path),window.dispatchEvent(new CustomEvent("location-changed"));return;case"url":r.url_path&&window.open(r.url_path,"_blank");return;default:n&&s.openMoreInfo(n)}}var Ft={page:{vehicle:"Fahrzeug & Lack",model:"3D-Modell",battery:"Batterie & Laden",status:"Status",items:"Elemente"},editor:{mode_entity:"Entit\xE4t",mode_template:"Vorlage",entity:"Entit\xE4t",attribute:"Attribut (optional)",value_template:"Vorlage",add_item:"Element hinzuf\xFCgen",delete_item:"Element l\xF6schen",item_n:"Element {n} von {total}",not_set:"nicht gesetzt",automatic:"Standard"},field:{name:"Fahrzeugname",variant:"Fahrzeug / Facelift",color:"Lackfarbe",mode:"Darstellung",model_url:"Eigene 3D-Modell-URL (.glb / .gltf)",auto_rotate:"Automatisch drehen",disable_zoom:"Zoom deaktivieren",camera_orbit:"Kameraposition",image:"Eigene 2D-Bild-URL",image_entity:"Bild- / Kamera-Entit\xE4t",icon:"Symbol",item_name:"Name (optional)"},slot:{battery:"Batterie / SoC",battery_label:"Batterie-Beschriftung",charging:"Ladezustand",charge_power:"Ladeleistung",range:"Reichweite",status:"Statuszeile",value:"Anzuzeigender Wert"},toggle:{show_battery_label:"Beschriftung neben % anzeigen",show_progress:"Fortschrittsbalken anzeigen",show_value:"Wert unter Symbol anzeigen"},tap_action:"Tippaktion",card:{charging:"L\xE4dt",asleep:"Schl\xE4ft",parked_locked:"Geparkt \xB7 Verriegelt",parked_unlocked:"Geparkt \xB7 Entriegelt"}};var Gt={page:{vehicle:"Vehicle & paint",model:"3D model",battery:"Battery & charging",status:"Status",items:"Items"},editor:{mode_entity:"Entity",mode_template:"Template",entity:"Entity",attribute:"Attribute (optional)",value_template:"Template",add_item:"Add item",delete_item:"Delete item",item_n:"Item {n} of {total}",not_set:"not set",automatic:"default"},field:{name:"Vehicle name",variant:"Vehicle / facelift",color:"Paint colour",mode:"Render mode",model_url:"Custom 3D model URL (.glb / .gltf)",auto_rotate:"Auto-rotate",disable_zoom:"Disable zoom",camera_orbit:"Camera orbit",image:"Custom 2D image URL",image_entity:"Image / camera entity",icon:"Icon",item_name:"Name (optional)"},slot:{battery:"Battery / SoC",battery_label:"Battery label",charging:"Charging state",charge_power:"Charging power",range:"Range",status:"Status line",value:"Value to display"},toggle:{show_battery_label:"Show label next to %",show_progress:"Show progress bar",show_value:"Show value under icon"},tap_action:"Tap action",card:{charging:"Charging",asleep:"Asleep",parked_locked:"Parked \xB7 Locked",parked_unlocked:"Parked \xB7 Unlocked"}};var pt={en:Gt,de:Ft};function Ae(s){return(s?.locale?.language||s?.language||"en").split("-")[0]}function qt(s,t){let e=t.split(".").reduce((i,r)=>i?.[r],s);return typeof e=="string"?e:void 0}function H(s,t,e={}){let i=pt[Ae(s)]||pt.en,r=qt(i,t)??qt(pt.en,t)??t;for(let[n,o]of Object.entries(e))r=r.replace(`{${n}}`,o);return r}function Kt(s){return String(s).replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}var Yt=L`
  :host {
    --tesla-bg: #1c1c1e;
    --tesla-fg: #ffffff;
    --tesla-muted: #8e8e93;
    --tesla-green: #7cb342;
    --tesla-green-fg: #8bc34a;
    --tesla-btn-bg: rgba(255, 255, 255, 0.08);
    --tesla-btn-active: #3478f6;
    --tesla-track: rgba(255, 255, 255, 0.14);
  }
  ha-card {
    background: var(--tesla-bg);
    color: var(--tesla-fg);
    border-radius: 22px;
    overflow: hidden;
    border: none;
    box-shadow: none;
  }
  .card {
    padding: 18px 18px 22px;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .name {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .chevron {
    --mdc-icon-size: 26px;
    color: var(--tesla-fg);
    margin-top: 4px;
  }
  .status {
    margin-top: 6px;
  }
  .battery-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .battery-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  .battery-icon {
    --mdc-icon-size: 22px;
    color: var(--tesla-fg);
  }
  .battery-icon.charging {
    color: var(--tesla-green-fg);
  }
  .battery-pct {
    font-size: 18px;
    font-weight: 700;
  }
  .battery-label {
    color: var(--tesla-muted);
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .charge-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(124, 179, 66, 0.18);
    color: var(--tesla-green-fg);
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    flex: none;
  }
  .charge-pill .bolt {
    --mdc-icon-size: 18px;
    color: var(--tesla-green-fg);
    animation: bolt-pulse 1.2s ease-in-out infinite;
  }
  @keyframes bolt-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.35;
    }
  }
  .progress {
    height: 6px;
    border-radius: 3px;
    background: var(--tesla-track);
    overflow: hidden;
    margin-top: 12px;
  }
  .progress-fill {
    height: 100%;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.85);
    transition: width 0.5s ease;
    position: relative;
    overflow: hidden;
  }
  .progress-fill.charging {
    background: var(--tesla-green);
  }
  .progress-fill.charging::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.45),
      transparent
    );
    transform: translateX(-100%);
    animation: progress-shine 1.6s ease-in-out infinite;
  }
  @keyframes progress-shine {
    0% {
      transform: translateX(-100%);
    }
    60%,
    100% {
      transform: translateX(100%);
    }
  }
  .status-text {
    color: var(--tesla-muted);
    font-size: 16px;
    margin-top: 8px;
  }
  .car {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    margin: 8px 0 18px;
  }
  .car img {
    width: 100%;
    max-width: 460px;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 24px 24px rgba(0, 0, 0, 0.55));
    user-select: none;
    -webkit-user-drag: none;
  }
  .car-3d {
    width: 100%;
    height: 240px;
    --poster-color: transparent;
    background: transparent;
    cursor: grab;
  }
  .car-3d:active {
    cursor: grabbing;
  }
  .car-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 8px;
  }
  .action {
    background: transparent;
    border: none;
    color: var(--tesla-fg);
    cursor: pointer;
    min-width: 52px;
    padding: 6px 4px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    transition: background 0.15s ease, transform 0.1s ease;
  }
  .action ha-icon {
    --mdc-icon-size: 26px;
  }
  .action-value {
    font-size: 11px;
    color: var(--tesla-muted);
    max-width: 64px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .action.active {
    background: var(--tesla-btn-active);
    color: #fff;
  }
  .action.active .action-value {
    color: rgba(255, 255, 255, 0.85);
  }
  .action:hover {
    background: var(--tesla-btn-bg);
  }
  .action:active {
    transform: scale(0.92);
  }
`;function Xt(s){let t=s.batteryLevel,e=s.isCharging,i=s.batteryLabelText,r=s.chargePowerText,n=s.showProgress||e,o=Math.max(0,Math.min(100,t??0));return c`
    <div class="status">
      <div class="battery-row">
        <div class="battery-left">
          <ha-icon
            class="battery-icon ${e?"charging":""}"
            icon=${s.batteryIcon}
          ></ha-icon>
          <span class="battery-pct">${t!=null?`${t}%`:"\u2014"}</span>
          ${i?c`<span class="battery-label">${i}</span>`:""}
        </div>
        ${e&&r?c`<span class="charge-pill">
              <ha-icon class="bolt" icon="mdi:lightning-bolt"></ha-icon>${r}
            </span>`:""}
      </div>
      ${n?c`<div class="progress">
            <div
              class="progress-fill ${e?"charging":""}"
              style="width:${o}%"
            ></div>
          </div>`:""}
      <div class="status-text">${s.statusText}</div>
    </div>
  `}function Jt(s,t){let e=s.glbUrl;return e&&s._mvReady&&s._srcUrl?c`
      <model-viewer
        class="car-3d"
        src=${s._srcUrl}
        alt=${t}
        camera-controls
        touch-action="pan-y"
        interaction-prompt="none"
        @load=${i=>s._onMvLoad(i)}
        ?auto-rotate=${!!s._config.auto_rotate}
        auto-rotate-delay="0"
        rotation-per-second=${s._config.rotation_per_second||"20deg"}
        ?disable-zoom=${s._config.disable_zoom!==!1}
        disable-pan
        disable-tap
        shadow-intensity="1"
        shadow-softness="1"
        exposure="1"
        camera-orbit=${s._config.camera_orbit||"-25deg 78deg 105%"}
        field-of-view="30deg"
        min-field-of-view="20deg"
        max-field-of-view="40deg"
      ></model-viewer>
    `:e?c`<div class="car-loading">
      <ha-circular-progress active></ha-circular-progress>
    </div>`:c`<img src=${s.carImage} alt=${t} @error=${i=>s._onImageError(i)} />`}var Y=class extends m{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_mvReady:{state:!0},_srcUrl:{state:!0}}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...t},this._resolvingFor=null}static getConfigElement(){return document.createElement("tesla-card-editor")}static getStubConfig(){return{name:"My Tesla",variant:"model3_highland"}}getCardSize(){return 5}disconnectedCallback(){super.disconnectedCallback(),this._tpl&&this._tpl.disconnect()}get tpl(){return this._tpl||(this._tpl=new q(this)),this._tpl}get battery(){return this._config.battery||(this._config.battery_level_entity?{entity:this._config.battery_level_entity}:null)}get charging(){return this._config.charging||(this._config.charging_entity?{entity:this._config.charging_entity}:null)}get chargePower(){return this._config.charge_power||(this._config.charge_power_entity?{entity:this._config.charge_power_entity}:null)}get range(){return this._config.range||(this._config.range_entity?{entity:this._config.range_entity}:null)}get status(){return this._config.status||(this._config.status_entity?{entity:this._config.status_entity}:null)}get items(){return Array.isArray(this._config.items)?this._config.items:K}get variant(){return S[Ut(this._config)]}get colorKey(){return this._config.color||null}get colorHex(){return It(this._config.color)}openMoreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}get batteryLevel(){let t=Number(b(this.battery,this.hass,this.tpl));return Number.isFinite(t)?Math.round(t):null}get isCharging(){let t=b(this.charging,this.hass,this.tpl);return t==null?!1:mt.includes(String(t).toLowerCase())}get showProgress(){return!!this._config.show_progress}get showBatteryLabel(){return!!this._config.show_battery_label}get batteryLabelText(){if(!this.showBatteryLabel)return null;let t=b(this._config.battery_label,this.hass,this.tpl);if(t!=null&&t!=="")return String(t);let e=C(this.battery,this.hass);return e&&e.attributes.friendly_name||null}get chargePowerText(){let t=this.chargePower,e=b(t,this.hass,this.tpl);if(e==null||e==="")return null;let i=C(t,this.hass),r=i?i.attributes.unit_of_measurement:"",n=Number(e);return Number.isFinite(n)?`${n} ${r||"kW"}`.trim():String(e)}get statusText(){let t=this.status,e=C(t,this.hass);if(e&&!(t&&t.template)&&this.hass.formatEntityState)return this.hass.formatEntityState(e);let i=b(t,this.hass,this.tpl);return i!=null&&i!==""?Kt(i):this.isCharging?H(this.hass,"card.charging"):H(this.hass,"card.asleep")}get glbUrl(){return this._config.mode==="2d"||this._config.image||this._config.image_entity?"":"model_url"in this._config?this._config.model_url||"":this.variant.glb||""}get carImage(){if(this._config.image)return this._config.image;let t=this._config.image_entity&&this.hass.states[this._config.image_entity];return t&&t.attributes.entity_picture?t.attributes.entity_picture:zt(this.variant.compositor,this.colorKey,this._config.compositor_options)}get batteryIcon(){let t=this.batteryLevel;if(t===null)return"mdi:battery-unknown";let e=Math.round(t/10)*10;return this.isCharging?e>=100?"mdi:battery-charging-100":e<=0?"mdi:battery-charging-outline":`mdi:battery-charging-${e}`:e>=100?"mdi:battery":e<=0?"mdi:battery-outline":`mdi:battery-${e}`}_handleItem(t){Wt(this,t.tap_action,t)}_itemValueText(t){if(t.show_value===!1||!t.value)return null;let e=t.value,i=C(e,this.hass);if(i&&!(e&&e.template)&&this.hass.formatEntityState)return this.hass.formatEntityState(i);let r=b(e,this.hass,this.tpl);return r==null||r===""?null:String(r)}willUpdate(){if(this.hass){let t=Bt(this.battery,this._config.battery_label,this.charging,this.chargePower,this.range,this.status,...this.items.map(e=>e&&e.value));this.tpl.sync(this.hass,t)}}updated(){let t=this.glbUrl;t&&(this._mvReady||Nt(this._config.model_viewer_src).then(()=>{this._mvReady=!0}),t!==this._resolvingFor&&(this._resolvingFor=t,this._srcUrl=null,Ht(t).then(i=>{this._srcUrl=i})));let e=this.renderRoot&&this.renderRoot.querySelector("model-viewer");e&&e.model&&this._applyPaint(e)}_onMvLoad(t){this._applyPaint(t.target)}_applyPaint(t){let e=this.colorHex;if(!e||!t||!t.model)return;let i=Ot(e);if(!i)return;let r=this._config.paint_materials||this.variant.paintMaterials||[],n=new Set(r),o=r.length===0;try{t.model.materials.forEach(a=>{(n.has(a.name)||o&&/paint|carpaint|body|exterior/i.test(a.name))&&a.pbrMetallicRoughness&&a.pbrMetallicRoughness.setBaseColorFactor(i)})}catch{}}_onImageError(t){t.target.style.visibility="hidden"}render(){if(!this._config||!this.hass)return c``;let t=this._config.name||this.variant.label||"Tesla";return c`
      <ha-card>
        <div class="card">
          <div class="header">
            <span class="name">${t}</span>
            <ha-icon icon="mdi:chevron-down" class="chevron"></ha-icon>
          </div>

          ${Xt(this)}

          <div class="car">${Jt(this,t)}</div>

          <div class="actions">
            ${this.items.map(e=>{let i=this._itemValueText(e);return c`
                <button
                  class="action ${Vt(e,this.hass,this.tpl)?"active":""}"
                  @click=${()=>this._handleItem(e)}
                  title=${e.name||""}
                >
                  <ha-icon icon=${e.icon||"mdi:gesture-tap-button"}></ha-icon>
                  ${i?c`<span class="action-value">${i}</span>`:""}
                </button>
              `})}
          </div>
        </div>
      </ha-card>
    `}static get styles(){return Yt}};var Zt=!1;async function Qt(){if(!Zt){Zt=!0;try{await(await window.loadCardHelpers?.())?.importMoreInfoControl?.("light")}catch{}}}var Se=[{id:"vehicle",icon:"mdi:car"},{id:"model",icon:"mdi:rotate-3d"},{id:"battery",icon:"mdi:battery-charging"},{id:"status",icon:"mdi:information-outline"},{id:"items",icon:"mdi:gesture-tap-button"}],X=class extends m{static get properties(){return{hass:{},_config:{state:!0},_nav:{state:!0}}}constructor(){super(),this._nav=[]}connectedCallback(){super.connectedCallback(),Qt()}setConfig(t){this._config=t||{}}_t(t,e){return H(this.hass,t,e)}_dispatch(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_update(t){this._dispatch({...this._config,...t,type:`custom:${f}`})}_setToggle(t,e,i){let r={...this._config,type:`custom:${f}`};i===e?delete r[t]:r[t]=i,this._dispatch(r)}_setSlot(t,e){let i={...this._config,type:`custom:${f}`};e&&(e.entity||e.template||e.value)?i[t]=e:delete i[t],this._dispatch(i)}_push(t){this._nav=[...this._nav,t]}_back(){this._nav=this._nav.slice(0,-1)}_form(t){return c`<ha-form
      .hass=${this.hass}
      .data=${this._config}
      .schema=${t}
      .computeLabel=${e=>this._t(`field.${e.name}`)}
      @value-changed=${e=>this._dispatch({...e.detail.value,type:`custom:${f}`})}
    ></ha-form>`}_renderToggle(t,e,i){return c`<div class="row">
      <ha-icon icon=${i}></ha-icon>
      <span class="row-label">${this._t(`toggle.${t}`)}</span>
      <ha-switch
        .checked=${this._config[t]??e}
        @change=${r=>this._setToggle(t,e,r.target.checked)}
      ></ha-switch>
    </div>`}_slotEditor(t,e,i,r){let n=t||{},o=n.template!=null?"template":"entity";return c`
      <div class="section"><ha-icon icon=${i}></ha-icon>${this._t(`slot.${e}`)}</div>
      <div class="modes">
        ${["entity","template"].map(a=>c`<button
            class="mode ${o===a?"on":""}"
            @click=${()=>r(a==="entity"?{entity:n.entity||""}:{template:n.template||""})}
          >
            ${this._t(`editor.mode_${a}`)}
          </button>`)}
      </div>
      ${o==="entity"?c`
            <ha-form
              .hass=${this.hass}
              .data=${{value:n.entity||""}}
              .schema=${[{name:"value",selector:{entity:{}}}]}
              .computeLabel=${()=>this._t("editor.entity")}
              @value-changed=${a=>{a.stopPropagation(),r({...n,entity:a.detail.value.value||""})}}
            ></ha-form>
            ${n.entity?c`<ha-form
                  .hass=${this.hass}
                  .data=${{value:n.attribute||""}}
                  .schema=${[{name:"value",selector:{attribute:{entity_id:n.entity}}}]}
                  .computeLabel=${()=>this._t("editor.attribute")}
                  @value-changed=${a=>{a.stopPropagation(),r({...n,attribute:a.detail.value.value||""})}}
                ></ha-form>`:""}
          `:c`<ha-form
            .hass=${this.hass}
            .data=${{value:n.template||""}}
            .schema=${[{name:"value",selector:{template:{}}}]}
            .computeLabel=${()=>this._t("editor.value_template")}
            @value-changed=${a=>{a.stopPropagation(),r({...n,template:a.detail.value.value||""})}}
          ></ha-form>`}
    `}get _items(){return Array.isArray(this._config.items)?this._config.items:K}_updateItems(t){this._update({items:t})}_updateItem(t,e){let i=this._items.map((r,n)=>{if(n!==t)return r;let o={...r,...e};return Object.keys(o).forEach(a=>o[a]==null&&delete o[a]),o});this._updateItems(i)}_addItem(){let t=[...this._items,{icon:"mdi:flash",tap_action:{action:"more-info"}}];this._updateItems(t),this._push({id:"item",index:t.length-1})}_deleteItem(t){this._updateItems(this._items.filter((e,i)=>i!==t)),this._back()}_moveItem(t,e){let i=[...this._items],r=t+e;if(r<0||r>=i.length)return;[i[t],i[r]]=[i[r],i[t]],this._updateItems(i);let n=this._nav[this._nav.length-1];if(n&&n.id==="item"&&n.index===t){let o=[...this._nav];o[o.length-1]={...n,index:r},this._nav=o}}render(){if(!this.hass||!this._config)return c``;let t=this._nav[this._nav.length-1];return t?c`
      <div class="subpage-head">
        <button class="back" @click=${this._back}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>
        <span class="subpage-title">${this._pageTitle(t)}</span>
      </div>
      ${this._renderPage(t)}
    `:this._renderRoot()}_pageTitle(t){return t.id==="item"?this._t("page.items"):this._t(`page.${t.id}`)}_renderRoot(){return c`<div class="nav">
      ${Se.map(t=>c`<button class="nav-row" @click=${()=>this._push({id:t.id})}>
          <ha-icon class="nav-icon" icon=${t.icon}></ha-icon>
          <span class="nav-labels">
            <span class="nav-label">${this._t(`page.${t.id}`)}</span>
            <span class="nav-secondary">${this._summary(t.id)}</span>
          </span>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>`)}
    </div>`}_summary(t){if(t==="vehicle")return`${(S[this._config.variant]||S.model3_highland).label}${this._config.color?` \xB7 ${this._config.color}`:""}`;if(t==="model")return this._config.mode==="2d"?"2D":"3D";if(t==="battery"){let e=[];return this._config.show_progress&&e.push(this._t("toggle.show_progress")),this._config.show_battery_label&&e.push(this._t("toggle.show_battery_label")),e.join(", ")||this._t("editor.automatic")}return t==="items"?`${this._items.length}`:""}_renderPage(t){switch(t.id){case"vehicle":return this._form([{name:"name",selector:{text:{}}},{name:"variant",selector:{select:{mode:"dropdown",options:Object.entries(S).map(([e,i])=>({value:e,label:`${i.label} (${i.years})`}))}}},{name:"color",selector:{select:{mode:"dropdown",options:[{value:"",label:"Original"},...Object.entries(E).map(([e,i])=>({value:e,label:i.label}))]}}},{name:"mode",selector:{select:{mode:"dropdown",options:[{value:"3d",label:"3D"},{value:"2d",label:"2D"}]}}}]);case"model":return this._form([{name:"model_url",selector:{text:{}}},{name:"auto_rotate",selector:{boolean:{}}},{name:"disable_zoom",selector:{boolean:{}}},{name:"camera_orbit",selector:{text:{}}},{name:"image",selector:{text:{}}},{name:"image_entity",selector:{entity:{domain:["image","camera"]}}}]);case"battery":return c`
          ${this._slotEditor(this._config.battery,"battery","mdi:battery-high",e=>this._setSlot("battery",e))}
          ${this._renderToggle("show_battery_label",!1,"mdi:label-outline")}
          ${this._config.show_battery_label?this._slotEditor(this._config.battery_label,"battery_label","mdi:label",e=>this._setSlot("battery_label",e)):""}
          ${this._renderToggle("show_progress",!1,"mdi:gauge")}
          ${this._slotEditor(this._config.charging,"charging","mdi:battery-charging",e=>this._setSlot("charging",e))}
          ${this._slotEditor(this._config.charge_power,"charge_power","mdi:flash",e=>this._setSlot("charge_power",e))}
        `;case"status":return c`
          ${this._slotEditor(this._config.range,"range","mdi:map-marker-distance",e=>this._setSlot("range",e))}
          ${this._slotEditor(this._config.status,"status","mdi:information-outline",e=>this._setSlot("status",e))}
        `;case"items":return this._renderItemsList();case"item":return this._renderItem(t.index);default:return this._renderRoot()}}_renderItemsList(){return c`
      <div class="nav">
        ${this._items.map((t,e)=>c`<button
            class="nav-row"
            @click=${()=>this._push({id:"item",index:e})}
          >
            <ha-icon class="nav-icon" icon=${t.icon||"mdi:gesture-tap-button"}></ha-icon>
            <span class="nav-labels">
              <span class="nav-label">${t.name||t.icon||`Item ${e+1}`}</span>
              <span class="nav-secondary"
                >${t.tap_action&&t.tap_action.action||"more-info"}</span
              >
            </span>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>`)}
      </div>
      <mwc-button raised @click=${this._addItem}>
        <ha-icon icon="mdi:plus"></ha-icon>&nbsp;${this._t("editor.add_item")}
      </mwc-button>
    `}_renderItem(t){let e=this._items[t];return e?c`
      <div class="itembar">
        <button class="back" .disabled=${t===0} @click=${()=>this._moveItem(t,-1)}>
          <ha-icon icon="mdi:arrow-up"></ha-icon>
        </button>
        <button
          class="back"
          .disabled=${t===this._items.length-1}
          @click=${()=>this._moveItem(t,1)}
        >
          <ha-icon icon="mdi:arrow-down"></ha-icon>
        </button>
        <span class="itembar-label">${this._t("editor.item_n",{n:t+1,total:this._items.length})}</span>
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${[{name:"icon",selector:{icon:{}}},{name:"name",selector:{text:{}}},{name:"show_value",selector:{boolean:{}}},{name:"tap_action",selector:{ui_action:{}}}]}
        .computeLabel=${i=>this._t({icon:"field.icon",name:"field.item_name",show_value:"toggle.show_value",tap_action:"tap_action"}[i.name]||i.name)}
        @value-changed=${i=>{i.stopPropagation(),this._updateItem(t,i.detail.value)}}
      ></ha-form>
      ${this._slotEditor(e.value,"value","mdi:eye-outline",i=>this._updateItem(t,{value:i}))}
      <mwc-button class="danger" @click=${()=>this._deleteItem(t)}>
        <ha-icon icon="mdi:delete"></ha-icon>&nbsp;${this._t("editor.delete_item")}
      </mwc-button>
    `:this._renderRoot()}static get styles(){return L`
      .nav {
        display: flex;
        flex-direction: column;
        margin-top: 4px;
      }
      .nav-row {
        display: flex;
        align-items: center;
        gap: 14px;
        border: none;
        background: transparent;
        padding: 12px 6px;
        cursor: pointer;
        text-align: left;
        border-radius: 10px;
        color: var(--primary-text-color);
        transition: background-color 0.15s ease;
      }
      .nav-row:hover {
        background: var(--secondary-background-color);
      }
      .nav-row ha-icon {
        color: var(--secondary-text-color);
        --mdc-icon-size: 20px;
      }
      .nav-labels {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }
      .nav-label {
        font-size: 1em;
      }
      .nav-secondary {
        font-size: 0.85em;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .subpage-head {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: -8px 0 12px;
        position: sticky;
        top: 0;
        z-index: 2;
        background: var(--card-background-color, var(--ha-card-background));
        padding: 8px 0;
      }
      .back {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        cursor: pointer;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        transition: background-color 0.15s ease;
      }
      .back:hover {
        background: var(--secondary-background-color);
      }
      .back[disabled] {
        opacity: 0.35;
        pointer-events: none;
      }
      .subpage-title {
        font-size: 1.1em;
        font-weight: 600;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 4px;
      }
      .row ha-icon {
        --mdc-icon-size: 20px;
        color: var(--secondary-text-color);
      }
      .row-label {
        flex: 1;
      }
      .section {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        margin: 18px 0 8px;
      }
      .section ha-icon {
        --mdc-icon-size: 18px;
        color: var(--secondary-text-color);
      }
      .modes {
        display: flex;
        background: var(--secondary-background-color);
        border-radius: 10px;
        padding: 3px;
        margin-bottom: 10px;
      }
      .mode {
        flex: 1;
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        padding: 8px 0;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9em;
        transition: background-color 0.15s ease, color 0.15s ease;
      }
      .mode:hover:not(.on) {
        background: rgba(127, 127, 127, 0.18);
      }
      .mode.on {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        font-weight: 600;
      }
      .itembar {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-bottom: 8px;
      }
      .itembar-label {
        margin-left: 4px;
        font-size: 0.85em;
        color: var(--secondary-text-color);
      }
      ha-form {
        display: block;
        margin-bottom: 12px;
      }
      mwc-button.danger {
        --mdc-theme-primary: var(--error-color, #db4437);
        margin-top: 8px;
      }
    `}};customElements.define(f,Y);customElements.define(`${f}-editor`,X);console.info(`%c TESLA-CARD %c v${ut} `,"color: white; background: #171a20; font-weight: 700;","color: #171a20; background: #e0e0e0; font-weight: 700;");window.customCards=window.customCards||[];window.customCards.push({type:f,name:"Tesla Card",description:"A Tesla-app-style card with a rotatable 3D vehicle and quick actions.",preview:!0,documentationURL:"https://github.com/MichelFR/ha-tesla-card"});
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
