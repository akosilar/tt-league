//components
import Navbar from '../components/Navbar';
import Players from '../components/Players.jsx'
//styles
import '../App.css'


export default function AllPlayers() {
    return (
        <div>
            <Navbar />
            <div className="md:container md:mx-auto flex justify-center">
            <Players />
            </div>
        </div>
      )
}