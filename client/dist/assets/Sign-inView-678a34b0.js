import{k as V,g as S,h as P,i as d,r as R,o as b,c as k,a as o,j as u,v as c,u as v,l as p,d as h,w as E,F as B,e as y}from"./index-47255481.js";import{r as A}from"./router-87eea215.js";const T=V("regEx",()=>{const f=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,m=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\-.\\()\/])[^:*'?;<>"]{8,}$/,r=/^(6|7|8|9)\d{8}$/;function l(t){return f.test(t)}function _(t){return m.test(t)}function s(t){return r.test(t)}return{validateEmail:l,validatePassword:_,validatePhone:s}});const q=o("div",{class:"global-container","data-aos":"fade-up"},null,-1),z=o("div",{class:"login-container","data-aos":"fade-down"},null,-1),C={class:"login"},I=o("h1",{class:"title"},"Registrarse",-1),N={class:"email"},U={class:"password"},Z={class:"password"},D={class:"number"},F={class:"return"},j={__name:"Sign-inView",setup(f){setTimeout(()=>{document.getElementById("header").style.display="none",document.getElementById("footer").style.display="none",document.getElementsByClassName("main")[0].style.marginTop="0"},10),AOS.init();const m=S(),r=T(),l=P(),_=A();var s=d(""),t=d(""),i=d(""),n=d("");function x(w){if(w.preventDefault(),r.validateEmail(s.value)&&r.validatePassword(t.value)&&r.validatePhone(n.value))if(t.value===i.value)m.register(s.value,t.value,n.value).then(e=>{e.success?(l.showSuccess("Registro correcto"),_.navigateTo("/login")):l.showError(e.error)}).catch(e=>{console.error(e),l.showError("Ocurrió un error durante el registro")});else throw new Error("Las contraseñas no coinciden");else if(r.validateEmail(s.value))if(r.validatePassword(t.value)){if(!r.validatePhone(n.value))throw new Error("El teléfono no es válido")}else throw new Error("La contraseña no es válida");else throw new Error("El email no es válido")}return(w,e)=>{const g=R("router-link");return b(),k(B,null,[q,z,o("div",C,[I,o("form",null,[o("div",N,[u(o("input",{type:"email",id:"email",placeholder:"correo","onUpdate:modelValue":e[0]||(e[0]=a=>p(s)?s.value=a:s=a),required:""},null,512),[[c,v(s)]])]),o("div",U,[u(o("input",{type:"password",id:"password",placeholder:"contraseña","onUpdate:modelValue":e[1]||(e[1]=a=>p(t)?t.value=a:t=a),required:""},null,512),[[c,v(t)]])]),o("div",Z,[u(o("input",{type:"password",id:"repit-password",placeholder:"repetir contraseña","onUpdate:modelValue":e[2]||(e[2]=a=>p(i)?i.value=a:i=a),required:""},null,512),[[c,v(i)]])]),o("div",D,[u(o("input",{type:"tel",id:"number",placeholder:"teléfono","onUpdate:modelValue":e[3]||(e[3]=a=>p(n)?n.value=a:n=a),required:""},null,512),[[c,v(n)]])]),o("button",{class:"button",onClick:e[4]||(e[4]=a=>x(a)),type:"submit"},"Registrar")]),o("div",F,[h(g,{class:"hover",to:"/login"},{default:E(()=>[y("Volver al login")]),_:1}),h(g,{class:"hover red",to:"/"},{default:E(()=>[y("Volver al inicio")]),_:1})])])],64)}}};export{j as default};
