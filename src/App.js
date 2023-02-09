import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./App.css";
function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [users, setUsers] = useState([]);

  // grabbing users collection from firestore
  const usersCollectionRef = collection(db, "users");

  // any requests to the firestore database should be async functions
  const createUser = async () => {
    // adding a document to the users collection in firebase
    await addDoc(usersCollectionRef, { name: newName, age: newAge });
  };
  // accepting id and age parameters as an argument for this function
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };
  // useEffect is a hook that is called whenever the page is rendered
  useEffect(() => {
    const getUsers = async () => {
      // getDocs returns all of the data from a document in firestore
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  return (
    <div className="App">
      <input
        placeholder="Name..."
        // populating newName with whatever is in the text box whenever a change is made
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        // populating newAge with whatever is in the text box whenever a change is made
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                // calling updateUser function and passing in user.id and user.age
                updateUser(user.id, user.age);
              }}
            >
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
