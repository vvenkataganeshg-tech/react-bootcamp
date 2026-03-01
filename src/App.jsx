import {useState,useEffect,useMemo} from 'react'
import axios from 'axios' 
import PatientCard from './PatientCard.jsx'
function App(){
  const [patients,setPatients]=useState([])
  const [search,setSearch]=useState("")
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    axios.get("https://doc-back.onrender.com/patients")
      .then((res)=>{
        console.log(res.data)
        setPatients(res.data)
        setLoading(false)
      })
      .catch((err)=>{
        console.log(err)
      })
  },[])

  const filteredPatients= useMemo(()=>{
    return patients.filter((i)=>
      i.name.toLowerCase().includes(search.toLowerCase())
    )
  },[search,patients])

  return(
    <div className='container mt-4'>
      <h2 className='text-center'>Patient Dashboard</h2>
      <input 
        type="text" 
        className='form-control mb-4' 
        placeholder="Search patient by name" 
        onChange={(e)=>setSearch(e.target.value)}/>
      {
        loading && <div className='alert alert-info'>Loading...</div>
      }
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      {
        !loading && filteredPatients.length==0 &&(
          <div className="col">
            <div className='alert alert-warning text-center'>
              No patient found
            </div>
          </div>
        )
      }
      {
        !loading && filteredPatients.map((i)=>(
          <div className='col' key={i.id}>
            <PatientCard patient={i}/>
          </div>
        ))
      }

      </div>
      
    </div>
  )
}
export default App