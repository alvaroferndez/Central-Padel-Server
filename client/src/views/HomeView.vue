<script setup>
// import { shopStore } from '@/stores/shop.js';
import axios from 'axios'

axios.get('http://127.0.0.1:8000/User/show?id=1')
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    // Aquí puedes manejar el error
  })

// const store = shopStore();
// store.all.products();

setTimeout(() => {
  document.getElementById('header').style.display = 'grid';
  document.getElementById('footer').style.display = 'flex';
  document.getElementsByClassName('main')[0].style.marginTop = '20vh';
}, 10);

AOS.init();
var sections = [
    {
        name: "Inicio",
        href: "#hero"
    },
    {
        name: "Noticias",
        href: "#news"
    },
    {
        name: "Partidos",
        href: "#games"
    },
    {
        name: "Tienda",
        href: "#shop"
    },
    {
        name: "Dónde encontrarnos",
        href: "#location"
    },

]

var news = [
    {
        title: "Ganador del sorteo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        image: "https://revista.une.org/images/revistas/articulos/grandes/565ca2444ee5c66129769cb37567f680.jpg",
        principal: false
    },
    {
        title: "Has ganado un iphone 32",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        image: "https://scontent-mad1-1.xx.fbcdn.net/v/t39.30808-6/337090655_1248689012711221_156993625834859439_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=iIk6U9UyocQAX9X9gZd&_nc_ht=scontent-mad1-1.xx&oh=00_AfDQU_fbGZSwygapobR5QwyAUoTf9oYBzRK4gDENOAM2hQ&oe=64389414",
        principal: true
    },
    {
        title: "Que pasa chulo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        image: "https://worldpadeltour.com/assets/themes/worldpadeltour.com/img/posts/1681062542_Jose%20Jimenez_Jaime%20Fermosell_Cervezas%20Victoria%20Granada%20Open%202023_Previas-_DSC1358%20copia.thigh.jpg",

        principal: false
    }
]

function orderNews() {
    return news.sort((a, b) => {
        if (a.principal) {
            return -1
        } else {
            return 1
        }
    })
}
</script>

