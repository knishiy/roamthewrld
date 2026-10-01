import SiteNav from './components/SiteNav'
import Hero from './components/Hero'
import Overview from './components/Overview'
import Capabilities from './components/Capabilities'
import Hardware from './components/Hardware'
import Research from './components/Research'
import Journey from './components/Journey'
import GetInvolved from './components/GetInvolved'
import SiteFooter from './components/SiteFooter'

// Server component: the page shell and all copy ship as static HTML; only the nav, reveal
// animations, capability tabs and the 3D viewer hydrate on the client.
export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <Overview />
        <Capabilities />
        <Hardware />
        <Research />
        <Journey />
        <GetInvolved />
      </main>
      <SiteFooter />
    </>
  )
}
