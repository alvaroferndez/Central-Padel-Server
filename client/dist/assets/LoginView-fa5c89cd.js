import{g as c,r as v,o as f,c as g,a as e,h as u,v as _,d as l,w as i,F as h,e as r}from"./index-15897a00.js";import{a as y}from"./authentification-d392ce25.js";const w=e("div",{class:"global-container","data-aos":"fade-up"},null,-1),V=e("div",{class:"login-container","data-aos":"fade-down"},null,-1),b={class:"login"},k=e("h1",{class:"title"},"Login",-1),x={class:"email"},B={class:"password"},C=e("div",{class:"others-logins"},[e("i",{class:"fa-brands fa-google hover"}),e("i",{class:"fa-brands fa-facebook hover"})],-1),E={class:"options"},D={__name:"LoginView",setup(L){AOS.init(),setTimeout(()=>{document.getElementById("header").style.display="none",document.getElementById("footer").style.display="none",document.getElementsByClassName("main")[0].style.marginTop="0"},10);const p=y(),s=c(""),a=c("");function m(d){d.preventDefault(),p.login(s.value,a.value)}return(d,o)=>{const n=v("router-link");return f(),g(h,null,[w,V,e("div",b,[k,e("form",null,[e("div",x,[u(e("input",{type:"email",id:"email",placeholder:"correo","onUpdate:modelValue":o[0]||(o[0]=t=>s.value=t)},null,512),[[_,s.value]])]),e("div",B,[u(e("input",{type:"password",id:"password",placeholder:"contraseña","onUpdate:modelValue":o[1]||(o[1]=t=>a.value=t)},null,512),[[_,a.value]])]),e("button",{class:"button",type:"submit",onClick:o[2]||(o[2]=t=>m(t))},"Login")]),C,e("div",E,[l(n,{class:"hover",to:"/sign-in"},{default:i(()=>[r("Crear cuenta")]),_:1}),l(n,{class:"hover",to:"/password"},{default:i(()=>[r("¿Has olvidado tu contraseña?")]),_:1})]),l(n,{class:"hover return",to:"/"},{default:i(()=>[r("Volver al inicio")]),_:1})])],64)}}};export{D as default};
