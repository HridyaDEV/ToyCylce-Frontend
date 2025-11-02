import axios from "axios"

// const url = "http://localhost:5115"
  const url = "https://toycylce-backend-1.onrender.com"


export const fetchDashboardCounts = async () =>{
    const response = await axios.get(`${url}/dashboard/counts`)
    return response.data
}