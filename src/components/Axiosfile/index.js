import axios from "axios";
import "./index.css";

const Axiosfile = () => {
  // copied from jwt.io
  axios.defaults.headers.common["X-Auth-Token"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  const getRequest = () => {
    //if Time to get response is exceeded the timeout, the error will displayed
    axios
      .get("https://jsonplaceholder.typicode.com/todos", { timeout: 5000 })
      .then((response) => console.log(response.config))
      .catch((error) => console.log(error));
  };

  const postRequest = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: "New Todo",
        completed: false,
      })
      .then((res) => console.log(res.config))
      .catch((err) => console.log(err));
  };

  const putRequest = () => {
    axios
      .put("https://jsonplaceholder.typicode.com/todos/1", {
        title: "Update Todo",
        completed: false,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const patchRequest = () => {
    axios
      .patch("https://jsonplaceholder.typicode.com/todos/1", {
        title: "Update Todo",
        completed: false,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const DeleteRequest = () => {
    axios
      .delete("https://jsonplaceholder.typicode.com/todos/1")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const SimultaneousRequest = () => {
    axios
      .all([
        axios.get("https://jsonplaceholder.typicode.com/todos"),
        axios.get("https://jsonplaceholder.typicode.com/posts"),
      ])
      .then(axios.spread((todos, posts) => console.log(todos.data, posts.data)))
      .catch((err) => console.log(err));
  };

  const CustomHeaderRequest = () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "jwtToken",
      },
    };

    axios
      .post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: "New Todo",
          completed: false,
        },
        config
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const ErrorHandlingResquest = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todosss")
      .then((response) => console.log(response.config))
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          if (error.response.status === 404) {
            alert("Error: Page Not Found");
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log(error.message);
          }
        }
      });
  };

  const TransformRequest = () => {
    const options = {
      method: "post",
      url: "https://jsonplaceholder.typicode.com/todos",
      data: {
        title: "Hello World",
      },
      transformResponse: axios.defaults.transformResponse.concat((data) => {
        data.title = data.title.toUpperCase();
        return data;
      }),
    };

    axios(options).then((res) => console.log(res.data));
  };

  const CancelRequest = () => {
    const source = axios.CancelToken.source();

    axios
      .get("https://jsonplaceholder.typicode.com/todos", {
        cancelToken: source.token,
      })
      .then((response) => console.log(response.config))
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          console.log("Request Canceled", thrown.message);
        }
      });
    if (true) {
      source.cancel("Request Cancelled");
    }
  };

  const axiInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });

  const axiosInstance = () => {
    axiInstance.get("./comments").then((res) => console.log(res.data));
  };

  axios.interceptors.request.use(
    (config) => {
      console.log(
        `${config.method.toUpperCase()} request send to ${config.url}`
      );
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div className="container">
      <button type="button" onClick={getRequest}>
        Get Request
      </button>
      <button type="button" onClick={postRequest}>
        Post Request
      </button>
      <button type="button" onClick={putRequest}>
        Put Request
      </button>
      <button type="button" onClick={patchRequest}>
        Patch Request
      </button>
      <button type="button" onClick={DeleteRequest}>
        Delete Request
      </button>
      <button type="button" onClick={SimultaneousRequest}>
        Simultaneous Request
      </button>
      <button type="button" onClick={CustomHeaderRequest}>
        Custom Header Request
      </button>
      <button type="button" onClick={TransformRequest}>
        Transform Request
      </button>
      <button type="button" onClick={ErrorHandlingResquest}>
        Error Handling
      </button>
      <button type="button" onClick={CancelRequest}>
        Cancel
      </button>
      <button type="button" onClick={axiosInstance}>
        Axios Instance
      </button>
    </div>
  );
};

export default Axiosfile;
