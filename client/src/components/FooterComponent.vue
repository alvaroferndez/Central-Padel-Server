<script setup>

</script>


<template>
    <!-- footer -->
<footer id="footer">
    <section class="container-content">
        <div class="content">
            <div>
                <section>
                    <h4>Lorem</h4>
                    <ul>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                    </ul>
                </section>
                <section>
                    <h4>Lorem</h4>
                    <ul>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                    </ul>
                </section>
                <section>
                    <h4>Lorem</h4>
                    <ul>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                    </ul>
                </section>
                <section>
                    <h4>Lorem</h4>
                    <ul>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                    </ul>
                </section>
            </div>
        </div>
        <div class="bot"></div>
    </section>
    <section class="container-social-media">
        <div class="top"></div>
        <div class="social-media">
            <section class="media">
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-instagram"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-youtube"></i>
            </section>
            <section class="us">
                <span>info</span>
                <span>terminos de uso</span>
                <span>politicas de privacidad</span>
            </section>
        </div>
    </section>
    </footer>
</template>


<style lang="scss">
@import "@/assets/styles.scss";

// footer
footer {
    // size
    width: 100%;
    height: 90vh;

    // display
    @include flexbox(column);

    .container-content {
        // size
        width: 100%;
        height: 50%;

        // display
        @include flexbox(column);

        // decoration
        background-color: $h-c-red-logo-shade;
        color: $h-c-white;

        .bot{
            @include semicircle-footer('top', $h-c-white);
        }

        .content{
            // size
            width: 70%;
            height: 85%;

            div{
                // display
                @include flexbox(row, center, center, 5rem);
                flex-wrap: wrap;

                /* margin */
                margin-top: 10%;

                section{
                    // size
                    height: 100%;

                    // display
                    @include flexbox(column);

                    h4{
                        // size
                        width: 100%;
                        height: 10%;

                        // decoration
                        font-size: $h-f-size-subtitle;
                        text-align: center;
                    }

                    ul{
                        // size
                        width: 100%;
                        height: 90%;

                        // display
                        @include flexbox(column);

                        /* margin */
                        padding-left: 5%;

                        // decoration
                        list-style: none;

                        li{
                            // size
                            width: 100%;
                            height: 25%;

                            // display
                            @include flexbox();

                            // decoration
                            cursor: pointer;

                            &:hover{
                                color: $h-c-white-shade;
                            }
                        }
                    }
                }
                @media screen and (max-width: 800px){
                  @include flexbox(row, center, center, 2rem);
                }

                @media screen and (max-width: 540px){
                  @include flexbox(row, center, center, 0.5rem);
                }
            }
        }
    }

    .container-content:hover{
        .bot{
            /* display */
            visibility: visible;
        }
    }

    .container-social-media {
        // size
        width: 100%;
        height: 50%;

        // display
        @include flexbox(column);

        // decoration
        color: $h-c-red-logo-shade;
        background-color: $h-c-white;

        .social-media{
            // size
            width: 70%;
            height: 85%;

            // display
            @include flexbox(column);

            .media{
                // size
                width: 30%;
                height: 50%;

                // display
                @include flexbox();

                /* margin */
                margin-top: 5%;

                i{
                    // size
                    width: calc(100% / 4);
                    height: 100%;

                    // display
                    @include flexbox();

                    // decoration
                    cursor: pointer;
                    color: $h-c-black-tint;
                    font-size: $h-f-size-subtitle;
                    scale: 1;

                    /* transition */
                    transition: scale 0.2s ease;

                    &:hover{

                        /* decoration */
                        scale: 1.4;

                        /* transition */
                        transition: scale 0.3s ease;
                    }

                    &:nth-child(1):hover{
                        color: getSocialMediaColors('facebook');
                    }

                    &:nth-child(2):hover{
                        color: getSocialMediaColors('instagram');
                    }

                    &:nth-child(3):hover{
                        color: getSocialMediaColors('twitter');
                    }

                    &:nth-child(4):hover{
                        color: getSocialMediaColors('youtube');
                    }
                }

                @media screen and (max-width: 800px){
                  width: 50%;
                }

                @media screen and (max-width: 450px){
                  width: 70%;
                }
            }

            .us{
                // size
                width: 30%;
                height: 50%;

                // display
                @include flexbox();
                flex-wrap: wrap;
                gap: 5%;

                @media screen and (max-width: 820px){
                  width: 50%;
                }

                @media screen and (max-width: 450px){
                  width: 70%;
                }
            }
        }

        .top{
            @include semicircle-footer('bottom', $h-c-red-logo-shade);
        }
    }

    .container-social-media:hover{
        .top{
            visibility: visible;
        }
    }
}
</style>