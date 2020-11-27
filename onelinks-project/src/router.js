import Vue from 'vue'
import VueRouter from 'vue-router'
import Author from './pages/Author'
import mainLayout from './components/MainLayout'
import mainPage from './pages/MainPage'
import trainingPage from './pages/TrainingPage'
import materialsPage from './pages/MaterialsPage'
import eventsPage from './pages/EventsPage'
import chatPage from './pages/ChatPage'
import candidatesPage from './pages/CandidatesPage'
import partnersPage from './pages/PartnersPage'


Vue.use(VueRouter);

let router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        { 
            path:'/', name:'login',component: Author  
        },
        {
            path:'/main', component: mainLayout, children:[
                { path: '', name:'mainPage', component: mainPage },
                { path: '/training', name:'trainingPage', component: trainingPage },
                { path: '/materials', name:'materialsPage', component: materialsPage },
                { path: '/events', name:'eventsPage', component: eventsPage },
                { path: '/chat', name:'chatPage', component: chatPage },
                { path: '/candidates', name:'candidatesPage', component: candidatesPage },
                { path: '/partners', name:'partnersPage', component: partnersPage }
            ]
        },
        
    ]
});

/*router.beforeEach((to, from, next) => {
    if(to.path != '/login'){
        next('login');
    }
    else next();
    
  })*/

export default router;