import{k as E,h as I,_ as $,r as j,o as t,c as a,a as e,F as D,b as U,n as F,u as s,t as _,m as g,q as k,f as S,e as v,s as T,p as C,j as x,x as z,y as B,i as p,v as m,d as M}from"./index-8839c4fe.js";/* empty css                                                                               */import{M as H}from"./MatchComponent-4a8e3bd5.js";import"./router-e0bcc5ce.js";const A=E("profile",()=>{var l=I("info");return{actualComponent:l}});const L={class:"menu-profile"},q={class:"container"},J=["onClick"],W={key:0},G={__name:"ProfileMenuComponent",setup(l){const n=A();var u=[{value:"info",label:"Informacion",icon:"hi-information-circle"},{value:"match",label:"Partidos",icon:"io-tennisball-sharp"},{value:"shop",label:"Tienda",icon:"fa-shopping-bag"},{value:"settings",label:"Ajustes",icon:"io-settings-sharp"}],r=I(!1);function d(f){n.acutalComponent=f}function h(){window.innerWidth<=768&&(r.value=!0)}return h(),(f,P)=>{const b=j("v-icon");return t(),a("section",L,[e("div",q,[(t(!0),a(D,null,U(s(u),o=>(t(),a("div",{class:F(o.value),onClick:i=>d(o.value)},[s(r)?g("",!0):(t(),a("label",W,_(o.label),1)),s(r)?(t(),k(b,{key:1,class:"icon",name:o.icon,scale:"2"},null,8,["name"])):g("",!0)],10,J))),256))])])}}},O=$(G,[["__scopeId","data-v-5b62fc5d"]]);const V=l=>(C("data-v-2335a948"),l=l(),x(),l),R={class:"global-container"},Y={class:"container"},K={class:"data"},Q=V(()=>e("h2",null,"Información personal",-1)),X={key:0},Z={key:1,class:"undefined"},ee={key:0},ne={key:1,class:"undefined"},se={key:0},te={key:1,class:"undefined"},oe={key:0},ae={key:1,class:"undefined"},ie={key:0},le={key:1,class:"undefined"},re={key:0},ce={key:1,class:"undefined"},de={class:"position"},_e=V(()=>e("h2",null,"Posición favorita",-1)),ue={class:"position-image"},pe={key:1,class:"left-top"},me={key:3,class:"left-bot"},he=V(()=>e("div",{class:"right-top"},null,-1)),fe=V(()=>e("div",{class:"right-bot"},null,-1)),ve={__name:"PersonalInformationComponent",setup(l){const n=S();return(u,r)=>(t(),a("div",null,[e("div",R,[e("section",Y,[e("div",K,[Q,e("div",null,[e("p",null,[v("Edad: "),s(n).user.age?(t(),a("span",X,_(s(n).user.age),1)):(t(),a("span",Z,"sin definir"))]),e("p",null,[v("Posicion: "),s(n).user.position?(t(),a("span",ee,_(s(n).user.position),1)):(t(),a("span",ne,"sin definir"))]),e("p",null,[v("Categoria: "),s(n).user.category?(t(),a("span",se,_(s(n).user.category),1)):(t(),a("span",te,"sin definir"))]),e("p",null,[v("Años jugados: "),s(n).user.years_played?(t(),a("span",oe,_(s(n).user.years_played),1)):(t(),a("span",ae,"sin definir"))]),e("p",null,[v("Club: "),s(n).user.club?(t(),a("span",ie,_(s(n).user.club),1)):(t(),a("span",le,"sin definir"))]),e("p",null,[v("Fecha de creación: "),s(n).user.creation_date?(t(),a("span",re,_(s(n).user.creation_date),1)):(t(),a("span",ce,"sin definir"))])])]),e("div",de,[_e,e("div",ue,[s(n).user.position=="izquierda"&&s(n).user.photo?(t(),a("div",{key:0,class:"left-top",style:T({"background-image":s(n).user.photo,scale:1.5})},null,4)):(t(),a("div",pe)),s(n).user.position=="derecha"&&s(n).user.photo?(t(),a("div",{key:2,class:"left-bot",style:T({"background-image":s(n).user.photo,scale:1.5})},null,4)):(t(),a("div",me)),he,fe])])])])]))}},ye=$(ve,[["__scopeId","data-v-2335a948"]]);const ge=l=>(C("data-v-53ae2c51"),l=l(),x(),l),$e={class:"global-container"},be=ge(()=>e("h1",null,"Tus reservas",-1)),ke={class:"container"},Ce={class:"card-image"},xe=["src","alt"],Pe={class:"card-content"},Ie={class:"card-title"},Se={class:"card-price"},Ve={class:"card-size"},we={__name:"PersonalShopComponent",setup(l){const n=z();return n.products=[],n.getUserProducts(),(u,r)=>(t(),a("div",null,[e("div",$e,[be,e("div",ke,[(t(!0),a(D,null,U(s(n).products,d=>(t(),a("div",{class:"card",onClick:r[0]||(r[0]=()=>{u.open(),u.setData()})},[e("div",Ce,[e("img",{src:d.image,alt:d.name,class:"image"},null,8,xe)]),e("div",Pe,[e("p",Ie,_(d.name),1),e("p",Se,_(d.price)+" €",1),e("p",Ve,_(d.size),1)])]))),256))])])]))}},Me=$(we,[["__scopeId","data-v-53ae2c51"]]);const De=l=>(C("data-v-f23eed56"),l=l(),x(),l),Ue={class:"global-container"},Ne={class:"container-all"},Te=De(()=>e("h1",null,"Tus partidos",-1)),Fe={class:"container-matchs"},ze={key:0},Ae={__name:"PersonalMatchsComponent",setup(l){const n=B(),u=S();var r=[],d=[],h=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],f=new Date;function P(){for(let o=0;o<7;o++){const i=new Date(f.getTime()+o*24*60*60*1e3),y=i.getMonth()+1,w=i.getDate(),N=`${w<10?"0"+w:w}/${y<10?"0"+y:y}/${i.getFullYear()}`;r.push(N),d.push({day:h[i.getDay()],number:i.getDate(),date:N})}}function b(o){let i=!1;for(let y of o.players)y.email==u.user.email&&(i=!0);return i}return P(),n.getAllWeekMatchs(r[0],r[6]),(o,i)=>(t(),a("section",Ue,[e("div",Ne,[Te,e("div",Fe,[(t(!0),a(D,null,U(s(n).all_matchs,y=>(t(),k(H,{class:F(b(y)?"":"none"),match:y,add:!1},null,8,["class","match"]))),256))]),s(n).all_matchs.length==0?(t(),a("div",ze,"No hay partidos disponibles")):g("",!0)])]))}},Ee=$(Ae,[["__scopeId","data-v-f23eed56"]]);const c=l=>(C("data-v-a322fd16"),l=l(),x(),l),je={class:"container"},Be={class:"container-options"},He=c(()=>e("h1",null,"Personal",-1)),Le=c(()=>e("label",null,"Nombre",-1)),qe=c(()=>e("label",null,"Nombre de usuario",-1)),Je=c(()=>e("label",null,"Email",-1)),We=c(()=>e("label",null,"Teléfono",-1)),Ge=c(()=>e("label",null,"Edad",-1)),Oe=c(()=>e("label",null,"Dni",-1)),Re={action:"",enctype:"multipart/form-data"},Ye=c(()=>e("label",null,"Foto de perfil",-1)),Ke=c(()=>e("label",null,"Fecha de creación",-1)),Qe=c(()=>e("div",{class:"password"},[e("button",{class:"button-password"},"Cambiar contraseña")],-1)),Xe=c(()=>e("h1",null,"Padel",-1)),Ze=c(()=>e("label",null,"Posición",-1)),en=c(()=>e("label",null,"Categoría",-1)),nn=c(()=>e("label",null,"Club",-1)),sn=c(()=>e("label",null,"Años jugados",-1)),tn=c(()=>e("label",null,"Experiencia",-1)),on={key:0},an={__name:"PersonalSettingsComponent",setup(l){const n=S();var u=JSON.parse(localStorage.user),r=I(!1);function d(){r.value=!0}function h(){n.changeData(),r.value=!1}function f(){n.checkUserLogged(u,!1),r.value=!1}function P(b){n.user.photo=b.target.files[0]}return(b,o)=>(t(),a("div",null,[e("section",je,[e("section",Be,[e("div",{class:"options",onInput:d},[He,e("div",null,[e("div",null,[Le,p(e("input",{type:"text","onUpdate:modelValue":o[0]||(o[0]=i=>s(n).user.name=i),placeholder:"sin definir"},null,512),[[m,s(n).user.name]])]),e("div",null,[qe,p(e("input",{type:"text","onUpdate:modelValue":o[1]||(o[1]=i=>s(n).user.user_name=i),placeholder:"sin definir"},null,512),[[m,s(n).user.user_name]])]),e("div",null,[Je,p(e("input",{type:"email","onUpdate:modelValue":o[2]||(o[2]=i=>s(n).user.email=i),placeholder:"sin definir"},null,512),[[m,s(n).user.email]])]),e("div",null,[We,p(e("input",{type:"tel","onUpdate:modelValue":o[3]||(o[3]=i=>s(n).user.phone=i),placeholder:"sin definir"},null,512),[[m,s(n).user.phone]])]),e("div",null,[Ge,p(e("input",{type:"number","onUpdate:modelValue":o[4]||(o[4]=i=>s(n).user.age=i),placeholder:"sin definir"},null,512),[[m,s(n).user.age]])]),e("div",null,[Oe,p(e("input",{type:"text","onUpdate:modelValue":o[5]||(o[5]=i=>s(n).user.dni=i),placeholder:"sin definir"},null,512),[[m,s(n).user.dni]])]),e("div",null,[e("form",Re,[Ye,e("input",{type:"file",name:"image",onChange:o[6]||(o[6]=i=>P(i))},null,32)])]),e("div",null,[Ke,e("span",null,_(s(n).user.creation_date),1)]),Qe])],32),e("div",{class:"options",onInput:d},[Xe,e("div",null,[e("div",null,[Ze,p(e("input",{type:"text","onUpdate:modelValue":o[7]||(o[7]=i=>s(n).user.position=i),placeholder:"sin definir"},null,512),[[m,s(n).user.position]])]),e("div",null,[en,p(e("input",{type:"text","onUpdate:modelValue":o[8]||(o[8]=i=>s(n).user.category=i),placeholder:"sin definir"},null,512),[[m,s(n).user.category]])]),e("div",null,[nn,p(e("input",{type:"text","onUpdate:modelValue":o[9]||(o[9]=i=>s(n).user.club=i),placeholder:"sin definir"},null,512),[[m,s(n).user.club]])]),e("div",null,[sn,p(e("input",{type:"text","onUpdate:modelValue":o[10]||(o[10]=i=>s(n).user.years_played=i),placeholder:"sin definir"},null,512),[[m,s(n).user.years_played]])]),e("div",null,[tn,p(e("input",{type:"text","onUpdate:modelValue":o[11]||(o[11]=i=>s(n).user.experience=i),placeholder:"sin definir"},null,512),[[m,s(n).user.experience]])])])],32)]),s(r)?(t(),a("div",on,[e("button",{class:"change-data",onClick:o[12]||(o[12]=i=>h())},"Guardar Cambios"),e("button",{class:"change-data",onClick:o[13]||(o[13]=i=>f())},"Reestablecer")])):g("",!0)])]))}},ln=$(an,[["__scopeId","data-v-a322fd16"]]),rn="/assets/profile-photo-6be0f302.webp";const cn=l=>(C("data-v-d1f4b03a"),l=l(),x(),l),dn={class:"header-profile"},_n={class:"container"},un={class:"container-photo"},pn=["src"],mn={key:1,src:rn,alt:"foto de perfil"},hn={class:"container-information"},fn={class:"information"},vn={class:"label"},yn={key:0},gn={key:1,class:"undefined"},$n={class:"label"},bn={key:0},kn={key:1,class:"undefined"},Cn={class:"label"},xn={key:0},Pn={key:1,class:"undefined"},In=cn(()=>e("div",{class:"friend"},[e("button",{type:"button"},"Añadir a amigos")],-1)),Sn={__name:"ProfileHeaderComponent",setup(l){const n=S(),u=z();var r=I("");async function d(h){if(!(h==null||h=="")){var f=await u.getImage(h);r.value=f}}return d(n.user.path),(h,f)=>(t(),a("section",dn,[e("div",_n,[e("div",un,[s(r)!=""?(t(),a("img",{key:0,src:s(r),alt:"foto de perfil"},null,8,pn)):(t(),a("img",mn))]),e("div",hn,[e("div",fn,[e("div",null,[e("label",vn,[v("Nombre: "),s(n).user.name?(t(),a("span",yn,_(s(n).user.name),1)):(t(),a("span",gn,"sin definir"))])]),e("div",null,[e("label",$n,[v("Correo: "),s(n).user.email?(t(),a("span",bn,_(s(n).user.email),1)):(t(),a("span",kn,"sin definir"))])]),e("div",null,[e("label",Cn,[v("Nombre de usuario: "),s(n).user.user_name?(t(),a("span",xn,_(s(n).user.user_name),1)):(t(),a("span",Pn,"sin definir"))])])]),In])])]))}},Vn=$(Sn,[["__scopeId","data-v-d1f4b03a"]]);const wn={class:"information-profile"},Mn={class:"body-profile"},Dn={__name:"ProfileInformationComponent",setup(l){const n=A();return(u,r)=>(t(),a("section",wn,[M(Vn,{class:"header-profile"}),e("section",Mn,[s(n).acutalComponent==="info"?(t(),k(ye,{key:0,class:"container"})):g("",!0),s(n).acutalComponent==="shop"?(t(),k(Me,{key:1,class:"container"})):g("",!0),s(n).acutalComponent==="match"?(t(),k(Ee,{key:2,class:"container"})):g("",!0),s(n).acutalComponent==="settings"||s(n).acutalComponent==null?(t(),k(ln,{key:3,class:"container"})):g("",!0)])]))}},Un=$(Dn,[["__scopeId","data-v-1bcbf440"]]);const Nn={class:"profile"},Tn={__name:"ProfileView",setup(l){return(n,u)=>(t(),a("section",Nn,[M(O),M(Un)]))}},jn=$(Tn,[["__scopeId","data-v-c036b856"]]);export{jn as default};
