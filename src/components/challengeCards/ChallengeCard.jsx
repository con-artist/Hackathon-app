import styles from './challengeCard.module.scss';
import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const initialTimer = {
  status:"loading",
  time:0,
  point:'loading'
}

const reducer = (state,action) => {
  switch (action.type) {
    case "upcoming":
      return {status:"Upcoming",point:action.point,time:action.time};
    case "active":
      return {status:"Active",point:action.point,time:action.time};
    case "past":
      return {status:"Past",point:action.point,time:action.time};
    default:
      return state;
  }
}

function getEndedDate(endDate){
  let pastYear = `${new Date(endDate).getFullYear()}`.slice(2,4);
  let pastMonth = new Date(endDate).getMonth();
  let pastDays = new Date(endDate).getDate();
  let pastHrs = new Date(endDate).getHours();
  let pastMins = new Date(endDate).getMinutes();
  let session = "AM";

  
  if(pastHrs === 0){
    pastHrs = 12;
  }
  if(pastHrs > 12){
    pastHrs = pastHrs - 12;
    session = "PM";
  }
  
  pastDays = (pastDays < 10) ? "0" + pastDays : pastDays;
  pastHrs = (pastHrs < 10) ? "0" + pastHrs : pastHrs;
  pastMins = (pastMins < 10) ? "0" + pastMins : pastMins;
  

  return `${pastDays}th ${months[pastMonth]}' ${pastYear} ${pastHrs}:${pastMins} ${session}`;
}
function getDays(unix){
  let myDay = Math.floor(unix / (1000 * 60 * 60 * 24))
  let getMyDay = (myDay < 10) ? "0" + myDay : myDay;
  return getMyDay;
  
}
function getHrs(unix){
  let myHrs = Math.floor((unix % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  let getMyHrs = (myHrs < 10) ? "0" + myHrs : myHrs;
  return getMyHrs;
}
function getMins(unix){
  let myMins = Math.floor((unix % (1000 * 60 * 60)) / (1000 * 60));
  let getMyMins = (myMins < 10) ? "0" + myMins : myMins;
  return getMyMins;
}

const ChallengeCard = (props) => {
  const [timer,dispatch] = useReducer(reducer,initialTimer);

  useEffect(() => {
    const startDate = new Date(props.startDate).getTime();
    const endDate = new Date(props.endDate).getTime();
    let counter = setInterval(() => {
      const now = new Date().getTime();
      const distanceFromStartDate = startDate - now;
      const distanceFromEndDate = endDate - now;
      
      if (distanceFromStartDate < 0 && distanceFromEndDate > 0) {
        dispatch({type:'active',point:"Ends in",time:distanceFromEndDate});
      } else if (distanceFromStartDate < 0 && distanceFromEndDate < 0){
        clearInterval(counter);
        dispatch({type:'past',point:"Ended on",time:getEndedDate(endDate)});
      } else {
        dispatch({type:'upcoming',point:"Starts in",time:distanceFromStartDate});
      }
    },1000)

    return () => clearInterval(counter);
  },[props.startDate,props.endDate])

  return (
    <article className={styles.card}>
      <div className={styles.cardimg}>
        <img src={props.image} alt="" />
      </div>
      <div className={styles.cardinfo}>
        <div className={styles.date}>
          <div className={`link-bold-s ${styles[timer.status]}`}>{timer.status}</div>
        </div>
        <div className={`headline-bold-s ${styles.title}`}>{props.title}</div>
        <div className={` ${styles.timer}`}>
          <div className={`link-bold-s  ${styles.timertitle}`}>{timer.point}</div>
          <div className={`${timer.status === "Past" ? "disactive":""} ${styles.countdown}`}>
            <div className={`headline-bold-s ${styles.clock}`}>{`${getDays(timer.time)} : ${getHrs(timer.time)} : ${getMins(timer.time)}`}</div>
            <div className={`link-bold-s ${styles.indicator}`}>
              <div>Days</div>
              <div>Hours</div>
              <div>Mins</div>
            </div>
          </div>
          <div className={`headline-bold-s ${timer.status === "Past" ? "":"disactive"} ${styles.endtime}`}>{timer.time}</div>
        </div>
        <Link className={styles.link} to={`/details/?id=${props.id}`}>
          <div className={`challenge-btn ${styles.cta}`}>
            <i className="bi bi-check2-circle"></i>
            <div>Participate Now</div>
          </div>
        </Link>
      </div>
    </article>
  )
}

export default ChallengeCard