<template>
 <v-row>
   <v-col v-for="subcategory in presentations[0].subcategories" :key="subcategory.id" cols="12">
     <h2>{{subcategory.name}}</h2>
     <v-row>
       <v-col cols="3" :key="presentation.id" v-for="presentation in subcategory.presentations">
         <div class="slide">
           <v-img class="img" :aspect-ratio="16/9" width="100%" :src="presentation.cover">
           </v-img>
           <div class="format_icon">
             <svg-icon v-if="presentation.fileType === 'pdf'" name="Doc_PDF"></svg-icon>
           </div>
           <div class="slider-description">
             <h4>{{ presentation.name }}</h4>
             <span class="desc">{{ presentation.fileSize }} kb</span>
           </div>
         </div>
       </v-col>
     </v-row>
   </v-col>
 </v-row>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import IProductPresentations from "@/entity/materials/presentations/productsPresentation.types";

@Component
export default class PresentationProduct extends Vue {
@Prop({required: true}) readonly presentations!: IProductPresentations[]
}
</script>

<style lang="scss" scoped>
.slide {
  cursor: pointer;
  border-radius: 12px;
  padding-bottom: 16px;
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
.img {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

}
.format_icon {
  position: absolute;
  background-color: white;
  border-radius: $main-border-radius;
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  bottom: 50px;
  left: 5px;
  align-items: center;
.svg-icon {
  width: 15px !important;
  height: 15px !important;
  color: $blue !important;
}
}
h4 {
  color: #060516;
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: 0;
  line-height: 150%;
}

.desc {
  color: #060516;
  opacity: 0.6;
  font-size: 12px;
  line-height: 150%;
}
.slider-description{
  margin-left: 10px;
}
}
</style>