import "./style.css";
import Form from "../form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect,useState } from "react";
import { FaUmbrellaBeach } from 'react-icons/fa';
import { FaSwimmingPool } from 'react-icons/fa';
import { GiCircleForest } from 'react-icons/gi';
import { AiFillShopping } from 'react-icons/ai';
import { MdSportsVolleyball } from 'react-icons/md';
import { GiMountaintop } from 'react-icons/gi';
import { GiCampfire } from 'react-icons/gi';
import { MdPool } from 'react-icons/md';
import { GiCardAceClubs } from 'react-icons/gi';
import { MdOutlineSportsHockey } from 'react-icons/md';
import { GiModernCity } from 'react-icons/gi';
import { GiFireplace } from 'react-icons/gi';
import { GiIceSkate } from 'react-icons/gi';


// console.log(process.env.REACT_APP_API_KEY_WEATHER)



export default function Here() {

let urlIcon= "http://openweathermap.org/img/w/";
let urlIcons = "";
let descriptions = "";
let iconTimeWeather = "";
let iconTimeLocal = "";



  const [local, setLocal] = useState({});
  let [reco,setReco] = useState({});
  const [anyWeather, setAnyWeather] = useState({});
  const [anyLocation, setAnyLocation] = useState("");
  const [country, setAnyCountry] = useState("");
  

  let months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  let days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado']
  let date = new Date();
  let outputDate = `${days[date.getDay()]} ${String(date.getDate()).padStart(2,'0')} de ${months[date.getMonth()]}`
  let outputHour = date.toLocaleTimeString();
  let theme= "";
  let themeText=""
  let dplay = ""
  let dearth ="";
  

  let hot = {
    "commet":"!Vaya, que calor¡ Con este teimpo lo mejor es:",
    "option1":"Aprovechar e ir a la playa",
    "icon1":<FaUmbrellaBeach />,
    "option2":"Ir a la piscina.",
    "icon2":<FaSwimmingPool />,
    "option3":"Hacer alguna actividad al aire libre pero a la sombra y con buen flujo de aire.",
    "icon3":<GiCircleForest />,
    "option4":"Visitar el Mall",
    "icon4":<AiFillShopping />,
    "recomendation":"Las temperaturas esta elevadas, usa protección solar, hidratate constantemente, evita la exposición directa y prolongada al sol."
  };
  let nice = {
    "commet":"!Vaya, tenemos buen tiempo¡ Asi provoca:",
    "option1":"Hacer un poco de deporte",
    "icon1":<MdSportsVolleyball />,
    "option2":"Ir de paseo donde sea",
    "icon2":<GiMountaintop />,
    "option3":"Montarse una excursión ",
    "icon3":<GiCampfire />,
    "option4":"Ir a la playa o la piscina",
    "icon4":<MdPool />,
    "recomendation":"Aunque hace buen tiempo no esta demas tomar precauciones, usa protección solar, hidratate constantemente, evita la exposición directa y prolongada al sol y avisa donde vas."
  };
  let cold = {
    "commet":"Ha llegado el frio, que no decaiga el animo podemos:",
    "option1":"Visitar el mall",
    "icon1":<AiFillShopping />,
    "option2":"Reunión con amigos",
    "icon2":<GiCardAceClubs />,
    "option3":"Hacer algún deporte",
    "icon3":<MdOutlineSportsHockey />,
    "option4":"Pasear por la ciudad",
    "icon4":<GiModernCity />,    
    "recomendation":"Aun hace buen tiempo para hacer muchas cosas al aire libre, aprovechemos pero no hay que olvidar un buen abrigo, estar acompañados y avisar donde iremos."
  };
  let frozen = {
    "commet":"Las temperaturas han bajado bastante, pero aun podemos pasarla bien",
    "option1":"A veces solo provoca quedarse en casa",
    "icon1":<GiFireplace />,
    "option2":"Quedemos con amigos",
    "icon2":<GiCardAceClubs />,
    "option3":"Visitar el mall",
    "icon3":<AiFillShopping />,
    "option4":"Hacer algún deporte",
    "icon4":<GiIceSkate />,
    "recomendation":"Con temperaturas tan bajas, no hay que parar, solo hay que tomar las precauciones necesarias, coger un buen abrigo y a seguir disfrutando."
  };


  let urlAnyWeather =
    `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY_WEATHER}&units=metric&lang=es`;
  let cityUrl = "&q=";

  const getLocation = async (loc,cou) => {
    setAnyLocation(loc);
    setAnyCountry(cou);

    if (cou === ""){
    urlAnyWeather = urlAnyWeather + cityUrl + loc;
  }else{
    urlAnyWeather = `${urlAnyWeather}${cityUrl}${loc},${cou}`;
  }
  console.log(urlAnyWeather)

    await fetch(urlAnyWeather)
      .then((response) => {
        return response.json();
      })

      .then((w) => {
        setAnyWeather(w);
        // console.log(w);
      })
      .catch((error) => {
        console.log(error);
      });
    
  }

  useEffect(() =>{

    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
      alert='<p>Lo siento, tu dispositivo no admite la geolocalización</p>'
      console.log('no va la geolocalización');
    }

function showPosition(position){
  const lon = position.coords.longitude
  const lat = position.coords.latitude

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY_WEATHER}&units=metric&lang=es`)
.then((response) => {
  return response.json();
})

.then((l) => {
  setLocal(l)
  // console.log(l)
})

.catch((error) =>{
  console.log(error);
});

}
  },[])

if(anyWeather.name){
  urlIcons = urlIcon + anyWeather.weather[0]?.icon + '.png';
  descriptions = anyWeather.weather[0]?.description;
  iconTimeWeather = anyWeather.weather[0]?.icon;
}else if(local.name){
  urlIcons = urlIcon + local.weather[0]?.icon + '.png';
  descriptions = local.weather[0]?.description;
  iconTimeLocal = local.weather[0]?.icon;
}

function showReco(){
if(anyWeather.name){
  if(anyWeather.main?.temp >= 30){
    setReco=hot;
    // console.log(setReco);
  }else if(anyWeather.main?.temp >= 20 && anyWeather.main?.temp < 30){
    setReco=nice;
  }else if(anyWeather.main?.temp >= 15 && anyWeather.main?.temp < 20){
    setReco=cold;
  }else if(anyWeather.main?.temp < 15){
    setReco=frozen;
  }

}else{
if(local.main?.temp >= 30){
  setReco=hot;
  // console.log(setReco);
}else if(local.main?.temp >= 20 && local.main?.temp < 30){
  setReco=nice;
}else if(local.main?.temp >= 15 && local.main?.temp < 20){
  setReco=cold;
}else if(local.main?.temp < 15){
  setReco=frozen;
}
}
}
showReco()

function isNight(){  
  if(iconTimeWeather === '01d' || iconTimeWeather === '02d' || iconTimeWeather === '03d' || iconTimeWeather === '04d' || iconTimeWeather === '09d' || iconTimeWeather === '10d' || iconTimeWeather === '11d' || iconTimeWeather === '13d' || iconTimeWeather === '50d'
  || iconTimeLocal === '01d' || iconTimeLocal === '02d' || iconTimeLocal === '03d' || iconTimeLocal === '04d' || iconTimeLocal === '09d' || iconTimeLocal === '10d' || iconTimeLocal === '11d' || iconTimeLocal === '13d' || iconTimeLocal === '50d'){
theme="url(https://i.makeagif.com/media/3-05-2016/SvtWwV.gif)";
themeText="orange";
  }else{
    theme="url(https://i.imgur.com/yRoaDL2.gif)";
    themeText="#fff";
    
  }
}
isNight()

function hidenToggler(){
  if (local?.name !== undefined || anyWeather?.name !== undefined){
    dplay='flex';
    dearth='none';
  }else{
    dplay='none';
    dearth='flex';
  }
}
  hidenToggler()
 
  return (
  
      <div className="wrap_here d-flex flex-column align-items-center">

<Form newLocation = {getLocation}/>

      <div className="wrap_weather_here row px-3 w-100"  style = {{backgroundImage:theme, color:themeText, fontWeight:"bold",textShadow:"0 0 6px #000, 0 0 8px #fff", display:dplay}}>
      <div className="col col-4 d-flex flex-column justify-content-center align-items-center flex-wrap" >
      <div className="here_icon"><img src={urlIcons} alt="" /></div>
      <div className="here_icon_description">{descriptions}</div>
      </div>

      <div className="col col d-flex justify-content-center align-items-center">        
          <div className="here_day col d-flex flex-column">
          <div className="here_time my-0 d-flex justify-content-end fs-6">{outputDate}</div>
          <div className="my-0 d-flex justify-content-end">{`Tiempo a las ${outputHour} hora local`}</div>

        <div className="my-0 d-flex justify-content-end"><h3>{anyWeather?.name ? `${anyWeather?.name} - ${anyWeather?.sys?.country}` : `${local?.name} - ${local?.sys?.country}`}</h3></div>
        <div className="my-0 d-flex justify-content-center"><h3>{anyWeather?.name ? `${anyWeather?.main?.temp?.toFixed(0)}ºC` : `${local?.main?.temp?.toFixed(0)}ºC`}</h3></div>
        <div className="my-0 d-flex justify-content-center fs-6">{anyWeather?.name ? `${anyWeather?.main?.temp_min?.toFixed(0)}ºC - ${anyWeather?.main?.temp_max?.toFixed(0)}ºC ` : `${local?.main?.temp_min?.toFixed(0)}ºC - ${local?.main?.temp_max?.toFixed(0)}ºC `}</div>        
        </div>
      </div>
      </div>

      <div className="wrap_earth p-0" style = {{display:dearth}}>
          <img src="https://fegasofi.files.wordpress.com/2010/09/planeta-gif-2b924d2.gif" alt="imagen del planeta girando" />
        </div>

      <div className="wrap_options_here row px-4 my-2" style = {{display:dplay}}>
        <div className="col d-flex flex-column flex-wrap p-0 m-0 h-auto">
          <div className="col my-1 d-inline-block text-center fs-3">{setReco.commet}</div>

          <div className="wrap_option-odd col d-flex my-1 p-2 justify-content-center align-items-center">
            <div className="icons_plans col-2 d-flex justify-content-center fs-1">{setReco.icon1}</div>
            <div className="plans col-10 d-flex justify-content-center fs-4">{setReco.option1}</div>
          </div>

          <div className="wrap_option col d-flex my-1 p-2 justify-content-center align-items-center">
          <div className="icons_plans col-2 d-flex justify-content-center fs-1">{setReco.icon2}</div>
            <div className="plans col-10 d-flex justify-content-center fs-4">{setReco.option2}</div>
          </div>

          <div className="wrap_option-odd col d-flex my-1 p-2 justify-content-center align-items-center">
          <div className="icons_plans col-2 d-flex justify-content-center fs-1">{setReco.icon3}</div>
            <div className="plans col-10 d-flex justify-content-center fs-4">{setReco.option3}</div>
            </div>

            <div className="wrap_option col d-flex my-1 p-2 justify-content-center align-items-center">
            <div className="icons_plans col-2 d-flex justify-content-center fs-1">{setReco.icon4}</div>
            <div className="plans col-10 d-flex justify-content-center fs-4">{setReco.option4}</div>
            </div>

          <div className="col d-flex justify-content-center p-2 mt-2 mb-4 fs-6 text-center">{setReco.recomendation}</div>
        </div>       

        </div>        

    </div>
  );
}
