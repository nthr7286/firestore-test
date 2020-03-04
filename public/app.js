(() => {
  // Your web app's Firebase nfiguration
  const firebaseConfig = {
        apiKey: "AIzaSyBVTYhDTmtO5p9Xqe7g_nMUX3DHKTQfqv8",
        authDomain: "fir-test-a7eb1.firebaseapp.com",
        databaseURL: "http:/fir-test-a7eb1.firebaseio.com",
        projectId: "fir-test-a7eb1",
        storageBucket: "fir-test-a7eb1apspot.com",
        messagingSenderId: "548919679168",
        appId: "1:548919679168:web:7a9d16dea75aa73cabb525"
      };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  const firestore = firebase.firestore()

  const docRef = firestore.doc("samples/sandwichData")
  const outputHeader = document.querySelector("#hotDogOutput")
  const inputTextField = document.querySelector("#latestHotDogStatus")
  const saveButton = document.querySelector("#saveButton")
  const loadButton = document.querySelector("#loadButton")

  const docCounterRef = firestore.doc("samples/counter")
  const counterDisplay = document.querySelector("#counterDisplay")
  const incrementButton = document.querySelector("#incrementButton")
  const decrementButton = document.querySelector("#decrementButton")

  incrementButton.addEventListener('click', () => {
    docCounterRef.get()
      .then(doc => {
        if(doc && doc.exists) {
          const data = doc.data()
          docCounterRef.set({
            count: data.count + 1
          })
          // counterDisplay.innerText = data.count
        }
      })
      .catch(err => {
        console.log("Got an error: ", err)
      })
  })

  decrementButton.addEventListener('click', () => {
    docCounterRef.get()
      .then(doc => {
        if(doc && doc.exists) {
          const data = doc.data()
          docCounterRef.set({
            count: data.count - 1
          })
          // counterDisplay.innerText = data.count
        }
      })
      .catch(err => {
        console.log("Got an error: ", err)
      })
  })

  saveButton.addEventListener('click', () => {
    const textToSave = inputTextField.value
    console.log("I am going to save " + textToSave + "to Firestore")
    docRef.set({
      hotDogStatus: textToSave
    })
    .then(() => {
      console.log("Status saved!")
    })
    .catch(err => {
      console.log("Got an error: ", err)
    })
  })

  loadButton.addEventListener('click', () => {
    docRef.get()
      .then(doc => {
        if (doc && doc.exists) {
          const myData = doc.data()
          outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus
        }
      })
      .catch(err => {
        console.log("Got an error: ", err)
      })
  })

  getRealtimeUpdates = () => {
    docRef.onSnapshot(doc => {
      if (doc && doc.exists) {
        const myData = doc.data()
        console.log("Check out this document I received", doc)
        outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus
      }
    })
  }

  const bar = document.createElement('div')
  bar.style.border = "1px solid #999"
  bar.style.height = "16px"
  bar.style.width = "300px"
  document.body.appendChild(bar)
  const rest = document.createElement('div')
  const opacity = 0.7
  rest.style.background = `rgba(0, 255, 0, ${opacity})`
  rest.style.width = "100%"
  rest.style.height = "100%"
  bar.appendChild(rest)
  getCounterRealtimeUpdates = () => {
    docCounterRef.onSnapshot(doc => {
      if (doc && doc.exists) {
        const count = doc.data().count
        counterDisplay.innerText = count
        rest.style.width = String(100-count) + "%"
        const threshold = 90
        if (count < threshold) {
          rest.style.background = `rgba(${Math.floor(255.0*count/threshold)}, 255, 0, ${opacity})`
        } else {
          rest.style.background = `rgba(255, ${Math.floor(255.0*(1.0-(count-threshold))/(100.0-threshold))}, 0, ${opacity})`
        }
      }
    })
  }

  getRealtimeUpdates()
  getCounterRealtimeUpdates()

})()
