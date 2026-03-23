import { useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";

function App() {
  const [SubjectList, setSubjectList] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [serachKeyword, setSearchKeyword] = useState("");
  const [category, setCategory] = useState(0); // 0:모두, 1:프론트, 2:백, 3:DB
  const [level, setLevel] = useState(0); // 0:모두, 1:초급, 2:중급, 3:고급
  const [sort, setSort] = useState(0);
  // 1: 작성순, 2:난이도 오름차순, 3:난이도 내림차순, 4:수강인원 오름차순 5:수강인원 내림차순
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKSERVER}/subjects?searchKeyword=${serachKeyword}&category=${category}&level=${level}&sort=${sort}`,
      )
      .then((res) => {
        console.log(res);

        setSubjectList(res.data);
        setKeyword("");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [serachKeyword, category, level, sort]);
  return (
    <div className={styles.subject_wrap}>
      <header className={styles.header}>
        <h1>강의 목록</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.option_wrap}>
          <h3 className={styles.option_title}>검색옵션</h3>
          <form
            className={styles.search_wrap}
            onSubmit={(e) => {
              e.preventDefault();
              setSearchKeyword(keyword);
            }}
          >
            <input
              type="text"
              value={keyword}
              placeholder="과목명으로 검색"
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            ></input>
            <button type="submit">검색</button>
          </form>
          <select
            className={styles.select}
            value={category}
            onChange={(e) => {
              setCategory(Number(e.target.value));
            }}
          >
            <option value={0}>카테고리</option>
            <option value={1}>프론트엔드</option>
            <option value={2}>백엔드</option>
            <option value={3}>DB</option>
          </select>
          <select
            className={styles.select}
            value={level}
            onChange={(e) => {
              setLevel(Number(e.target.value));
            }}
          >
            <option value={0}>난이도</option>
            <option value={1}>초급</option>
            <option value={2}>중급</option>
            <option value={3}>고급</option>
          </select>
          <select
            className={styles.select}
            value={sort}
            onChange={(e) => {
              setSort(Number(e.target.value));
            }}
          >
            <option value={0}>정렬</option>
            <option value={1}>작성순 (기본)</option>
            <option value={2}>난이도 오름차순</option>
            <option value={3}>난이도 내림차순</option>
            <option value={4}>수강인원 오름차순</option>
            <option value={5}>수강인원 내림차순</option>
          </select>
          <div className={styles.btn_wrap}>
            <button
              className={styles.reset_btn}
              type="submit"
              onClick={() => {
                setKeyword("");
                setCategory(0);
                setLevel(0);
                setSort(0);
                setSearchKeyword("");
              }}
            >
              검색옵션 초기화
            </button>
          </div>
        </section>
        <section className={styles.item_wrap}>
          <SubjectListMap SubjectList={SubjectList} />
        </section>
      </main>
    </div>
  );
}

const SubjectListMap = ({ SubjectList }) => {
  return (
    <>
      <ul className={styles.title_ul}>
        <li className={styles.subject_no}>과목 관리번호</li>
        <li className={styles.subject_title}>과목 이름</li>
        <li className={styles.subject_instructor}>담당 강사</li>
        <li className={styles.subject_category}>과목 분류</li>
        <li className={styles.subject_level}>과목 난이도</li>
        <li className={styles.subject_count}>수강 정원</li>
      </ul>
      {SubjectList.map((subject) => {
        return (
          <SubjectItem
            key={`subjectNo-${subject.subjectNo}`}
            subject={subject}
          />
        );
      })}
    </>
  );
};

const SubjectItem = ({ subject }) => {
  return (
    <ul className={styles.subject_item}>
      <li className={styles.subject_no}>{subject.subjectNo}</li>
      <li className={styles.subject_title}>{subject.subjectTitle}</li>
      <li className={styles.subject_instructor}>{subject.subjectInstructor}</li>
      <li className={styles.subject_category}>{subject.subjectCategory}</li>
      <li className={styles.subject_level}>{subject.subjectLevel}</li>
      <li className={styles.subject_count}>{subject.subjectCount}</li>
    </ul>
  );
};

export default App;
