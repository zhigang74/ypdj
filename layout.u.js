function DOMUtil(){DOMUtil.prototype.div=function(e){var t=document.createElement("div");return e===undefined?t:(typeof e=="string"?t.className=e:e instanceof Array&&e.forEach(function(e){t.classList.add(e)}),t)},DOMUtil.prototype.create=function(e,t){var n=document.createElement(e);return t===undefined?n:(typeof t=="string"?n.className=t:t.forEach(function(e){n.classList.add(e)}),n)},DOMUtil.prototype.attr=function(e,t,n){try{if(typeof t=="string"&&typeof n=="string")e.setAttribute(t,n);else for(var r in t)t.hasOwnProperty(r)&&e.setAttribute(r,t[r])}catch(i){throw i}},DOMUtil.prototype.mount=function(e,t){try{e.appendChild(t)}catch(n){throw n}},DOMUtil.prototype.unmount=function(e,t){try{e.removeChild(t)}catch(n){throw n}},DOMUtil.prototype.classes=function(e,t){try{t instanceof Array&&e instanceof HTMLElement?t.forEach(function(t){e.classList.add(t)}):console.warn("element or classes type mismatch")}catch(n){throw n}},DOMUtil.prototype.removeClasses=function(e,t){try{t instanceof Array&&e instanceof HTMLElement?t.forEach(function(t){var n=e.className.split(" "),r=n.length;while(r--)n[r]===t&&n.splice(r,1);e.className=n.join(" ")}):console.warn("element or classes type mismatch")}catch(n){throw n}};var e=function(t){var n=t.type;if(n==null||n.length==0)return null;var r=document.createElement(n),i=t.attr;if(i)for(var s in i)i.hasOwnProperty(s)&&r.setAttribute(s,i[s]);var o=t.content;o&&o.lenght!=0&&(r.textContent=o);var u=t.subElem;if(u&&u.length!=0)for(var s in u)if(u[s]){var a=e(u[s]);a&&r.appendChild(a)}var f=t.action;return f&&(r.onclick=f),r};DOMUtil.prototype.createElem=e}function YPDJView(){function n(){}var e=this;e.className="YPDJView";var t=new DOMUtil;return e.draw=function(){var e=t.div("container");t.mount(document.body,e);var n=t.div("viewport");t.mount(e,n);var r=t.div("subview");t.mount(n,r),r.style.backgroundColor="green";var i=t.div("subview");t.mount(n,i),i.style.backgroundColor="blue";var s=t.div("menubar");t.mount(e,s);var o=t.div("button");t.mount(s,o),o.style.left="12px",o.style.top="4px",o.textContent="home",o.onclick=function(){r.style.display==="none"?(r.style.display="block",i.style.display="none"):(r.style.display="none",i.style.display="block")}},Object.defineProperty(n.prototype,"classsName",{get:function(){return e.className},set:function(t){e.className=t}}),n.prototype.help=function(){return"var o = new YPDJView(); // then explore it's property and method"},n.prototype.render=e.draw,new n}document.addEventListener("DOMContentLoaded",function(){var e=new YPDJView;e.render()});