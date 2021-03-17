
import { navigate } from '@reach/router'
import './styles.scss'

const Home = () => {
  return (
    <div className="home-page">
      <button onClick={() => navigate('/logout')} >Logout</button>
      <div className="page-body">
        <h1>home</h1>
      </div>
    </div>
  )
}

export default Home
