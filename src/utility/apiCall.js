import axios from "axios";

const baseurl = process.env.REACT_APP_BASEURL;

export const handleApiCall = async (
  endpoint,
  method = "get",
  payload,
  loading = () => {},
  callback
) => {
  const isLoggedin = localStorage.getItem("userinfo");

  if (isLoggedin) {
    const userdata = JSON.parse(isLoggedin);
    axios.defaults.headers.common["Authorization"] = `Bearer ${userdata.token}`;
  }
  
  try {
    loading?.(true);
    let response = null;

    if (method === "get") {
      response = await axios[method](`${baseurl}/${endpoint}`);
    } else {
      response = await axios[method](`${baseurl}/${endpoint}`, payload);
    }
    if (callback) callback(response.data.data);
    
  } catch (err) {
    console.log(err.message,err.response.data?.message)
    callback(false, err.response?.data?.message || err.message || err);
  } finally {
    loading?.(false);
  }
};