<template>
    <!-- href -->
    <section id="href" class="href" data-aos="fade-up">

        <!-- sections -->
        <span v-for="element of sections">
            <a :href="element.href">{{ element.name }}</a>
        </span>
    </section>

    <!-- hero -->
    <section id="hero" class="hero" data-aos="fade-up">

        <!-- container hero-->
        <div class="container-hero">
            <h1 class="title">Central Pa<span class="title-red">d</span>el</h1>
            <p class="subtitle">Tu club de pádel en Granada</p>
            <div class="buttons">
                <router-link to="/reservas" class="button">Reserva</router-link>
                <router-link to="/contacto" class="button">Contacto</router-link>
                <router-link to="/login" class="button">Iniciar-Sesión</router-link>
            </div>
        </div>
    </section>

    <!-- news -->
    <section id="news" class="news" data-aos="fade-up">

        <!-- container news -->
        <div class="container-news">

            <!-- news -->
            <div v-for="element of orderNews()">

                <!-- card -->
                <div class="card">
                    <div class="img">
                        <img :src="element.image" :alt="element.title">
                    </div>
                    <div class="text">
                        <h1 class="title" v-if="element.principal">{{ element.title }}</h1>
                        <h3 class="title" v-else>{{ element.title }}</h3>
                        <p class="description">{{ element.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- games -->
    <section id="games" class="games">
        <div class="container-games">
            <div class="img">
                <img src="@/assets/images/paddel-raquet.png" alt="play a game">
            </div>
            <div class="text">
                <h1 class="title">Juega con nosotros</h1>
                <p class="description">Únete a cualquier partido que este activo en la posición que quieras</p>
                <router-link to="/reservas" class="button">
                    <i class="fa-solid fa-futbol fa-beat-fade"></i>
                    <span>Únete ya</span>
                </router-link>
            </div>
        </div>
    </section>

    <!-- shop -->
    <section id="shop" class="shop">
        <div class="title">
            <h1>Tienda</h1>
        </div>
        <div class="sections">
            <div class="mens">
                <button class="button">Hombre</button>
            </div>
            <div class="womens">
                <button class="button">Mujer</button>
            </div>
        </div>
    </section>

    <!-- location -->
    <section id="location" class="location" data-aos="fade-up">

        <!-- container location -->
        <div class="container-location">
            <h1 class="title">Dónde encontrarnos</h1>

            <!-- map -->
            <iframe class="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1543.219593249477!2d-3.6232554299246824!3d37.22685351994527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fd9dc5cc0d6f%3A0x3ed5c07528465109!2sCentral%20Padel!5e0!3m2!1ses!2ses!4v1681044298537!5m2!1ses!2ses"
                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </section>
</template>

<style lang="scss">
@import "@/assets/styles.scss";

.href {
    // size
    width: 100%;
    height: 10vh;

    // display
    @include flexbox();

    span {
        // size
        width: clamp(10rem, 20%, 20rem);
        height: 100%;

        // display
        @include flexbox();

        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: $h-c-black-tint;
            visibility: hidden;
            transform: scaleX(0);
            transition: all 0.2s ease-in-out 0s;
        }

        &:hover:before {
            visibility: visible;
            transform: scaleX(1);
        }

        a {
            // size
            width: 100%;
            height: 100%;

            // decoration
            text-decoration: none;
            color: $h-c-black;

            // display
            @include flexbox();

            // decoration
            text-align: center;
        }
    }
}

.hero {
    // size
    width: 100%;
    height: 100vh;

    // display
    @include flexbox(row, flex-start, center);

    // margin
    margin-top: 0.5rem;

    // decoration
    background-image: url("@/assets/images/background-hero.jpeg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;

    .container-hero {
        // size
        width: 100%;
        height: 100%;

        // display
        @include flexbox(column);

        .title {
            // size
            width: 50%;
            height: 10%;

            /*margin*/
            margin-bottom: 2rem;

            /* decoration */
            text-align: center;
            font-size: $h-f-size-title;
            font-weight: 600;
            color: $h-c-white;

            .title-red {
                /* decoration */
                text-align: center;
                font-size: $h-f-size-title;
                font-weight: 600;
                color: $h-c-red-logo;
            }

            @media screen and (max-width: 768px) {
                margin-top: 1rem;
                margin-bottom: 1rem;
            }
        }

        .subtitle {
            // size
            width: 50%;
            height: 10%;

            /*margin*/
            margin-bottom: 2rem;

            /* decoration */
            text-align: center;
            font-size: $h-f-size-subtitle;
            font-weight: 600;
            color: $h-c-white;

            @media screen and (max-width: 768px) {
                margin-top: 1rem;
                margin-bottom: 1rem;
            }
        }

        .buttons {
            // size
            width: 50%;
            height: 30%;

            // display
            @include flexbox();

            .button {
                // size
                width: 30%;
                height: 30%;

                // display
                @include flexbox();

                // margin
                margin-right: 1rem;

                // decoration
                text-align: center;
                text-decoration: none;
                color: $h-c-white;
                background-color: $h-c-red-logo;
                border-radius: 0.5rem;
                font-weight: 600;

                &:hover {
                    // decoration
                    cursor: pointer;
                    background-color: $h-c-red-logo-tint;
                }
            }

            @media screen and (max-width: 768px) {
                // display
                @include flexbox(column, center, center, 1rem);

                .button {
                    // size
                    width: 50%;
                    height: 100%;

                    // margin
                    margin-right: 0;
                }
            }
        }
    }
}

.news {
    // size
    width: 100%;
    height: 100vh;

    // display
    @include flexbox(column);

    .container-news {
        // size
        width: 80%;
        height: 70%;

        // display
        @include grid(2, 2, 50%, 50%, 2rem);

        &>div {
            border-radius: 10px;

            .card {
                // size
                width: 100%;
                height: 100%;

                // decoration
                overflow: hidden;
                border-radius: 10px;

                &:hover {
                    // decoration
                    cursor: pointer;

                    .img {
                        img {
                            // decoration
                            transform: scale(1.1);

                            // transition
                            transition: all 0.4s ease;

                        }
                    }
                }

                .img {
                    // size
                    height: 100%;
                    width: 100%;

                    // position
                    position: absolute;

                    &:before {
                        position: absolute;
                        content: '';
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: linear-gradient(180deg, rgba(2, 16, 96, 0) 30%, rgba(69, 1, 11, 0.8) 100%);
                        z-index: 1;
                        border-radius: 10px;
                    }

                    img {
                        // size
                        height: 100%;
                        width: 100%;

                        // decoration
                        object-fit: cover;
                        border-radius: 10px;
                        transform: scale(1);

                        // transition
                        transition: all 0.4s ease;
                    }
                }

                .text {
                    // size
                    width: 100%;
                    height: 100%;

                    // position
                    z-index: 10;

                    // display
                    @include flexbox(column, flex-start, flex-end);

                    &>* {
                        // margin
                        margin: 0 0 2% 2%;
                    }

                    h1,
                    h3 {
                        // decoration
                        color: $h-c-red-logo-tint;
                    }

                    h3 {
                        // decoration
                        font-size: $h-f-size-subtitle;
                        font-weight: 500;
                    }

                    p {
                        // decoration
                        color: $h-c-white;
                    }
                }


            }
        }

        &>div:nth-child(1) {
            // display
            grid-column: 1 / -1;
            grid-row: 1 / 2;
        }

        &>div:nth-child(2) {
            // display
            grid-column: 1 / 2;
            grid-row: 2 / -1;
        }

        &>div:nth-child(3) {
            // display
            grid-column: 2 / -1;
            grid-row: 2 / -1;
        }
    }
}

.games{
    // size
    width: 100%;
    height: 100vh;

    // display
    @include flexbox();

    .container-games{
        // size
        width: 80%;
        height: 70%;

        // display
        @include flexbox();
    
        .img{
            // size
            width: 50%;
            height: 100%;

            img{
                // size
                width: 100%;
                height: 100%;

                // decoration
                object-fit: contain;    
                transform: scaleX(-1);
            }
        }

        .text{
            // size
            width: 50%;
            height: 100%;

            // display
            @include flexbox(column, center, space-evenly);

            .title{
                // decoration
                color: $h-c-red-logo-tint;
                font-size: $h-f-size-title;
                font-weight: 600;
            }

            .description{
                // decoration
                font-size: $h-f-size-subtitle - 4px;
            }

            .button {
                // size
                width: 8% ;

                // position
                position: relative;

                // display
                @include flexbox(column, center, center);

                // margin
                padding: 18px 18px 17px;

                // decoration
                overflow: hidden;
                color: #18181a;
                font-size: 15px;
                line-height: 15px;
                text-decoration: none;
                cursor: pointer;
                background: $h-c-white;
                border-radius: 50%;

                @media screen and (max-width: 1500px) {
                    // size
                    width: 10%;
                }

                @media screen and (max-width: 1200px) {
                  // size
                  width: 11%;
                }

                @media screen and (max-width: 1000px) {
                  // size
                  width: 13%;
                }

                @media screen and (max-width: 850px) {
                  // size
                  width: 15%;
                }

                @media screen and (max-width: 756px) {
                  // size
                  width: 17%;
                }

                @media screen and (max-width: 660px) {
                  // size
                  width: 20%;
                }

                @media screen and (max-width: 500px) {
                  // size
                  width: 25%;
                }

                @media screen and (max-width: 400px) {
                  // size
                  width: 30%;
                }
            }

            .button i {
                // position
                transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
                z-index: 10;

                // decoration
                font-size: 25px;
            }

            .button span:last-child {
                // size
                height: 14px;

                // position
                position: absolute;
                bottom: 0;
                top: 50%;
                left: 50%;
                z-index: 100;

                // display
                display: block;

                // decoration
                color: $h-c-white;
                opacity: 0;
                transform: translateY(225%) translateX(-50%);
                line-height: 13px;

                // transition
                transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
            }

            .button:hover{
                // size
                width: 30%;

                // decoration
                border-radius: 0;

                // transition
                transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);

                @media screen and (max-width: 1200px) {
                  // size
                  width: 50%;
                }

                @media screen and (max-width: 700px) {
                  // size
                  width: 70%;
                }

                @media screen and (max-width: 500px) {
                  // size
                  width: 100%;
                }
            }

            .button:after {
                content: "";
                position: absolute;
                bottom: -50%;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: black;
                transform-origin: bottom center;
                transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
                transform: skewY(9.3deg) scaleY(0);
                z-index: 50;
            }

            .button:hover:after {
                transform-origin: bottom center;
                transform: skewY(9.3deg) scaleY(2);
            }

            .button:hover span:last-child {
                transform: translateX(-50%) translateY(-50%);
                opacity: 1;
                transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
            }
        }

        @media screen and (max-width: 764px) {
            // display
            @include flexbox(column, center, center);

            .img{
                // size
                width: 100%;
            }

            .text{
                // size
                width: 100%;
            }
        }
    }
}

.shop{
    //size 
    width: 100%;
    height: 100vh;

    // display
    @include flexbox(column);

    .title{
        // size
        width: 100%;
        height: 10%;

        // decoration
        text-align: center;
    }

    .sections{
        // size
        width: 100%;
        height: 90%;

        // display
        @include flexbox(row, center, center, 1%);

        .mens, .womens{
            // size
            width: 49.5%;
            height: 100%;

            // display
            @include flexbox();

            // decoration
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 10px;

            &:hover{
                // decoration
                cursor: pointer;
            }

            &:hover .button{
                // size
                width: 35%;
                height: 12%;

                // transition
                transition: all 0.4s ease;

                &:after{
                    // position
                    bottom: 2px;
                    left: 2px;

                    //transition
                    transition: all 0.4s ease;
                }
            }

            .button{
                //size
                width: 30%;
                height: 10%;

                //position
                position: relative;

                // display
                @include flexbox();

                //decoration
                background-color: $h-c-red-ligth;
                border: 0;
                box-sizing: border-box;
                font-size: 1rem;
                font-weight: 500;
                line-height: 1.75rem;
                padding: .75rem 1.65rem;
                text-align: center;
                text-decoration: none;
                cursor: pointer;
                

                &:focus {
                    // decoration
                    outline: 0;
                }

                &:after {
                    content: '';
                    position: absolute;
                    border: 1px solid #000000;
                    bottom: 4px;
                    left: 4px;
                    width: calc(100% - 1px);
                    height: calc(100% - 1px);
                }

                @media (min-width: 768px) {
                    & {
                        padding: .75rem 3rem;
                        font-size: 1.25rem;
                    }
                }
            }
        }

        .mens{
            // decoration
            background-image: url('https://www.siuxpadel.com/wp-content/uploads/2023/03/20230217-Diablo-Sanyo-Pro-34-683x1024.jpg');
            // transform: rotate(-12deg);

            // &:hover .button{
            //     // decoration
            //     transform: rotate(22deg);
            // }

            .button{
                transform: rotate(-2deg);
            }

            &:hover .button{
                // decoration
                transform: rotate(-12deg);
            }
        }

        .womens{
            // decoration
            background-image: url("https://www.siuxpadel.com/wp-content/uploads/2022/12/20221130-Trilogy-Control-Patty-53-1024x683.jpg");
            // transform: rotate(7deg);

            // &:hover .button{
            //     // decoration
            //     transform: rotate(-17deg);
            // }

            .button{
                transform: rotate(2deg);
            }


            &:hover .button{
                // decoration
                transform: rotate(12deg);
            }
        }

        @media screen and (max-width: 768px) {
            flex-direction: column;
            .mens, .womens{
                // size
                width: 100%;
                height: 49.5%;

                // display
                
            }
        }
    }
}

.location {
    // size
    width: 100%;
    height: 100vh;

    // display
    @include flexbox();

    .container-location {
        // size
        width: 100%;
        height: 100%;

        // display
        @include flexbox(column);

        .title {
            // size
            width: 100%;
            height: 10%;

            /*margin*/
            margin-bottom: 2rem;

            /* decoration */
            text-align: center;
            font-size: $h-f-size-title;
            font-weight: 600;

            @media screen and (max-width: 409px) {
              height: 20%;
            }
        }

        .map {
            // size
            width: 50%;
            height: 60%;

            /* margin */
            border: 0;

            @media screen and (max-width: 820px) {
              width: 60%;
              height: 40%;
            }
        }
    }
}
</style>
