<template>
    <div class="contenedor">
        <div class="bar-top">
            
        </div>

        <div class="cuerpo">
            <b-container fluid="">
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <h2>
                            Formulario
                        </h2>
                    </b-col>

                    <b-col sm="12" class="mt-3">
                        <label for="">Cargo</label>
                        <select class="form-control form-contro-sm">
                            <option value="">Selecciona</option>
                            <option value="pastor">Pastor</option>
                            <option value="obrero">Obrero</option>
                        </select>
                    </b-col>

                    <b-col sm="12" class="mt-3">
                        <label for="">Foto</label>
                        <b-form-input type="text" size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="6" class="mt-3">
                        <label for="">Nombres</label>
                        <b-form-input type="text" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="6" class="mt-3">
                        <label for="">Apellidos</label>
                        <b-form-input type="text" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="6" class="mt-3">
                        <label for="">Iglesia</label>
                        <b-form-input type="text" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="6" class="mt-3">
                        <label for="">País</label>
                        <b-form-input type="text" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                        <b-button type="submit" variant="success" size="sm">Guardar</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Inicio',
    data() {
        return {
            
        }
    },
    methods: {
        
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
</style>