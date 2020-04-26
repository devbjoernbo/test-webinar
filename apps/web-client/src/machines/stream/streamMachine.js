import { Machine, assign } from "xstate";

const postData = async (method, path = "", data = {}) => {
  try {
    const response = await fetch(`http://dev.api.localhost${path}`, {
      method, // *GET, POST, PUT, DELETE, etc.
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const streamMachine = Machine({
  id: "streamer",
  initial: "inactive",

  context: {
    isStreamStarted: false
  },

  states: {
    inactive: {
      on: {
        ACTIVATE: {
          target: "active",
          actions: assign({
            isStreamStarted: true
          })
        }
      }
    },
    active: {
      on: {
        IN_ACTIVATE: {
          target: "inactive",
          actions: assign({
            isStreamStarted: false
          })
        }
      }
    }
  }
});

export const clientsMachine = Machine(
  {
    id: "clients",
    initial: "fetching_clients",

    context: {
      connectedClients: []
    },

    states: {
      fetching_clients: {
        invoke: {
          src: "getClients",
          onDone: {
            target: "success",
            actions: assign({
              connectedClients: (context, { data }) => {
                console.log(data);
                return data;
              }
            })
          },
          onError: {
            target: "failure"
          }
        }
      },
      success: {
        on: {
          ADD_CLIENT: {
            actions: assign({
              connectedClients: (context, data) => {
                const connectedClients = context.connectedClients.slice(0);

                connectedClients.push(data.client);

                return connectedClients;
              }
            })
          }
        }
      },
      failure: {}
    }
  },
  {
    services: {
      getClients: (context, event) => postData("POST", "/getclients")
    }
  }
);
