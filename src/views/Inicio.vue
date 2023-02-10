<template>
    <div class="contenedor">
        <div class="bar-top">
            
        </div>

        <div class="cuerpo">
            <b-container fluid="">
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h2>
                                Formulario
                            </h2>
                        </b-col>

                        <!-- <b-col sm="6" class="mt-3">
                            <div class="cuadro_foto">
                                <div class="foto_">
                                    <img :src="`${foto_b64}`" style="width: 100%;height: 100%;" alt="">
                                </div>
                            </div>
                        </b-col>

                        <b-col sm="6" class="mt-3">
                            <div class="cuadro_foto">
                                <b-button type="button" variant="outline-info" size="sm" @click="abrir_modal">Foto</b-button>
                            </div>    
                        </b-col> -->
    
                        <b-col sm="12" class="mt-3">
                            <label for="">Cargo</label>
                            <select class="form-control form-control-sm" v-model="cargo">
                                <option value="">Selecciona</option>
                                <option value="pastor">Pastor</option>
                                <option value="obrero">Obrero</option>
                            </select>
                        </b-col>

                        <b-col sm="6" class="mt-3">
                            <label for="">Nombres</label>
                            <b-form-input type="text" id="nombres" v-model="nombres" size="sm"></b-form-input>
                        </b-col>
    
                        <b-col sm="6" class="mt-3">
                            <label for="">Apellidos</label>
                            <b-form-input type="text" size="sm" v-model="apellidos"></b-form-input>
                        </b-col>
    
                        <b-col sm="6" class="mt-3">
                            <label for="">Iglesia</label>
                            <b-form-input type="text" v-model="iglesia" size="sm"></b-form-input>
                        </b-col>
    
                        <b-col sm="6" class="mt-3">
                            <label for="">País</label>
                            <b-form-input type="text" v-model="pais" size="sm"></b-form-input>
                        </b-col>
    
                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="submit" variant="success" size="sm">Guardar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>

            <CortarFoto v-if="modal" v-on:cerrar="cerrar_modal" v-on:buffer="cargar_buffer_foto" v-on:b64="cargar_b64_foto" />

        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import CortarFoto from '../components/CortarFoto.vue'


export default {
    name: 'Inicio',
    components:{
        CortarFoto
    },
    data() {
        return {
            modal: false,
            foto: '',
            foto_b64: '',
            cargo: '',
            nombres: '',
            apellidos: '',
            iglesia: '',
            pais: 'guatemala'
        }
    },
    methods: {

        guardar(){
            let f = {
                foto: this.foto,
                cargo: this.cargo,
                nombres: this.nombres.toUpperCase().trim(),
                apellidos: this.apellidos.toUpperCase().trim(),
                iglesia: this.iglesia.toUpperCase().trim(),
                pais: this.pais.toUpperCase().trim()
            }

            this.guardarDatos(f)
            this.nombres = ''
            this.apellidos = ''
            this.iglesia = ''
            this.pais = ''
            document.getElementById('nombres').focus()

        },
        abrir_modal(){
            this.modal = true
        },
        cerrar_modal(){
            this.modal = false
        },
        cargar_buffer_foto(buf){
            this.foto = buf
        },
        cargar_b64_foto(b){
            this.foto_b64 = b
        },
        ...mapActions(['guardarDatos'])
    },
    mounted() {
        document.getElementById('nombres').focus()
    },
}
</script>

<style>
    .contenedor{
        width: 100%;
        height: 100vh;
    }
        .bar-top{
            width: 100%;
            height: 35px;
            background-color: orangered;
        }

        .cuerpo{
            width: 100%;
            height: calc(100% - 35px);
        }
            .cuadro_foto{
                height: 185px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
                .foto_{
                    width: 150px;
                    height: 185px;
                    border: 1px solid #e9e9e9;
                }
</style>
