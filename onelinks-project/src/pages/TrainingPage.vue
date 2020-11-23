<template>
    <div class="trainingPage">
        <div class="main-content">
            <div class="top row">
                <h2>Обучение</h2>
                <div class="search">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7321 14.4894L12.5858 11.3431L12.5849 11.3422C14.8611 8.40984 14.4656 4.21316 11.6815 1.75779C8.89741 -0.697577 4.68419 -0.565545 2.05932 2.05932C-0.565546 4.68419 -0.697577 8.89741 1.75779 11.6815C4.21316 14.4656 8.40984 14.8611 11.3422 12.5849L14.4885 15.7312C14.709 15.9599 15.0357 16.0517 15.343 15.9715C15.6504 15.8913 15.8905 15.6515 15.9712 15.3443C16.0518 15.037 15.9604 14.7102 15.7321 14.4894ZM11.5981 9.66798C10.6561 11.2995 8.91531 12.3046 7.03138 12.3046C4.11909 12.3046 1.7582 9.94368 1.7582 7.03138C1.7582 4.11909 4.11909 1.7582 7.03138 1.7582C8.91531 1.7582 10.6561 2.76327 11.5981 4.39479C12.5401 6.02632 12.5401 8.03645 11.5981 9.66798Z" fill="#818C99"/>
                    </svg>
                    <input type="search" name="search" id="search" placeholder="Поиск">
                </div>
            </div>
            <div class="col mt-30">
                <h4>ТОП ЛИДЕРЫ</h4>
                <div class="row mt-12">
                    <vue-horizontal-list :items="items" :options="options">
                        <template v-slot:default="{item}">
                            <div class="item col">
                                <div class="lider-photo" :style="{background: 'url('+require(`../assets/img/${item.img.toLowerCase()}`)+')'}">
                                    <div class="rate row">
                                        <svg class="ml-mr-3" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.31191 1.0868C5.57303 0.484639 6.42697 0.484639 6.68809 1.0868L7.72474 3.4774C7.83342 3.72802 8.06975 3.89973 8.34169 3.92564L10.9356 4.17282C11.589 4.23507 11.8529 5.04723 11.3609 5.48164L9.40763 7.20629C9.20287 7.38709 9.11259 7.66493 9.17198 7.93156L9.73848 10.4749C9.88117 11.1156 9.19031 11.6175 8.62512 11.2838L6.38129 9.95911C6.14607 9.82023 5.85393 9.82023 5.61871 9.95911L3.37488 11.2838C2.80969 11.6175 2.11883 11.1156 2.26152 10.4749L2.82802 7.93155C2.88741 7.66493 2.79713 7.38709 2.59237 7.20629L0.639107 5.48164C0.147109 5.04723 0.410994 4.23507 1.06437 4.17282L3.65831 3.92564C3.93025 3.89973 4.16658 3.72802 4.27526 3.4774L5.31191 1.0868Z" fill="white"/>
                                        </svg>
                                        10 
                                    </div>
                                </div>
                                <h5>{{item.title}}</h5>
                                <p>{{item.content}}</p>
                            </div>
                        </template>
                    </vue-horizontal-list>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VueHorizontalList from 'vue-horizontal-list';
export default {
    name: 'trainingPage',
    components:{VueHorizontalList},
    data(){
        return{
            options: {
          responsive: [
            {end: 576, size: 1}, 
            {start: 576, end: 768, size: 2},
            {start: 768, end: 992, size: 3},
            {size: 4}
          ],
          list: {
            padding: 24
          }
        },  
        items: [
          {title: 'Item 0', content: 'Content item with description', img: 'user3.jpg'},
        ],
    }
},
computed: {

  }
}
</script>