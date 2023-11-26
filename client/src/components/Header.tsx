import LinkDetails from "@/interfaces/LinkDetails";
import axios from 'axios';
import { useState } from "react";
import { Fira_Code } from 'next/font/google'
import { SERVER_URL } from "@/config";

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap'
})

function Header({linkDetails, setLinkDetails} : {linkDetails : LinkDetails, setLinkDetails : Function}) {

  const [inputLink, setInputLink] = useState('');
  const [loading, setLoading] = useState(false);

  const getBrokenLinks =  async () => {
    setLoading(true);
    setLinkDetails((prevLinkDetails: LinkDetails)  => ({
        ...prevLinkDetails,
        numberOfLinks: undefined,
        brokenLinks: [],
        error: false
    }));
    try {
      const response = await axios.post(SERVER_URL + '/check-links', {url: inputLink});
      console.log(response.data);
      setLoading(false);
      setLinkDetails((prevLinkDetails: LinkDetails) => ({
          ...prevLinkDetails,
          numberOfLinks: response.data.links.length,
          brokenLinks: response.data.links,
          error: false,
      }));
    }
    catch(err) {
      console.log(err);
      setLoading(false);
      setLinkDetails((prevLinkDetails: LinkDetails)  => ({
          ...prevLinkDetails,
          numberOfLinks: undefined,
          brokenLinks: [],
          error: true
      }));
      console.log(linkDetails);
    }
  }

  return (
    <>
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }}>
      <input className={firaCode.className} style={{
        width: '100%',
        margin: '20px 20px 0 20px',
        padding: '10px',
        borderRadius: '20px',
        backgroundColor: '#001524',
        color: "#FDE5D4"
      }} type={'url'} placeholder={"https://"} value={inputLink}
      onChange={(event)=> setInputLink(event.target.value)} >
      </input>
    </div>
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        color: '#001524',
        marginTop: '10px',
        marginBottom: '50px',
        width: '100%'
    }}>
        <h1 style={{
            marginLeft: '30px',
            fontSize: '16px',
            fontWeight: '600',
            letterSpacing: '1px'
        }}>ENTER A URL</h1>
        <button style={{
            marginRight: '30px',
            backgroundColor: '#001524',
            color: '#FDE5D4',
            padding: '10px 40px',
            borderRadius: '5px'
        }}
        onClick={() => getBrokenLinks()}
        >{loading ?<>FINDING...</> : <>FIND BROKEN LINKS</>}</button>
    </div>
    
    </>
  )
}

export default Header
