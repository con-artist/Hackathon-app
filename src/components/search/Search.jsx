import styles from "./search.module.scss";
import React, { useState, useEffect } from "react";
import cardData from "../Sample";
import ChallengeCard from "../challengeCards/ChallengeCard";

const statusOptions = [
  { name: "All" },
  { name: "Active" },
  { name: "Upcoming" },
  { name: "Past" },
];

const levelOptions = [{ name: "Easy" }, { name: "Medium" }, { name: "Hard" }];

const statusChecker = (startDate, endDate) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();

  const distanceFromStartDate = start - now;
  const distanceFromEndDate = end - now;

  if (distanceFromStartDate < 0 && distanceFromEndDate > 0) {
    return "Active";
  } else if (distanceFromStartDate < 0 && distanceFromEndDate < 0) {
    return "Past";
  } else {
    return "Upcoming";
  }
};

const Search = () => {
  const [cards, setCards] = useState([...cardData]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState([]);
  const [level, setLevel] = useState([]);
  const cardSelectors = [...status, ...level];

  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  const levelChange = (e, name) => {
    if (!e.target.checked) {
      setLevel((old) => old.filter((itm) => itm !== name));
    } else {
      setLevel((old) => [...old, `${name}`]);
    }
  };

  const statusChange = (e, name) => {
    if (!e.target.checked) {
      setStatus((old) => old.filter((itm) => itm !== name));
    } else {
      setStatus((old) => [...old, `${name}`]);
    }
  };

  const cardSelectorChange = (itm) => {
    if (status.includes(itm)) {
      setStatus((old) => old.filter((values) => values !== itm));
    } else if (level.includes(itm)) {
      setLevel((old) => old.filter((values) => values !== itm));
    }
  };

  useEffect(() => {
    // filter by search
    let newData = cardData.filter((card) => {
      if (card.name.toUpperCase().includes(search.toUpperCase())) {
        return true;
      } else {
        return false;
      }
    });
    // check for level
    if (status.includes("All")) {
      //pass
    } else if (level.length > 0) {
      newData = newData.filter((card) => {
        if (level.includes(card.level)) {
          return true;
        } else {
          return false;
        }
      });
    }
    // check for status
    if (status.includes("All")) {
      // pass
    } else if (status.length > 0) {
      newData = newData.filter((card) => {
        if (status.includes(statusChecker(card.start_time, card.end_time))) {
          return true;
        } else {
          return false;
        }
      });
    }

    setCards(newData);
  }, [search, level, status]);

  return (
    <section className={styles.challenges}>
      <div className={styles.searchbox}>
        <div className={`container ${styles.searchcontainer}`}>
          <div className={`headline-bold-l ${styles.title}`}>
            Explore Challenges
          </div>
          <div className={styles.search}>
            <div className={`link-light-m ${styles.searchbar}`}>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => searchChange(e)}
              />
              <i className="bi bi-search"></i>
            </div>
            <div className={`link-light-m ${styles.filter}`}>
              <div>Filter</div>
              <i className="bi bi-chevron-down"></i>
              <div className={styles.dropdown}>
                <div className={styles.box1}>
                  <div>Filter</div>
                  <i className="bi bi-chevron-up"></i>
                </div>
                <div className={styles.box2}>
                  <div className={styles.boxname}>Status</div>
                  {statusOptions.map((e, i) => (
                    <div className={styles.options} key={i}>
                      <input
                        id={e.name}
                        value={e.name}
                        type="checkbox"
                        checked={status.includes(e.name)}
                        onChange={(d) => statusChange(d, e.name)}
                      />
                      <label htmlFor={e.name}>{e.name}</label>
                    </div>
                  ))}
                </div>
                <div className={styles.box3}>
                  <div className={styles.boxname}>Level</div>
                  {levelOptions.map((e, i) => (
                    <div className={styles.options} key={i}>
                      <input
                        id={e.name}
                        value={e.name}
                        type="checkbox"
                        checked={level.includes(e.name)}
                        onChange={(d) => levelChange(d, e.name)}
                      />
                      <label htmlFor={e.name}>{e.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.selectors}>
            {cardSelectors.map((item) => (
              <div key={item} className={`link-bold-m ${styles.cardselector} `}>
                <div>{item}</div>
                <i
                  className="bi bi-x-circle-fill"
                  onClick={() => cardSelectorChange(item)}
                ></i>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.cards}>
        <div className={`container ${styles.cardsholder}`}>
          {cards.length > 0 ? (
            cards.map((item) => (
              <ChallengeCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.name}
                startDate={item.start_time}
                endDate={item.end_time}
              />
            ))
          ) : (
            <div className={`headline-bold-l ${styles.notfound}`}>
              No Events Found
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Search;
