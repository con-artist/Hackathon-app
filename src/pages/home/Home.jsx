import styles from "./home.module.scss";

import rocket from "../../assets/icons/rocket.svg";
import image1 from "../../assets/icons/Group_1000002515.svg";
import image2 from "../../assets/icons/Group_1000002516.svg";
import image3 from "../../assets/icons/Group_1000002518.svg";

import Card_details from "../../components/cards/Card_details";
import CardModel from "../../components/cards/CardModel";
import Search from "../../components/search/Search";


import { Link } from "react-router-dom";



const Home = () => {

  return (
    <main>
      <div className={styles.section1}>
        <div className={`container ${styles.holder}`}>
          <div className={styles.about}>
            <div className={`headline-bold-l ${styles.heading}`}>
              <div className={styles.box}></div>
              <div className={styles.title}>Accelerate Innovation with Global Al Challenges</div>
            </div>
            <div className={`paragraph-m ${styles.paragraph}`}>
              Al Challenges at DPhi simulate real-world problems. It is a great
              place to put your Al/Data Science skills to test on diverse datasets
              allowing you to foster learning through competitions.
            </div>
            <Link to={"/create"}>
              <button type="button" className="btn" >
                Create Challenge
              </button>
            </Link>
          </div>
          <div className={styles.lfc}>
            <img src={rocket} alt="rocket" />
          </div>
        </div>
      </div>
      <div className={styles.section2}>
        <div className={`container ${styles.features}`}>
          <div className={styles.featureholder}>
            <div className={styles.featureimg}>
              <img src={image1} alt="feature" />
            </div>
            <div className={styles.featureinfo}>
              <div className={`link-bold-s ${styles.featurename}`}>100K+</div>
              <div className={`paragraph-s ${styles.featureparagraph}`}>AI model submisson</div>
            </div>
          </div>
          <div className={styles.featureholder}>
            <img src={image2} alt="feature" />
            <div className={styles.featureinfo}>
              <div className={`link-bold-s ${styles.featurename}`}>50K+</div>
              <div className={`paragraph-s ${styles.featureparagraph}`}>Data Scientists</div>{" "}
            </div>
          </div>
          <div className={styles.featureholder}>
            <img src={image3} alt="feature" />
            <div className={styles.featureinfo}>
              <div className={`link-bold-s ${styles.featurename}`}>100K+</div>
              <div className={`paragraph-s ${styles.featureparagraph}`}>AI Challanges hosted</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section3}>
        <div className={`container ${styles.cardcontainer}`}>
          <div className={`headline-bold-l ${styles.cardtitle}`}>Why Participate in <font color="rgb(68,146,76)">Al Challenges?</font></div>
          <div className={styles.cardholder}>
            {Card_details.map((e,i) => <CardModel key={i} icon={e.icon} heading={e.heading} data={e.data}/>)}
          </div>
        </div>
      </div>
      <div className="section-4">
        <Search/>
      </div>
    </main>
  );
};

export default Home;
