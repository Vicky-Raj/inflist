import React, { useEffect, useState, useRef } from "react";
import { IPerson } from "./person";
import axios from "axios";
import {
    DataManager,
    Query,
    Predicate,
    UrlAdaptor,
} from "@syncfusion/ej2-data";
import { List, ScrollParams, ListRowProps } from "react-virtualized";

// interface IFilter {
//     [key: string]: {
//         operator: string;
//         value: string | number;
//     };
// }

// function App() {
//     const batchSize = 50;
//     const manager = useRef<DataManager>();
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [page, setPage] = useState(1);
//     const [filter, setFilter] = useState<IFilter>({
//         name: { operator: "startswith", value: "" },
//         age: { operator: "equal", value: "" },
//         gender: { operator: "equal", value: "male" },
//     });

//     const [dataSource, setDataSource] = useState<IPerson[]>([]);
//     const [data, setData] = useState<IPerson[]>([]);

//     const setOperator = (name: string, operator: string) => {
//         setFilter((filter) => ({
//             ...filter,
//             [name]: { operator, value: filter[name].value },
//         }));
//         setPage(1);
//     };

//     const setValue = (name: string, value: string | number) => {
//         setFilter((filter) => ({
//             ...filter,
//             [name]: { operator: filter[name].operator, value },
//         }));
//         setPage(1);
//     };

//     useEffect(() => {
//         const url = "http://localhost:8000/";
//         axios.get(url).then(({ data }) => setDataSource(data));
//     }, []);

//     useEffect(() => {
//         manager.current = new DataManager(dataSource);
//         filterData();
//     }, [dataSource]);

//     const filterData = () => {
//         console.log(filter)
//         //@ts-ignore
//         let predicate = null;

//         for (const key in filter) {
//             if (filter[key].value !== "")
//                 predicate =
//                     predicate === null
//                         ? new Predicate(
//                               key,
//                               filter[key].operator,
//                               filter[key].value
//                           )
//                         : predicate.and(
//                               key,
//                               filter[key].operator,
//                               filter[key].value
//                           );
//         }

//         if (search !== "")
//             predicate =
//                 predicate === null
//                     ? new Predicate("name", "startswith", search)
//                     : predicate.and("name", "startswith", search);

//         if (predicate)
//             if (page > 1)
//                 setData((data) => [
//                     ...data,
//                     ...(manager.current?.executeLocal(
//                         //@ts-ignore
//                         new Query().where(predicate).page(page, batchSize)
//                     ) as IPerson[]),
//                 ]);
//             else
//                 setData(
//                     manager.current?.executeLocal(
//                         new Query().where(predicate).page(1, batchSize)
//                     ) as IPerson[]
//                 );
//         else if (page > 1)
//             setData((data) => [
//                 ...data,
//                 ...(manager.current?.executeLocal(
//                     //@ts-ignore
//                     new Query().page(page, batchSize)
//                 ) as IPerson[]),
//             ]);
//         else
//             setData(
//                 manager.current?.executeLocal(
//                     new Query().page(1, batchSize)
//                 ) as IPerson[]
//             );
//         setLoading(false);
//     };

//     const handleScroll = (e: ScrollParams) => {
//         if (!loading && e.scrollHeight - (e.scrollTop + e.clientHeight) === 0)
//             setLoading(true);
//     };

//     function rowRenderer(row: ListRowProps) {
//         return (
//             <div key={row.key} style={row.style}>
//                 {JSON.stringify(data[row.index])}
//             </div>
//         );
//     }

//     useEffect(() => {
//         if (loading) setPage((page) => page + 1);
//     }, [loading]);

//     useEffect(() => {
//         if (page > 1) filterData();
//     }, [page]);

//     return (
//         <div>
//             <label htmlFor="search">Search</label>
//             <input
//                 type="text"
//                 id="search"
//                 value={search}
//                 onChange={(e) => {
//                     setSearch(e.target.value);
//                     setPage(1);
//                 }}
//                 onKeyDown={(e) => {
//                     if (e.keyCode === 13) filterData();
//                 }}
//             />
//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: "space-evenly",
//                     marginTop: "20px",
//                 }}
//             >
//                 <div>
//                     <label htmlFor="name">Name: </label>
//                     <select
//                         id="name"
//                         value={filter.name.operator}
//                         onChange={(e) => setOperator("name", e.target.value)}
//                     >
//                         <option value="startswith">startswith</option>
//                         <option value="endswith">endswith</option>
//                         <option value="contains">contains</option>
//                     </select>
//                     <input
//                         type="text"
//                         value={filter.name.value}
//                         onChange={(e) => setValue("name", e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="age">Age: </label>
//                     <select
//                         id="age"
//                         value={filter.age.operator}
//                         onChange={(e) => setOperator("age", e.target.value)}
//                     >
//                         <option value="equal">equal</option>
//                         <option value="notequal">notequal</option>
//                         <option value="greaterthanorequal">
//                             greaterthanorequal
//                         </option>
//                         <option value="lessthanorequal">
//                             {" "}
//                             lessthanorequal{" "}
//                         </option>
//                         <option value="greaterthan">greaterthan</option>
//                         <option value="lessthan">lessthan</option>
//                     </select>
//                     <input
//                         type="number"
//                         value={filter.age.value}
//                         onChange={(e) =>
//                             setValue("age", Number(e.target.value))
//                         }
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="gender">Gender: </label>
//                     <select
//                         id="gender"
//                         value={filter.gender.value}
//                         onChange={(e) => setValue("gender", e.target.value)}
//                     >
//                         <option value="male">male</option>
//                         <option value="female">female</option>
//                     </select>
//                 </div>
//                 <button onClick={filterData}>Filter</button>
//             </div>
//             <div style={{ display:"flex", marginTop: "50px",justifyContent:"center" }}>
//             <div>
//                 <List
//                     onScroll={handleScroll}
//                     height={200}
//                     rowCount={data.length}
//                     rowHeight={20}
//                     rowRenderer={rowRenderer}
//                     width={500}
//                 />
//             </div>
//             </div>

//         </div>
//     );
// }

// export default App;

function App() {
    const batchSize = 50;
    const [page,setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(false);

    const fetch = (page:number)=>{
        new DataManager({
            url: "http://068787ba03ce.ngrok.io/Tickets/Datasource",
            adaptor: new UrlAdaptor(),
        })
            .executeQuery(new Query().page(page,batchSize))
            .then((val: any) => {
                //@ts-ignore
                setData(data=>([...data,...val.result]));
                setLoading(false);
            });

    }

    useEffect(() => {
        fetch(1);
    }, []);

    function rowRenderer(row: ListRowProps) {
        return (
            <div key={row.key} style={row.style}>
                {
                    //@ts-ignore
                    data[row.index].Employee.Name
                }
            </div>
        );
    }

    const handleScroll = (e: ScrollParams) => {
        if (!loading && e.scrollHeight - (e.scrollTop + e.clientHeight) === 0)
            setLoading(true);
    };

    useEffect(()=>{
        if(loading)
            setPage(page=>{
                fetch(page+1)
                return page+1;
            })
    },[loading])


    return (
        <div>
            <List
                onScroll={handleScroll}
                height={200}
                rowCount={data.length}
                rowHeight={20}
                rowRenderer={rowRenderer}
                width={500}
            />
        </div>
    );
}

export default App;
