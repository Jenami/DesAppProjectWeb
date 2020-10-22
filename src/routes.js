
import Home from './pages/Home.vue'
import HelloWorld from './pages/HelloWorld.vue'

//import Home from './pages/Home.vue'
//import Cities from './pages/Cities.vue'
import Projects from './pages/Projects.vue'

export default [
  { path: '/', component: Home }, 
  { path: '/about', component: HelloWorld}, 
  //{ path: '/cities', component: CityList, props: { name: 'world' }}, // static values
  //{ path: '/cities/:id', component: Hello, props: dynamicPropsFn }, // custom logic for mapping between route and props
  { path: '/projects', component: Projects},
  //{ path: '/projects/id', component: ProjectCard, props: { name: 'attrs' }}
]