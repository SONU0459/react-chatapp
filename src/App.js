import { useEffect, useRef, useState } from "react";

import {
  Box,
  Container,
  VStack,
  Button,
  Input,
  HStack,
  Alert,
} from "@chakra-ui/react";
import Message from "./Components/Message";
import app from "./firebase";

import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider);
};

const logoutHandler = () => {
  signOut(auth);
};

function App() {
  const [user, setUser] = useState(false);
  const [messag, setMessag] = useState("");
  const [message, setMessage] = useState([]);
  const divRef = useRef(null);

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      await addDoc(
        collection(db, "Message"),

        {
          text: messag,
          uid: user.uid,
          uri: user.photoURL,
          createdAT: serverTimestamp(),
        }
      );

      setMessag("");
      divRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "Message"), orderBy("createdAT", "asc"));
    const unsub = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    const unsubE = onSnapshot(q, (snap) => {
      setMessage(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });

    return () => {
      unsub();
      unsubE();
    };
  }, []);

  return (
    <Box bgGradient="linear(to-r,  gray.50, blue.300)">
      {user ? (
        <Container h={"100vh"} bg={"white"}>
          <VStack h={"full"} paddingY={4}>
            <Button onClick={logoutHandler} w={"100%"} bg={"#85CDFD"}>
              Logout
            </Button>

            <VStack
              borderRadius={"base"}
              h={"full"}
              w={"full"}
              overflowY={"auto"}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {message.map((item) => (
                <Message
                  key={item.id}
                  user={item.uid === user.uid ? "me" : "other"}
                  text={item.text}
                  uri={item.uri}
                />
              ))}

              <div ref={divRef}></div>
            </VStack>

            <form onSubmit={submithandler} style={{ width: "100%" }}>
              <HStack>
                <Input
                  value={messag}
                  onChange={(e) => setMessag(e.target.value)}
                  placeholder="Type a Message..."
                />
                <Button colorScheme="blue" variant="outline" type="submit">
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack bg={"white"} justifyContent={"center"} h={"100vh"}>
          <Button onClick={loginHandler} colorScheme="blue">
            Login with Google
          </Button>
        </VStack>
      )}
    </Box>
  );
}

export default App;
