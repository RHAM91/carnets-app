<template>
    <div class="contenedor_foto">
        <div class="banner_">
            <b-button type="button" variant="outline-danger" size="sm" @click="salir">Cerrar</b-button>
        </div>
        <b-container fluid="">
            <b-row>

                <b-col sm="12" class="mt-3">
                    <label for="">Elegir foto</label>
                    <b-form-file accept="image/*" size="sm" @change="setImage"></b-form-file>
                </b-col>

                <b-col sm="12" class="mt-3">
                    <div class="area_de_corte">
                       <cropper
                        class="crooper"
                        :src="imgSrc"
                        ref="cropper"
                       ></cropper>
                    </div>
                </b-col>
                
                <b-col sm="3" class="mt-3">
                            
                </b-col>


                <b-col sm="3" class="mt-3">
                    <b-button size="sm" variant="warning" block v-if="imgSrc != ''"  @click="cropImage">
                        <b-icon icon="scissors" aria-hidden="true"></b-icon> Cortar y guardar
                    </b-button>
                </b-col>


                <b-col sm="3" class="mt-3">
                    <b-button size="sm" variant="info" block v-if="imgSrc != ''"  @click="rotate">
                        <b-icon icon="arrow-counterclockwise" aria-hidden="true"></b-icon> Girar
                    </b-button>
                </b-col>


                <b-col sm="3" class="mt-3">
                    
                </b-col>
        

            </b-row>
        </b-container>
    </div>
</template>

<script>

// import VueCropper from 'vue-cropperjs'

import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'


export default {
    name: 'CortarFoto',
    components:{
        Cropper
    },
    data() {
        return {
            imgSrc: "",
            cropImg: "",
            buffer_foto: '',
            coordinates: {
                width: 0,
                heigth: 0,
                left: 0,
                top: 0
            },
            image: null
        }
    },
    methods: {
        salir(){
            this.$emit('cerrar')
        },
        setImage(e){
            const file = e.target.files[0];

            if (!file.type.includes("image/")) {
                alert("Please select an image file");
                return;
            }

            if (typeof FileReader === "function") {
                const reader = new FileReader();

                reader.onload = event => {
                this.imgSrc = event.target.result;
                // rebuild cropperjs with the updated source
                this.$refs.cropper.replace(event.target.result);
                };

                reader.readAsDataURL(file);
            } else {
                alert("Sorry, FileReader API not supported");
            }

        },
        ajuste({coordinates, image, visibleArea, canvas}){
            this.buffer_foto = image.src
        },
        async cropImage() {

            const { coordinates, image, canvas } = this.$refs.cropper.getResult()
            this.coordinates = coordinates

            //this.image = canvas.toDataURL()

            this.image = image.src

            // get image data for post processing, e.g. upload or setting image src
            // let f = this.$refs.cropper.getCroppedCanvas().toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, "")


            this.$emit('buffer', this.image.split(',')[1])
            this.$emit('b64', this.image)
            this.salir()
        },
        rotate() {
            // guess what this does :)
            this.$refs.cropper.rotate(90);
        },

    },
}
</script>
    
<style>
    .cropper {
        height: 600px;
        width: 600px;
        background: #DDD;
    }

    .contenedor_foto{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: white;
    }
        .banner_{
            width: 100%;
            height: 35px;
            border-bottom: 1px solid #e9e9e9;
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            padding-right: 5px;
        }

        .area_de_corte{
            width: 500px;
            height: 550px;
            border: 1px solid gray;
            background-color: #e1e1e1;
            margin: auto;
        }


</style>