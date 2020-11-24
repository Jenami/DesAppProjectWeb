
import Home from './pages/Home.vue'
import ProjectCreation from './pages/test/ProjectCreation.vue'
import Projects from './pages/Projects.vue'
import Profile from './pages/Profile.vue'

export default [
  { path: '/', component: Home }, 
  { path: '/profile', component: Profile}, 
  { path: '/projects', component: Projects},
  { path: '/creation', component: ProjectCreation}
]