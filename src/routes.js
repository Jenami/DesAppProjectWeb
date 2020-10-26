
import Home from './pages/Home.vue'
import HelloWorld from './pages/HelloWorld.vue'
//import Cities from './pages/Cities.vue'
import Projects from './pages/Projects.vue'
import Profile from './pages/Profile.vue'

export default [
  { path: '/', component: Home }, 
  { path: '/about', component: HelloWorld},
  { path: '/profile', component: Profile}, 
  { path: '/projects', component: Projects},
  //{ path: '/projects/id', component: ProjectCard, props: { name: 'attrs' }}
]