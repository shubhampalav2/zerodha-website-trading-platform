import OpenAccount from '../../components/OpenAccount.jsx';
import Awards from './Sections/Awards.jsx';
import Education from './Sections/Education.jsx';
import Hero from './Sections/Hero.jsx'
import Pricing from './Sections/Pricing.jsx';
import Stats from './Sections/Stats.jsx';
const Home = () => {
    return (
        <>
            <h1>Home Page</h1>
            <Hero />
            <Awards />
            <Stats />
            <Pricing />
            <Education />
            <OpenAccount />
        </>
    )
}

export default Home;