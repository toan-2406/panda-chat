import * as React from 'react';
import '../styles/globals.css'
import { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import Login from './login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../core/firebase/firebase';
import Loading from '../components/Loading';
import { ColorModeContextProvider } from '../core/context/ColorModeContext';


export default function MyApp({ Component, pageProps }: AppProps) {
  const [loggedInUser, loading, _error] = useAuthState(auth)

  React.useEffect(() => {
      const setUserInDb = async () => {
        try{
          await setDoc(
            doc(db,'users',loggedInUser?.uid as string),
            {
              email:loggedInUser?.email,
              lastSeen: serverTimestamp(),
              photoUrl: loggedInUser?.photoURL
            },
            {merge:true}// just update what is changed
            )
        }catch(err){
          console.log(err)
      }
    }
    if(loggedInUser){
      setUserInDb()
    }
  }, [loggedInUser])
  

  if(loading)return <Loading/>

  if(!loggedInUser) return <Login/>

  return (
    <>
    <ColorModeContextProvider>
     <CssBaseline />
    <Component {...pageProps} />
    </ColorModeContextProvider>

    </>

);

}
