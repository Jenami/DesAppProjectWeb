
import Home from './pages/Home.vue'
import HelloWorld from './pages/HelloWorld.vue'

//import Home from './pages/Home.vue'
//import Cities from './pages/Cities.vue'
//import Proyects from './pages/Proyects.vue'

export default [
  { path: '/', component: Home }, 
  { path: '/about', component: HelloWorld}, 
  //copy paste 
  //{ path: '/cities', component: CityList, props: { name: 'world' }}, // static values
  //{ path: '/cities/:id', component: Hello, props: dynamicPropsFn }, // custom logic for mapping between route and props
  //{ path: '/projects', component: ProjectList, props: { name: 'attrs' }},
  //{ path: '/projects/id', component: ProjectCard, props: { name: 'attrs' }}
]