import DataGrid from 'react-data-grid';
// import { getUsers } from "../store/auth/authSlice";
// import { wrapper } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';

const columns = [
  // { key: 'sno', name: 'SNo.' },
  { key: 'sid', name: 'Student ID' },
  { key: 'name', name: 'Name' },
  { key:'voted', name: 'Voted' }
];

// let rows = [
//   { sid: 194, name: 'Example', voted: "false" },
//   { sno: 1, sid: 175, name: 'Demo', voted: "true" },
//   { sid: 194, name: 'Example', voted: "false" },
//   { sid: 175, name: 'Demo', voted: "true" },
//   { sid: 194, name: 'Example', voted: "false" },
//   { sid: 175, name: 'Demo', voted: "true" },
//   { sid: 194, name: 'Example', voted: "false" },
//   { sid: 175, name: 'Demo', voted: "true" },
//   { sid: 194, name: 'Example', voted: "false" },
//   { sid: 175, name: 'Demo', voted: "true" },
// ];

function Grid() {
  const { users, isLoading, message, isError, isSuccess } = useSelector((state) => state.auth);

  const [rows, setRows] = useState([])

  const [matches, setMatches] = useState({ matches: window.matchMedia("(max-width: 768px)").matches })

  useEffect(() => {
    let newUsers = users;
    newUsers = newUsers.map(user => {
      return {
        'sid':user.studentId,
        'name':user.name,
        'voted':user.voted.toString()
      }
    })

    console.log(newUsers)
    setRows(newUsers)
    // rows = newUsers
  },[isSuccess])

  return (
    <div className='container' id="listofvoters" style={{overflowX: "hidden"}}>
      <div data-aos="fade-left" data-aos-delay="300">
        <center><h2 style={{color:"silver"}}>List Of Voters</h2></center>
        <DataGrid columns={columns} rows={rows} rowHeight={50} />
      </div>
    </div>
    
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     // Fetch data from external API
//     console.log("calling")
//     const res = await fetch(`http://localhost:5000/api/votes/fetchUsers`);
//     const data = await res.json();
//     console.log("server side props");
//     console.log(data);

//     store.dispatch(getUsers(data));
//     // Pass data to the page via props
//     // return {
//     //   props: { products: data },
//     // };
//   }
// );

export default Grid;