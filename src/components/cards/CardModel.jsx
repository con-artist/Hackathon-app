import styles from './cardModel.module.scss';


const CardModel = (props) => {
  return (
    <div className={styles.card} >
      <div className={styles.cardimg}>
        <img src={props.icon} alt="" />
      </div>
      <div className={`link-black-s ${styles.cardheading}`}>{props.heading}</div>
      <div className={`paragraph-s ${styles.cardinfo}`}>{props.data}</div>
    </div>
  )
}

export default CardModel
