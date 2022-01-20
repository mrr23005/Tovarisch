import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage'
import AuthorizationPage from '../../pages/AuthorizationPage/AuthorizationPage'
import { useEffect } from 'react'
import { loadUser } from '../../redux/actions/authActions'
import Navbar from "../Navbar/Navbar";
import MapAllPage from "../../pages/MapAllPage/MapAllPage";
import MapSetPointPage from "../../pages/MapSetPointPage/MapSetPointPage";
import TestPage from "../../pages/TestPage/TestPage";
import SetCirclePage from "../../pages/SetCirclePage/SetCirclePage";
import Incident from "../Incident/Incident";
import MapInCircle from "../MapInCircle/MapInCircle";
import style from './style.module.css'


function App() {


	const dispatch = useDispatch()

  

	useEffect(() => {
		dispatch(loadUser())
	}, [dispatch])

	return (

	<div className={style.abc}>
	<Navbar />
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/mapAllIncidents" element={<MapAllPage />} />
        <Route path="/mapSetPoint" element={<MapSetPointPage />} />
        <Route path="/mapSetCircle" element={<SetCirclePage />} />
        <Route path="/incident/:id" element={<Incident />} />
        <Route path="/mapCircle" element={<MapInCircle />} />
				<Route path='/signin' element={<AuthorizationPage />} />
				<Route path='/signup' element={<RegistrationPage />} />
				<Route path='/signout' />
      </Routes>
			</div>
  );
}

export default App;
