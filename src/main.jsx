import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router.jsx'
import { ProjectProvider } from './store/ProjectContext.jsx';


createRoot(document.getElementById('root')).render(
  <ProjectProvider>
    <RouterProvider router={router} />
  </ProjectProvider>
)
