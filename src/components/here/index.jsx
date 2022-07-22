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
let descriptions = ""



  const [local, setLocal] = useState({});
  let [reco,setReco] = useState({});
  const [anyWeather, setAnyWeather] = useState({});
  const [anyLocation, setAnyLocation] = useState("");
  const [show, setShow] = useState(false);
  

  let months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  let days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado']
  let date = new Date();
  let outputDate = `${days[date.getDay()]} ${String(date.getDate()).padStart(2,'0')} de ${months[date.getMonth()]}`
  let outputHour = date.toLocaleTimeString();
  let hourTheme = date.getHours();
  let theme= "";
  let themeText=""
  

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
  };

  let urlAnyWeather =
    `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY_WEATHER}&units=metric&lang=es`;
  let cityUrl = "&q=";

  const getLocation = async (loc) => {
    setAnyLocation(loc);

    urlAnyWeather = urlAnyWeather + cityUrl + loc;

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
        setShow(false)
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
  setShow(false)
});

}
  },[])

if(anyWeather.name){
  urlIcons = urlIcon + anyWeather.weather[0]?.icon + '.png';
  descriptions = anyWeather.weather[0]?.description;
}else if(local.name){
  urlIcons = urlIcon + local.weather[0]?.icon + '.png';
  descriptions = local.weather[0]?.description;
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
  if(hourTheme >=7 && hourTheme <=19){
theme="url(https://i.makeagif.com/media/3-05-2016/SvtWwV.gif)";
themeText="#000";
  }else{
    theme="url(https://i.imgur.com/yRoaDL2.gif)";
    themeText="#fff";
    
  }
}
isNight()


  return (
  
      <div className="wrap_here">

<Form newLocation = {getLocation} />

      <div className="wrap_weather_here row px-3"  style = {{backgroundImage:theme,backgroundRepeat:"no-repeat",backgroundSize:"cover", color:themeText, fontWeight:"bold",textShadow:"0 0 3px #000, 0 0 5px #fff"}}>
      <div className="col col-4 d-flex flex-column justify-content-center align-items-center flex-wrap" >
      <div className="here_icon"><img src={urlIcons} alt="" /></div>
      <div className="here_icon_description">{descriptions}</div>
      </div>

      <div className="col col-8 d-flex justify-content-center align-items-center">        
          <div className="here_day col d-flex flex-column">
          <div className="here_time my-0 d-flex justify-content-end">{outputDate}</div>
          <div className="my-0 d-flex justify-content-end">{`Tiempo a las ${outputHour} horas`}</div>

        <div className="my-0 d-flex justify-content-end">{anyWeather?.name ? `${anyWeather?.name} - ${anyWeather?.sys?.country}` : `${local?.name} - ${local?.sys?.country}`}</div>
        <div className="my-0 d-flex justify-content-center"><h4>{anyWeather?.name ? `${anyWeather?.main?.temp?.toFixed(0)}ºC` : `${local?.main?.temp?.toFixed(0)}ºC`}</h4></div>
        <div className="my-0 d-flex justify-content-center">{anyWeather?.name ? `${anyWeather?.main?.temp_min?.toFixed(0)}ºC - ${anyWeather?.main?.temp_max?.toFixed(0)}ºC ` : `${local?.main?.temp_min?.toFixed(0)}ºC - ${local?.main?.temp_max?.toFixed(0)}ºC `}</div>        
        </div>
      </div>
      </div>

      <div className="wrap_options_here row px-4 my-2">
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

          <div className="col d-flex justify-content-center bg-warning p-2 mt-2 mb-4 fs-6 text-center">{setReco.recomendation}</div>
        </div>
        </div>

    </div>
  );
}
