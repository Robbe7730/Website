import AboutMe from "./AboutMe.jsx"

import Page from './Page.jsx';
import Education from './Education.jsx';

export default function Profile(props) {
  return (
    <div>
      <AboutMe {...props}/>
      <main>
        <Page>
          <Education {...props}/>
        </Page>
        <Page>
        </Page>
      </main>
    </div>
  )
}
