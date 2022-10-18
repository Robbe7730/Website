import AboutMe from "./AboutMe.jsx"

import Page from './Page.jsx';
import Education from './Education.jsx';
import Skills from './Skills.jsx';
import Projects from './Projects.jsx';
import VolunteerWork from './VolunteerWork.jsx';
import Achievements from './Achievements.jsx';

export default function Profile(props) {
  return (
    <div>
      <AboutMe {...props}/>
      <main>
        <Page>
          <Education {...props}/>
          <Skills {...props}/>
          <Projects {...props}/>
        </Page>
        <Page>
          <VolunteerWork {...props}/>
          <Achievements {...props}/>
        </Page>
      </main>
    </div>
  )
}
